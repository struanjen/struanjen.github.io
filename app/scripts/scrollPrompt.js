/* global WDNG */
WDNG.scrollPrompt = (function(app) {
  
  'use strict';

  var scrollQ = app.scrollQ,

  util = app.util,
  
  el = document.getElementById('scroll-prompt'),

  removeScrollPrompt = function removeScrollPrompt() {
    util.suicide(el);
    scrollQ.remove('removeScrollPrompt'); // Should remove it from Q so only called once
  },

  check = function check(condition) {
    var offset = util.getOffset(el);
    return condition(offset.top);
  },

  condition = function condition(val) {
    return val < -200;
  };

  scrollQ.add( scrollQ.invoker(removeScrollPrompt, check, condition) );

}(WDNG));
