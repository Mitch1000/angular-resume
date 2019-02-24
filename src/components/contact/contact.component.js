(function(){
'use strict';

  module.exports = {
    controller: contactController,
    templateUrl: './components/contact/contact.template.html'
  };

  contactController.$inject = ['$http'];
  function contactController($http) {

    this.$onInit = () => {
      this.sendMail = sendMail;
      this.showModal = false;
      this.isLoading = false;

      this.inputHasValue = (value) => {
        return value !== undefined && value !== null && value !== '';
      };

      this.closeModal = () => {
        this.showModal = !this.showModal;
      };
    }

    function sendMail() {
      let data = {
        "name": this.name,
        "companyName": this.companyName,
        "email": this.email,
        "subject": this.subject,
        "content": this.content
      };

      if (!this.name || !this.companyName || !this.subject || !this.email) return;

      const showModal = (success) => {
        let modalData = {}
        if (success) {
          modalData.modalTitle = 'Email Sent';
          modalData.modalFail = false;
          modalData.modalContent = 'You should receive a response shortly.';
        } else {
          modalData.modalTitle = 'Failed to Send Email Due to Server Error.';
          modalData.modalFail = true;
          modalData.modalContent = 'Please try again later.';
        }

        this.modalTitle = modalData.modalTitle;
        this.modalFail = modalData.modalFail;
        this.modalContent = modalData.modalContent;
        this.showModal = !this.showModal;
      };

      this.isLoading = true;
      $http.post('http://167.99.180.42:8080/send_email', data, {headers : {"Content-Type" : "application/json"}}).then((response) => {
        showModal(true);
      }).catch((error) => {
        showModal(false);
        console.error(error);
      }).finally(() => { this.isLoading = false; });
    }
  }

}());
