/* =========================================================
   تذكّر — الأذكار والمواقيت
   موقع صُمم ليتناسب مع الهاتف (شاشة داخل بطاقة هاتف)
   يتضمن جميع أذكار المستخدم: أذكار ما بعد الصلاة،
   أذكار الصباح، تسبيح واستغفار اليوم.
   ========================================================= */
'use strict';

const $ = id => document.getElementById(id);

/* ---------- بيانات الأذكار (جميعها) ---------- */
const POST_ADHKAR = [
  { id: 'post-1', txt: 'أستغفر الله العظيم وأتوب إليه', sub: 'الاستغفار — ×3' },
  { id: 'post-2', txt: 'اللهم أنت السلام ومنك السلام تباركت يا ذا الجلال والإكرام', sub: 'التوحيد' },
  { id: 'post-3', txt: 'لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير', sub: 'التوحيد' },
  { id: 'post-4', txt: 'اللهم لا مانع لما أعطيت ولا معطي لما منعت', sub: 'التوحيد' },
  { id: 'post-5', txt: 'سبحان الله وبحمده، سبحان الله العظيم', sub: 'التسبيح' },
  { id: 'post-6', txt: 'اللهم أعني على ذكرك وشكرك وحسن عبادتك', sub: 'الدعاء' },
  { id: 'post-7', txt: 'لا حول ولا قوة إلا بالله، الله أكبر ربي وأعلى بأمره', sub: 'التكبير' },
  { id: 'post-8', txt: 'الحمد لله الذي أطعمني هذا الطعام ورزقنيه من غير حول مني ولا قوة', sub: 'الحمد' }
];

const MORNING_ADHKAR = [
  { id: 'morning-1', txt: 'سورة الأعلى — 10 مرات', sub: 'الاستجابة' },
  { id: 'morning-2', txt: 'الله أكبر الله أكبر الله أكبر', sub: 'التكبير — ×3' },
  { id: 'morning-3', txt: 'سبحان الله وبحمده، سبحان الله العظيم', sub: 'التسبيح — ×3' },
  { id: 'morning-4', txt: 'الحمد لله رب العالمين', sub: 'الحمد — ×3' },
  { id: 'morning-5', txt: 'الله لا إله إلا هو الحي القيوم', sub: 'التوحيد — ×3' },
  { id: 'morning-6', txt: 'استغفر الله العظيم', sub: 'الاستغفار — ×3' },
  { id: 'morning-7', txt: 'اللهم صل وسلم وبارك على نبينا محمد وعلى آله وصحبه وسلم', sub: 'الصلاة على النبي' }
];

const DAILY_ADHKAR = [
  { id: 'daily-1', txt: 'سبحان الله وبحمده، سبحان الله العظيم', sub: 'التسبيح' },
  { id: 'daily-2', txt: 'أستغفر الله العظيم وأتوب إليه', sub: 'الاستغفار' },
  { id: 'daily-3', txt: 'لا إله إلا الله وحده لا شريك له', sub: 'التوحيد' },
  { id: 'daily-4', txt: 'الله أكبر، الله أكبر، لا إله إلا الله، والله أكبر، الله أكبر، ولله الحمد', sub: 'التكبير' },
  { id: 'daily-5', txt: 'اللهم صل وسلم على نبينا محمد', sub: 'الصلاة على النبي' },
  { id: 'daily-6', txt: 'الحمد لله الذي أحيانا بعد ما أماتنا وإليه النشور', sub: 'الحمد' },
  { id: 'daily-7', txt: 'اللهم اغفر لي وارحمني واهدني وعافني وارزقني', sub: 'الدعاء' }
];

