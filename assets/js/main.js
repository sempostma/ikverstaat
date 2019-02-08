(function () {
  "use strict"; // Start of use strict

  var sideNav = document.getElementById('sideNav');
  var diagonalMessage = document.getElementById('diagonal-message');

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  function handleScroll() {
    if (sideNav) sideNav.style.height = Math.max(50, 150 - window.scrollY) + 'px';
    if (diagonalMessage) diagonalMessage.style.top = Math.max(50, 150 - window.scrollY) + 42 + 'px';
  }

  var msnry = new Masonry('.grid', {
    itemSelector: '.grid-item',
    columnWidth: 200
  });
})();
