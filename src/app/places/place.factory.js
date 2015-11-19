class CharacteristicFactory {
  constructor($http, baseURLConfig) {
    'ngInject';

    this.getList = function() {
      return $http.get(baseURLConfig.rootAPI + '/places/');
    };

    this.getDetail = function(id) {
      return $http.get(baseURLConfig.rootAPI +'/places/' + id);
    };

    this.create = function(place) {
      return $http.post(baseURLConfig.rootAPI + '/places/', place);
    };

    this.update = function(id, place) {
      return $http.put(baseURLConfig.rootAPI + '/places/' + id, place);
    };

    this.delete = function(id) {
      return $http.delete(baseURLConfig.rootAPI + '/places/' + id);
    };
  }
}

export default PlaceFactory;
