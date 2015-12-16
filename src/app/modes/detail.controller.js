class DetailController {
  constructor($q, $scope, $location, $routeParams, toastr, _, CountryFactory, ContinentFactory, CharacteristicFactory, ModeFactory) {
    'ngInject';

    $scope.mode = {
      mode_id: 0,
      name: '',
      image: '',
      description: '',
      music: '',
      enabled: true,
      isPreparing: true,
    };

    var prepareData = function() {
      var modePromise = null;
      var countriesPromise = CountryFactory.getList();
      var continentsPromise = ContinentFactory.getList();
      var characteristicsPromise = CharacteristicFactory.getList();

      $scope.isNewMode = _.endsWith($location.path(), 'create');
      if (!$scope.isNewMode) {
        $scope.id = Number($routeParams.id);
        $scope.header = "Update mode";
        modePromise = ModeFactory.getDetail($scope.id);
      } else {
        $scope.header = "New mode";
      }

      $q.all([countriesPromise, continentsPromise, characteristicsPromise, modePromise])
      .then(function(result) {
        $scope.countries = _.sortBy(result[0].data, "name");
        $scope.continents = _.sortBy(result[1].data, "name");
        $scope.characteristics = _.sortBy(result[2].data, "name");

        if(result[3] == null) {
          var uncheck = function(n) {
            n.checked = false;
          };

          $scope.countries = _.each($scope.countries, uncheck);
          $scope.continents = _.each($scope.continents, uncheck);
          $scope.characteristics = _.each($scope.characteristics, uncheck);
        } else {
          $scope.mode = result[3].data;

          $scope.countries = _.each($scope.countries, function(n) {
            n.checked = _.includes($scope.mode.countries, n.country_id);
          });
          $scope.continents = _.each($scope.continents, function(n) {
            n.checked = _.includes($scope.mode.continents, n.continent_id);
          });
          $scope.characteristics = _.each($scope.characteristics, function(n) {
            n.checked = _.includes($scope.mode.characteristics, n.characteristics_id);
          });
        }

        $scope.isPreparing = false;
      })
    };

    prepareData();
  }
}

export default DetailController;
