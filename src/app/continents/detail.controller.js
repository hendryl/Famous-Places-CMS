class DetailController {
  constructor($scope, $location, $routeParams, toastr, _, ContinentFactory) {
    'ngInject';

    $scope.id = 0;
    $scope.name = "";
    $scope.isPreparing = true;
    $scope.isSaving = false;
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
      };
    };

    $scope.canSave = function() {
      return $scope.form.$dirty && !_.isEmpty($scope.name) && !$scope.isSaving;
    };

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
      $scope.isSaving = true;
      var payload = getPayload();
      ContinentFactory.update($scope.id, payload).then(function(result) {
        $scope.isSaving = false;
        toastr.success('Continent updated.');
        $location.path('/continents');
      }, function(error) {
        $scope.isSaving = false;
        toastr.error('Failed to update continent: ' + error.data.detail);
      });
    };

    $scope.create = function() {
      $scope.isSaving = true;
      var payload = getPayload();
      ContinentFactory.create(payload).then(function(result) {
        $scope.isSaving = false;
        toastr.success('Continent created.');
        $location.path('/continents');
      }, function(error) {
        $scope.isSaving = false;
        toastr.error('Failed to create continent: ' + error.data.detail);
      });
    };
  }
}

export default DetailController;