/* ---------- مواقيت الصلاة (خوارزمية فلكية مبسطة) ---------- */
const CITIES = {
  alger:    { lat: 36.7538, lng: 3.0588, tz: 1, name: 'الجزائر العاصمة' },
  oran:     { lat: 35.6971, lng: -0.6331, tz: 1, name: 'وهران' },
  constantine: { lat: 36.3650, lng: 6.6147, tz: 1, name: 'قسنطينة' },
  annaba:   { lat: 36.9062, lng: 7.7447, tz: 1, name: 'عنابة' },
  blida:    { lat: 36.4706, lng: 2.8289, tz: 1, name: 'البليدة' },
  setif:    { lat: 36.1868, lng: 5.4122, tz: 1, name: 'سطيف' },
  tizi:     { lat: 36.7170, lng: 4.0511, tz: 1, name: 'تيزي وزو' }
};

const DEFAULTS = {
  cityKey: 'alger',
  fajrAngle: 18,
  ishaAngle: 17,
  asrFactor: 1,
  sound: true,
  vibrate: false,
  hijriAdj: 0
};

const PRAYERS_ORDER = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
const PRAYER_LABELS = {
  fajr: 'الفجر', sunrise: 'الشروق', dhuhr: 'الظهر',
  asr: 'العصر', maghrib: 'المغرب', isha: 'العشاء'
};

/* ---------- دوال رياضية ---------- */
const deg = d => d * Math.PI / 180;
const rad = r => r * 180 / Math.PI;
const norm = a => (a % 360 + 360) % 360;
const timeToStr = m => {
  const h = Math.floor(m / 60).toString().padStart(2, '0');
  const mi = Math.round(m % 60).toString().padStart(2, '0');
  return `${h}:${mi}`;
};

function julianDay(date) {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + 1;
  const d = date.getUTCDate();
  const h = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
  const a = Math.floor((14 - m) / 12);
  const yy = y + 4800 - a;
  const mm = m + 12 * a - 3;
  const jd = d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
  return jd + (h - 12) / 24;
}

function sunPosition(jd) {
  const n = jd - 2451545.0009;
  const L = norm(280.460 + 0.9856474 * n);
  const g = norm(357.528 + 0.9856003 * n);
  const lambda = norm(L + 1.915 * Math.sin(deg(g)) + 0.020 * Math.sin(deg(2 * g)));
  const epsilon = 23.439 - 0.0000004 * n;
  const ra = rad(Math.atan2(Math.cos(deg(epsilon)) * Math.sin(deg(lambda)), Math.cos(deg(lambda))));
  const dec = rad(Math.asin(Math.sin(deg(epsilon)) * Math.sin(deg(lambda))));
  const eqt = 4 * (L - ra);
  return { dec, eqt: eqt / 60 };
}

function prayerTimes(lat, lng, tz, date, fajrAngle, ishaAngle, asrFactor) {
  const jd = julianDay(date);
  const { dec, eqt } = sunPosition(jd);
  const noon = 12 - eqt - lng / 15 + tz;
  const diff = rad(Math.acos((-Math.sin(deg(fajrAngle)) - Math.sin(deg(lat)) * Math.sin(deg(dec))) / (Math.cos(deg(lat)) * Math.cos(deg(dec))))) / 15;
  const asrAngle = asrFactor === 2 ? rad(Math.atan(1 / (1 + Math.tan(deg(Math.abs(lat - dec)))))) : rad(Math.atan(1 / (2 + Math.tan(deg(Math.abs(lat - dec))))));
  const asrDiff = rad(Math.acos((-Math.sin(deg(asrAngle)) - Math.sin(deg(lat)) * Math.sin(deg(dec))) / (Math.cos(deg(lat)) * Math.cos(deg(dec))))) / 15;
  const maghribDiff = diff;
  const ishaDiff = rad(Math.acos((-Math.sin(deg(ishaAngle)) - Math.sin(deg(lat)) * Math.sin(deg(dec))) / (Math.cos(deg(lat)) * Math.cos(deg(dec))))) / 15;

  return {
    fajr: noon - diff,
    sunrise: noon - diff * 0.833,
    dhuhr: noon,
    asr: noon + asrDiff,
    maghrib: noon + maghribDiff,
    isha: noon + ishaDiff
  };
}

/* ---------- الحالة ---------- */
let state = {
  cityKey: 'alger',
  fajrAngle: 18,
  ishaAngle: 17,
  asrFactor: 1,
  sound: true,
  vibrate: false,
  hijriAdj: 0,
  doneToday: {}
};

