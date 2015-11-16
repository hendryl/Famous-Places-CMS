function config ($logProvider, toastr) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);

  toastr.options.timeOut = 3000;
  toastr.options.positionClass = 'toast-top-right';
}

export default config;
