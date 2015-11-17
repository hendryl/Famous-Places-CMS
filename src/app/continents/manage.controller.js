class ManageController {
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
        ContinentFactory.delete(id).then(function(data) {
          $scope.continents = _.remove($scope.continents, function(continent) {
            return continent.continent_id !== id;
          });

          toastr.success('Continent deleted.');
        }, function(error) {
          toastr.error('Failed to delete continent: ' + error);
        });
      }
    };

    ContinentFactory.getList().success(function(data) {
      $scope.continents = _.sortBy(data, "continent_id");
    });
  }
}

export default ManageController;
