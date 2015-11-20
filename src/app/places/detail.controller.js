var Place = require('./place');

class DetailController {
  constructor($q, $scope, $location, $routeParams, toastr, _, PlaceFactory, CountryFactory) {
    'ngInject';

    $scope.place = new Place();
    $scope.countries = [];
    $scope.isPreparing = true;
    $scope.isNewPlace = _.endsWith($location.path(), 'create');

    var nullCountry = {
      "name": "No country",
      "country_id": null
    };

    var countryListPromise = CountryFactory.getList();
    var placePromise = null;

    if (!$scope.isNewPlace) {
      $scope.id = Number($routeParams.id);
      $scope.header = "Update Place";
      placePromise = PlaceFactory.getDetail($scope.id);
    } else {
      $scope.header = "New Place";
    }

    if(placePromise === null) {
      countryListPromise.then(function(result) {
        $scope.countries = _.sortBy(result.data, "name");
        $scope.countries.unshift(nullCountry);
        $scope.isPreparing = false;
      });
    } else {
      $q.all([countryListPromise, placePromise]).then(function(result) {
          $scope.countries = _.sortBy(result[0].data, "name");
          $scope.countries.unshift(nullCountry);

          $scope.place = new Place(result.data);

          $scope.isPreparing = false;
      })
    }

    var getPayload = function() {
      return $scope.place;
    };

    $scope.canSave = function() {
      return $scope.form.$dirty;
    };

    $scope.cancel = function() {
      var result = true;

      if($scope.canSave()) {
        result = confirm('Are you sure? Your changes will be discarded!');
      }

      if(result) {
        $location.path('/places');
      }
    };

    $scope.save = function() {
      var payload = getPayload();
      PlaceFactory.update($scope.id, payload).then(function(result) {
        toastr.success('Place updated.');
        $location.path('/places');
      }, function(error) {
        toastr.error('Failed to update place: ' + error.data.detail);
      });
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
  }
}

export default DetailController;
