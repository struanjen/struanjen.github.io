/* global WDNG console _ */
WDNG = WDNG || {};

document.addEventListener('scroll', function() { // TODO add debounce and _.each
  'use strict';
  
  var scrollEventQ = WDNG.scrollQ.getScrollQ();

  for (var i = 0; i < scrollEventQ.length; i += 1) {
    scrollEventQ[i]();
  }
});

window.addEventListener('resize', function() { // TODO add debounce
  'use strict';

  if (window.matchMedia('(orientation:portrait)').matches) {
    console.log('portrait');
    document.documentElement.classList.add('portrait'); // TODO don't keep adding though
  } else {
    console.log('landscape');
    document.documentElement.classList.add('landscape'); // TODO don't keep adding though
  }
});

if ( window.matchMedia('(min-width: 56em)').matches ) {
  document.querySelector('nav[role="navigation"]').classList.add('sticky');
  console.log('Added sticky to nav');
} else {
  // Enable fly in menu styles and behaviour
  document.querySelector('nav[role="navigation"]').classList.add('grid');
  console.log('Added "grid" to nav');
  // Enable small screen version of 'specs' section
  (function() {
    'use strict';
    var section = document.querySelector('section.specs'),
      el = document.createElement('div');

      el.id = 'js-see-you-there';
      section.appendChild(el);
    
    // Todo: Don't apply to small screen landscape
    
    if (window.matchMedia('(orientation:portrait)').matches) {
      //console.log('seeYouthere = ' + typeof WDNG.seeYouThere);
      WDNG.seeYouThere = function seeYouThere() {
        console.log('Todo: stop adding this more than once!');
        el.classList.add('animate-background');
        WDNG.scrollQ.removeFromScrollQ('seeYouThere'); // Should remove
        console.log('"seeYouThere" Should be removed from scrollQ');
      };

      // Add listener condition to scroll queue
      // listen for el reaching position on page
      // test = WDNG.util.getOffset(el)
      // condition = function() {}
      
      var check = function(condition) {
        var offset = WDNG.util.getOffset(el);
        return offset.top < condition();
      },

      condition = function() {
        return 60;
      };

      //var fnAfter = WDNG.scrollQ.removeFromScrollQ;
      
      WDNG.scrollQ.addToScrollQ( WDNG.scrollQ.invoker(WDNG.seeYouThere, check, condition) );
    }
  }());
}

window.addEventListener('scroll', _.debounce(WDNG.navbar.navPosition, 40));
