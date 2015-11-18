class CountryFactory {
  constructor($http, baseURLConfig) {
    'ngInject';

    this.getList = function() {
      return $http.get(baseURLConfig.rootAPI + '/countries/');
    };

    this.getDetail = function(id) {
      return $http.get(baseURLConfig.rootAPI +'/countries/' + id);
    };

    this.create = function(country) {
      return $http.post(baseURLConfig.rootAPI + '/countries/', country);
    };

    this.update = function(id, country) {
      return $http.put(baseURLConfig.rootAPI + '/countries/' + id, country);
    };

    this.delete = function(id) {
      return $http.delete(baseURLConfig.rootAPI + '/countries/' + id);
    };
  }
}

export default CountryFactory;
