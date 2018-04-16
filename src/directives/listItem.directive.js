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
    const isMobile = document.documentElement.clientWidth < 600;
    
    Object.values(listItems).forEach((listItem, iterator) => {
      let listBullet = document.createElement('span');  
      listBullet.classList.add('list-bullet');
      listBullet.innerHTML = iterator + 1; 

      listItem.insertBefore(listBullet, listItem.firstChild); 

      let randomColor = hslColorGenerator.generateColor(93, 96, 9, selectedHues);
      let listItemDOMElement = angular.element(listItem);

      if(!listItemDOMElement) return;

      const modifiedElement = isMobile ? listItem : listBullet;
      listItemDOMElement.on('mouseenter', () => {
        modifiedElement.style.backgroundColor = hslColorGenerator.colorToString(randomColor);
        if (isMobile) return;
        modifiedElement.style.borderWidth = '.2em';
        modifiedElement.style.transform = 'scale(1.5)';
      });

      listItemDOMElement.on('mouseleave', () => {
        modifiedElement.style.backgroundColor = isMobile ? 'white' : 'rgba(56,51,55,0.1)';
        if (isMobile) return;
        modifiedElement.style.borderWidth = '';
        modifiedElement.style.transform = '';
      });
    });
  }
})();