function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem('mawaqit_reminders') || '{}');
    state = { ...DEFAULTS, ...state, ...s };
    if (s.doneToday) state.doneToday = s.doneToday;
  } catch (e) { console.warn(e); }
  $('settingCity').value = state.cityKey;
  $('settingSound').checked = state.sound;
  $('settingVibrate').checked = state.vibrate;
  $('settingHijriAdj').checked = state.hijriAdj;
}

function saveState() {
  localStorage.setItem('mawaqit_reminders', JSON.stringify(state));
}

/* ---------- التاريخ الهجري (تقريبي) ---------- */
function toHijri(date) {
  const jd = Math.floor(julianDay(date)) + 0.5;
  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j = Math.floor((10985 - l2) / 5316) *
    Math.floor(50 * l2 / 17719) +
    Math.floor(l2 / 5670) *
    Math.floor(43 * l2 / 15238);
  const l3 = l2 - Math.floor((30 - j) / 15) *
    Math.floor(17719 * (50 * l2 / 17719) / 50) -
    Math.floor(j / 16) *
    Math.floor(15238 * (43 * l2 / 15238) / 43) + 29;
  const month = Math.floor(24 * l3 / 709);
  const day = l3 - Math.floor(709 * month / 24);
  const year = 30 * n + j - 30;
  const months = [
    'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني',
    'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان',
    'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
  ];
  return { day, month: months[month], year: year + state.hijriAdj };
}

/* ---------- Render قوائم الأذكار ---------- */
function renderAdhkarList(listId, items, doneKey) {
  const done = loadDone(doneKey);
  const el = $(listId);
  el.innerHTML = items.map(it => `
    <li class="adhkar-item ${done.has(it.id) ? 'done' : ''}" data-id="${it.id}" data-key="${doneKey}">
      <div class="chk" tabindex="0" role="button" aria-pressed="${done.has(it.id)}" aria-label="تحديد كمقروء"></div>
      <div class="adhkar-txt"><strong>${it.txt}</strong><span>${it.sub}</span></div>
    </li>
  `).join('');
}

function loadDone(key) {
  return new Set(state.doneToday[key] || []);
}

function toggleDone(key, id) {
  const done = loadDone(key);
  if (done.has(id)) done.delete(id);
  else done.add(id);
  state.doneToday[key] = [...done];
  saveState();
  renderProgress();
}

function resetDone(key) {
  state.doneToday[key] = [];
  saveState();
  renderAdhkarList(key === 'post' ? 'postList' : key === 'morning' ? 'morningList' : 'dailyList',
    key === 'post' ? POST_ADHKAR : key === 'morning' ? MORNING_ADHKAR : DAILY_ADHKAR, key);
  renderProgress();
}

function renderProgress() {
  const p = loadDone('post'), m = loadDone('morning'), d = loadDone('daily');
  $('postProgress').textContent = `${p.size} / ${POST_ADHKAR.length}`;
  $('morningProgress').textContent = `${m.size} / ${MORNING_ADHKAR.length}`;
  $('dailyProgress').textContent = `${d.size} / ${DAILY_ADHKAR.length}`;
}

