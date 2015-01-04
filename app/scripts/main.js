
var WDNG = WDNG || {};

document.addEventListener('scroll', function() {
  'use strict';
  
  var scrollEventQ = WDNG.app.getScrollQ();

  for (var i = 0; i < scrollEventQ.length; i += 1) {
    scrollEventQ[i]();
  }
});

function setupMenuBtn() {
  'use strict';

  var menuBtnEl = document.querySelector('#fixed-nav #menu'),
    menuContentEl = document.querySelector('.menu-content');

  // Listen for click event on main nav menu button
  menuBtnEl.addEventListener('click', function(e) {
    var menuContentClass = menuContentEl.classList,
      targetClass = document.querySelector('.js-menu-icn').classList,
      action1 = 'add',
      action2 = 'remove';

    if ( menuContentClass.contains('menu-open') ) {
      action1 = 'remove',
      action2 = 'add';
    }

    menuContentClass[action1]('menu-open');
    targetClass[action1]('cross');
    targetClass[action2]('hamburger');
  });

  // Listen for click event bubbling up to menu content ul
  menuContentEl.addEventListener('click', function() {
    menuBtnEl.click();
  });
}

WDNG.app = (function() {

  'use strict';

  var scrollQ = [];

  /*function createItem(item, options) {
    var newItem = {
      fn: item,
      fnAfter: function() {}
    };

    for (var key in options) {
      if ( options.hasOwnProperty(key) ) {
        newItem[key] = options[key];
      }
    }

    return newItem;
  }*/

  function addToScrollQ(item) {
    //scrollQ.push( createItem(item, options) );
    scrollQ.push(item);
  }

  function removeFromScrollQ(item) {
    var index = scrollQ.indexOf(item);
    scrollQ.splice(index, 1);
  }

  function getScrollQ() {
    return scrollQ;
  }

  function invoker(fn, check, condition) {
    return function() {
      if ( check(condition) ) {
        fn();
      }
    }
  }
  
  return {
    addToScrollQ: addToScrollQ,
    removeFromScrollQ: removeFromScrollQ,
    getScrollQ: getScrollQ,
    invoker: invoker
  };
}());

WDNG.util = (function() {
  
  'use strict';

  function domEl(selector) {
    return document.querySelector(selector);
  }

  function getOffset(el) {
    var curLeft, curTop;
    
    curLeft = curTop = 0;

    if (el && el.offsetParent) {
      do {
        curTop += el.offsetTop - el.scrollTop;
      } while (el = el.offsetParent);
    }

    return {top: curTop, left: curLeft};
  }

  return {
    domEl: domEl,
    getOffset: getOffset
  };
}());

WDNG.intro = (function() {

  'use strict';

  // Track distance of header from top of page
  // resize from ? to ?
  
  var selector = 'header[role="banner"]';

  function resize() {
    var el = WDNG.util.domEl(selector);
    
    if (!el) {
      return;
    }

    el.style.overflow = 'visible';

    var offset = WDNG.util.getOffset(el);
    var initialScale = 1.35;
    var i = 1024 * initialScale; // image width
    var c = 1024; // container width
    var h = 382; // container height
    //h = 191;
    var minScale = 382/c/1.5;
    minScale = 0.55;
    var p = -1 * offset.top; // current position
    var scaleFactor = (c*p)/(h*i);
    var scale = initialScale - scaleFactor;
    var translateY = -1024 + 1700 * scaleFactor;
    var thresholdY = 700;
    thresholdY = 352;
    translateY = translateY > thresholdY ? thresholdY : translateY;
    //translateY = -50;
    //var posTop = -50 + 100 * scaleFactor;
    scale = scale > minScale ? scale : minScale;
    var image = el.querySelector('img');

    //console.log('header offset top:', offset);
    /*console.log('scale = ' + scale);
    console.log('translateY = ' + translateY);*/
    var newTransform = 'translate3d(-50%, ' + translateY + 'px, 0) scale(' + scale + ')';
    image.style.webkitTransform = newTransform;
    image.style.mozTransform = newTransform;
    image.style.transform = newTransform;
  }
  
  return {
    resize: resize
  };
}());

WDNG.navbar = (function() {

  'use strict';

  var selector = 'nav[role="navigation"]';
  var trigger = 'main[role="main"]';

  function navPosition() {
    var el = WDNG.util.domEl(selector);
    var triggerEl = WDNG.util.domEl(trigger);
    var offset = WDNG.util.getOffset(triggerEl);
    var fixedNavId = 'fixed-nav';
    var fixedNav = WDNG.util.domEl('#' + fixedNavId);
    //var clone = el.cloneNode(true);
    //clone.id = fixedNavClassName;
    // append clone and set 'fixed' position
    //console.log('el offset top:', offset);
    if (offset.top < 10) {
      if (fixedNav === null) {
        //document.body.appendChild(clone);
        //el.style.visibility = 'hidden';
        el.id = fixedNavId;
        setupMenuBtn();
      }
    } else if (fixedNav) {
      //document.body.removeChild(fixedNav);
      el.id = '';
      //el.style.visibility = '';
    }
  }

  return {
    navPosition: navPosition
  };
}());

if ( window.matchMedia('(min-width: 56em)').matches ) {
  document.querySelector('nav[role="navigation"]').classList.add('sticky');
} else {
  // Enable fly in menu styles and behaviour
  document.querySelector('nav[role="navigation"]').classList.add('fly-in');

  // Enable small screen version of 'specs' section
  (function() {
    var el = document.querySelector('.js-see-you-there');
    
    // Todo: Don't apply to small screen landscape
    
    WDNG.seeYouThere = function seeYouThere() {
      console.log('Todo: avoid adding this more than once!');
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

    var fnAfter = WDNG.app.removeFromScrollQ;
    
    WDNG.app.addToScrollQ( WDNG.app.invoker(WDNG.seeYouThere, check, condition) );
  }());
}


WDNG.app.addToScrollQ(WDNG.navbar.navPosition);
//WDNG.intro.resize();