class ManageController {
  constructor($scope, toastr, _, CountryFactory) {
    'ngInject';

    $scope.headers = [
      {
        'title':'ID',
        'column':'country_id'
      },
      {
        'title':'Name',
        'column':'name'
      },
      {
        'title':'Continent',
        'column':'continent'
      },
      {
        'title':'Flag',
        'column':''
      },
      {
        'title':'Actions',
        'column':''
      }
    ];
    $scope.countries = [];

    $scope.sort = function(column) {
      if(column.isEmpty) {
        return;
      }

      $scope.countries = _.sortBy($scope.countries, column);
    };

    $scope.delete = function(id, name) {
      var result = confirm("Are you sure you want to delete country " + name + "?");

      if(result) {
        CountryFactory.delete(id).then(function(data) {
          $scope.countries = _.remove($scope.countries, function(country) {
            return country.country_id !== id;
          });

          toastr.success('Country deleted.');
        }, function(error) {
          toastr.error('Failed to delete country: ' + error.data.detail);
        });
      }
    };

    CountryFactory.getList().success(function(data) {
      data = _.sortBy(data, "country_id");
      data = _.each(data, function(country) {
        country.continent = country.continent === null ? "-" : country.continent;
        country.image = country.image === null || country.image === undefined ? "" : country.image;
      });
      $scope.countries = data;
    });
  }
}

export default ManageController;