/* ---------- أوقات الصلاة والعد التنازلي ---------- */
function tick() {
  const now = new Date();
  const city = CITIES[state.cityKey];
  const times = prayerTimes(city.lat, city.lng, city.tz, now, state.fajrAngle, state.ishaAngle, state.asrFactor);
  const mins = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;

  let nextKey = null, nextTime = null;
  for (const k of PRAYERS_ORDER) {
    if (times[k] > mins) { nextKey = k; nextTime = times[k]; break; }
  }
  if (!nextKey) { nextKey = 'fajr'; nextTime = times.fajr + 24 * 60; }

  const diff = Math.max(0, nextTime - mins);
  const h = Math.floor(diff / 60);
  const m = Math.floor(diff % 60);
  const s = Math.floor((diff * 60) % 60);

  $('nextName').textContent = PRAYER_LABELS[nextKey];
  $('countdown').textContent = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  $('nextTime').textContent = `في ${timeToStr(nextTime)}`;

  // الساعة
  $('clock').textContent = now.toLocaleTimeString('ar-DZ', { hour12: false, timeZone: `Etc/GMT${city.tz >= 0 ? '-' : '+'}${Math.abs(city.tz)}` });
  $('sbTime').textContent = now.toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit', hour12: false });

  // التواريخ
  const hijri = toHijri(now);
  $('hijri').textContent = `${hijri.day} ${hijri.month} ${hijri.year} هـ`;
  $('greg').textContent = now.toLocaleDateString('ar-DZ', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

/* ---------- تبويبات ---------- */
function bindTabs() {
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
      btn.classList.add('active');
      $(`view-${btn.dataset.view}`).classList.add('active');
    });
  });
}

/* ---------- أحداث قوائم الأذكار ---------- */
function bindAdhkarClicks() {
  document.addEventListener('click', e => {
    const item = e.target.closest('.adhkar-item');
    if (!item) return;
    const key = item.dataset.key;
    const id = item.dataset.id;
    toggleDone(key, id);
    item.classList.toggle('done');
    const chk = item.querySelector('.chk');
    chk.setAttribute('aria-pressed', item.classList.contains('done'));
    renderProgress();
  });

  $('resetPost')?.addEventListener('click', () => resetDone('post'));
  $('resetMorning')?.addEventListener('click', () => resetDone('morning'));
  $('resetDaily')?.addEventListener('click', () => resetDone('daily'));
}

/* ---------- إعدادات ---------- */
function bindSettings() {
  $('saveSettings').addEventListener('click', () => {
    state.cityKey = $('settingCity').value;
    state.sound = $('settingSound').checked;
    state.vibrate = $('settingVibrate').checked;
    state.hijriAdj = $('settingHijriAdj').checked ? 1 : 0;
    saveState();
    tick();
  });
}

/* ---------- PWA: Notifications & Background Sync ---------- */
let notificationPermission = 'default';
let swRegistration = null;

async function requestNotificationPermission() {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') { notificationPermission = 'granted'; return true; }
  if (Notification.permission === 'denied') { notificationPermission = 'denied'; return false; }
  const perm = await Notification.requestPermission();
  notificationPermission = perm;
  return perm === 'granted';
}

function schedulePrayerNotifications() {
  if (notificationPermission !== 'granted') return;
  const now = new Date();
  const city = CITIES[state.cityKey];
  const times = prayerTimes(city.lat, city.lng, city.tz, now, state.fajrAngle, state.ishaAngle, state.asrFactor);
  const minsNow = now.getHours() * 60 + now.getMinutes();

  // Schedule for today's remaining prayers
  for (const k of PRAYERS_ORDER) {
    const prayerMin = times[k];
    if (prayerMin <= minsNow) continue; // already passed
    const delay = (prayerMin - minsNow) * 60 * 1000;
    if (delay > 0 && delay < 24 * 60 * 60 * 1000) {
      setTimeout(() => showPrayerNotification(k, city.name), delay);
    }
  }
  // Also schedule for tomorrow's Fajr
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const timesTomorrow = prayerTimes(city.lat, city.lng, city.tz, tomorrow, state.fajrAngle, state.ishaAngle, state.asrFactor);
  const fajrTomorrow = timesTomorrow.fajr + 24 * 60;
  const delayFajr = (fajrTomorrow - minsNow) * 60 * 1000;
  if (delayFajr > 0) {
    setTimeout(() => showPrayerNotification('fajr', city.name), delayFajr);
  }
}

function showPrayerNotification(prayerKey, cityName) {
  if (notificationPermission !== 'granted') return;
  const label = PRAYER_LABELS[prayerKey];
  const options = {
    body: `حان الآن وقت صلاة ${label} — ${cityName}`,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
    tag: `prayer-${prayerKey}`,
    renotify: true,
    requireInteraction: true,
    vibrate: state.vibrate ? [200, 100, 200, 100, 200] : undefined,
    data: { url: '/index.html' },
    actions: [
      { action: 'open', title: 'فتح التطبيق' },
      { action: 'adhan', title: 'أذكار الصلاة' }
    ]
  };
  if (state.sound) playAdhanSound();
  navigator.serviceWorker.ready.then(reg => reg.showNotification(`🕌 وقت الصلاة: ${label}`, options));
}

