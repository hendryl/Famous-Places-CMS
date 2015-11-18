function routerConfig ($routeProvider) {
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
    .otherwise({
      redirectTo: '/home'
    });
}

export default routerConfig;
