/* Cavendish Smile Studio — minimal interactions */

(function () {
  const header = document.getElementById('siteHeader');
  const nav = document.querySelector('.site-nav');
  const navToggle = document.getElementById('navToggle');

  /* ── Header background on scroll ─────────── */
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Mobile nav toggle ───────────────────── */
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      header.classList.toggle('nav-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        header.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Scroll reveal ───────────────────────── */
  const reveals = document.querySelectorAll(
    '.philosophy-text, .philosophy-figure, .section-head, .treatment, ' +
    '.studio-figure, .studio-text, .testimonial, .team-figure, ' +
    '.experience-steps li, .booking-inner'
  );
  reveals.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  /* ── Stagger treatment cards ─────────────── */
  document.querySelectorAll('.treatment').forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 90, 540)}ms`;
  });
  document.querySelectorAll('.experience-steps li').forEach((el, i) => {
    el.style.transitionDelay = `${i * 120}ms`;
  });
})();
