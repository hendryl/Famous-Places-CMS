/* global moment:false, toastr:false*/
import config from './index.config';
import routerConfig from './index.route';
import runBlock from './index.run';

import ContinentFactory from './continents/continent.factory';
import CharacteristicFactory from './characteristics/characteristic.factory';
import CountryFactory from './countries/country.factory';
import PlaceFactory from './places/place.factory';

import LoginController from './login/login.controller';
import MainController from './main/main.controller';
import ContinentsController from './continents/manage.controller';
import ContinentDetailController from './continents/detail.controller';
import CharacteristicsController from './characteristics/manage.controller';
import CharacteristicDetailController from './characteristics/detail.controller';
import CountriesController from './countries/manage.controller';
import CountryDetailController from './countries/detail.controller';

import NavbarDirective from './components/navbar/navbar.directive';

var lodash = require('lodash');

angular.module('famousPlacesCms', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ngRoute', 'ui.bootstrap', 'nya.bootstrap.select'])
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
  .factory('CharacteristicFactory', ['$http', 'baseURLConfig', ($http, baseURLConfig) => new CharacteristicFactory($http, baseURLConfig)])
  .factory('CountryFactory', ['$http', 'baseURLConfig', ($http, baseURLConfig) => new CountryFactory($http, baseURLConfig)])
  .factory('PlaceFactory', ['$http', 'baseURLConfig', ($http, baseURLConfig) => new PlaceFactory($http, baseURLConfig)])

  .controller('LoginController', LoginController)
  .controller('MainController', MainController)
  .controller('ContinentsController', ContinentsController)
  .controller('ContinentDetailController', ContinentDetailController)
  .controller('CharacteristicsController', CharacteristicsController)
  .controller('CharacteristicDetailController', CharacteristicDetailController)
  .controller('CountriesController', CountriesController)
  .controller('CountryDetailController', CountryDetailController)

  .directive('navbar', () => new NavbarDirective());
