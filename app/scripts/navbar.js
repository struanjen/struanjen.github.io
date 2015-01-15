/* global WDNG */
WDNG.navbar = (function() {

  'use strict';

  var selector = 'nav[role="navigation"]',
    trigger = 'main[role="main"]';

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
    if (offset.top < 80) {
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