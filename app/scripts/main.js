/* global WDNG, console, _ */

/* Scroll listener */
document.addEventListener('scroll', _.debounce(function() {
  'use strict';

  _.each(WDNG.scrollQ.get(), function(ev) {
    ev();
  });
  
}, 40));

/* Resize listener */
window.addEventListener('resize', _.debounce(function() {
  'use strict';

  var docElClassList = document.documentElement.classList;

  docElClassList.remove('landscape');
  docElClassList.remove('portrait');

  if (window.matchMedia('(orientation:portrait)').matches) {
    console.log('portrait');
    docElClassList.add('portrait'); // TODO don't keep adding
  } else {
    console.log('landscape');
    docElClassList.add('landscape'); // TODO don't keep adding
  }
}, 25));

/* Add appropriate class names for the menu bar */
if ( window.matchMedia('(min-width: 80em)').matches ) {
  document.querySelector('nav[role="navigation"]').classList.add('sticky');
  console.log('Added sticky to nav');
} else {
  // Enable fly in menu styles and behaviour
  document.querySelector('nav[role="navigation"]').classList.add('grid');
  console.log('Added "grid" to nav');
}

/* If small screen then set up fade in/out instead of side-by-side */
if ( window.matchMedia('(max-width: 56em)').matches ) {
  // Enable small screen version of 'specs' section
  WDNG.seeYouThere.init();
}
