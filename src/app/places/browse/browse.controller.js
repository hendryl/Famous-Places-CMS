class BrowseController {
  constructor($scope, $uibModalInstance, ImageFactory, text) {
    'ngInject';

    var imageCount = 90;

    $scope.text = text;
    $scope.photos = [];
    $scope.canShowPhotos = false;

    var getImages = function(query) {

      ImageFactory.getList(query, imageCount).then(function(result) {
        var row = 0;
        var photos = [];
        var data = result.data;
        while (data.length) {
          photos[row] = data.splice(0, 12);
          row += 1;
        }
        $scope.photos = photos;
        $scope.canShowPhotos = true;
      });
    };

    $scope.select = function(photo) {
      $uibModalInstance.close(photo);
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.search = function() {
      $scope.canShowPhotos = false;
      getImages($scope.text);
    };

    $scope.search();
  }
}

export default BrowseController;
