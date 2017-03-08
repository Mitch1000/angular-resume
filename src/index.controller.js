(function () {
'use strict';

    angular
        .module('app', [])
        .controller('indexController', indexController);

    indexController.$inject=['$scope', '$document'];
    function indexController($scope, $document) {
      $scope.pattern = './img/glitch1.jpg'

      $scope.sideBarIsOpen = false;

      $scope.openSideNav = () => {
        $scope.sideBarIsOpen = true;
      };

      $scope.goToContent = ()=> {
        $document.scrollToElement(angular.element(document.getElementById('about')), 50, 750);
      } 
    }
})();
