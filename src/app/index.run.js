function runBlock ($log, $rootScope) {
  'ngInject';
  $log.debug('runBlock end');

  $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
    $rootScope.title = current.$$route.title;
  });
}

export default runBlock;
