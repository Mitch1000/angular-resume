(function () {
'use strict';
  window.THREE = require('./three/three.min.js');
  require('angular');
  require('./index.js');
  require('./index.controller.js');
  require('./components/components.module.js');
  require('./directives/directives.module.js')
  require('./services/services.module.js');
  require('./dependencies.module.js');

  if (!window.location.origin) { window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : ''); }
  var BASE_URL = window.location.origin;
  

  angular.module('resume', [
    'app',
    'resume.components',
    'resume.directives',
    'resume.services',
    'resume.models',
    // External Libraries 
  ]);
}());
