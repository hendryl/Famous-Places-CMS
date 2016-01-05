class DetailController {
  constructor($q, $scope, $location, $routeParams, toastr, _, ngAudio, CountryFactory, ContinentFactory, CharacteristicFactory, ModeFactory) {
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

    $scope.isSaving = false;
    $scope.isPlaying = false;
    $scope.loadedMusic = null;

    $scope.playMusic = function() {
      $scope.loadedMusic = ngAudio.load($scope.mode.music);
      $scope.loadedMusic.play();
      $scope.isPlaying = true;
    };

    $scope.stopMusic = function() {
      if($scope.isPlaying) {
        $scope.loadedMusic.stop();
        $scope.isPlaying = false;
      }
    };

    var filterFunction = function(ch) {
      return ch.checked === true;
    };

    var checkedCountries = function() {
      return _.chain($scope.countries)
      .filter(filterFunction)
      .map('country_id')
      .value();
    };

    var checkedContinents = function() {
      return _.chain($scope.continents)
      .filter(filterFunction)
      .map('continent_id')
      .value();
    };

    var checkedCharacteristics = function() {
      return _.chain($scope.characteristics)
      .filter(filterFunction)
      .map('characteristic_id')
      .value();
    };

    $scope.isChecked = function(option) {
      return option.checked;
    };

    $scope.cancel = function() {
      var result = true;

      if ($scope.canSave()) {
        result = confirm('Are you sure? Your changes will be discarded!');
      }

      if (result) {
        $scope.stopMusic();
        $location.path('/modes');
      }
    };

    var getPayload = function() {
      $scope.mode.countries = checkedCountries();
      $scope.mode.continents = checkedContinents();
      $scope.mode.characteristics = checkedCharacteristics();
      return $scope.mode;
    };

    $scope.canSave = function() {
      return $scope.form.$dirty && !_.isEmpty($scope.mode.name) && !$scope.isSaving;
    };

    $scope.save = function() {
      $scope.isSaving = true;
      var payload = getPayload();
      ModeFactory.update($scope.mode.mode_id, payload).then(function(result) {
        $scope.isSaving = false;
        $scope.stopMusic();
        toastr.success('Mode updated.');
        $location.path('/modes');
      }, function(error) {
        $scope.isSaving = false;
        toastr.error('Failed to update mode: ' + error.data.detail);
      });
    };

    $scope.create = function() {
      $scope.isSaving = true;
      var payload = getPayload();
      ModeFactory.create(payload).then(function(result) {
        $scope.isSaving = false;
        toastr.success('Mode created.');
        $location.path('/modes');
      }, function(error) {
        $scope.isSaving = false;
        toastr.error('Failed to create mode: ' + error.data.detail);
      });
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
      });
    };

    prepareData();
  }
}

export default DetailController;
