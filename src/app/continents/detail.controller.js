class ContinentDetailController {
  constructor($scope, ContinentFactory, $location, $routeParams, toastr, _) {
    'ngInject';

    $scope.id = 0;
    $scope.name = "";
    $scope.isPreparing = true;
    $scope.isNewContinent = _.endsWith($location.path(), 'create');

    if (!$scope.isNewContinent) {
      $scope.id = Number($routeParams.id);
      $scope.header = "Update Continent";

      ContinentFactory.getDetail($scope.id)
        .then(function(result) {
          $scope.name = result.data.name;
          $scope.isPreparing = false;
        });
    } else {
      $scope.header = "New Continent";
      $scope.isPreparing = false;
    }

    var getPayload = function() {
      return {
        "name":$scope.name
      }
    }

    $scope.canSave = function() {
      return $scope.form.$dirty;
    }

    $scope.cancel = function() {
      var result = true;

      if($scope.canSave()) {
        result = confirm('Are you sure? Your changes will be discarded!');
      }

      if(result) {
        $location.path('/continents');
      }
    };

    $scope.save = function() {
      var payload = getPayload();
      ContinentFactory.update($scope.id, payload).then(function(result) {
        toastr.success('Continent updated.');
        $location.path('/continents');
      }, function(error) {
        toastr.error('Failed to update continent: ' + error);
      })
    };

    $scope.create = function() {
      var payload = getPayload();
      ContinentFactory.create(payload).then(function(result) {
        toastr.success('Continent created.');
        $location.path('/continents');
      }, function(error) {
        toastr.error('Failed to create continent: ' + error);
      })
    };
  }
}

export default ContinentDetailController;
