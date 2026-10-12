// =============================================
// LUNA VERDE — loader.js (shared page loader)
// =============================================

(() => {
  const MIN_SHOW = 900;  // ms — let the moon go through a phase or so
  const MAX_SHOW = 4000; // ms — never hold the page hostage to a slow image
  const start = performance.now();
  let done = false;

  function hideLoader() {
    if (done) return;
    done = true;
    const wait = Math.max(0, MIN_SHOW - (performance.now() - start));

    setTimeout(() => {
      document.body.classList.remove('is-loading');
      const loader = document.getElementById('loader');
      if (!loader) return;
      loader.classList.add('hidden');
      loader.addEventListener('transitionend', () => loader.remove(), { once: true });
    }, wait);
  }

  window.addEventListener('load', hideLoader);
  setTimeout(hideLoader, MAX_SHOW);
})();
