(function(){
'use strict'

  module.exports = {
    bindings: {
      closeNav: '<',
    },
    controller: navigatorController,
    templateUrl: './components/navigator/navigator.template.html'
  };

  navigatorController.$inject = ['$templateCache','$document', '$scope', '$timeout'];
  function navigatorController ($templateCache, $document, $scope, $timeout) {
    this.$onChanges = function (changes) {
      if (changes.closeNav.currentValue) this.navigate(this.currentNavItemLink);
    };

    this.$onInit = () => {
      let previousItemLink = 'closed';

      this.navigate = ( linkItem ) => {
        let isSecondClick = this.currentNavItemLink === linkItem

        let view = this;
        const deleteOnDelay = (previousItems) => {
          $timeout(() => {
            if (previousItems) {
              previousItems.forEach((previousItem) => {
                previousItem.show = false;
              });
            }
          }, 700).then(() => {
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

      this.styleObject = (linkItem) => {
        let isCurrentNavItem = linkItem === this.currentNavItemLink;

        const styleOptions = { 
          hidden: { 'top' : '-800px' },
          present: { 'top' : '48px' }
        };

        if ( previousItemLink === 'work' ) {
          styleOptions.hidden = { 'top': '-1200px' };
        } 

        let styleObject = isCurrentNavItem ? styleOptions.present : styleOptions.hidden;

        return styleObject;
      };

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
            text: 'Work Experience',
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
    }
  }
}());
