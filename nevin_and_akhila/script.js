/* ──────────────────────────────────────────────────────────
   NEVIN & LAYA WEDDING INVITE INTERACTIVE SCRIPT
────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  initRevealOnScroll();
  initNavigationDrawer();
  initHeroCarousel();
  initCountdownTimer();
  initLightbox();
  initBlessingsBoard();
  initMusicPlayer();
  initGiftQRCode();
  initBackToTop();
  initFloatingFlowers();
});

/* ──────────────────────────────────────────────────────────
   REVEAL ON SCROLL
────────────────────────────────────────────────────────── */
function initRevealOnScroll() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });
    
    revealElements.forEach((el, index) => {
      el.style.transitionDelay = `${(index % 3) * 0.08}s`;
      observer.observe(el);
    });
  } else {
    revealElements.forEach(el => el.classList.add('in'));
  }
}

/* ──────────────────────────────────────────────────────────
   NAVIGATION DRAWER
────────────────────────────────────────────────────────── */
function initNavigationDrawer() {
  const menuBtns = document.querySelectorAll('.menu-toggle');
  const drawer = document.getElementById('side-drawer');
  const closeBtn = document.querySelector('.drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-links a');
  
  if (!drawer || !closeBtn) return;
  
  const openDrawer = () => drawer.classList.add('open');
  const closeDrawer = () => drawer.classList.remove('open');
  
  menuBtns.forEach(btn => {
    btn.addEventListener('click', openDrawer);
  });
  
  closeBtn.addEventListener('click', closeDrawer);
  
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
  
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && 
        !drawer.contains(e.target) && 
        !Array.from(menuBtns).some(btn => btn.contains(e.target))) {
      closeDrawer();
    }
  });

  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > window.innerHeight - 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }, { passive: true });
}

/* ──────────────────────────────────────────────────────────
   HERO IMAGE CAROUSEL (Seamless Smooth Fade In & Out)
────────────────────────────────────────────────────────── */
function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length <= 1) return;

  let currentIndex = 0;
  let timer = null;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
    currentIndex = index;
  }

  function nextSlide() {
    let next = (currentIndex + 1) % slides.length;
    showSlide(next);
  }

  function startAutoPlay() {
    stopAutoPlay();
    timer = setInterval(nextSlide, 4500);
  }

  function stopAutoPlay() {
    if (timer) clearInterval(timer);
  }

  showSlide(0);
  startAutoPlay();
}

/* ──────────────────────────────────────────────────────────
   COUNTDOWN TIMER
────────────────────────────────────────────────────────── */
function initCountdownTimer() {
  const targetDate = new Date('2026-12-26T10:15:00+05:30').getTime();
  
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');
  
  function updateTimer() {
    const now = Date.now();
    const difference = targetDate - now;
    
    if (difference <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl) minsEl.textContent = '00';
      if (secsEl) secsEl.textContent = '00';
      return;
    }
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((difference % (1000 * 60)) / 1000);
    
    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
  }
  
  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ──────────────────────────────────────────────────────────
   PHOTO LIGHTBOX
────────────────────────────────────────────────────────── */
const galleryImages = [
  'assets/images/_ (2).jpeg',
  'assets/images/_ (3).jpeg',
  'assets/images/_ (4).jpeg',
  'assets/images/_ (5).jpeg',
  'assets/images/_ (6).jpeg'
];
let currentImageIndex = 0;

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'ArrowRight') changeLightbox(1);
    if (e.key === 'ArrowLeft') changeLightbox(-1);
    if (e.key === 'Escape') closeLightbox();
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  
  currentImageIndex = index;
  lbImg.style.opacity = '0';
  lbImg.src = galleryImages[currentImageIndex];
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
  
  lbImg.onload = () => {
    lbImg.style.transition = 'opacity 0.3s ease';
    lbImg.style.opacity = '1';
  };
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('open');
  document.body.style.overflow = 'auto';
}

function changeLightbox(direction) {
  const lbImg = document.getElementById('lb-img');
  currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
  
  lbImg.style.opacity = '0';
  setTimeout(() => {
    lbImg.src = galleryImages[currentImageIndex];
  }, 200);
}

