(function () {
  window.THREE = require('./three/three.min.js');
  const angular = require('angular');
  require('./globalNavigator');
  require('./creditCardPurchaser');
  require('./index.js');
  require('./index.controller.js');
  require('./components/components.module.js');
  require('./directives/directives.module.js')
  require('./services/services.module.js');
  require('./dependencies.module.js');

  if (!window.location.origin) {
    window.location.origin = `${window.location.protocol}//
    ${window.location.hostname}${(window.location.port ? `:${window.location.port}` : '')}`;
  }

  angular.module('resume', [
    'app',
    'resume.components',
    'resume.directives',
    'resume.services',
    'resume.models',
    // External Libraries
  ]);
}());
