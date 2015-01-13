/* global WDNG */
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

  function loadImage(path, callback) {
    var img = new Image();
    img.onload = callback();
    img.src = path;
  }

  return {
    domEl: domEl,
    getOffset: getOffset,
    loadImage: loadImage
  };
}());