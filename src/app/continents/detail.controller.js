class ContinentDetailController {
  constructor($scope, ContinentFactory, $location, $routeParams) {
    'ngInject';

    $scope.id = 0;
    $scope.name = "";
    $scope.isPreparing = true;

    var isNewContinent = _.endsWith($location.path(), 'create');
    console.log(isNewContinent);

    if(!isNewContinent) {
      $scope.id = Number($routeParams.id);
      $scope.header = "Update Continent";

      ContinentFactory.getContinentDetail($scope.id)
      .then(function(result) {
        $scope.name = result.data.name;
        console.log($scope.name);
        $scope.isPreparing = false;
      });
    } else {
      $scope.header = "New Continent";
      $scope.isPreparing = false;
    }
  }
}

export default ContinentDetailController;
