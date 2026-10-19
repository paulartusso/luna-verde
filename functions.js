//functions.js (improved)

const FALLBACK_IMG = './assets/logo.png'; // shown if a room photo 404s

// --- Mobile menu toggle ---
function openMenu() {
  const menu = document.getElementById('myLinks');
  const btn = document.querySelector('.topnav a.icon');
  const isOpen = menu.classList.toggle('open');
  if (btn) btn.setAttribute('aria-expanded', String(isOpen));
}

document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('myLinks');
  const links = menu.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      const btn = document.querySelector('.topnav a.icon');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  });
});

// --- Social icon flip animation ---
document.querySelectorAll('.flipping-icon').forEach(icon => {
  icon.addEventListener('click', () => {
    icon.classList.add('flip');
    icon.addEventListener('animationend', () => icon.classList.remove('flip'), { once: true });
  });
});

// --- Global image fallback for the whole page ---
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      if (img.src !== new URL(FALLBACK_IMG, location.href).href) {
        img.src = FALLBACK_IMG;
      }
    }, { once: true });
  });
});
// --- Product photos with several images cross-fade on their own ---
document.querySelectorAll('[data-rotate]').forEach(frame => {
  const imgs = frame.querySelectorAll('img');
  if (imgs.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let current = 0;
  setInterval(() => {
    imgs[current].classList.remove('active');
    current = (current + 1) % imgs.length;
    imgs[current].classList.add('active');
  }, 3500);
});
