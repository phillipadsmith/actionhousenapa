// ============================================================
// ACTION HOUSE NAPA — script.js
// ============================================================

(function () {
  var nav    = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var menu   = document.getElementById('mobile-menu');
  if (!nav || !burger || !menu) { return; }

  // Nav: tighten padding on scroll (background is always dark via CSS)
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Mobile menu open/close
  function openMenu() {
    menu.classList.add('open');
    burger.classList.add('open');
    burger.setAttribute('aria-label', 'Close menu');
  }
  function closeMenu() {
    menu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-label', 'Open menu');
  }

  burger.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close when a menu link is clicked
  var links = menu.querySelectorAll('.mm-link');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', closeMenu);
  }

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (menu.classList.contains('open') && !menu.contains(e.target) && !burger.contains(e.target)) {
      closeMenu();
    }
  });

  // Scroll reveal
  var els = document.querySelectorAll(
    '.section-header, .session-card, .diff-card, .access-card, .about-photo, .about-text-col, .contact-text, .contact-cta-block, .sessions-statement, blockquote'
  );
  for (var j = 0; j < els.length; j++) { els[j].classList.add('reveal'); }

  // Staggered delays for grid items
  var sc = document.querySelectorAll('.sessions-grid .session-card');
  for (var k = 0; k < sc.length; k++) { sc[k].dataset.delay = k * 120; }
  var dc = document.querySelectorAll('.diff-grid .diff-card');
  for (var l = 0; l < dc.length; l++) { dc[l].dataset.delay = l * 90; }
  var ac = document.querySelectorAll('.access-grid .access-card');
  for (var m = 0; m < ac.length; m++) { ac[m].dataset.delay = m * 100; }

  // IntersectionObserver for reveal
  var io = new IntersectionObserver(function (entries) {
    for (var n = 0; n < entries.length; n++) {
      if (entries[n].isIntersecting) {
        (function (el) {
          setTimeout(function () { el.classList.add('visible'); }, parseInt(el.dataset.delay) || 0);
        })(entries[n].target);
        io.unobserve(entries[n].target);
      }
    }
  }, { threshold: 0.12 });
  for (var o = 0; o < els.length; o++) { io.observe(els[o]); }

  // Smooth scroll for anchor links
  var anchors = document.querySelectorAll('a[href^="#"]');
  for (var q = 0; q < anchors.length; q++) {
    anchors[q].addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (!href || href === '#') { return; }
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - nav.offsetHeight - 16,
          behavior: 'smooth'
        });
      }
    });
  }

})();
