(function () {
'use strict';

    angular
        .module('app', [])
        .controller('indexController', indexController);

    indexController.$inject=['$scope', '$document', '$window'];
    function indexController($scope, $document , $window) {
      this.$onInit = () => {
        $scope.isCloseNavigatorTriggered = false;

        $scope.hasFocus = true;

        $scope.resetNavState = () => { 
          $scope.isCloseNavigatorTriggered = false; 
        };
      };
      
      $window.onfocus = function(){
        $scope.hasFocus = true;
      }

      $window.onblur = function(){
        $scope.hasFocus = false;
      }
    }
})();
