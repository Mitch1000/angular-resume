(function () {
'use strict';

    angular
        .module('app', [])
        .controller('indexController', indexController);

    indexController.$inject=['$scope', '$document', '$window'];
    function indexController($scope, $document , $window) {
      this.$onInit = () => {
        $scope.hasFocus = true;
      }
      
      $window.onfocus = function(){
        $scope.hasFocus = true;
      }

      $window.onblur = function(){
        $scope.hasFocus = false;
      }
    }
})();
