/* global moment:false, toastr:false*/
import config from './index.config';
import routerConfig from './index.route';
import runBlock from './index.run';

import ContinentFactory from './continents/continent.factory';

import LoginController from './login/login.controller';
import MainController from './main/main.controller';
import ContinentsController from './continents/manage.controller';
import ContinentDetailController from './continents/detail.controller';
import NavbarDirective from './components/navbar/navbar.directive';

var lodash = require('lodash');

angular.module('famousPlacesCms', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ngRoute', 'ui.bootstrap'])
  .constant('moment', moment)
  .constant('toastr', toastr)
  .constant('_', lodash)
  .constant('baseURLConfig', {
    'rootAPI': 'https://famous-places-api.herokuapp.com/api'
  })

  .config(config)
  .config(routerConfig)
  .run(runBlock)

  .factory('ContinentFactory', ['$http', 'baseURLConfig', ($http, baseURLConfig) => new ContinentFactory($http, baseURLConfig)])

  .controller('LoginController', LoginController)
  .controller('MainController', MainController)
  .controller('ContinentsController', ContinentsController)
  .controller('ContinentDetailController', ContinentDetailController)

  .directive('navbar', () => new NavbarDirective());
