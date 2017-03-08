(function() {
  'use strict'
   module.exports = function hslColorGenerator () {
     const colorToString = (color) => {
       return 'hsl(' + color.h + ',' + color.s + '%,' + color.l + '%)';
     };

     const generateColor = (minBrightness, maxBrightness, hueVariationFactor, selectedHues) => {
       const rand = ((min, max) => Math.floor(Math.random() * (max + 1 - min)) + min);
     
       const getHue = () => {
         const getHueNumber = () => {
           let hueNumber = rand(1, hueVariationFactor);
           if (selectedHues.includes(hueNumber)) {
             if (selectedHues.length <= hueVariationFactor -3) return getHueNumber();
             console.warn('No more random colors to select from given selected variation.');
             return rand(1,hueVariationFactor);
           }
           selectedHues.push(hueNumber)
           return hueNumber;
         };

         return getHueNumber() * 360/hueVariationFactor;
       };
       
       let h = getHue();
       let s = rand(50, 100);
       let l = rand(minBrightness, maxBrightness);
       return {h:h, s:s, l:l};
     };

     return {generateColor: generateColor, colorToString: colorToString};
  }
})();
