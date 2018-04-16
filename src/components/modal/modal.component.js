(function(){
'use strict';

  module.exports = {
    bindings: {
      title: '@',
      content: '@',
      modalFail: '<',
      closeModal: '&',
    },
    controller: modalController,
    templateUrl: './components/modal/modal.template.html'
  };

  modalController.$inject = [];
  function modalController() {
     this.$onInit = () => {
       console.log(this.closeModal)
     };
  }
}());
