/* ────────────────────────────────────
   Wedding Invitation — Enhanced Script
   Anandu & Meera
──────────────────────────────────── */

/* ── AUTO INIT ── */
/* ── AUTO INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflow = 'auto';
  showUI();
  startCountdown();
  loadWishes();
  initParticles();
  initReveal();
  initParallax();
  initMagneticHover();
  initTypedName();
  initCalendar();
  initVideoModal();
});

/* ── SHOW UI ── */
function showUI() {
  setTimeout(() => {
    document.getElementById('music-ctrl').classList.add('visible');
  }, 700);
}

/* ── MUSIC ── */
let musicPlaying = false;
const audio = document.getElementById('wedding-music');
audio.volume = 0.4;

document.getElementById('music-ctrl').addEventListener('click', () => {
  if (musicPlaying) {
    audio.pause();
    musicPlaying = false;
    document.getElementById('music-icon').className = 'fas fa-music';
  } else {
    audio.play().catch(() => { });
    musicPlaying = true;
    document.getElementById('music-icon').className = 'fas fa-pause';
  }
});

/* ── TYPED HERO NAME ── */
function initTypedName() {
  // subtle letter-by-letter fade on eyebrow
  const eyebrow = document.querySelector('.hero-eyebrow');
  if (!eyebrow) return;
  const text = eyebrow.textContent;
  eyebrow.textContent = '';
  eyebrow.style.opacity = '1';
  eyebrow.style.animation = 'none';
  [...text].forEach((ch, i) => {
    const s = document.createElement('span');
    s.textContent = ch;
    s.style.cssText = `opacity:0;display:inline-block;
      animation:fadeIn 0.06s ${0.4 + i * 0.045}s forwards`;
    eyebrow.appendChild(s);
  });
}

/* ── COUNTDOWN ── */
function startCountdown() {
  const target = new Date('2026-08-30T08:40:00+05:30').getTime();
  const ids = ['cd-days', 'cd-hours', 'cd-mins', 'cd-secs'];

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) { ids.forEach(id => doc(id, '00')); return; }
    const vals = [
      Math.floor(diff / 86400000),
      Math.floor((diff % 86400000) / 3600000),
      Math.floor((diff % 3600000) / 60000),
      Math.floor((diff % 60000) / 1000)
    ];
    vals.forEach((v, i) => {
      const el = document.getElementById(ids[i]);
      const str = String(v).padStart(2, '0');
      if (el && el.textContent !== str) {
        el.textContent = str;
        // trigger flip animation restart
        el.style.animation = 'none';
        el.offsetHeight;
        el.style.animation = 'cdFlip 0.4s ease';
      }
    });
  }

  function doc(id, v) {
    const el = document.getElementById(id);
    if (el) el.textContent = v;
  }

  tick();
  setInterval(tick, 1000);
}

/* ── SCROLL EFFECTS (RAF Throttled for 60fps) ── */
let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      const sy = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;

      // progress bar
      const pBar = document.getElementById('progress-bar');
      if (pBar) pBar.style.width = (sy / Math.max(docH, 1) * 100) + '%';

      // back-to-top
      const top = document.getElementById('btn-top');
      if (top) sy > 400 ? top.classList.add('visible') : top.classList.remove('visible');

      scrollTicking = false;
    });
    scrollTicking = true;
  }
}, { passive: true });

document.getElementById('btn-top').addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

/* ── INTERSECTION OBSERVER REVEAL ── */
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 5) * 0.1 + 's';
    obs.observe(el);
  });
}

