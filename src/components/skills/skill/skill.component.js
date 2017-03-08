/**
 * Created on 2017-01-17.
 * Skill Component
 */
(function(){
'use strict';

  module.exports = {
    bindings: {
      skillName: '@',
      percentage: '@',
      selectedHues: '<' 
    },
    controller: skillController,
    templateUrl: './components/skills/skill/skill.template.html'
  };

  skillController.$inject = ['$interval', '$document', '$timeout', 'hslColorGenerator'];
  function skillController($interval, $document, $timeout, hslColorGenerator) {
     this.$onInit = () => {
       let randomColor = hslColorGenerator.generateColor(70, 80, 9, this.selectedHues);

       this.skillBarTextColor = hslColorGenerator.colorToString(randomColor);
       let skillBarColor = hslColorGenerator.colorToString(randomColor);

       let transitionValue = 0.8 + this.percentage/100;
       this.skillBarStyle = { 
         'transition': 'width ' + transitionValue + 's',
         'background-color': skillBarColor 
       }

       loadSkills();
     };

     let self = this;

     self.barValue = 0;
     self.determinateValue = 100;
   
     function loadSkills() {
       const loadBar = () => {
          $timeout( function(){
            let width = self.percentage + '%';
            self.skillBarStyle['width'] = width;
          }, 500 );
       };

       const loadTextValue = () => {
         let val;
         let promise = $interval(function() {
           self.determinateValue -= 1;
           self.incrementedPercentage = 100 - self.determinateValue;
           val = self.determinateValue 
           if (val <= (100 - self.percentage)) {
             $interval.cancel(promise);
             self.barValue = self.percentage;
           }
         }, 16);
       };

       loadTextValue();
       loadBar();

     }

  }
}());
