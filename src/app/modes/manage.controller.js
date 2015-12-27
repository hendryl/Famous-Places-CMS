class ManageController {
  constructor($scope, toastr, _, ModeFactory) {
    'ngInject';

    $scope.headers = [
      {
        title:'ID',
        column:'mode_id'
      },
      {
        title:'Name',
        column:'name'
      },
      {
        title:'Enabled',
        column:'enabled'
      },
      {
        title:'Image',
        column:''
      },
      {
        title:'Actions',
        column:''
      }
    ];
    $scope.modes = [];

    $scope.sort = function(column) {
      if(column.isEmpty) {
        return;
      }

      $scope.modes = _.sortBy($scope.modes, column);
    };

    $scope.delete = function(id, name) {
      var result = confirm("Are you sure you want to delete mode " + name + "?");

      if(result) {
        ModeFactory.delete(id).then(function(data) {
          $scope.modes = _.remove($scope.modes, function(mode) {
            return mode.mode_id !== id;
          });

          toastr.success('Mode deleted.');
        }, function(error) {
          toastr.error('Failed to delete mode: ' + error.data.detail);
        });
      }
    };

    ModeFactory.getList().success(function(data) {
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
