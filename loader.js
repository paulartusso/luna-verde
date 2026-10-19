(() => {
  const MIN_SHOW = 900;  // ms — let the logo pulse at least once
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
      growFunghiOnView();
    }, wait);
  }

  // Mushrooms grow once they're actually visible (after the loader is gone)
  function growFunghiOnView() {
    const funghi = document.querySelectorAll('.funghi');
    if (!('IntersectionObserver' in window)) {
      funghi.forEach(f => f.classList.add('grow-in'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('grow-in');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    funghi.forEach(f => observer.observe(f));
  }

  window.addEventListener('load', hideLoader);
  setTimeout(hideLoader, MAX_SHOW);
})();
