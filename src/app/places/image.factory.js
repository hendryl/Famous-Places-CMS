class ImageFactory {
  constructor($http, baseURLConfig) {
    'ngInject';

    this.getList = function(query, count) {
      query = query.replace(' ', '+');
      return $http.get(baseURLConfig.rootAPI + '/flickr/photos?q=' + query + "&count=" + count);
    };

    this.getImage = function(id) {
      return $http.get(baseURLConfig.rootAPI + '/flickr/photos/' + id + '?type=cms');
    };
  }
}

export default ImageFactory;
