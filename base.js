/* ══ MPIS SHARED JS ══ */

/* Clock */
function updateClock() {
  const n = new Date();
  const ts = [n.getUTCHours(), n.getUTCMinutes(), n.getUTCSeconds()]
    .map(v => String(v).padStart(2,'0')).join(':') + ' UTC';
  document.querySelectorAll('.topbar-clock').forEach(el => el.textContent = ts);
}
setInterval(updateClock, 1000);
updateClock();

/* Theme toggle */
function toggleTheme() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  if (isLight) {
    document.documentElement.removeAttribute('data-theme');
    document.querySelectorAll('.theme-icon').forEach(el => el.textContent = '☀');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    document.querySelectorAll('.theme-icon').forEach(el => el.textContent = '☾');
  }
}

/* Modal */
function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
function closeModalOutside(e, id) { if (e.target === e.currentTarget) closeModal(id); }

/* Side panel */
function openPanel(id)  { document.getElementById(id).classList.add('open'); }
function closePanel(id) { document.getElementById(id).classList.remove('open'); }

/* ESC key closes modals and panels */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
    document.querySelectorAll('.side-panel.open').forEach(p => p.classList.remove('open'));
  }
});

/* OTP input advance */
function otpAdv(inp, i) {
  inp.value = inp.value.replace(/[^0-9]/g, '').slice(-1);
  const inputs = document.querySelectorAll('.otp-input');
  if (inp.value && i < inputs.length - 1) inputs[i+1].focus();
}
document.addEventListener('keydown', e => {
  if (e.key === 'Backspace') {
    const a = document.activeElement;
    if (a && a.classList.contains('otp-input')) {
      const idx = [...document.querySelectorAll('.otp-input')].indexOf(a);
      if (!a.value && idx > 0) {
        const prev = document.querySelectorAll('.otp-input')[idx-1];
        prev.value = ''; prev.focus();
      }
    }
  }
});

/* Countdown timer */
let _cdSecs = 299, _cdInt = null;
function fmtTime(s) { return String(Math.floor(s/60)).padStart(2,'0') + ':' + String(s%60).padStart(2,'0'); }
function startCountdown() {
  _cdSecs = 299; clearInterval(_cdInt);
  const el = document.getElementById('cd-val');
  if (!el) return;
  el.style.color = 'var(--orange)';
  _cdInt = setInterval(() => {
    _cdSecs--;
    if (el) el.textContent = fmtTime(_cdSecs);
    if (_cdSecs <= 60 && el) el.style.color = 'var(--red)';
    if (_cdSecs <= 0) clearInterval(_cdInt);
  }, 1000);
}
function resetCountdown() { startCountdown(); }

/* Real-time table filter */
function filterTable(inputId, tbodyId, colIndices) {
  const val = document.getElementById(inputId).value.toLowerCase();
  document.querySelectorAll('#' + tbodyId + ' tr').forEach(row => {
    const text = colIndices
      ? colIndices.map(i => (row.cells[i] ? row.cells[i].textContent : '')).join(' ').toLowerCase()
      : row.textContent.toLowerCase();
    row.style.display = (!val || text.includes(val)) ? '' : 'none';
  });
}

/* Stepper navigation */
function showStep(n, totalSteps) {
  for (let i = 0; i < totalSteps; i++) {
    const sec  = document.getElementById('step-sec-' + i);
    const step = document.querySelectorAll('.step')[i];
    if (sec)  sec.style.display  = i === n ? 'block' : 'none';
    if (step) {
      step.classList.toggle('active', i === n);
      step.classList.toggle('done',   i < n);
    }
  }
}

/* Active nav highlight */
(function() {
  const page = location.pathname.split('/').pop();
  document.querySelectorAll('.nav-item').forEach(el => {
    const href = el.getAttribute('href') || '';
    if (href === page) el.classList.add('active');
  });
})();

