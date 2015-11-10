function routerConfig ($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/', {
      title: 'Login',
      templateUrl: 'app/login/login.html',
      controller: 'LoginController',
    })
    .when('/home', {
      title: 'Home',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
    })
    .otherwise({
      redirectTo: '/'
    });
}

export default routerConfig;
