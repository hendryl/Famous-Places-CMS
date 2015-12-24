class ManageController {
  constructor($scope, toastr, _, ContinentFactory) {
    'ngInject';

    $scope.headers = [
      {
        'title':'ID',
        'column':'continent_id'
      },
      {
        'title':'Name',
        'column':'name'
      },
      {
        'title':'Actions',
        'column':''
      },
    ];
    $scope.continents = [];

    $scope.sort = function(column) {
      if(column.isEmpty) {
        return;
      }

      $scope.continents = _.sortBy($scope.continents, column);
    };

    $scope.delete = function(id, name) {
      var result = confirm("Are you sure you want to delete continent " + name + "?");

      if(result) {
        ContinentFactory.delete(id).then(function(data) {
          $scope.continents = _.remove($scope.continents, function(continent) {
            return continent.continent_id !== id;
          });

          toastr.success('Continent deleted.');
        }, function(error) {
          toastr.error('Failed to delete continent: ' + error.data.detail);
        });
      }
    };

    ContinentFactory.getList().success(function(data) {
      $scope.continents = _.sortBy(data, "continent_id");
    });
  }
}

export default ManageController;
