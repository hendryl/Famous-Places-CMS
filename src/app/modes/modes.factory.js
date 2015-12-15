class ModesFactory {
  constructor($http, baseURLConfig) {
    'ngInject';

    this.getList = function() {
      return $http.get(baseURLConfig.rootAPI + '/modes/');
    };

    this.getDetail = function(id) {
      return $http.get(baseURLConfig.rootAPI +'/modes/' + id);
    };

    this.create = function(mode) {
      return $http.post(baseURLConfig.rootAPI + '/modes/', mode);
    };

    this.update = function(id, mode) {
      return $http.put(baseURLConfig.rootAPI + '/modes/' + id, mode);
    };

    this.delete = function(id) {
      return $http.delete(baseURLConfig.rootAPI + '/modes/' + id);
    };
  }
}

export default ModesFactory;
