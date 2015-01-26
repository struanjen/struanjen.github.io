/* global WDNG */
WDNG.util = (function() {
  
  'use strict';

  function getOffset(el) {
    var curLeft = 0,
      curTop = 0;

    if (el && el.offsetParent) {
      do {
        curTop += el.offsetTop - el.scrollTop;
      } while (el = el.offsetParent);
    }

    return {
      top: curTop,
      left: curLeft
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

/*var cumulativeOffset = function(element) {
    var top = 0, left = 0;
    do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element);

    return {
        top: top,
        left: left
    };
};*/