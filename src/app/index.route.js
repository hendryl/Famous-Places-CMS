function routerConfig($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/', {
      title: 'Login',
      templateUrl: 'app/login/login.html',
      controller: 'LoginController'
    })
    .when('/home', {
      title: 'Home',
      templateUrl: 'app/main/main.html',
      controller: 'MainController'
    })
    .when('/modes', {
      title: 'Modes',
      templateUrl: 'app/modes/manage.html',
      controller: 'ModesController'
    })
    .when('/modes/:id', {
      title: 'Update Mode',
      templateUrl: 'app/modes/detail.html',
      controller: 'ModeDetailController'
    })
    .when('/continents', {
      title: 'Continents',
      templateUrl: 'app/continents/manage.html',
      controller: 'ContinentsController'
    })
    .when('/continents/:id', {
      title: 'Update Continent',
      templateUrl: 'app/continents/detail.html',
      controller: 'ContinentDetailController'
    })
    .when('/continents/create', {
      title: 'New Continent',
      templateUrl: 'app/continents/detail.html',
      controller: 'ContinentDetailController'
    })
    .when('/characteristics', {
      title: 'Characteristics',
      templateUrl: 'app/characteristics/manage.html',
      controller: 'CharacteristicsController'
    })
    .when('/characteristics/:id', {
      title: 'Update Characteristic',
      templateUrl: 'app/characteristics/detail.html',
      controller: 'CharacteristicDetailController'
    })
    .when('/characteristics/create', {
      title: 'New Characteristic',
      templateUrl: 'app/characteristics/detail.html',
      controller: 'CharacteristicDetailController'
    })
    .when('/countries', {
      title: 'Countries',
      templateUrl: 'app/countries/manage.html',
      controller: 'CountriesController'
    })
    .when('/countries/create', {
      title: 'New Country',
      templateUrl: 'app/countries/detail.html',
      controller: 'CountryDetailController'
    })
    .when('/countries/:id', {
      title: 'Update Country',
      templateUrl: 'app/countries/detail.html',
      controller: 'CountryDetailController'
    })
    .when('/places', {
      title: 'Places',
      templateUrl: 'app/places/manage.html',
      controller: 'PlacesController'
    })
    .when('/places/create', {
      title: 'New Place',
      templateUrl: 'app/places/detail.html',
      controller: 'PlaceDetailController'
    })
    .when('/places/:id', {
      title: 'Update Place',
      templateUrl: 'app/places/detail.html',
      controller: 'PlaceDetailController'
    })
    .otherwise({
      redirectTo: '/home'
    });
}

export default routerConfig;
