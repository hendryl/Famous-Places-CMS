class NavbarDirective {
  constructor () {
    'ngInject';

    let directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: NavbarController,
      bindToController: true
    };

    return directive;
  }
}

class NavbarController {
  constructor (moment, $scope, $window) {
    'ngInject';

    $scope.user = "Admin";
    $scope.titleSize = 2;

    var calculateTitleSize = function() {
      if($window.innerWidth < 510) {
        $scope.titleSize = 3;
      } else {
        $scope.titleSize = 2;
      }
      console.log($window.innerWidth);
      console.log("calculated title size " + $scope.titleSize);
    };

    calculateTitleSize();

    $window.onresize = function(event) {
      calculateTitleSize();
    };
  }
}

export default NavbarDirective;
