class ManageController {
  constructor($scope, toastr, _, PlaceFactory) {
    'ngInject';

    $scope.headers = [
      {
        title:'ID',
        column:'place_id'
      },
      {
        title:'Name',
        column:'name'
      },
      {
        title:'Country',
        column:'country'
      },
      {
        title:'Location',
        column:'latitude'
      },
      {
        title:'Enabled',
        column:'enabled'
      },
      {
        title:'Actions',
        column:''
      }
    ];
    $scope.places = [];


    $scope.sort = function(column) {
      if(column.isEmpty) {
        return;
      }

      $scope.places = _.sortBy($scope.places, column);
    };

    $scope.delete = function(id, name) {
      var result = confirm("Are you sure you want to delete place " + name + "?");

      if(result) {
        PlaceFactory.delete(id).then(function(data) {
          $scope.places = _.remove($scope.places, function(place) {
            return place.place_id !== id;
          });

          toastr.success('Place deleted.');
        }, function(error) {
          toastr.error('Failed to delete place: ' + error.data.detail);
        });
      }
    };

    PlaceFactory.getList().success(function(data) {
      data = _.sortBy(data, "place_id");
      data = _.each(data, function(place) {
        place.continent = place.continent === null ? "-" : place.continent;
        place.image = place.image === null || place.image === undefined ? "" : place.image;
      });
      $scope.places = data;
    });
  }
}

export default ManageController;
