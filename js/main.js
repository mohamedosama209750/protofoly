(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const supportsIO = 'IntersectionObserver' in window;

  /* ------------------------------------------------------------------------
     Theme
     --------------------------------------------------------------------- */

  const themeToggle = document.querySelector('.theme-toggle');
  const themeColor = document.getElementById('theme-color');
  const themeMeta = { dark: '#000000', light: '#e5e5e5' };

  function syncThemeUI(theme) {
    const next = theme === 'dark' ? 'light' : 'dark';
    themeToggle.setAttribute('aria-label', `Switch to ${next} theme`);
    themeToggle.setAttribute('title', `Switch to ${next} theme`);
    if (themeColor) themeColor.setAttribute('content', themeMeta[theme]);
  }

  syncThemeUI(root.dataset.theme === 'light' ? 'light' : 'dark');

  themeToggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('mo-theme', next);
    } catch (error) {
      /* Storage can be blocked; theme still applies for this visit. */
    }
    syncThemeUI(next);
  });

  /* ------------------------------------------------------------------------
     Footer year
     --------------------------------------------------------------------- */

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ------------------------------------------------------------------------
     Reveal on scroll
     --------------------------------------------------------------------- */

  const revealElements = Array.from(document.querySelectorAll('[data-reveal]'));

  function revealAll() {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }

  if (!supportsIO || reduceMotion.matches) {
    revealAll();
  } else {
    const revealer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          revealer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -7% 0px', threshold: 0.12 },
    );
    revealElements.forEach((element) => revealer.observe(element));
  }

  const onMotionChange = (event) => {
    if (event.matches) revealAll();
  };
  if (typeof reduceMotion.addEventListener === 'function') {
    reduceMotion.addEventListener('change', onMotionChange);
  } else if (typeof reduceMotion.addListener === 'function') {
    reduceMotion.addListener(onMotionChange);
  }

  /* ------------------------------------------------------------------------
     Active section in the rail
     --------------------------------------------------------------------- */

  const navLinks = Array.from(document.querySelectorAll('[data-nav]'));
  const sections = navLinks
    .map((link) => document.getElementById(link.dataset.nav))
    .filter(Boolean);

  if (supportsIO && sections.length) {
    const setActive = (id) => {
      navLinks.forEach((link) => {
        if (link.dataset.nav === id) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    };

    const spy = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-42% 0px -50% 0px', threshold: 0 },
    );

    sections.forEach((section) => spy.observe(section));

    navLinks.forEach((link) => {
      link.addEventListener('click', () => setActive(link.dataset.nav));
    });

    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY < 120) {
          navLinks.forEach((link) => link.removeAttribute('aria-current'));
        }
      },
      { passive: true },
    );
  }
})();
