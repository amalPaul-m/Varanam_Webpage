/* ──────────────────────────────────────────────────────────
   NEVIN & AKHILA WEDDING INVITE INTERACTIVE SCRIPT
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
  initSmoothScroll();
});

/* ──────────────────────────────────────────────────────────
   SMOOTH SCROLLING (Lenis)
────────────────────────────────────────────────────────── */
function initSmoothScroll() {
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

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
  const targetDate = new Date('2026-08-17T06:00:00+05:30').getTime();

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
  'https://res.cloudinary.com/ukslkqrn/image/upload/v1786111519/jpeg-optimizer_SaveClip.App_769324524_18112359322964304_6511606044836113733_n_zysv7s.jpg',
  'https://res.cloudinary.com/ukslkqrn/image/upload/v1786111517/jpeg-optimizer_SaveClip.App_767691800_18112360168964304_4750986170777124775_n_skv0a9.jpg',
  'https://res.cloudinary.com/ukslkqrn/image/upload/v1786111517/jpeg-optimizer_this_chapter_of_my_life_is_called_Happiness_...._wedding_photography_couplegoals_love_prew_2_sif5zy.jpg',
  'https://res.cloudinary.com/ukslkqrn/image/upload/v1786111517/jpeg-optimizer_SaveClip.App_767772291_18112360156964304_1124988338005410701_n_jayxhl.jpg',
  'https://res.cloudinary.com/ukslkqrn/image/upload/v1786111515/jpeg-optimizer_SaveClip.App_767223605_18112359313964304_8106741024530621039_n_nxn9xa.jpg',
  'https://res.cloudinary.com/ukslkqrn/image/upload/v1786111513/jpeg-optimizer_SaveClip.App_764881510_18112360147964304_6998368901861530816_n_yvn5ux.jpg',
  'https://res.cloudinary.com/ukslkqrn/image/upload/v1786111512/jpeg-optimizer_SaveClip.App_765603143_18112359259964304_3594442750063705699_n_zxcgor.jpg',
  'https://res.cloudinary.com/ukslkqrn/image/upload/v1786296703/jpeg-optimizer_WhatsApp_Image_2026-08-09_at_17.55.33_fj1jsc.jpg',
  'https://res.cloudinary.com/ukslkqrn/image/upload/v1786296703/jpeg-optimizer_WhatsApp_Image_2026-08-09_at_17.55.35_ky6cfh.jpg',
  'https://res.cloudinary.com/ukslkqrn/image/upload/v1786296701/jpeg-optimizer_WhatsApp_Image_2026-08-09_at_17.55.28_1_jaim70.jpg'
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
   RSVP & WISHES BOARD (Google Sheets Integration)
────────────────────────────────────────────────────────── */
const BLESSINGS_STORAGE_KEY = 'nevin_akhila_wedding_wishes_v2';
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz0SfB7uozPKiZGCdqsWDiB4cxIk68VTxNn67NJIInSIwX3tP8P06P57vYT6gIuAzI/exec';
const GOOGLE_SHEET_JSON_URL = 'https://docs.google.com/spreadsheets/d/1h54vz2flEwqdpO14puxh7HR2seiXu2xJ8coG9GLvExM/gviz/tq?tqx=out:json';

let currentWishes = [];

function initBlessingsBoard() {
  loadWishes();
}

async function loadWishes() {
  const board = document.getElementById('wishes-board');

  // 1. Immediately render local cached blessings
  currentWishes = JSON.parse(localStorage.getItem(BLESSINGS_STORAGE_KEY) || '[]');
  if (currentWishes.length > 0) {
    renderWishesHTML(currentWishes);
  } else if (board) {
    board.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--text-muted);"><i class="fas fa-spinner fa-spin"></i> Loading blessings...</div>';
  }

  // 2. Fetch from Google Sheet
  try {
    const res = await fetch(GOOGLE_SHEET_JSON_URL + '&_t=' + Date.now());
    const raw = await res.text();
    const jsonStr = raw.substring(raw.indexOf('{'), raw.lastIndexOf('}') + 1);
    const data = JSON.parse(jsonStr);
    const rows = (data.table && data.table.rows) ? data.table.rows : [];

    let sheetWishes = [];
    if (rows.length > 0) {
      sheetWishes = rows.map(r => {
        const val0 = (r.c[0] && r.c[0].v) ? String(r.c[0].v) : '';
        const val1 = (r.c[1] && r.c[1].v) ? String(r.c[1].v) : '';
        const val2 = (r.c[2] && r.c[2].v) ? String(r.c[2].v) : '';
        const val3 = (r.c[3] && (r.c[3].f || r.c[3].v)) ? String(r.c[3].f || r.c[3].v) : '';

        let timeRaw = val3 || val2 || val1 || '';
        let timeFormatted = timeRaw;
        if (timeRaw) {
          let d = new Date(timeRaw);
          if (!isNaN(d.getTime())) {
            timeFormatted = d.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
          }
        } else {
          timeFormatted = new Date().toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
        }

        return {
          name: val0 || 'Anonymous',
          message: val1 || val2 || '',
          date: timeFormatted
        };
      }).filter(w => w.message.trim() && w.name !== 'Name' && w.message !== 'Blessing' && w.message !== 'Message').reverse();
    }

    // Merge
    const localWishes = JSON.parse(localStorage.getItem(BLESSINGS_STORAGE_KEY) || '[]');
    const unsynced = localWishes.filter(lw =>
      !sheetWishes.some(sw => sw.name === lw.name && sw.message === lw.message)
    );
    currentWishes = [...unsynced, ...sheetWishes];
    renderWishesHTML(currentWishes);
  } catch (err) {
    console.warn('Google Sheet fetch failed, displaying local blessings:', err);
    if (!currentWishes.length) {
      const defaultWishes = [
        { name: 'Raju & Deepa', message: 'Congratulations Nevin & Akhila! Wishing you both a lifetime of happiness, love, and togetherness.', date: '15/07/2026' }
      ];
      currentWishes = defaultWishes;
      renderWishesHTML(currentWishes);
    }
  }
}

