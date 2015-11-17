class ContinentFactory {
  constructor($http, baseURLConfig) {
    'ngInject';

    this.getList = function() {
      return $http.get(baseURLConfig.rootAPI + '/continents/');
    };

    this.getDetail = function(id) {
      return $http.get(baseURLConfig.rootAPI +'/continents/' + id);
    };

    this.create = function(continent) {
      return $http.post(baseURLConfig.rootAPI + '/continents/', continent);
    };

    this.update = function(id, continent) {
      return $http.put(baseURLConfig.rootAPI + '/continents/' + id, continent);
    };

    this.delete = function(id) {
      return $http.delete(baseURLConfig.rootAPI + '/continents/' + id);
    };
  }
}

export default ContinentFactory;
