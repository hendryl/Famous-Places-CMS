class ImageFactory {
  constructor($http, baseURLConfig) {
    'ngInject';

    this.getList = function(query, count) {
      query = query.replace(' ', '+');
      return $http.get(baseURLConfig.rootAPI + '/flickr/photos?q=' + query + "&size=" + count);
    };
  }
}

export default ImageFactory;
