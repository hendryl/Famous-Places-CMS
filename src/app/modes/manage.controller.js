class ManageController {
  constructor($scope, toastr, _, ModesFactory) {
    'ngInject';

    $scope.headers = [
      'ID',
      'Name',
      'Enabled',
      'Image'
    ];
    $scope.modes = [];

    $scope.delete = function(id, name) {
      var result = confirm("Are you sure you want to delete mode " + name + "?");

      if(result) {
        ModesFactory.delete(id).then(function(data) {
          $scope.modes = _.remove($scope.modes, function(mode) {
            return mode.mode_id !== id;
          });

          toastr.success('Mode deleted.');
        }, function(error) {
          toastr.error('Failed to delete mode: ' + error.data.detail);
        });
      }
    };

    ModesFactory.getList().success(function(data) {
      $scope.modes = _.sortBy(data, 'mode_id');

      _.each($scope.modes, function(mode) {
        if(mode.image == null) {
          mode.image = '';
        }
      });
    });
  }
}

export default ManageController;
