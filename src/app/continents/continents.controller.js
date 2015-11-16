class ContinentsController {
  constructor($scope, ContinentFactory, toastr, _) {
    'ngInject';

    $scope.headers = [
      'ID',
      'Name',
      'Actions'
    ];

    $scope.continents = [];

    $scope.delete = function(id, name) {
      var result = confirm("Are you sure you want to delete continent " + name + "?");

      if(result) {
        ContinentFactory.deleteContinent(id).then(function(data) {
          $scope.continents = _.remove($scope.continents, function(continent) {
            return continent.continent_id !== id;
          });
          
          toastr.success('File deleted');
        }, function(error) {
          toastr.error('Failed to delete file: ' + error);
        });
      }
    };

    ContinentFactory.getContinentList().success(function(data) {
      $scope.continents = data;
    });
  }
}

export default ContinentsController;
