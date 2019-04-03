
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

  const cookieDisclaimer = document.querySelector('.js-cookie-disclaimer');

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
  document.querySelectorAll('.viewport-constant-height').forEach(function (element) {
    element.style.height = element.style.height + 'px';
  });
  document.querySelectorAll('.viewport-constant-min-height').forEach(function (element) {
    element.style.height = element.style.minHeight + 'px';
  });

  document.querySelectorAll('[data-aos]').forEach(function (elem) {
    if (elem.getAttribute('data-aos').slice(0, 4) === 'nojs') {
      elem.setAttribute('data-aos', elem.getAttribute('data-aos').slice(5));
    }
  });

  var experienceFigCaptions = document.querySelectorAll('.experience-image-block figcaption');

  if (experienceFigCaptions.length > 0) {
    callAndUpdateAfterResize(function () {
      if (window.innerWidth <= 768) {
        experienceFigCaptions.forEach(function (figcaption) {
          figcaption.style.height = null;
        });
      } else {
        var maxHeight = 0;
        experienceFigCaptions.forEach(function (figcaption) {
          figcaption.style.height = null;
          maxHeight = Math.max(figcaption.offsetHeight, maxHeight);
        });
        experienceFigCaptions.forEach(function (figcaption) {
          figcaption.style.height = maxHeight + 'px';
        });
      }
    });
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