class LoginController {
  constructor ($scope, $location) {
    'ngInject';

    $scope.authFailed = false;
    $scope.user = {
      name: '',
      password: ''
    };

    $scope.login = function() {
      var user = $scope.user;

      if(user.name === "admin" && user.password === "monumen") {
          $location.path("/dashboard");
      } else {
        $scope.authFailed = true;
      }
    };
  }
}

export default LoginController;