/* ── HERO PARALLAX (GPU Hardware Accelerated & RAF Throttled) ── */
function initParallax() {
  const hero = document.getElementById('hero');
  const video = document.getElementById('hero-video');
  if (!hero || !video) return;

  let ticking = false;
  function updateParallax() {
    const sy = window.scrollY;
    if (sy <= window.innerHeight) {
      video.style.transform = `translate3d(0, ${(sy * 0.35).toFixed(2)}px, 0)`;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  updateParallax();
}

/* ── MAGNETIC HOVER (Mouse/Desktop only) ── */
function initMagneticHover() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const targets = document.querySelectorAll(
    '.event-card, .venue-card, .cd-box, .family-card'
  );
  targets.forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / r.width;
      const dy = (e.clientY - r.top - r.height / 2) / r.height;
      el.style.transform = `perspective(600px)
        rotateY(${dx * 8}deg) rotateX(${-dy * 6}deg) translateZ(8px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.transition = 'transform 0.5s ease, box-shadow 0.5s';
    });
    el.addEventListener('mouseenter', () => {
      el.style.transition = 'transform 0.1s, box-shadow 0.3s';
    });
  });
}

/* ── LIGHTBOX ── */
const lbImages = [
  { src: 'https://res.cloudinary.com/ukslkqrn/image/upload/f_auto,q_auto,w_1200/v1785918014/jpeg-optimizer_SAI01532_eaehn8.jpg', alt: 'Couple moment 1' },
  { src: 'https://res.cloudinary.com/ukslkqrn/image/upload/f_auto,q_auto,w_1200/v1785918013/jpeg-optimizer_SAI01502_zqonkl.jpg', alt: 'Couple moment 2' },
  { src: 'https://res.cloudinary.com/ukslkqrn/image/upload/f_auto,q_auto,w_1200/v1785918013/jpeg-optimizer_SAI01491_pvkcfu.jpg', alt: 'Couple moment 3' },
  { src: 'https://res.cloudinary.com/ukslkqrn/image/upload/f_auto,q_auto,w_1200/v1785918013/jpeg-optimizer_SAI01442_gqqdk4.jpg', alt: 'Couple moment 4' },
  { src: 'https://res.cloudinary.com/ukslkqrn/image/upload/f_auto,q_auto,w_1200/v1785918003/jpeg-optimizer_SAI01809_xfhgtz.jpg', alt: 'Couple moment 5' },
  { src: 'https://res.cloudinary.com/ukslkqrn/image/upload/f_auto,q_auto,w_1200/v1785918003/jpeg-optimizer_SAI01771_zgj23k.jpg', alt: 'Couple moment 6' },
  { src: 'https://res.cloudinary.com/ukslkqrn/image/upload/f_auto,q_auto,w_1200/v1785918002/jpeg-optimizer_SAI01807_twqctd.jpg', alt: 'Couple moment 7' },
  { src: 'https://res.cloudinary.com/ukslkqrn/image/upload/f_auto,q_auto,w_1200/v1785918002/jpeg-optimizer_SAI01744_d52d2w.jpg', alt: 'Couple moment 8' },
  { src: 'https://res.cloudinary.com/ukslkqrn/image/upload/f_auto,q_auto,w_1200/v1785918002/jpeg-optimizer_SAI01747_d4cstg.jpg', alt: 'Couple moment 9' },
  { src: 'https://res.cloudinary.com/ukslkqrn/image/upload/f_auto,q_auto,w_1200/v1785918002/jpeg-optimizer_SAI01701_kui2sr.jpg', alt: 'Couple moment 10' },
  { src: 'https://res.cloudinary.com/ukslkqrn/image/upload/f_auto,q_auto,w_1200/v1785928295/jpeg-optimizer_SAI01646_ogp0ew.jpg', alt: 'Couple moment 11' },
  { src: 'https://res.cloudinary.com/ukslkqrn/image/upload/f_auto,q_auto,w_1200/v1785928294/jpeg-optimizer_SAI01636_o9eth3.jpg', alt: 'Couple moment 12' },
  { src: 'https://res.cloudinary.com/ukslkqrn/image/upload/f_auto,q_auto,w_1200/v1785917861/jpeg-optimizer_SAI01415_dzip9b.jpg', alt: 'Couple moment 13' },
];
let lbIndex = 0;

function openLB(i) {
  lbIndex = i;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lb-img');
  img.style.opacity = '0';
  img.src = lbImages[i].src;
  img.alt = lbImages[i].alt;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
  img.onload = () => { img.style.transition = 'opacity 0.4s'; img.style.opacity = '1'; };
}
function closeLB() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = 'auto';
}
function changeLB(dir) {
  lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
  const img = document.getElementById('lb-img');
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = lbImages[lbIndex].src;
    img.alt = lbImages[lbIndex].alt;
    img.style.opacity = '1';
  }, 200);
}
function prevLB() { changeLB(-1); }
function nextLB() { changeLB(1); }

document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('open')) return;
  if (e.key === 'ArrowLeft') prevLB();
  if (e.key === 'ArrowRight') nextLB();
  if (e.key === 'Escape') closeLB();
});
document.getElementById('lightbox').addEventListener('click', e => {
  if (e.target === document.getElementById('lightbox')) closeLB();
});

/* ── WISHES (Google Apps Script & Google Sheet Integration) ── */
const WISHES_KEY = 'am_wedding_wishes_v2';
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzsrAQDe5OBNtP8akDEifLx9Qfc3Nz2UG5iPiluA3XYm91F-Yu7bu_G7eJS9uQh-F5h/exec';
const GOOGLE_SHEET_JSON_URL = 'https://docs.google.com/spreadsheets/d/1HmF-tUlMWh0cTu5oqI10N0jPT5FuPw2cnJChlY-qYzE/gviz/tq?tqx=out:json';

let currentWishes = [];

async function loadWishes() {
  const list = document.getElementById('wishes-list');
  
  // 1. Immediately render local cached blessings (0ms visual load time)
  currentWishes = JSON.parse(localStorage.getItem(WISHES_KEY) || '[]');
  if (currentWishes.length > 0) {
    renderWishes(currentWishes);
  } else if (list) {
    list.innerHTML = '<div style="text-align:center;padding:2rem;font-family:Outfit,sans-serif;color:var(--text-mid);opacity:0.8;"><i class="fas fa-spinner fa-spin"></i> Loading blessings...</div>';
  }

  // 2. Fetch latest blessings from Google Sheet in background
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

        return {
          name: val0 || 'Anonymous',
          text: val1 || val2 || '',
          time: val3 || val2 || val1 || new Date().toLocaleDateString('en-IN')
        };
      }).filter(w => w.text.trim() && w.name !== 'Name' && w.text !== 'Blessing' && w.text !== 'Message').reverse();
    }

    // Merge local unsynced wishes on top for instant feedback
    const localWishes = JSON.parse(localStorage.getItem(WISHES_KEY) || '[]');
    const unsynced = localWishes.filter(lw =>
      !sheetWishes.some(sw => sw.name === lw.name && sw.text === lw.text)
    );
    currentWishes = [...unsynced, ...sheetWishes];
    renderWishes(currentWishes);
  } catch (err) {
    console.warn('Google Sheet fetch failed, displaying local blessings:', err);
    if (!currentWishes.length) {
      currentWishes = JSON.parse(localStorage.getItem(WISHES_KEY) || '[]');
      renderWishes(currentWishes);
    }
  }
}

async function submitWish() {
  const nameInput = document.getElementById('wish-name');
  const textInput = document.getElementById('wish-text');
  const name = nameInput.value.trim();
  const text = textInput.value.trim();

  if (!name || !text) { shake(document.querySelector('.wish-form')); return; }

  const submitBtn = document.querySelector('.submit-btn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>&nbsp; Sending…';

  const date = new Date().toLocaleDateString('en-IN');
  const newWish = { name, text, time: date };

  // 1. Save to local state & localStorage for instant display
  currentWishes.unshift(newWish);
  const local = JSON.parse(localStorage.getItem(WISHES_KEY) || '[]');
  local.unshift(newWish);
  localStorage.setItem(WISHES_KEY, JSON.stringify(local));
  renderWishes(currentWishes);

  // 2. Post to Google Apps Script to save row in Google Sheet
  if (GOOGLE_SCRIPT_URL) {
    try {
      const payload = JSON.stringify({
        name: name,
        message: text,
        text: text,
        time: date
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
  submitBtn.disabled = false;
  submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>&nbsp; Send Blessings';

  confettiBurst();
  showToast('💌 Your blessings have been sent!');
}



function renderWishes(wishes) {
  const list = document.getElementById('wishes-list');
  if (!list) return;
  if (!wishes.length) {
    list.innerHTML = '<p style="text-align:center;font-family:Outfit,sans-serif;color:var(--text-mid);opacity:0.6;margin-top:2rem;">Be the first to leave a blessing! 🙏</p>';
    return;
  }
  list.innerHTML = wishes.map((w, i) => `
    <div class="wish-card" style="animation-delay:${i * 0.08}s">
      <p class="wish-from">💌 ${esc(w.name)}
        <span style="font-size:0.7rem;opacity:0.4;font-family:Outfit,sans-serif"> ${w.time}</span>
      </p>
      <p class="wish-text">${esc(w.text)}</p>
    </div>
  `).join('');
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-container';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

function shake(el) {
  if (!el) return;
  el.style.animation = 'none';
  el.offsetHeight;
  el.style.animation = 'shake 0.4s ease';
  setTimeout(() => el.style.animation = '', 500);
}

/* ── CONFETTI ── */
function confettiBurst() {
  const colors = ['#ECE8D9', '#FAF6E9', '#D8D2C0', '#FFFDF6', '#C8C4B4', '#B0AA98'];
  for (let i = 0; i < 70; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 9 + 4;
    p.style.cssText = `
      position:fixed; left:${Math.random() * 100}vw; top:-${size}px;
      width:${size}px; height:${size}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      border-radius:${Math.random() > .5 ? '50%' : '3px'};
      z-index:9999; pointer-events:none;
      animation:confettiFall ${1.5 + Math.random() * 2}s linear ${Math.random() * 0.5}s forwards;
    `;
    document.body.appendChild(p);
    p.addEventListener('animationend', () => p.remove());
  }
}

/* ── PARTICLES ── */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];

  function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const COLS = ['rgba(73,73,73,', 'rgba(180,174,160,', 'rgba(210,207,195,'];

  class Dot {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.8 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = (Math.random() - 0.5) * 0.25;
      this.a = Math.random() * 0.35 + 0.08;
      this.c = COLS[Math.floor(Math.random() * COLS.length)];
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.c + this.a + ')';
      ctx.fill();
    }
  }

  const count = W < 768 ? 40 : 65;
  for (let i = 0; i < count; i++) pts.push(new Dot());

  function connect() {
    const maxDist = 75;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < maxDist) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(73,73,73,${0.04 * (1 - d / maxDist)})`;
          ctx.lineWidth = 0.4;
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }
  }

  (function animate() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => { p.update(); p.draw(); });
    connect();
    requestAnimationFrame(animate);
  })();
}

