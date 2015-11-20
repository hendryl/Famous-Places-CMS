class MainController {
  constructor ($scope, PlaceFactory, CountryFactory, CharacteristicFactory, ContinentFactory) {
    'ngInject';

    PlaceFactory.getList().success(function(data) {
      $scope.places = data.length;
    });

    CountryFactory.getList().success(function(data) {
      $scope.countries = data.length;
    });

    ContinentFactory.getList().success(function(data) {
      $scope.continents = data.length;
    });

    CharacteristicFactory.getList().success(function(data) {
      $scope.characteristics = data.length;
    });
  }
}

export default MainController;
