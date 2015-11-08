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
  constructor (moment) {
    'ngInject';
  }
}

export default NavbarDirective;
