class ContinentFactory {
  constructor($http, baseURLConfig) {
    'ngInject';

    this.getContinentList = function() {
      return $http.get(baseURLConfig.rootAPI + '/continents/');
    };

    this.getContinentDetail = function(id) {
      return $http.get(baseURLConfig.rootAPI +'/continents/' + id);
    };

    this.createContinent = function(continent) {
      return $http.post(baseURLConfig.rootAPI + '/continents/', continent);
    };

    this.updateContinent = function(id, continent) {
      return $http.put(baseURLConfig.rootAPI + '/continents/' + id, continent);
    };

    this.deleteContinent = function(id) {
      return $http.delete(baseURLConfig.rootAPI + '/continents/' + id);
    };
  }
}

export default ContinentFactory;
