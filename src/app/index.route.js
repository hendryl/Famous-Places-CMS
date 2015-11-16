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
    .when('/continents/create', {
      title: 'New Continent',
      templateUrl: 'app/continents/detail.html',
      controller: 'ContinentDetailController'
    })
    .otherwise({
      redirectTo: '/home'
    });
}

export default routerConfig;