function playAdhanSound() {
  // Use Web Audio API for a simple beep (placeholder for actual adhan)
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain).connect(ctx.destination);
    osc.frequency.value = 440;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
    osc.start();
    osc.stop(ctx.currentTime + 1.5);
  } catch (e) { /* ignore */ }
}

/* ---------- Background Sync Registration ---------- */
async function registerBackgroundSync() {
  if (!('serviceWorker' in navigator) || !('sync' in window.ServiceWorkerRegistration.prototype)) return;
  try {
    const reg = await navigator.serviceWorker.ready;
    await reg.sync.register('prayer-notifications');
    console.log('Background sync registered');
  } catch (e) { console.warn('Background sync failed:', e); }
}

/* ---------- Periodic Background Sync (if supported) ---------- */
async function registerPeriodicSync() {
  if (!('serviceWorker' in navigator) || !('periodicSync' in window.ServiceWorkerRegistration.prototype)) return;
  try {
    const reg = await navigator.serviceWorker.ready;
    const status = await navigator.permissions.query({ name: 'periodic-background-sync' });
    if (status.state === 'granted') {
      await reg.periodicSync.register('prayer-times-update', { minInterval: 24 * 60 * 60 * 1000 });
      console.log('Periodic sync registered');
    }
  } catch (e) { console.warn('Periodic sync failed:', e); }
}

/* ---------- Online/Offline Detection ---------- */
function setupOnlineOffline() {
  function updateOnlineStatus() {
    document.body.classList.toggle('offline', !navigator.onLine);
    const indicator = $('onlineIndicator');
    if (indicator) {
      indicator.textContent = navigator.onLine ? '🟢 متصل' : '🔴 غير متصل (يعمل أوفلاين)';
      indicator.style.color = navigator.onLine ? 'var(--mint)' : 'var(--gold)';
    }
  }
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateOnlineStatus();
}

/* ---------- Service Worker Messages ---------- */
function setupSWMessages() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.addEventListener('message', event => {
    if (event.data?.type === 'ONLINE_STATUS') {
      document.body.classList.toggle('offline', !event.data.online);
    }
    if (event.data?.type === 'SCHEDULE_NOTIFICATIONS') {
      schedulePrayerNotifications();
    }
    if (event.data?.type === 'UPDATE_PRAYER_TIMES') {
      tick();
    }
  });
}

/* ---------- Init (معدّل) ---------- */
async function init() {
  loadState();
  renderAdhkarList('postList', POST_ADHKAR, 'post');
  renderAdhkarList('morningList', MORNING_ADHKAR, 'morning');
  renderAdhkarList('dailyList', DAILY_ADHKAR, 'daily');
  renderProgress();
  bindTabs();
  bindAdhkarClicks();
  bindSettings();
  tick();
  setInterval(tick, 1000);

  // PWA features
  await requestNotificationPermission();
  schedulePrayerNotifications();
  registerBackgroundSync();
  registerPeriodicSync();
  setupOnlineOffline();
  setupSWMessages();

  // Add online indicator to UI
  addOnlineIndicator();
}

function addOnlineIndicator() {
  if ($('onlineIndicator')) return;
  const indicator = document.createElement('div');
  indicator.id = 'onlineIndicator';
  indicator.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);font-size:11px;padding:4px 10px;border-radius:20px;background:rgba(0,0,0,.7);z-index:100;font-family:inherit;display:none';
  document.body.appendChild(indicator);
  // Show only when offline
  if (!navigator.onLine) {
    indicator.style.display = 'block';
    indicator.textContent = '🔴 غير متصل (يعمل أوفلاين)';
    indicator.style.color = 'var(--gold)';
  }
}

init();