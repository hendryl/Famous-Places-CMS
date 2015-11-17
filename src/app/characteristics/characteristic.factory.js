class CharacteristicFactory {
  constructor($http, baseURLConfig) {
    'ngInject';

    this.getList = function() {
      return $http.get(baseURLConfig.rootAPI + '/characteristics/');
    };

    this.getDetail = function(id) {
      return $http.get(baseURLConfig.rootAPI +'/characteristics/' + id);
    };

    this.create = function(characteristic) {
      return $http.post(baseURLConfig.rootAPI + '/characteristics/', characteristic);
    };

    this.update = function(id, characteristic) {
      return $http.put(baseURLConfig.rootAPI + '/characteristics/' + id, characteristic);
    };

    this.delete = function(id) {
      return $http.delete(baseURLConfig.rootAPI + '/characteristics/' + id);
    };
  }
}

export default CharacteristicFactory;
