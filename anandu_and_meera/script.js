/* ────────────────────────────────────
   Wedding Invitation — Enhanced Script
   Anandu & Meera
──────────────────────────────────── */

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
  initPetalLoop();
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
audio.volume = 0.3;

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
  const target = new Date('2026-12-26T10:30:00+05:30').getTime();
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

/* ── SCROLL EFFECTS ── */
window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  const docH = document.documentElement.scrollHeight - window.innerHeight;

  // progress bar
  document.getElementById('progress-bar').style.width = (sy / docH * 100) + '%';

  // back-to-top
  const top = document.getElementById('btn-top');
  sy > 400 ? top.classList.add('visible') : top.classList.remove('visible');

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

/* ── HERO PARALLAX ── */
function initParallax() {
  const hero = document.getElementById('hero');
  const video = document.getElementById('hero-video');
  if (!hero || !video) return;

  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    if (sy < window.innerHeight) {
      video.style.transform = `translateY(${sy * 0.35}px)`;
    }
  }, { passive: true });
}

/* ── MAGNETIC HOVER ── */
function initMagneticHover() {
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

/* ── PETAL RECYCLER ── */
function initPetalLoop() {
  document.querySelectorAll('.petal').forEach(p => {
    const checkLoop = () => {
      const rect = p.getBoundingClientRect();
      if (rect.top > window.innerHeight + 20) {
        const [fallDur, swayDur] = (p.style.animationDuration || '10s,4s').split(',');
        const [fallDel, swayDel] = (p.style.animationDelay || '0s,0s').split(',');
        p.style.animationDuration = fallDur + ',' + swayDur;
        p.style.animationDelay = '0s,0s';
        // reset by toggling display
        p.style.display = 'none';
        p.offsetHeight;
        p.style.display = '';
      }
    };
    setInterval(checkLoop, 2000);
  });
}

/* ── LIGHTBOX ── */
const lbImages = [
  { src: 'assets/images/_ (2).jpeg', alt: 'Joyful beach dance' },
  { src: 'assets/images/_ (3).jpeg', alt: 'Running together on the shore' },
  { src: 'assets/images/_ (4).jpeg', alt: 'Romantic hand-hold moment' },
  { src: 'assets/images/_ (5).jpeg', alt: 'Arms wide open — free spirits' },
  { src: 'assets/images/_ (6).jpeg', alt: 'Reaching for each other' },
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

/* ── WISHES (Google Apps Script → Sheet) ── */
const WISHES_KEY = 'am_wedding_wishes_v2';

// Paste your Google Apps Script Web App URL here (Deploy → Manage deployments → copy URL)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxUsymR8aPF9CrYYVylzTiLmuj9CPFCHJB97SAset0tzUHj5z79Y8PQ9kmuHAxOH-k/exec'; // ← REPLACE WITH YOUR WEB APP URL

// Google Sheet public read endpoint (no auth needed)
const GOOGLE_SHEET_JSON_URL = 'https://docs.google.com/spreadsheets/d/186ZsAP72kiZRjyMQyzSWLCwBr9X9zvO0Y3rGeaA2sqE/gviz/tq?tqx=out:json';

async function loadWishes() {
  const list = document.getElementById('wishes-list');
  list.innerHTML = '<div style="text-align:center;padding:2rem;font-family:Outfit,sans-serif;color:var(--text-mid);opacity:0.8;"><i class="fas fa-spinner fa-spin"></i> Loading blessings...</div>';

  try {
    const res = await fetch(GOOGLE_SHEET_JSON_URL);
    const raw = await res.text();
    const jsonStr = raw.substring(raw.indexOf('{'), raw.lastIndexOf('}') + 1);
    const data = JSON.parse(jsonStr);
    const rows = (data.table && data.table.rows) ? data.table.rows : [];

    let sheetWishes = [];
    if (rows.length > 0) {
      sheetWishes = rows.map(r => ({
        name: (r.c[0] && r.c[0].v) ? String(r.c[0].v) : 'Anonymous',
        // col 1 = date (auto-set by Apps Script), col 2 = message
        time: (r.c[1] && r.c[1].v) ? String(r.c[1].v) : new Date().toLocaleDateString('en-IN'),
        text: (r.c[2] && r.c[2].v) ? String(r.c[2].v) : ''
      })).filter(w => w.text.trim()).reverse();
    }

    // Merge local unsynced wishes on top
    const localWishes = JSON.parse(localStorage.getItem(WISHES_KEY) || '[]');
    const unsynced = localWishes.filter(lw =>
      !sheetWishes.some(sw => sw.name === lw.name && sw.text === lw.text)
    );
    renderWishes([...unsynced, ...sheetWishes]);
  } catch (err) {
    console.warn('Sheet fetch failed, showing local only:', err);
    renderWishes(JSON.parse(localStorage.getItem(WISHES_KEY) || '[]'));
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
  // local wish uses 'text' for display; Apps Script expects 'message' for the POST
  const newWish = { name, text, time: date };

  // 1. Save to localStorage immediately → instant optimistic display
  const local = JSON.parse(localStorage.getItem(WISHES_KEY) || '[]');
  local.unshift(newWish);
  localStorage.setItem(WISHES_KEY, JSON.stringify(local));
  renderWishes(local);

  // 2. POST to Google Apps Script — send 'message' to match doPost(e) field name
  if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL.trim() !== '') {
    try {
      const formData = new URLSearchParams();
      formData.append('name', name);
      formData.append('message', text);

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData  // URLSearchParams = CORS-safe, no preflight triggered
      });
    } catch (err) {
      console.warn('Apps Script POST failed (will retry on reload):', err);
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

  for (let i = 0; i < 90; i++) pts.push(new Dot());

  function connect() {
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 90) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(73,73,73,${0.04 * (1 - d / 90)})`;
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
  const desc = "You are cordially invited to celebrate the sacred union of Anandu & Meera.\n\nMuhurtham: 10:30 AM at Guruvayur Sri Krishna Temple Mandapam.\nFollowed by Kalyana Sadhya.\n\nEvening Reception: 6:30 PM at Royal Pavilion Banquet Hall, Thrissur.";
  const loc = "Sri Krishna Temple Mandapam, Guruvayur, Thrissur, Kerala";
  const start = "20261226T050000Z";
  const end = "20261226T150000Z";

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

