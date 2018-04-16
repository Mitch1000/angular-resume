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
      }

      data = JSON.stringify(data);

      const showModal = (success) => {
        let modalData = {}
        if (success) {
          modalData.modalTitle = 'Email Sent';
          modalData.modalFail = false;
          modalData.modalContent = '';
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

      $http.post('http://159.89.114.62:8080/send_email', data, {headers : {"Content-Type" : "application/json"}}).then((response) => {
        const clearEmailForm = () => {
          this.companyName = '';
          this.name = '';
          this.email= '';
          this.subject= '';
          this.content= '';
        };

        clearEmailForm()
        showModal(true)
 
        console.log(response);
      }).catch((error) => {
        showModal(false)
        console.warn(error);
      });


    }
  }

}());
