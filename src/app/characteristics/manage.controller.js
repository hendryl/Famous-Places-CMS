class ManageController {
  constructor($scope, CharacteristicFactory, toastr, _) {
    'ngInject';

    $scope.headers = [
      'ID',
      'Name',
      'Actions'
    ];
    $scope.characteristics = [];

    $scope.delete = function(id, name) {
      var result = confirm("Are you sure you want to delete characteristic " + name + "?");

      if(result) {
        CharacteristicFactory.delete(id).then(function(data) {
          $scope.characteristics = _.remove($scope.characteristics, function(row) {
            return row.characteristic_id !== id;
          });

          toastr.success('Characteristic deleted.');
        }, function(error) {
          toastr.error('Failed to delete characteristic: ' + error.data.detail);
        });
      }
    };

    CharacteristicFactory.getList().success(function(data) {
      $scope.characteristics = _.sortBy(data, "characteristic_id");
    });
  }
}

export default ManageController;