/* LLR fetch simulation */
function simulateFetch(imoInputId) {
  const imo = document.getElementById(imoInputId).value.trim();
  const errEl = document.getElementById('err-vimo');
  if (!/^\d{7}$/.test(imo)) {
    const inp = document.getElementById(imoInputId);
    if (inp) inp.classList.add('error');
    if (errEl) { errEl.textContent = 'IMO must be exactly 7 numeric digits.'; errEl.style.display = 'block'; }
    return;
  }
  if (errEl) errEl.style.display = 'none';
  const btn = document.getElementById('fetch-btn');
  if (btn) { btn.textContent = 'Fetching…'; btn.disabled = true; }
  setTimeout(() => {
    const names  = ['NORDIC STAR','PACIFIC GLORY','ATLANTIC HOPE','GULF TRADER'];
    const types  = ['Container','Bulk Carrier','Tanker','General Cargo'];
    const flags  = ['Panama','Liberia','Malta','Marshall Islands','Singapore'];
    const owners = ['Nordic Shipping AS','Pacific Lines Ltd','Atlantic Carriers Inc'];
    const fill = (id, v) => { const el = document.getElementById(id); if (el) { el.value = v; el.classList.add('ok'); } };
    fill('v-name', 'MV ' + names[Math.floor(Math.random()*names.length)]);
    fill('v-type', types[Math.floor(Math.random()*types.length)]);
    fill('v-flag', flags[Math.floor(Math.random()*flags.length)]);
    fill('v-owner', owners[Math.floor(Math.random()*owners.length)]);
    fill('v-loa',    (100 + Math.random()*300).toFixed(1));
    fill('v-draught',(8   + Math.random()*8).toFixed(1));
    fill('v-gt',     Math.floor(5000 + Math.random()*200000));
    fill('v-nt',     Math.floor(3000 + Math.random()*120000));
    fill('v-beam',   (20  + Math.random()*42).toFixed(1));
    const lbl = document.getElementById('llr-label');
    const dt  = document.getElementById('llr-date');
    if (lbl) lbl.style.display = '';
    if (dt)  dt.textContent = new Date().toISOString().slice(0,10);
    if (btn) { btn.textContent = '✓ Fetched'; btn.classList.add('success'); btn.disabled = false; }
  }, 600);
}

/* Sidebar shared SVG icons */
const ICONS = {
  dashboard: `<svg class="nav-icon" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1" fill="currentColor" opacity=".8"/><rect x="9" y="1" width="6" height="6" rx="1" fill="currentColor" opacity=".8"/><rect x="1" y="9" width="6" height="6" rx="1" fill="currentColor" opacity=".4"/><rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" opacity=".4"/></svg>`,
  users:     `<svg class="nav-icon" viewBox="0 0 16 16" fill="none"><circle cx="6" cy="5" r="3" stroke="currentColor" stroke-width="1.2"/><path d="M1 14c0-3 2-5 5-5s5 2 5 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M11 7l2 2 3-3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  vessel:    `<svg class="nav-icon" viewBox="0 0 16 16" fill="none"><path d="M2 12l2-6h8l2 6H2z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M5 6V4a3 3 0 016 0v2" stroke="currentColor" stroke-width="1.2"/><path d="M1 13.5s2-1.5 7-1.5 7 1.5 7 1.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`,
  visit:     `<svg class="nav-icon" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="10" rx="1" stroke="currentColor" stroke-width="1.2"/><path d="M4 15h8M8 11v4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`,
  provider:  `<svg class="nav-icon" viewBox="0 0 16 16" fill="none"><rect x="1" y="5" width="14" height="10" rx="1" stroke="currentColor" stroke-width="1.2"/><path d="M5 5V4a3 3 0 016 0v1" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="10" r="2" stroke="currentColor" stroke-width="1.2"/></svg>`,
  booking:   `<svg class="nav-icon" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="11" rx="1" stroke="currentColor" stroke-width="1.2"/><path d="M1 7h14M5 1v4M11 1v4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`,
  resource:  `<svg class="nav-icon" viewBox="0 0 16 16" fill="none"><path d="M8 1v14M1 8h14" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.2"/></svg>`,
  catalog:   `<svg class="nav-icon" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="10" rx="1" stroke="currentColor" stroke-width="1.2"/><path d="M5 5h6M5 7.5h4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M4 15h8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`,
};
