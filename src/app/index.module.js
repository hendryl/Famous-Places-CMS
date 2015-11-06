/* global moment:false */
import config from './index.config';

import routerConfig from './index.route';

import runBlock from './index.run';
import LoginController from './login/login.controller';
import MainController from './main/main.controller';

angular.module('famousPlacesCms', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ngRoute', 'ui.bootstrap'])
  .constant('moment', moment)
  .config(config)

  .config(routerConfig)

  .run(runBlock)
  .controller('LoginController', LoginController)
  .controller('MainController', MainController);
