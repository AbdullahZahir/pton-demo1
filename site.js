/* Princeton Baking Bad — site interactions */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- mobile navigation ---- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---- sticky header shadow + back-to-top ---- */
  var topbar = document.querySelector('.topbar');
  var toTop = document.querySelector('.to-top');
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (topbar) topbar.classList.toggle('is-stuck', y > 12);
    if (toTop) toTop.classList.toggle('is-shown', y > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- reveal on scroll ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -70px 0px', threshold: 0.08 });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 80 + 'ms';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---- lightbox (gallery + posters) ---- */
  var box = document.querySelector('.lightbox');
  if (box) {
    var full = box.querySelector('img');
    var closeBtn = box.querySelector('.lightbox-close');

    function openBox(src, alt) {
      full.src = src;
      full.alt = alt || '';
      box.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }
    function closeBox() {
      box.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-lightbox]').forEach(function (zone) {
      zone.addEventListener('click', function (e) {
        var img = e.target.closest('img');
        if (img) openBox(img.dataset.full || img.src, img.alt);
      });
    });
    box.addEventListener('click', closeBox);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeBox();
    });
  }

  /* ---- video reels: tap to pause, pause when off screen ---- */
  var reels = document.querySelectorAll('.reel');
  reels.forEach(function (reel) {
    var video = reel.querySelector('video');
    if (!video) return;

    reel.addEventListener('click', function () {
      if (video.paused) {
        video.play();
        reel.classList.remove('is-paused');
      } else {
        video.pause();
        reel.classList.add('is-paused');
      }
    });

    if ('IntersectionObserver' in window) {
      var vio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            if (!reel.classList.contains('is-paused')) {
              var p = video.play();
              if (p && p.catch) p.catch(function () {});
            }
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.25 });
      vio.observe(reel);
    }
  });

  /* ---- talking tiger ---- */
  var talkBtn = document.querySelector('.talk-btn');
  var bubble = document.querySelector('.bubble');
  if (talkBtn && bubble) {
    var lines = [
      "Room temperature butter is not a suggestion. Ask me how I know.",
      "Nobody has ever been turned away for not knowing what a spatula is.",
      "The first batch is a rough draft. That's what the second tray is for.",
      "Yes, you can take some home. Yes, all of it counts as dinner.",
      "Somebody always forgets the baking soda. Tonight it will not be you.",
      "We measure in cups, grams, and vibes. Mostly vibes.",
      "Burnt edges build character. Also, they're still edible."
    ];
    var i = -1;
    talkBtn.addEventListener('click', function () {
      i = (i + 1) % lines.length;
      bubble.textContent = lines[i];
      bubble.classList.remove('is-pop');
      void bubble.offsetWidth;
      bubble.classList.add('is-pop');
    });
  }

  /* ---- culture filter chips ---- */
  var chips = document.querySelectorAll('.chip');
  var cards = document.querySelectorAll('.culture-card');
  if (chips.length && cards.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('is-active'); });
        chip.classList.add('is-active');
        var want = chip.dataset.filter;
        cards.forEach(function (card) {
          var show = want === 'all' || card.dataset.culture === want;
          card.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  /* ---- team cards flip ---- */
  document.querySelectorAll('.member').forEach(function (member) {
    var inner = member.querySelector('.member-inner');
    if (!inner) return;
    inner.setAttribute('tabindex', '0');
    inner.setAttribute('role', 'button');
    function flip() { member.classList.toggle('is-flipped'); }
    inner.addEventListener('click', flip);
    inner.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
    });
  });

});
