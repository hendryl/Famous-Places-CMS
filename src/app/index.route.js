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
      templateUrl: 'app/continents/continents.html',
      controller: 'ContinentsController'
    })
    .otherwise({
      redirectTo: '/'
    });
}

export default routerConfig;
