class ContinentDetailController {
  constructor($scope, ContinentFactory, $location, $routeParams, _) {
    'ngInject';

    $scope.id = 0;
    $scope.name = "";
    $scope.isPreparing = true;

    var isNewContinent = _.endsWith($location.path(), 'create');

    if (!isNewContinent) {
      $scope.id = Number($routeParams.id);
      $scope.header = "Update Continent";

      ContinentFactory.getContinentDetail($scope.id)
        .then(function(result) {
          $scope.name = result.data.name;
          $scope.isPreparing = false;
        });
    } else {
      $scope.header = "New Continent";
      $scope.isPreparing = false;
    }

    $scope.canSave = function() {
      return $scope.form.$dirty;
    }

    $scope.cancel = function() {

    };

    $scope.save = function() {

    };
  }
}

export default ContinentDetailController;
