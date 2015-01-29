/* global WDNG */
WDNG.navbar = (function() {

  'use strict';

  var header = 'header[role="banner"]',
    selector = 'nav[role="navigation"]',
    trigger = 'main[role="main"]';

  function navPosition() {
    var el = document.querySelector(selector),
      triggerEl = document.querySelector(trigger),
      headerEl = document.querySelector(header),
      offset = WDNG.util.getOffset(triggerEl),
      fixedNavId = 'fixed-nav',
      fixedNav = document.getElementById(fixedNavId);
    
    //console.log('offset:', offset);

    if (offset.top < 80) {
      if (fixedNav === null) {
        headerEl.id = fixedNavId;
        //console.log('added "fixedNav"');
        setupMenuBtn();
      }
    } else if (fixedNav) {
      //document.body.removeChild(fixedNav);
      headerEl.id = '';
      //el.style.visibility = '';
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

  function init() {
    var check = function(condition) {
      var offset = WDNG.util.getOffset(el);
      return condition(offset.top);
    },

    condition = function(val) {
      return val < 80;
    };


  }

  return {
    init: init,
    position: navPosition,
    setupMenuBtn: setupMenuBtn
  };
}(WDNG));


//WDNG.scrollQ.add( WDNG.scrollQ.invoker(WDNG.navbar.position, check, condition) );
WDNG.scrollQ.add( WDNG.navbar.position );