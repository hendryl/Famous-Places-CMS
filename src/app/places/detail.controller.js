class DetailController {
  constructor($scope, $location, $routeParams, toastr, _, PlaceFactory) {
    'ngInject';

    $scope.id = 0;
    $scope.name = "";
    $scope.isPreparing = true;
    $scope.isNewPlace = _.endsWith($location.path(), 'create');

    if (!$scope.isNewPlace) {
      $scope.id = Number($routeParams.id);
      $scope.header = "Update Place";

      PlaceFactory.getDetail($scope.id)
        .then(function(result) {
          $scope.name = result.data.name;
          $scope.isPreparing = false;
        });
    } else {
      $scope.header = "New Place";
      $scope.isPreparing = false;
    }

    var getPayload = function() {
      return {
        "name":$scope.name
      };
    };

    $scope.canSave = function() {
      return $scope.form.$dirty;
    };

    $scope.cancel = function() {
      var result = true;

      if($scope.canSave()) {
        result = confirm('Are you sure? Your changes will be discarded!');
      }

      if(result) {
        $location.path('/places');
      }
    };

    $scope.save = function() {
      var payload = getPayload();
      PlaceFactory.update($scope.id, payload).then(function(result) {
        toastr.success('Place updated.');
        $location.path('/places');
      }, function(error) {
        toastr.error('Failed to update place: ' + error.data.detail);
      });
    };

    $scope.create = function() {
      var payload = getPayload();
      PlaceFactory.create(payload).then(function(result) {
        toastr.success('Place created.');
        $location.path('/places');
      }, function(error) {
        toastr.error('Failed to create place: ' + error.data.detail);
      });
    };
  }
}

export default DetailController;
