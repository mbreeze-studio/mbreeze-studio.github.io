(() => {
  const nav = document.querySelector('.site-nav');
  const toggle = nav?.querySelector('.nav-toggle');
  const links = nav?.querySelector('.nav-links');
  if (!nav || !toggle || !links) return;

  const label = toggle.querySelector('.nav-toggle-label');
  const mobile = window.matchMedia('(max-width: 800px)');

  const setOpen = (open, restoreFocus = false) => {
    const expanded = open && mobile.matches;
    toggle.setAttribute('aria-expanded', String(expanded));
    nav.classList.toggle('is-open', expanded);
    label.textContent = expanded ? 'Close' : 'Menu';
    if (restoreFocus) toggle.focus();
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  links.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false, true);
    }
  });

  document.addEventListener('pointerdown', (event) => {
    if (!nav.contains(event.target)) setOpen(false);
  });

  nav.addEventListener('focusout', () => {
    requestAnimationFrame(() => {
      if (!nav.contains(document.activeElement)) setOpen(false);
    });
  });

  mobile.addEventListener('change', () => setOpen(false));
  window.addEventListener('pageshow', (event) => {
    // Reset after back/forward cache restoration, not when slow images finish loading.
    if (event.persisted) setOpen(false);
  });

  // Keep all navigation links usable if JavaScript is unavailable.
  nav.setAttribute('data-nav-enhanced', '');
  toggle.hidden = false;
})();
