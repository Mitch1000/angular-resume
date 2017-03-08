(function() {
'use strict';

  module.exports = () => {
    return { 
      restrict: 'A',
      controller: listItem,
    }
  };
  
  listItem.$inject = ['$element', '$timeout', 'hslColorGenerator'];
  function listItem ($element, $timeout, hslColorGenerator) {
    let listItems = $element[0].children;

    let selectedHues = [];
    Object.values(listItems).forEach((listItem, iterator) => {

      let listBullet = document.createElement('span');  
      listBullet.classList.add('list-bullet');
      listBullet.innerHTML = iterator + 1; 

      listItem.insertBefore(listBullet, listItem.firstChild); 

      let randomColor = hslColorGenerator.generateColor(93, 96, 18, selectedHues);
      let listItemDOMElement = angular.element(listItem);

      if(!listItemDOMElement) return;
      listItemDOMElement.on('mouseenter', () => {
        listBullet.style.backgroundColor = hslColorGenerator.colorToString(randomColor);
        listBullet.style.borderWidth = '.2em';
        listBullet.style.transform = 'scale(1.5)';
      });

      listItemDOMElement.on('mouseleave', () => {
        listBullet.style.backgroundColor = 'rgba(56,51,55,0.1)';
        listBullet.style.borderWidth = '';
        listBullet.style.transform = '';
      });
    });
  }
})();
