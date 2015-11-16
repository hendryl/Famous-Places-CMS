class ContinentsController {
  constructor($scope, ContinentFactory) {
    'ngInject';

    $scope.headers = [
      'ID',
      'Name',
      'Actions'
    ];

    ContinentFactory.getContinentList().success(function(data) {
      console.log(data);
      $scope.continents = data;
      console.log($scope.continents);
    });
  }
}

export default ContinentsController;
