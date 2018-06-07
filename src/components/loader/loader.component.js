(function(){
'use strict';

  module.exports = {
    controller: loaderController,
    templateUrl: './components/loader/loader.template.html'
  };

  loaderController.$inject = ['hslColorGenerator'];
  function loaderController(hslColorGenerator) {
    this.$onInit = () => {
      this.dots = [{ id: 0, class: 'dot-1'}, { id: 1, class: 'dot-2'}, { id: 2, class: 'dot-3'}];

      const selectedHues = [];
      this.getRandomColor = () => {
        const randomColor = hslColorGenerator.generateColor(70, 80, 9, selectedHues);
        return hslColorGenerator.colorToString(randomColor);
      }

      this.dotColors = this.dots.map(() => this.getRandomColor())
    };
  }
}());
