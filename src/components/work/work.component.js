(function() {
'use strict';

  module.exports = {
    bindings: {
      skillName: '@',
      percentage: '@',
    },
    controller: workController,
    templateUrl: './components/work/work.template.html'
  };

  workController.$inject = ['$timeout', 'hslColorGenerator'];
  function workController($timeout, hslColorGenerator) {
    this.$onInit = () => {
      this.workItems = [];
    }
  }
})();
  
