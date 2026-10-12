// =============================================
// LUNA VERDE — room.js (room detail page)
// =============================================

const FALLBACK_IMG = './assets/logo.png'; // shown if a room photo 404s

document.addEventListener('DOMContentLoaded', () => {
  const roomName = new URLSearchParams(location.search).get('room');
  const room = rooms.find(r => r.name === roomName);

  // Unknown or missing room → back to the rooms list
  if (!room) {
    location.replace('index.html#experiences');
    return;
  }

  document.title = `${room.title} — Luna Verde Ecohabitat`;
  document.getElementById('room-title').textContent = room.title;
  document.getElementById('room-tagline').textContent = room.tagline;
  document.getElementById('room-description').textContent = room.description;

  const waText = `Hola! Quisiera información sobre ${room.title}.`;
  document.getElementById('room-cta').href = `https://wa.me/+573003480931?text=${encodeURIComponent(waText)}`;

  // --- Gallery ---
  const mainImg = document.getElementById('main-img');
  const thumbs = document.getElementById('thumbs');
  const count = document.getElementById('photo-count');
  const prevBtn = document.querySelector('.nav-btn.prev');
  const nextBtn = document.querySelector('.nav-btn.next');
  let current = 0;

  const withFallback = img => {
    img.addEventListener('error', () => {
      if (img.src !== new URL(FALLBACK_IMG, location.href).href) {
        img.src = FALLBACK_IMG;
        img.classList.add('img-error');
      }
    });
  };
  withFallback(mainImg);

  const thumbEls = room.imgs.map((src, i) => {
    const btn = document.createElement('button');
    btn.className = 'thumb';
    btn.setAttribute('aria-label', `Ver foto ${i + 1}`);
    const img = new Image();
    img.src = src;
    img.alt = '';
    img.loading = 'lazy';
    withFallback(img);
    btn.appendChild(img);
    btn.addEventListener('click', () => show(i));
    thumbs.appendChild(btn);
    return btn;
  });

  // Fade the photo out, swap it, fade back in once the new one has loaded
  mainImg.addEventListener('load', () => mainImg.classList.remove('is-changing'));

  function show(i, instant = false) {
    const next = (i + room.imgs.length) % room.imgs.length;
    if (next === current && !instant) return;
    current = next;

    const swap = () => {
      mainImg.classList.remove('img-error');
      mainImg.src = room.imgs[current];
      mainImg.alt = `${room.title} — foto ${current + 1}`;
    };
    if (instant) {
      swap();
    } else {
      mainImg.classList.add('is-changing');
      setTimeout(swap, 200);
    }

    count.textContent = `${current + 1} / ${room.imgs.length}`;
    thumbEls.forEach((t, j) => t.classList.toggle('active', j === current));
  }

  prevBtn.addEventListener('click', () => show(current - 1));
  nextBtn.addEventListener('click', () => show(current + 1));
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  // Swipe on touch devices
  let touchX = null;
  mainImg.parentElement.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  mainImg.parentElement.addEventListener('touchend', e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  // Hide controls when there is only one photo
  if (room.imgs.length < 2) {
    document.querySelector('.room-gallery').classList.add('single');
  }

  show(0, true);
});
