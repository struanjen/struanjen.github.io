/* global WDNG */
WDNG.util = (function() {
  
  'use strict';

  function getOffset(el) {
    var curTop = 0;

    if ('getBoundingClientRect' in el) {
      curTop = el.getBoundingClientRect().top;
    } else if (el && el.offsetParent) {
      do {
        curTop += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
      } while (el);
    }

    return {
      top: curTop
    };
  }

  function loadImage(path, callback) {
    var img = new Image();
    img.onload = callback();
    img.src = path;
  }

  return {
    getOffset: getOffset,
    loadImage: loadImage
  };
}());