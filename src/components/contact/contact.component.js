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
  
    }


    function sendMail() {
      let data = {
        "name": this.name,
        "email": this.email,
        "subject": this.subject,
        "content": this.content
      }

      this.name = '';
      this.email= '';
      this.subject= '';
      this.content= '';

      data = JSON.stringify(data);
      
      var http = new XMLHttpRequest();
      var params = data;
      http.open("POST", "http://159.203.26.129:3000", true);

      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      http.onreadystatechange = function() {
        console.log('onreadystatechange');
        if (http.readyState == 4 && http.status == 200) {
          console.log(http.responseText);
        }
        else {
          console.log('readyState=' + http.readyState + ', status: ' + http.status);
        }
      }

      http.send(params);
    }
  }

}());
