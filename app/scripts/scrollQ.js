WDNG.scrollQ = (function() {

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
    return scrollQ.slice(0); // return copy of the array, not the real thing
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