window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.changeLightbox = changeLightbox;


/* ──────────────────────────────────────────────────────────
   RSVP & WISHES BOARD (Local Storage)
────────────────────────────────────────────────────────── */
const BLESSINGS_STORAGE_KEY = 'nevin_laya_wedding_wishes';

function initBlessingsBoard() {
  renderBlessings();
}

function renderBlessings() {
  const board = document.getElementById('wishes-board');
  if (!board) return;
  
  const wishes = getStoredBlessings();
  
  if (wishes.length === 0) {
    board.innerHTML = `
      <div class="wish-card" style="text-align: center; border-left: none; color: var(--text-muted);">
        <p class="wish-body" style="font-style: italic;">No blessings sent yet. Be the first to bless the couple!</p>
      </div>
    `;
    return;
  }
  
  board.innerHTML = wishes.map(wish => `
    <div class="wish-card">
      <div class="wish-meta">
        <span class="wish-sender">&#128140; ${escapeHTML(wish.name)}</span>
        <span class="wish-time">${wish.date}</span>
      </div>
      <p class="wish-body">${escapeHTML(wish.message)}</p>
    </div>
  `).join('');
}

function getStoredBlessings() {
  const localWishes = localStorage.getItem(BLESSINGS_STORAGE_KEY);
  if (!localWishes) {
    const defaultWishes = [
      { name: 'Raju & Deepa', message: 'Congratulations Nevin & Laya! Wishing you both a lifetime of happiness, love, and togetherness.', date: '15/07/2026' },
      { name: 'Dr. Suresh Kumar', message: 'May your union be blessed with peace and joy. Very happy for you both!', date: '14/07/2026' }
    ];
    localStorage.setItem(BLESSINGS_STORAGE_KEY, JSON.stringify(defaultWishes));
    return defaultWishes;
  }
  return JSON.parse(localWishes);
}

function submitBlessing() {
  const nameInput = document.getElementById('wish-name');
  const textInput = document.getElementById('wish-text');
  
  const name = nameInput.value.trim();
  const message = textInput.value.trim();
  
  if (!name || !message) {
    alert('Please fill out both your name and blessings message!');
    return;
  }
  
  const dateObj = new Date();
  const dateStr = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;
  
  const newBlessing = { name, message, date: dateStr };
  
  const currentWishes = getStoredBlessings();
  currentWishes.unshift(newBlessing);
  localStorage.setItem(BLESSINGS_STORAGE_KEY, JSON.stringify(currentWishes));
  
  nameInput.value = '';
  textInput.value = '';
  
  renderBlessings();
  fireConfetti();
}

window.submitBlessing = submitBlessing;

function escapeHTML(str) {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}

/* ──────────────────────────────────────────────────────────
   CONFETTI BURST ANIMATION
────────────────────────────────────────────────────────── */
function fireConfetti() {
  const colors = ['#2F3E30', '#5D6C5E', '#D0C5B4', '#FAF9F6', '#1E2A1E'];
  const confettiCount = 80;
  
  for (let i = 0; i < confettiCount; i++) {
    const el = document.createElement('div');
    const size = Math.random() * 8 + 4;
    const duration = Math.random() * 2 + 1.5;
    
    el.style.cssText = `
      position: fixed;
      left: ${Math.random() * 100}vw;
      top: -10px;
      width: ${size}px;
      height: ${size}px;
      background-color: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      z-index: 1000;
      pointer-events: none;
      transform: rotate(${Math.random() * 360}deg);
      animation: fallAnimation ${duration}s linear forwards;
    `;
    
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

const styleTag = document.createElement('style');
styleTag.textContent = `
@keyframes fallAnimation {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
}
`;
document.head.appendChild(styleTag);


/* ──────────────────────────────────────────────────────────
   MUSIC PLAYER
────────────────────────────────────────────────────────── */
function initMusicPlayer() {
  const audio = document.getElementById('wedding-music');
  const ctrlBtn = document.getElementById('music-ctrl');
  const icon = document.getElementById('music-icon');
  
  if (!audio || !ctrlBtn) return;
  
  audio.volume = 0.25;
  let isPlaying = false;
  
  ctrlBtn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      icon.className = 'fas fa-music';
      ctrlBtn.title = 'Play Music';
      isPlaying = false;
    } else {
      audio.play().then(() => {
        icon.className = 'fas fa-pause';
        ctrlBtn.title = 'Pause Music';
        isPlaying = true;
      }).catch(err => {
        console.warn('Audio play prevented by browser policy: ', err);
      });
    }
  });
  
  const tryAutoplay = () => {
    if (!isPlaying) {
      audio.play().then(() => {
        icon.className = 'fas fa-pause';
        ctrlBtn.title = 'Pause Music';
        isPlaying = true;
      }).catch(() => {});
      
      document.removeEventListener('click', tryAutoplay);
      document.removeEventListener('scroll', tryAutoplay);
    }
  };
  
  document.addEventListener('click', tryAutoplay);
  document.addEventListener('scroll', tryAutoplay);
}

