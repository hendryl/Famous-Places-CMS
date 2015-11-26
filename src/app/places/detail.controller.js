var Place = require('./place');

class DetailController {
  constructor($q, $scope, $location, $routeParams, toastr, _, PlaceFactory, CountryFactory, CharacteristicFactory, $uibModal, NgMap, mapsKey) {
    'ngInject';

    $scope.googleMapsURL = "https://maps.google.com/maps/api/js?libraries=places&key=" + mapsKey;
    $scope.place = new Place();
    $scope.countries = [];
    $scope.characteristics = [];
    $scope.isPreparing = true;
    $scope.isNewPlace = _.endsWith($location.path(), 'create');

    var hasBrowsed = false;
    var nullCountry = {
      "name": "No country",
      "country_id": null
    };

    var checkedCharacteristics = function() {
      return _.filter($scope.characteristics, function(ch) {
        return ch.checked === true;
      });
    };

    var getPayload = function() {
      $scope.place.country_id = $scope.country.country_id;
      $scope.place.tags = checkedCharacteristics();
      return $scope.place;
    };

    $scope.canSave = function() {
      return $scope.form.$dirty || hasBrowsed;
    };

    $scope.cancel = function() {
      var result = true;

      if ($scope.canSave()) {
        result = confirm('Are you sure? Your changes will be discarded!');
      }

      if (result) {
        $location.path('/places');
      }
    };

    $scope.save = function() {
      var payload = getPayload();
      // PlaceFactory.update($scope.id, payload).then(function(result) {
      //   toastr.success('Place updated.');
      //   $location.path('/places');
      // }, function(error) {
      //   toastr.error('Failed to update place: ' + error.data.detail);
      // });
    };

    $scope.create = function() {
      var payload = getPayload();
      PlaceFactory.create(payload).then(function(result) {
        toastr.success('Place created.');
        $location.path('/places');
      }, function(error) {
        toastr.error('Failed to create place: ' + error.data.detail);
      });
    };

    $scope.browseImage = function() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/places/browse/browse.html',
        controller: 'BrowseController',
        size: 'lg',
        resolve: {
          text: function() {
            return $scope.place.name;
          }
        }
      });

      modalInstance.result.then(function(photo) {
        $scope.place.photo_id = photo.photo_id;
        $scope.photo = photo;
        hasBrowsed = true;
      });
    };

    $scope.centerMap = function(latLng) {
      NgMap.getMap().then(function(map) {
        map.panTo(latLng);
      })
    }

    $scope.moveMarker = function(event) {
      $scope.centerMap(event.latLng);
      $scope.place.latitude = event.latLng.lat();
      $scope.place.longitude = event.latLng.lng();
    };

    var prepareData = function() {
      var countryListPromise = CountryFactory.getList();
      var characteristicListPromise = CharacteristicFactory.getList();
      var placePromise = null;

      if (!$scope.isNewPlace) {
        $scope.id = Number($routeParams.id);
        $scope.header = "Update Place";
        placePromise = PlaceFactory.getDetail($scope.id);
      } else {
        $scope.id = 0;
        $scope.header = "New Place";
      }

      $q.all([countryListPromise, characteristicListPromise, placePromise]).then(function(result) {
        $scope.countries = _.sortBy(result[0].data, "name");
        $scope.countries.unshift(nullCountry);

        if (result[2] !== null) {
          $scope.place = new Place(result[2].data);
          $scope.country = _.find($scope.countries, function(country) {
            return $scope.place.country_id === country.country_id;
          });
        }

        var characteristics = _.sortBy(result[1].data, "name");
        characteristics = _.each(characteristics, function(ch) {
          if (_.includes($scope.place.tags, ch.characteristic_id)) {
            ch.checked = true;
          } else {
            ch.checked = false;
          }
        });

        $scope.characteristics = characteristics;
        $scope.isPreparing = false;
      });
    };

    prepareData();
  }
}

export default DetailController;
