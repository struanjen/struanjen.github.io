WDNG = WDNG || {};

document.addEventListener('scroll', function() {
  'use strict';
  
  var scrollEventQ = WDNG.scrollQ.getScrollQ();

  for (var i = 0; i < scrollEventQ.length; i += 1) {
    scrollEventQ[i]();
  }
});

if ( window.matchMedia('(min-width: 56em)').matches ) {
  document.querySelector('nav[role="navigation"]').classList.add('sticky');
} else {
  // Enable fly in menu styles and behaviour
  document.querySelector('nav[role="navigation"]').classList.add('fly-in');

  // Enable small screen version of 'specs' section
  (function() {
    var section = document.querySelector('section.specs'),
      el = document.createElement('div');

      el.id = 'js-see-you-there';
      section.appendChild(el);
    
    // Todo: Don't apply to small screen landscape
    
    WDNG.seeYouThere = function seeYouThere() {
      console.log('Todo: stop adding this more than once!');
      el.classList.add('animate-background');
    };

    // Add listener condition to scroll queue
    // listen for el reaching position on page
    // test = WDNG.util.getOffset(el)
    // condition = function() {}
    
    var check = function(condition) {
      var offset = WDNG.util.getOffset(el);
      return offset.top < condition();
    };

    var condition = function() {
      return 50;
    };

    //var fnAfter = WDNG.scrollQ.removeFromScrollQ;
    
    WDNG.scrollQ.addToScrollQ( WDNG.scrollQ.invoker(WDNG.seeYouThere, check, condition) );
  }());
}

WDNG.scrollQ.addToScrollQ(WDNG.navbar.navPosition);

// Test for scroll effect
// Large screen i.e. > 1024 (1024/16 = 64)
// Supports offset top on scroll
if ( window.matchMedia('(min-width: 65em)').matches ) {
  console.log('Large screen');

  // test for support
  var el = document.querySelector('main'),
    initialOffsetTop = WDNG.util.getOffset(el).top,
    updatedOffsetTop;

  // Test by scrolling page by one pixel
  window.scrollBy(0, 1);

  updatedOffsetTop = WDNG.util.getOffset(el).top;

  if (initialOffsetTop - updatedOffsetTop === 1) {
    console.log('resize on scroll supported');
    document.documentElement.classList.add('resize-on-scroll');
    WDNG.scrollQ.addToScrollQ(WDNG.intro.resize);
  }

  // Reset page position after test
  window.scrollBy(0, -1);
}