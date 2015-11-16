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
  constructor ($scope) {
    'ngInject';

    $scope.user = "Admin";

    $scope.menus = [
      {
        title: "Home",
        href: "home"
      },
      {
        title: "Places",
        href: "places"
      },
      {
        title: "Countries",
        href: "countries"
      },
      {
        title: "Continents",
        href: "continents"
      },
      {
        title: "Characteristics",
        href: "characteristics"
      }
    ];

    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    }
  }
}

export default NavbarDirective;
