class ImageFactory {
  constructor($http, baseURLConfig) {
    'ngInject';

    this.getList = function(query) {
      query = query.replace(' ', '+');
      return $http.get(baseURLConfig.rootAPI + '/flickr/photos?q=' + query);
    };
  }
}

export default ImageFactory;
