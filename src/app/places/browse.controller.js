class BrowseController {
  constructor($scope, $uibModalInstance, ImageFactory, text) {

    $scope.text = text;

    $scope.select = function(photo) {
      $uibModalInstance.close(photo);
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };

    var getImages = function(query) {
      ImageFactory.getList(query).then(function(result) {
        var row = 0;
        var photos = [];
        var data = result.data.splice(0,48);
        while (data.length) {
          photos[row] = data.splice(0, 12);
          row += 1;
        }
        $scope.photos = photos;
      });
    };

    getImages($scope.text);
  }
}

export default BrowseController;
