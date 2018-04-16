(function(){
'use strict';

  module.exports = {
    controller: aboutController,
    templateUrl: './components/about/about.template.html'
  };

  aboutController.$inject = ['$window', '$timeout'];
  function aboutController($window, $timeout) {
    this.$onInit = () => {
      const isMobile = $window.innerWidth;
      this.swapPictureWithText = false;

      $timeout( () => {
        this.swapPictureWithText = true;
      }, 1000 );
    } 
  }
}());
