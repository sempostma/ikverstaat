(function () {
  "use strict"; // Start of use strict
  var sideNav = document.getElementById('sideNav');
  var diagonalMessage = document.getElementById('diagonal-message');

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  function handleScroll() {
    if (sideNav) sideNav.style.height = Math.max(50, 110 - window.scrollY) + 'px';
    if (diagonalMessage) diagonalMessage.style.top = Math.max(50, 110 - window.scrollY) + 42 + 'px';
  }

  // var msnry = new Masonry('.grid', {
  //   itemSelector: '.grid-item',
  //   columnWidth: 200
  // });

  var cookieDisclaimer = document.querySelector('.js-cookie-disclaimer');
  if (cookieDisclaimer) {
    if (!localStorage.getItem('cookieDisclaimer')) {
      cookieDisclaimer.classList.add('is-active');
    }

    cookieDisclaimer.querySelector('button').addEventListener('click', function () {
      localStorage.setItem('cookieDisclaimer', true);
      cookieDisclaimer.classList.remove('is-active');
    });
  }

  // if ('serviceWorker' in navigator) {
  //   // Register a service worker hosted at the root of the
  //   // site using the default scope.
  //   navigator.serviceWorker.register('/sw.js').then(function (registration) {
  //     console.log('Service worker registration succeeded:', registration);
  //   }, /*catch*/ function (error) {
  //     console.log('Service worker registration failed:', error);
  //   });
  // } else {
  //   console.log('Service workers are not supported.');
  // }
  [].slice.call(document.querySelectorAll('.viewport-constant-height')).forEach(function (element) {
    element.style.height = element.style.height + 'px';
  });
  [].slice.call(document.querySelectorAll('.viewport-constant-min-height')).forEach(function (element) {
    element.style.height = element.style.minHeight + 'px';
  });

  [].slice.call(document.querySelectorAll('[data-aos]')).forEach(function (elem) {
    if (elem.getAttribute('data-aos').slice(0, 4) === 'nojs') {
      elem.setAttribute('data-aos', elem.getAttribute('data-aos').slice(5));
    }
  });

  [].slice.call(document.querySelectorAll('.experience-btn, .project-btn')).forEach(function(elem) {
    elem.addEventListener('click', function(e) {
      var target = document.getElementById(elem.getAttribute('aria-controls'));
      target.style.display = 'block';
      target.setAttribute('aria-hidden', false);
      elem.setAttribute('aria-expanded', true);
      elem.style.display = 'none';
    });
  });


  var experienceFigCaptions = document.querySelectorAll('.experience-image-block figcaption');

  var blockTitles = document.querySelectorAll('#blocks .block h3');

  equalHeightAbove768(experienceFigCaptions);
  equalHeightAbove768(blockTitles);

  function equalHeightAbove768(nodeList) {
    nodeList = [].slice.call(nodeList);
    if (nodeList.length > 0) {
      callAndUpdateAfterResize(function () {
        if (window.innerWidth <= 768) {
          nodeList.forEach(function (item) {
            item.style.height = null;
          });
        } else {
          var maxHeight = 0;
          nodeList.forEach(function (item) {
            item.style.height = null;
            maxHeight = Math.max(item.offsetHeight, maxHeight);
          });
          nodeList.forEach(function (item) {
            item.style.height = maxHeight + 'px';
          });
        }
      });
    }
  }

  function callAndUpdateAfterResize(func) {
    window.addEventListener('resize', debounce(func, 250));
    window.addEventListener('orientationchange', func);
    func();
  }

  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this, args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  AOS.init();
})();