async function submitBlessing() {
  const nameInput = document.getElementById('wish-name');
  const textInput = document.getElementById('wish-text');

  const name = nameInput.value.trim();
  const message = textInput.value.trim();

  if (!name || !message) {
    showToast('Please fill out both your name and blessings message!', 'error');
    return;
  }

  const submitBtn = document.querySelector('.blessings-form .pill-btn-solid');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  }

  const dateObj = new Date();
  const dateStr = dateObj.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });

  const newBlessing = { name, message, date: dateStr };

  currentWishes.unshift(newBlessing);
  const local = JSON.parse(localStorage.getItem(BLESSINGS_STORAGE_KEY) || '[]');
  local.unshift(newBlessing);
  localStorage.setItem(BLESSINGS_STORAGE_KEY, JSON.stringify(local));

  renderWishesHTML(currentWishes);

  // Post to Google Sheet
  if (GOOGLE_SCRIPT_URL) {
    try {
      const payload = JSON.stringify({
        name: name,
        message: message,
        text: message, // for compatibility
        time: dateStr
      });

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: payload
      });
    } catch (err) {
      console.warn('Google Sheet POST error:', err);
    }
  }

  nameInput.value = '';
  textInput.value = '';

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Send Blessings';
  }

  fireConfetti();
  showToast('Your blessings have been sent!');
}

function showToast(message, type = 'success') {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-container';
    document.body.appendChild(toast);
  }
  
  if (type === 'error') {
    toast.innerHTML = `<i class="fas fa-exclamation-circle" style="color: #e74c3c; margin-right: 8px;"></i> ${message}`;
  } else {
    toast.innerHTML = `<i class="fas fa-check-circle" style="color: var(--accent-olive); margin-right: 8px;"></i> ${message}`;
  }
  toast.classList.add('show');
  
  // Clear any existing timeout if user clicks multiple times
  if (toast.hideTimeout) clearTimeout(toast.hideTimeout);
  
  toast.hideTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

function renderWishesHTML(wishes) {
  const board = document.getElementById('wishes-board');
  if (!board) return;

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
    if (isPlaying) return;
    audio.play().then(() => {
      icon.className = 'fas fa-pause';
      ctrlBtn.title = 'Pause Music';
      isPlaying = true;
      removeListeners();
    }).catch(() => {
      // Autoplay blocked by browser policy — will start on first user interaction
    });
  };

  const removeListeners = () => {
    document.removeEventListener('click', tryAutoplay);
    document.removeEventListener('scroll', tryAutoplay);
    document.removeEventListener('touchstart', tryAutoplay);
    document.removeEventListener('pointerdown', tryAutoplay);
    document.removeEventListener('keydown', tryAutoplay);
  };
  
  // Try playing immediately on load
  tryAutoplay();
  window.addEventListener('load', tryAutoplay);
  
  // Fallback: start music on very first user interaction
  document.addEventListener('click', tryAutoplay, { once: true });
  document.addEventListener('scroll', tryAutoplay, { once: true });
  document.addEventListener('touchstart', tryAutoplay, { once: true });
  document.addEventListener('pointerdown', tryAutoplay, { once: true });
  document.addEventListener('keydown', tryAutoplay, { once: true });
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
  const title = "Nevin & Akhila's Wedding Ceremony";
  const details = "Wedding Ceremony & Luncheon. You are cordially invited to celebrate with us.";
  const location = "St. Sebastian's Church, Kuttipuzha";
  const start = "20260817T003000Z";
  const end = "20260817T103000Z";
  
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;

    window.open(googleCalendarUrl, '_blank');
  }
  window.addToCalendar = addToCalendar;

  function addAppleCalendar() {
    const title = "Nevin & Akhila's Wedding Ceremony";
    const details = "Wedding Ceremony & Luncheon. You are cordially invited to celebrate with us.";
    const location = "St. Sebastian's Church, Kuttipuzha";
    const start = "20260817T003000Z";
    const end = "20260817T103000Z";

    const icsMSG = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Nevin and Akhila Wedding//EN\nBEGIN:VEVENT\nUID:${new Date().getTime()}@nevinandakhila.com\nDTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}\nDTSTART:${start}\nDTEND:${end}\nSUMMARY:${title}\nDESCRIPTION:${details}\nLOCATION:${location}\nEND:VEVENT\nEND:VCALENDAR`;

    const blob = new Blob([icsMSG], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'nevin_akhila_wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
  window.addAppleCalendar = addAppleCalendar;

  /* ──────────────────────────────────────────────────────────
     CALENDAR DROPDOWN TOGGLE
  ────────────────────────────────────────────────────────── */
  function toggleDropdown(e) {
    if (e) e.stopPropagation();
    const dropdownWrap = document.getElementById('calendarDropdownWrap');
    if (dropdownWrap) {
      dropdownWrap.classList.toggle('open');
    }
  }
  window.toggleDropdown = toggleDropdown;

  document.addEventListener('click', (e) => {
    const dropdownWrap = document.getElementById('calendarDropdownWrap');
    if (dropdownWrap && dropdownWrap.classList.contains('open')) {
      if (!dropdownWrap.contains(e.target)) {
        dropdownWrap.classList.remove('open');
      }
    }
  });

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
