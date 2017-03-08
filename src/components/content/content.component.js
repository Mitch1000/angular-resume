(function(){
'use strict';

  module.exports = {
    bindings: {
      contentName: '@',  
      component: '@',
    },
    controller: contentController,
    templateUrl: './components/content/content.template.html'
  };

  contentController.$inject = ['$templateCache','$document', '$scope'];
  function contentController($templateCache, $document, $scope) {
    this.$onInit = ()=> {
      $templateCache.put(this.component, '<' + this.component + '/>');
    }
  }
}());
