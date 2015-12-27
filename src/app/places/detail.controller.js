var Place = require('./place');
var latLngDecimals = 6;
var defaultZoom = 16;
var nullCountry = {
  "name": "No country",
  "country_id": null
};

class DetailController {
  constructor($q, $scope, $location, $routeParams, toastr, _, PlaceFactory, CountryFactory, CharacteristicFactory, ImageFactory, $uibModal, NgMap, mapsKey) {
    'ngInject';

    $scope.googleMapsURL = "https://maps.google.com/maps/api/js?libraries=places&callback=prepareMap&key=" + mapsKey;
    $scope.place = new Place();
    $scope.countries = [];
    $scope.characteristics = [];
    $scope.isPreparing = true;
    $scope.isNewPlace = _.endsWith($location.path(), 'create');
    $scope.isSaving = false;
    $scope.mapCenter = {
      latitude: 0,
      longitude: 0
    };

    var hasChanged = false;

    $scope.isChecked = function(option) {
      return option.checked;
    };

    var checkedCharacteristics = function() {
      var filterFunction = function(ch) {
        return ch.checked === true;
      };

      return _.chain($scope.characteristics)
      .filter(filterFunction)
      .map('characteristic_id')
      .value();
    };

    var getPayload = function() {
      if($scope.country == null) {
        $scope.country = nullCountry;
      }

      $scope.place.country_id = $scope.country.country_id;
      $scope.place.tags = checkedCharacteristics();
      return $scope.place;
    };

    $scope.canSave = function() {
      return ($scope.form.$dirty || hasChanged) &&
      !_.isEmpty($scope.place.name) && !$scope.isSaving;
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
      $scope.isSaving = true;
      var payload = getPayload();
      PlaceFactory.update($scope.id, payload).then(function(result) {
        $scope.isSaving = false;
        toastr.success('Place updated.');
        $location.path('/places');
      }, function(error) {
          $scope.isSaving = false;
        toastr.error('Failed to update place: ' + error.data.detail);
      });
    };

    $scope.create = function() {
      $scope.isSaving = true;
      var payload = getPayload();
      PlaceFactory.create(payload).then(function(result) {
        $scope.isSaving = false;
        toastr.success('Place created.');
        $location.path('/places');
      }, function(error) {
        $scope.isSaving = false;
        toastr.error('Failed to create place: ' + error.data.detail);
      });
    };

    var transformPhotoUrl = function(url) {
      return url.replace('q.jpg', 'b.jpg');
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
        photo.url = transformPhotoUrl(photo.url);

        $scope.place.photo_id = photo.id;
        $scope.photo = photo;

        hasChanged = true;
      });
    };

    var checkPlace = function(places) {
      if (places === 0) {
        return;
      }

      var place = places[0];
      if (!place.geometry) {
        return;
      }

      $scope.moveToLocation(place);
    };

    $scope.prepareMap = function(map) {
      $scope.map = map;

      var options = {
        streetViewControl: false
      };

      map.setOptions(options);

      var input = window.document.getElementById('maps-input');
      $scope.searchBox = new google.maps.places.SearchBox(input);

      $scope.searchBox.addListener('places_changed', function() {
        var places = $scope.searchBox.getPlaces();

        checkPlace(places);
      });
    };

    $scope.moveToLocation = function(place) {
      if (place.geometry.viewport) {
        $scope.map.fitBounds(place.geometry.viewport);
      } else {
        $scope.centerMap(place.geometry.location);
        $scope.map.setZoom(defaultZoom);
      }
    };

    $scope.centerMap = function(latLng) {
      $scope.map.panTo(latLng);
    };

    $scope.placeMarker = function(event) {
      $scope.centerMap(event.latLng);
      $scope.moveMarker(event);
    };

    $scope.moveMarker = function(event) {
      $scope.place.latitude = event.latLng.lat().toFixed(latLngDecimals);
      $scope.place.longitude = event.latLng.lng().toFixed(latLngDecimals);
      hasChanged = true;
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

          if($scope.place.photo_id != null) {
            ImageFactory.getImage($scope.place.photo_id).then(function(res) {
              $scope.photo = res.data;
            });
          }
        }

        var characteristics = _.sortBy(result[1].data, "name");
        characteristics = _.each(characteristics, function(ch) {
          ch.checked = _.includes($scope.place.tags, ch.characteristic_id);
        });

        $scope.characteristics = characteristics;
        $scope.mapCenter.latitude = $scope.place.latitude;
        $scope.mapCenter.longitude = $scope.place.longitude;
        $scope.isPreparing = false;
      });
    };

    prepareData();
  }
}

export default DetailController;
