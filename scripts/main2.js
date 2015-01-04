function setupMenuBtn(){"use strict";var e=document.querySelector("#fixed-nav #menu"),t=document.querySelector(".menu-content");e.addEventListener("click",function(){var e=t.classList,n=document.querySelector(".js-menu-icn").classList,o="add",r="remove";e.contains("menu-open")&&(o="remove",r="add"),e[o]("menu-open"),n[o]("cross"),n[r]("hamburger"),"add"===o&&t.focus()}),t.addEventListener("click",function(){e.click()})}var WDNG=WDNG||{};if(document.addEventListener("scroll",function(){"use strict";for(var e=WDNG.app.getScrollQ(),t=0;t<e.length;t+=1)e[t]()}),WDNG.app=function(){"use strict";function e(e){r.push(e)}function t(e){var t=r.indexOf(e);r.splice(t,1)}function n(){return r}function o(e,t,n){return function(){t(n)&&e()}}var r=[];return{addToScrollQ:e,removeFromScrollQ:t,getScrollQ:n,invoker:o}}(),WDNG.util=function(){"use strict";function e(e){return document.querySelector(e)}function t(e){var t,n;if(t=n=0,e&&e.offsetParent)do n+=e.offsetTop-e.scrollTop;while(e=e.offsetParent);return{top:n,left:t}}return{domEl:e,getOffset:t}}(),WDNG.intro=function(){"use strict";function e(){var e=WDNG.util.domEl(t);if(e){var n=WDNG.util.getOffset(e),o=1.35,r=1024*o,i=1024,a=382,c=382/i/1.5;c=.55;var s=-1*n.top,l=i*s/(a*r),u=o-l,d=-1024+1700*l,f=700;f=352,d=d>f?f:d,u=u>c?u:c;var m=e.querySelector("img"),p="translate3d(-50%, "+d+"px, 0) scale("+u+")";m.style.webkitTransform=p,m.style.transform=p}}var t='header[role="banner"]';return{resize:e}}(),WDNG.navbar=function(){"use strict";function e(){var e=WDNG.util.domEl(t),o=WDNG.util.domEl(n),r=WDNG.util.getOffset(o),i="fixed-nav",a=WDNG.util.domEl("#"+i);r.top<10?null===a&&(e.id=i,setupMenuBtn()):a&&(e.id="")}var t='nav[role="navigation"]',n='main[role="main"]';return{navPosition:e}}(),window.matchMedia("(min-width: 56em)").matches?document.querySelector('nav[role="navigation"]').classList.add("sticky"):(document.querySelector('nav[role="navigation"]').classList.add("fly-in"),function(){var e=document.querySelector("section.specs"),t=document.createElement("div");t.id="js-see-you-there",e.appendChild(t),WDNG.seeYouThere=function(){console.log("Todo: avoid adding this more than once!"),t.classList.add("animate-background")};var n=function(e){var n=WDNG.util.getOffset(t);return n.top<e()},o=function(){return 50};WDNG.app.addToScrollQ(WDNG.app.invoker(WDNG.seeYouThere,n,o))}()),WDNG.app.addToScrollQ(WDNG.navbar.navPosition),window.matchMedia("(min-width: 65em)").matches){console.log("Large screen");var el=document.querySelector("main"),initialOffsetTop=WDNG.util.getOffset(el).top,updatedOffsetTop;window.scrollBy(0,1),updatedOffsetTop=WDNG.util.getOffset(el).top,initialOffsetTop-updatedOffsetTop===1&&(console.log("resize on scroll supported"),document.documentElement.classList.add("resize-on-scroll"),WDNG.app.addToScrollQ(WDNG.intro.resize)),window.scrollBy(0,-1)}