/* ── INJECT KEYFRAMES ── */
const styleTag = document.createElement('style');
styleTag.textContent = `
@keyframes confettiFall {
  from { transform: translateY(0) rotate(0deg);   opacity: 1; }
  to   { transform: translateY(110vh) rotate(720deg); opacity: 0; }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes shake {
  0%,100% { transform: translateX(0); }
  25%      { transform: translateX(-8px); }
  75%      { transform: translateX(8px); }
}
`;
document.head.appendChild(styleTag);

/* ── INITIAL REVEAL CHECK ── */
window.addEventListener('load', () => {
  document.querySelectorAll('.reveal').forEach(el => {
    if (el.getBoundingClientRect().top < innerHeight - 60)
      el.classList.add('in');
  });
});

/* ── CALENDAR INTEGRATION ── */
function initCalendar() {
  const btn = document.getElementById('calendar-btn');
  const dropdown = document.getElementById('calendar-dropdown');
  const googleBtn = document.getElementById('cal-google');
  const icsBtn = document.getElementById('cal-ics');

  if (!btn || !dropdown) return;

  // Toggle Dropdown
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('show');
  });

  // Close dropdown on click outside
  document.addEventListener('click', () => {
    dropdown.classList.remove('show');
  });

  // Event Details
  const title = "Anandu & Meera's Wedding";
  const desc = "You are invited to celebrate the union of Anandu & Meera.\n\nMuhurtham: 8:40 AM – 9:20 AM at Airapuram Bhagavathy Temple Auditorium, Airapuram.\n\nEvening Reception: 6:00 PM onwards at Rotary Club, Iringole, Perumbavoor.";
  const loc = "Airapuram Bhagavathy Temple Auditorium, Airapuram, Ernakulam, Kerala";
  const start = "20260830T031000Z";
  const end = "20260830T163000Z";

  // Google Calendar Link
  if (googleBtn) {
    googleBtn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(desc)}&location=${encodeURIComponent(loc)}`;
  }

  // ICS Link (Apple / Outlook / Yahoo / general desktop)
  if (icsBtn) {
    icsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      downloadICS();
    });
  }

  function downloadICS() {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Varanam Invites//Anandu Meera Wedding//EN",
      "BEGIN:VEVENT",
      "UID:anandu-meera-wedding-2026",
      "DTSTAMP:" + new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z",
      "DTSTART:" + start,
      "DTEND:" + end,
      "SUMMARY:" + title,
      "DESCRIPTION:" + desc.replace(/\n/g, "\\n"),
      "LOCATION:" + loc,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "Anandu_Meera_Wedding.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    dropdown.classList.remove('show');
  }
}

/* ── VIDEO MODAL ── */
let wasMusicPlayingBeforeVideo = false;

function initVideoModal() {
  const modal = document.getElementById('video-modal');
  if (!modal) return;

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeVideoModal();
    }
  });
}

function openVideoModal(src) {
  const modal = document.getElementById('video-modal');
  const player = document.getElementById('modal-video-player');
  if (!modal || !player) return;

  // Pause ambient music if playing
  if (musicPlaying) {
    wasMusicPlayingBeforeVideo = true;
    audio.pause();
    musicPlaying = false;
    document.getElementById('music-icon').className = 'fas fa-music';
  } else {
    wasMusicPlayingBeforeVideo = false;
  }

  // Set source & play
  const source = player.querySelector('source');
  if (source) {
    source.src = src;
    player.load();
    player.play().catch((err) => console.log("Video autoplay failed: ", err));
  }

  modal.style.display = 'flex';
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

function closeVideoModal() {
  const modal = document.getElementById('video-modal');
  const player = document.getElementById('modal-video-player');
  if (!modal || !player) return;

  player.pause();
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
    const source = player.querySelector('source');
    if (source) source.src = ""; // stop loading
  }, 400);

  // Resume music if it was playing previously
  if (wasMusicPlayingBeforeVideo) {
    audio.play().catch(() => { });
    musicPlaying = true;
    document.getElementById('music-icon').className = 'fas fa-pause';
  }
}

