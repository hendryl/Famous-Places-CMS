class ContinentFactory {
  constructor($http, baseURLConfig) {
    'ngInject';

    this.getContinentList = function() {
      return $http.get(baseURLConfig.rootAPI + '/continents/');
    };

    this.getContinentDetail = function(id) {
      return $http.get(baseURLConfig.rootAPI +'/continents/' + id);
    };
  }
}

export default ContinentFactory;
