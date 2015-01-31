/* global WDNG */
WDNG.navbar = (function() {

  'use strict';

  var header = 'header[role="banner"]',
    trigger = 'main[role="main"]';

  function navPosition() {
    var triggerEl = document.querySelector(trigger),
      headerEl = document.querySelector(header),
      offset = WDNG.util.getOffset(triggerEl),
      fixedNavId = 'fixed-nav',
      fixedNav = document.getElementById(fixedNavId);
    
    if (offset.top < 80) {
      if (fixedNav === null) {
        headerEl.id = fixedNavId;
        setupMenuBtn();
      }
    } else if (fixedNav) {
      headerEl.id = '';
    }
  }

  function setupMenuBtn() {
    var menuBtnEl = document.querySelector('#menu'),
      menuContentEl = document.querySelector('.menu-content');

    // Listen for click event on main nav menu button
    menuBtnEl.addEventListener('click', function() {
      var menuContentClass = menuContentEl.classList,
        action1 = 'add',
        action2 = 'remove';

      if ( menuContentClass.contains('menu-open') ) {
        action1 = 'remove';
        action2 = 'add';
      }

      menuContentClass[action1]('menu-open');

      if (action1 === 'add') {
        menuContentEl.focus();
      }
    });

    // Listen for click event bubbling up to menu content ul
    menuContentEl.addEventListener('click', function() {
      menuBtnEl.click();
    });
  }

  /*function init() {
    debugger;
    var check = function(condition) {
      var offset = WDNG.util.getOffset(el);
      return condition(offset.top);
    },

    condition = function(val) {
      return val < 80;
    };
  }*/

  return {
    position: navPosition,
    setupMenuBtn: setupMenuBtn
  };
}(WDNG));

WDNG.scrollQ.add( WDNG.navbar.position );