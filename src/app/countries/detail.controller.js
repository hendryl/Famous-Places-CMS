class DetailController {
  constructor($q, $scope, $location, $routeParams, toastr, _, CountryFactory, ContinentFactory) {
    'ngInject';

    $scope.id = 0;
    $scope.name = "";
    $scope.continent_id = 0;
    $scope.image = "";
    $scope.continents = [];

    $scope.isPreparing = true;
    $scope.isNewCountry = _.endsWith($location.path(), 'create');

    var nullContinent = {
        "name": "No continent",
        "continent_id": null
    };

    var continentListPromise = ContinentFactory.getList();
    var countryPromise = null;

    if (!$scope.isNewCountry) {
      $scope.id = Number($routeParams.id);
      $scope.header = "Update country";
      countryPromise = CountryFactory.getDetail($scope.id);
    } else {
      $scope.header = "New country";
    }

    if (countryPromise === null) {
      continentListPromise.then(function(result) {
          $scope.continents = _.sortBy(result.data, "name");
          $scope.continents.unshift(nullContinent);
          $scope.isPreparing = false;
        });
    } else {
      $q.all([continentListPromise, countryPromise]).then(function(result) {
        $scope.continents = _.sortBy(result[0].data, "name");
        $scope.continents.unshift(nullContinent);

        var data = result[1].data;
        $scope.id = data.country_id;
        $scope.name= data.name;
        $scope.image = data.image;

        $scope.continent = _.find($scope.continents, function(continent) {
          return data.continent_id === continent.continent_id;
        });

        $scope.isPreparing = false;
      });
    }

    var getPayload = function() {
      $scope.continent_id = $scope.continent.continent_id;

      return {
        "name": $scope.name,
        "continent_id": $scope.continent_id,
        "image": $scope.image
      };
    };

    $scope.canSave = function() {
      return $scope.form.$dirty && !_.isEmpty($scope.name);
    };

    $scope.cancel = function() {
      var result = true;

      if ($scope.canSave()) {
        result = confirm('Are you sure? Your changes will be discarded!');
      }

      if (result) {
        $location.path('/countries');
      }
    };

    $scope.save = function() {
      var payload = getPayload();
      CountryFactory.update($scope.id, payload).then(function(result) {
        toastr.success('Country updated.');
        $location.path('/countries');
      }, function(error) {
        toastr.error('Failed to update country: ' + error.data.detail);
      });
    };

    $scope.create = function() {
      var payload = getPayload();
      CountryFactory.create(payload).then(function(result) {
        toastr.success('country created.');
        $location.path('/countries');
      }, function(error) {
        toastr.error('Failed to create country: ' + error.data.detail);
      });
    };
  }
}

export default DetailController;
