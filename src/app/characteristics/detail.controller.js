class DetailController {
  constructor($scope, $location, $routeParams, toastr, _, CharacteristicFactory) {
    'ngInject';

    $scope.id = 0;
    $scope.name = "";
    $scope.isPreparing = true;
    $scope.isNewCharacteristic = _.endsWith($location.path(), 'create');

    if (!$scope.isNewCharacteristic) {
      $scope.id = Number($routeParams.id);
      $scope.header = "Update Characteristic";

      CharacteristicFactory.getDetail($scope.id)
        .then(function(result) {
          $scope.name = result.data.name;
          $scope.isPreparing = false;
        });
    } else {
      $scope.header = "New Characteristic";
      $scope.isPreparing = false;
    }

    var getPayload = function() {
      return {
        "name":$scope.name
      };
    };

    $scope.canSave = function() {
      return $scope.form.$dirty && !_.isEmpty($scope.name);
    };

    $scope.cancel = function() {
      var result = true;

      if($scope.canSave()) {
        result = confirm('Are you sure? Your changes will be discarded!');
      }

      if(result) {
        $location.path('/characteristics');
      }
    };

    $scope.save = function() {
      var payload = getPayload();
      CharacteristicFactory.update($scope.id, payload).then(function(result) {
        toastr.success('Characteristic updated.');
        $location.path('/characteristics');
      }, function(error) {
        toastr.error('Failed to update characteristic: ' + error.data.detail);
      });
    };

    $scope.create = function() {
      var payload = getPayload();
      CharacteristicFactory.create(payload).then(function(result) {
        toastr.success('Characteristic created.');
        $location.path('/characteristics');
      }, function(error) {
        toastr.error('Failed to create characteristic: ' + error.data.detail);
      });
    };
  }
}

export default DetailController;
