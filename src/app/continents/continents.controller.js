class ContinentsController {
  constructor($scope, ContinentFactory) {
    'ngInject';

    $scope.headers = [
      'ID',
      'Name',
      'Actions'
    ];

    ContinentFactory.getContinentList().success(function(data) {
      $scope.continents = data;
    });
  }
}

export default ContinentsController;
