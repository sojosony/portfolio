document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 860) setMenu(false); });
  }
  // Logo: try logo.png, then logo.jpeg, then fall back to an "SS" monogram.
  // Checks images that already failed before this script ran, as well as later failures.
  function monogram(img) {
    var m = document.createElement('span');
    m.className = 'logo-fallback';
    m.textContent = 'SS';
    m.setAttribute('aria-hidden', 'true');
    img.replaceWith(m);
  }
  function fail(img) {
    if (!img.dataset.retry) { img.dataset.retry = '1'; img.src = 'Assets/images/logo.jpeg'; }
    else { monogram(img); }
  }
  document.querySelectorAll('.site-logo').forEach(function (img) {
    img.addEventListener('error', function () { fail(img); });
    if (img.complete && img.naturalWidth === 0) { fail(img); }
  });
  var photo = document.querySelector('.profile-photo');
  if (photo) {
    var useTile = function () {
      var t = document.createElement('div');
      t.className = 'profile-placeholder';
      t.setAttribute('aria-hidden', 'true');
      t.textContent = 'SS';
      photo.replaceWith(t);
    };
    photo.addEventListener('error', useTile);
    if (photo.complete && photo.naturalWidth === 0) { useTile(); }
  }
});