WDNG = WDNG || {};

WDNG.intro = (function() {

  'use strict';

  // Track distance of header from top of page
  // resize from ? to ?
  
  var selector = 'header[role="banner"]';
  var el = WDNG.util.domEl(selector);
  var image = WDNG.util.domEl(selector + ' img');
  var initialTranslateY = image.clientHeight * -0.5;

  function resize() {
    
    if (!el) {
      return;
    }

    //el.style.overflow = 'visible';

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
    var translateY = initialTranslateY + 1700 * scaleFactor;
    var thresholdY = 245;
    translateY = translateY > thresholdY ? thresholdY : translateY;
    //translateY = -50;
    //var posTop = -50 + 100 * scaleFactor;
    scale = scale > minScale ? scale : minScale;

    //console.log('header offset top:', offset);
    /*console.log('scale = ' + scale);
    console.log('translateY = ' + translateY);*/
    var newTransform = 'translate3d(-50%, ' + translateY + 'px, 0) scale(' + scale + ')';
    image.style.webkitTransform = newTransform;
    image.style.transform = newTransform;
  }
  
  return {
    resize: resize
  };
}());