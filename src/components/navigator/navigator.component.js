(function(){
'use strict'

  module.exports = {
    bindings: {
      closeNav: '<',
    },
    controller: navigatorController,
    templateUrl: './components/navigator/navigator.template.html'
  };

  navigatorController.$inject = ['$templateCache','$document', '$scope', '$timeout', 'hslColorGenerator', '$window'];
  function navigatorController ($templateCache, $document, $scope, $timeout, hslColorGenerator, $window) {
    this.$onChanges = function (changes) {
      if (changes.closeNav.currentValue) this.navigate(this.currentNavItemLink);
    };

    this.$onInit = () => {
      this.selectedItemIndex = 2;
      this.selectedNavItemColors = [];
      let previousItemLink = 'closed';

      let timeout;
      this.navigate = ( linkItem, itemIndex ) => {
        $window.scrollTo(0,0)

        let isSecondClick = this.currentNavItemLink === linkItem
        // prevent the navigator from breaking if you frantically click nav items
        if (timeout) {
          timeout = true;
          return; 
        }

        let view = this;
        const deleteOnDelay = (previousItems) => {
          timeout = true;
          $timeout(() => {
            if (previousItems) {
              previousItems.forEach((previousItem) => {
                previousItem.show = false;
              });
            }
          }, 500).then(() => {
            timeout = false;
            previousItemLink = view.currentNavItemLink;
          });
        };

        let previousItems = view.items.filter((item) => item.link == previousItemLink );

        const closeDropDown = () => {
          deleteOnDelay(previousItems);
          view.currentNavItemLink = 'closed';
        };

        const switchDropDown = () => {
          let currentItem = view.items.find((item) => item.link === linkItem );
          this.selectedItemIndex = itemIndex;

          view.currentNavItemLink = linkItem;
          currentItem.show = true;

          deleteOnDelay(previousItems);
        };

        if ( isSecondClick && this.currentNavItemLink !== 'closed' ) {
          closeDropDown();
          return;
        }

        switchDropDown();
      };

      this.styleClass = (linkItem) => {
        let isCurrentNavItem = linkItem === this.currentNavItemLink;

        const styleClasses = { 
          hidden: 'content-hidden',
          present: 'content-shown'
        };

        if ( previousItemLink === 'work' ) {
          styleClasses.hidden += ' content-hidden-work';
        } 

        let styleClass = isCurrentNavItem ? styleClasses.present : styleClasses.hidden;

        return styleClass;
      };

      const isMobile = $window.innerWidth < 1040;
      this.items = [ 
        { 
            id: 1,
            link: 'about', 
            text: 'About Me',
            show: false
        },

        { 
            id: 2,
            link: 'skills', 
            text: 'Skills',
            show: false
        },

        { 
            id: 3,
            link: 'work', 
            text: isMobile ? 'Work' : 'Work Exprience',
            show: false
        },

        { 
            id: 4,
            link: 'education', 
            text: 'Education',
            show: false
        },

        { 
           id: 5,
           link: 'contact', 
           text: 'Contact',
           show: false
        },
      ]; 

      this.isItemSelected = () => {
        return !this.items.map((item) => item.link ).includes(this.currentNavItemLink);
      };

      let selectedHues = [];
      const randomBorderColor = () => {
        let randomColor = hslColorGenerator.generateColor(30, 40, 9, selectedHues);
        return {'background-color': hslColorGenerator.colorToString(randomColor)};
      };

      this.randomBorderColorStyles = [];
      this.items.forEach(() => {
        this.randomBorderColorStyles.push(randomBorderColor())
      });

    };
  }
}());
