/* global WDNG */
WDNG.seeYouThere = (function(app) {
  
  'use strict';

  function init() {
    var specs = document.querySelector('section.specs'),
      el = document.createElement('div');
      el.id = 'js-see-you-there';
      specs.appendChild(el);
    
    // Don't apply to small screen landscape

    if (window.matchMedia('(orientation:portrait)').matches) {
      var enableSeeYouThere = function seeYouThereFn() {
        el.classList.add('animate-background');
        app.scrollQ.remove('seeYouThere'); // Should remove it from Q so only called once
      };

      var check = function(condition) {
        var offset = app.util.getOffset(el);
        return condition(offset.top);
      },

      condition = function(val) {
        return val < 150;
      };

      app.scrollQ.add( app.scrollQ.invoker(enableSeeYouThere, check, condition) );
    }
  }

  return {
    init: init
  };
}(WDNG));
