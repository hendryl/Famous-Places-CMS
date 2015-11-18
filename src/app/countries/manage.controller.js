class ManageController {
  constructor($scope, CountryFactory, toastr, _) {
    'ngInject';

    $scope.headers = [
      'ID',
      'Name',
      'Actions'
    ];
    $scope.countries = [];

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
      $scope.countries = _.sortBy(data, "country_id");
    });
  }
}

export default ManageController;