/* ──────────────────────────────────────────────────────────
   UPI QR CODE TOGGLE
────────────────────────────────────────────────────────── */
function initGiftQRCode() {
  const showBtn = document.getElementById('show-qr-btn');
  const qrContainer = document.getElementById('qr-container');
  
  if (!showBtn || !qrContainer) return;
  
  showBtn.addEventListener('click', () => {
    if (qrContainer.classList.contains('show')) {
      qrContainer.classList.remove('show');
      showBtn.textContent = 'Show UPI QR';
    } else {
      qrContainer.classList.add('show');
      showBtn.textContent = 'Hide UPI QR';
      setTimeout(() => {
        qrContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  });
}

/* ──────────────────────────────────────────────────────────
   BACK TO TOP BUTTON
────────────────────────────────────────────────────────── */
function initBackToTop() {
  const btnTop = document.getElementById('btn-top');
  if (!btnTop) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btnTop.classList.add('visible');
    } else {
      btnTop.classList.remove('visible');
    }
  }, { passive: true });
  
  btnTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ──────────────────────────────────────────────────────────
   ADD TO CALENDAR
────────────────────────────────────────────────────────── */
function addToCalendar() {
  const title = "Nevin & Laya's Wedding Ceremony";
  const details = "Holy Matrimony & Nuptial Mass. You are cordially invited to celebrate with us.";
  const location = "Lourdes Metropolitan Cathedral, East Fort, Thrissur, Kerala";
  const start = "20261226T043000Z";
  const end = "20261226T093000Z";
  
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
  
  window.open(googleCalendarUrl, '_blank');
}
window.addToCalendar = addToCalendar;

/* ──────────────────────────────────────────────────────────
   DYNAMIC FLOATING BACKGROUND FLOWERS (Colored)
────────────────────────────────────────────────────────── */
function initFloatingFlowers() {
  const container = document.getElementById('flowers-container');
  if (!container) return;
  
  const maxFlowers = 6;
  const flowerEmojis = ['🌸', '🌼'];

  function spawnFlower(initial = false) {
    const flower = document.createElement('div');
    flower.className = 'floating-flower';
    flower.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    
    const size = Math.random() * 10 + 14;
    flower.style.fontSize = `${size}px`;
    flower.style.left = `${Math.random() * 100}vw`;
    
    if (initial) {
      flower.style.top = `${Math.random() * 100}vh`;
    } else {
      flower.style.top = `-40px`;
    }
    
    const duration = Math.random() * 30 + 25;
    const delay = Math.random() * -30;
    const swayDuration = Math.random() * 5 + 4;
    
    flower.style.animation = `
      flowerFall ${duration}s linear infinite, 
      flowerSway ${swayDuration}s ease-in-out infinite alternate
    `;
    flower.style.animationDelay = `${delay}s, 0s`;
    
    container.appendChild(flower);
  }

  for (let i = 0; i < maxFlowers; i++) {
    spawnFlower(true);
  }
}
