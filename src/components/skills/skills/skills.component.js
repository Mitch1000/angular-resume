(function(){
'use strict';

  module.exports = {
    controller: skillsController,
    templateUrl: './components/skills/skills/skills.template.html'
  };

  function skillsController() {
    this.selectedHues = [];
  }

}());
