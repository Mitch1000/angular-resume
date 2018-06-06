(function () {
'use strict';

    angular
        .module('app', [])
        .controller('indexController', indexController);

    indexController.$inject=['$scope', '$document', '$window'];
    function indexController($scope, $document , $window) {
      this.$onInit = () => {
        $scope.isCloseNavigatorTriggered = false;

        $scope.resetNavState = () => { 
          $scope.isCloseNavigatorTriggered = false; 
        };
      };
    }
})();
