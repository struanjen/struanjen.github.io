/* global WDNG */
WDNG.navbar = (function() {

  'use strict';

  var header = 'header[role="banner"]',
    selector = 'nav[role="navigation"]',
    trigger = 'main[role="main"]';

  function navPosition() {
    //console.log('navPosition fn');
    var el = document.querySelector(selector);
    var triggerEl = document.querySelector(trigger);
    var headerEl = document.querySelector(header);
    var offset = WDNG.util.getOffset(triggerEl);
    //console.log('offset:', offset);
    var fixedNavId = 'fixed-nav';
    var fixedNav = document.getElementById(fixedNavId);
    
    if (offset.top < 80) {
      if (fixedNav === null) {
        headerEl.id = fixedNavId;
        console.log('added "fixedNav"');
        setupMenuBtn();
      }
    } else if (fixedNav) {
      //document.body.removeChild(fixedNav);
      headerEl.id = '';
      //el.style.visibility = '';
    }
  }

  function setupMenuBtn() {
    'use strict';

    var menuBtnEl = document.querySelector('#menu'),
      menuContentEl = document.querySelector('.menu-content');

    // Listen for click event on main nav menu button
    menuBtnEl.addEventListener('click', function(e) {
      var menuContentClass = menuContentEl.classList,
        targetClass,// = document.querySelector('.js-menu-icn').classList,
        action1 = 'add',
        action2 = 'remove';

      if ( menuContentClass.contains('menu-open') ) {
        action1 = 'remove',
        action2 = 'add';
      }

      menuContentClass[action1]('menu-open');
      /*targetClass[action1]('cross');
      targetClass[action2]('hamburger');*/

      if (action1 === 'add') {
        menuContentEl.focus();
      }
    });

    // Listen for click event bubbling up to menu content ul
    menuContentEl.addEventListener('click', function() {
      menuBtnEl.click();
    });
  }

  return {
    navPosition: navPosition,
    setupMenuBtn: setupMenuBtn
  };
}());