op0-/* global WDNG, console */
WDNG.onload = (function() {

  'use strict';

  var images = [];

  var introImage = function introImage() {
    var transformCss = [
      'translate3d(-50%, ',
        this.clientHeight * -0.5, 'px, 0)',
        ' scale(1.35)'
      ].join('');

    console.log(transformCss);
    this.style.webkitTransform = transformCss;
    this.style.transform = transformCss;
  };

  var introImageEl = document.getElementById('banner-image');
  introImageEl.onload = introImage.bind(introImageEl);

}());