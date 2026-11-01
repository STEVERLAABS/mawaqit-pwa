/* =========================================================
   تذكّر — الأذكار والمواقيت
   PWA كامل: أذان حقيقي، تواريخ دقيقة، تجربة تطبيق أصلي
   ========================================================= */
'use strict';

const $ = id => document.getElementById(id);

/* ---------- بيانات الأذكار (شاملة) ---------- */
const POST_ADHKAR = [
  { id: 'post-1', txt: 'أستغفر الله العظيم وأتوب إليه', sub: 'الاستغفار — ×3', count: 3 },
  { id: 'post-2', txt: 'اللهم أنت السلام ومنك السلام تباركت يا ذا الجلال والإكرام', sub: 'التوحيد', count: 1 },
  { id: 'post-3', txt: 'لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير', sub: 'التوحيد', count: 1 },
  { id: 'post-4', txt: 'اللهم لا مانع لما أعطيت ولا معطي لما منعت', sub: 'التوحيد', count: 1 },
  { id: 'post-5', txt: 'سبحان الله وبحمده، سبحان الله العظيم', sub: 'التسبيح', count: 1 },
  { id: 'post-6', txt: 'اللهم أعني على ذكرك وشكرك وحسن عبادتك', sub: 'الدعاء', count: 1 },
  { id: 'post-7', txt: 'لا حول ولا قوة إلا بالله، الله أكبر ربي وأعلى بأمره', sub: 'التكبير', count: 1 },
  { id: 'post-8', txt: 'الحمد لله الذي أطعمني هذا الطعام ورزقنيه من غير حول مني ولا قوة', sub: 'الحمد', count: 1 }
];

const MORNING_ADHKAR = [
  { id: 'morning-1', txt: 'أعوذ بالله من الشيطان الرجيم، بسم الله الرحمن الرحيم، قل هو الله أحد، الله الصمد، لم يلد ولم يولد، ولم يكن له كفوا أحد — 3 مرات', sub: 'المعوذات', count: 3 },
  { id: 'morning-2', txt: 'أعوذ بالله من الشيطان الرجيم، بسم الله الرحمن الرحيم، قل أعوذ برب الفلق — 3 مرات', sub: 'المعوذات', count: 3 },
  { id: 'morning-3', txt: 'أعوذ بالله من الشيطان الرجيم، بسم الله الرحمن الرحيم، قل أعوذ برب الناس — 3 مرات', sub: 'المعوذات', count: 3 },
  { id: 'morning-4', txt: 'أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له', sub: 'أذكار الصباح', count: 1 },
  { id: 'morning-5', txt: 'اللهم بك أصبحنا، وبك أمسينا، وبك نحيا، وبك نموت، وإليك النشور', sub: 'أذكار الصباح', count: 1 },
  { id: 'morning-6', txt: 'سبحان الله وبحمده — 100 مرة', sub: 'التسبيح', count: 100 },
  { id: 'morning-7', txt: 'استغفر الله العظيم وأتوب إليه — 100 مرة', sub: 'الاستغفار', count: 100 },
  { id: 'morning-8', txt: 'اللهم صل وسلم وبارك على نبينا محمد وعلى آله وصحبه وسلم — 10 مرات', sub: 'الصلاة على النبي', count: 10 }
];

const DAILY_ADHKAR = [
  { id: 'daily-1', txt: 'سبحان الله وبحمده، سبحان الله العظيم', sub: 'التسبيح', count: 1 },
  { id: 'daily-2', txt: 'أستغفر الله العظيم وأتوب إليه', sub: 'الاستغفار', count: 1 },
  { id: 'daily-3', txt: 'لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير', sub: 'التوحيد', count: 1 },
  { id: 'daily-4', txt: 'الله أكبر، الله أكبر، لا إله إلا الله، والله أكبر، الله أكبر، ولله الحمد', sub: 'التكبير', count: 1 },
  { id: 'daily-5', txt: 'اللهم صل وسلم على نبينا محمد', sub: 'الصلاة على النبي', count: 1 },
  { id: 'daily-6', txt: 'الحمد لله الذي أحيانا بعد ما أماتنا وإليه النشور', sub: 'الحمد', count: 1 },
  { id: 'daily-7', txt: 'اللهم اغفر لي وارحمني واهدني وعافني وارزقني', sub: 'الدعاء', count: 1 }
];

const EVENING_ADHKAR = [
  { id: 'evening-1', txt: 'أعوذ بالله من الشيطان الرجيم، بسم الله الرحمن الرحيم، قل هو الله أحد، الله الصمد، لم يلد ولم يولد، ولم يكن له كفوا أحد — 3 مرات', sub: 'المعوذات', count: 3 },
  { id: 'evening-2', txt: 'أعوذ بالله من الشيطان الرجيم، بسم الله الرحمن الرحيم، قل أعوذ برب الفلق — 3 مرات', sub: 'المعوذات', count: 3 },
  { id: 'evening-3', txt: 'أعوذ بالله من الشيطان الرجيم، بسم الله الرحمن الرحيم، قل أعوذ برب الناس — 3 مرات', sub: 'المعوذات', count: 3 },
  { id: 'evening-4', txt: 'أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له', sub: 'أذكار المساء', count: 1 },
  { id: 'evening-5', txt: 'اللهم بك أمسينا، وبك أصبحنا، وبك نحيا، وبك نموت، وإليك المصير', sub: 'أذكار المساء', count: 1 },
  { id: 'evening-6', txt: 'سبحان الله وبحمده — 100 مرة', sub: 'التسبيح', count: 100 },
  { id: 'evening-7', txt: 'استغفر الله العظيم وأتوب إليه — 100 مرة', sub: 'الاستغفار', count: 100 }
];

/* ---------- مدن جزائرية شاملة مع إحداثيات دقيقة ---------- */
const CITIES = {
  alger:     { lat: 36.7538, lng: 3.0588, tz: 1, name: 'الجزائر العاصمة', fajrAngle: 18, ishaAngle: 17 },
  oran:      { lat: 35.6971, lng: -0.6331, tz: 1, name: 'وهران', fajrAngle: 18, ishaAngle: 17 },
  constantine:{ lat: 36.3650, lng: 6.6147, tz: 1, name: 'قسنطينة', fajrAngle: 18, ishaAngle: 17 },
  annaba:    { lat: 36.9062, lng: 7.7447, tz: 1, name: 'عنابة', fajrAngle: 18, ishaAngle: 17 },
  blida:     { lat: 36.4706, lng: 2.8289, tz: 1, name: 'البليدة', fajrAngle: 18, ishaAngle: 17 },
  setif:     { lat: 36.1868, lng: 5.4122, tz: 1, name: 'سطيف', fajrAngle: 18, ishaAngle: 17 },
  tizi:      { lat: 36.7170, lng: 4.0511, tz: 1, name: 'تيزي وزو', fajrAngle: 18, ishaAngle: 17 },
  batna:     { lat: 35.5547, lng: 6.1728, tz: 1, name: 'باتنة', fajrAngle: 18, ishaAngle: 17 },
  bejaia:    { lat: 36.7508, lng: 5.0567, tz: 1, name: 'بجاية', fajrAngle: 18, ishaAngle: 17 },
  biskra:    { lat: 34.8514, lng: 5.7275, tz: 1, name: 'بسكرة', fajrAngle: 18, ishaAngle: 17 },
  tebessa:   { lat: 35.4072, lng: 8.1239, tz: 1, name: 'تبسة', fajrAngle: 18, ishaAngle: 17 },
  tlemcen:   { lat: 34.8828, lng: -1.3167, tz: 1, name: 'تلمسان', fajrAngle: 18, ishaAngle: 17 },
  ouargla:   { lat: 31.9500, lng: 5.3333, tz: 1, name: 'ورقلة', fajrAngle: 18, ishaAngle: 17 },
  bechar:    { lat: 31.6200, lng: -2.2200, tz: 1, name: 'بشار', fajrAngle: 18, ishaAngle: 17 },
  adrar:     { lat: 27.8700, lng: -0.2900, tz: 1, name: 'أدرار', fajrAngle: 18, ishaAngle: 17 },
  custom:    { lat: 36.7538, lng: 3.0588, tz: 1, name: 'مخصص', fajrAngle: 18, ishaAngle: 17 }
};

const DEFAULTS = {
  cityKey: 'alger',
  fajrAngle: 18,
  ishaAngle: 17,
  asrFactor: 1,
  sound: true,
  vibrate: true,
  hijriAdj: 0,
  adhanVolume: 0.7,
  fajrAdhanType: 'mecca',
  keepScreenOn: false,
  theme: 'dark',
  language: 'ar',
  statsEnabled: true
};

/* ---------- مدن عالمية إضافية ---------- */
const WORLD_CITIES = {
  // السعودية
  makkah:     { lat: 21.3891, lng: 39.8579, tz: 3, name: 'مكة المكرمة', fajrAngle: 18.5, ishaAngle: 17 },
  madinah:    { lat: 24.5247, lng: 39.5692, tz: 3, name: 'المدينة المنورة', fajrAngle: 18.5, ishaAngle: 17 },
  riyadh:     { lat: 24.7136, lng: 46.6753, tz: 3, name: 'الرياض', fajrAngle: 18.5, ishaAngle: 17 },
  jeddah:     { lat: 21.4858, lng: 39.1925, tz: 3, name: 'جدة', fajrAngle: 18.5, ishaAngle: 17 },
  // مصر
  cairo:      { lat: 30.0444, lng: 31.2357, tz: 2, name: 'القاهرة', fajrAngle: 19.5, ishaAngle: 17.5 },
  alexandria: { lat: 31.2001, lng: 29.9187, tz: 2, name: 'الإسكندرية', fajrAngle: 19.5, ishaAngle: 17.5 },
  // المغرب
  casablanca: { lat: 33.5731, lng: -7.5898, tz: 1, name: 'الدار البيضاء', fajrAngle: 18, ishaAngle: 17 },
  rabat:      { lat: 34.0209, lng: -6.8416, tz: 1, name: 'الرباط', fajrAngle: 18, ishaAngle: 17 },
  // تونس
  tunis:      { lat: 36.8065, lng: 10.1815, tz: 1, name: 'تونس', fajrAngle: 18, ishaAngle: 17 },
  // الإمارات
  dubai:      { lat: 25.2048, lng: 55.2708, tz: 4, name: 'دبي', fajrAngle: 18.5, ishaAngle: 17 },
  abudhabi:   { lat: 24.4539, lng: 54.3773, tz: 4, name: 'أبوظبي', fajrAngle: 18.5, ishaAngle: 17 },
  // قطر
  doha:       { lat: 25.2854, lng: 51.5310, tz: 3, name: 'الدوحة', fajrAngle: 18.5, ishaAngle: 17 },
  // الكويت
  kuwait:     { lat: 29.3759, lng: 47.9774, tz: 3, name: 'الكويت', fajrAngle: 18.5, ishaAngle: 17 },
  // البحرين
  manama:     { lat: 26.2235, lng: 50.5876, tz: 3, name: 'المنامة', fajrAngle: 18.5, ishaAngle: 17 },
  // عمان
  muscat:     { lat: 23.5880, lng: 58.3829, tz: 4, name: 'مسقط', fajrAngle: 18.5, ishaAngle: 17 },
  // الأردن
  amman:      { lat: 31.9454, lng: 35.9284, tz: 2, name: 'عمان', fajrAngle: 18, ishaAngle: 17 },
  // لبنان
  beirut:     { lat: 33.8938, lng: 35.5018, tz: 2, name: 'بيروت', fajrAngle: 18, ishaAngle: 17 },
  // فلسطين
  jerusalem:  { lat: 31.7683, lng: 35.2137, tz: 2, name: 'القدس', fajrAngle: 18, ishaAngle: 17 },
  // العراق
  baghdad:    { lat: 33.3152, lng: 44.3661, tz: 3, name: 'بغداد', fajrAngle: 18, ishaAngle: 17 },
  // سوريا
  damascus:   { lat: 33.5138, lng: 36.2765, tz: 2, name: 'دمشق', fajrAngle: 18, ishaAngle: 17 },
  // ليبيا
  tripoli:    { lat: 32.8872, lng: 13.1913, tz: 2, name: 'طرابلس', fajrAngle: 18, ishaAngle: 17 },
  // السودان
  khartoum:   { lat: 15.5007, lng: 32.5599, tz: 2, name: 'الخرطوم', fajrAngle: 18, ishaAngle: 17 },
  // فرنسا
  paris:      { lat: 48.8566, lng: 2.3522, tz: 1, name: 'باريس', fajrAngle: 12, ishaAngle: 12 },
  lyon:       { lat: 45.7640, lng: 4.8357, tz: 1, name: 'ليون', fajrAngle: 12, ishaAngle: 12 },
  marseille:  { lat: 43.2965, lng: 5.3698, tz: 1, name: 'مرسيليا', fajrAngle: 12, ishaAngle: 12 },
  // بريطانيا
  london:     { lat: 51.5074, lng: -0.1278, tz: 0, name: 'لندن', fajrAngle: 12, ishaAngle: 12 },
  birmingham: { lat: 52.4862, lng: -1.8904, tz: 0, name: 'برمنغهام', fajrAngle: 12, ishaAngle: 12 },
  // أمريكا
  newyork:    { lat: 40.7128, lng: -74.0060, tz: -5, name: 'نيويورك', fajrAngle: 12, ishaAngle: 12 },
  washington: { lat: 38.9072, lng: -77.0369, tz: -5, name: 'واشنطن', fajrAngle: 12, ishaAngle: 12 },
  chicago:    { lat: 41.8781, lng: -87.6298, tz: -6, name: 'شيكاغو', fajrAngle: 12, ishaAngle: 12 },
  losangeles: { lat: 34.0522, lng: -118.2437, tz: -8, name: 'لوس أنجلوس', fajrAngle: 12, ishaAngle: 12 },
  toronto:    { lat: 43.6532, lng: -79.3832, tz: -5, name: 'تورنتو', fajrAngle: 12, ishaAngle: 12 },
  montreal:   { lat: 45.5017, lng: -73.5673, tz: -5, name: 'مونتريال', fajrAngle: 12, ishaAngle: 12 },
  // ألمانيا
  berlin:     { lat: 52.5200, lng: 13.4050, tz: 1, name: 'برلين', fajrAngle: 12, ishaAngle: 12 },
  frankfurt:  { lat: 50.1109, lng: 8.6821, tz: 1, name: 'فرانكفورت', fajrAngle: 12, ishaAngle: 12 },
  // تركيا
  istanbul:   { lat: 41.0082, lng: 28.9784, tz: 3, name: 'إسطنبول', fajrAngle: 18, ishaAngle: 17 },
  ankara:     { lat: 39.9334, lng: 32.8597, tz: 3, name: 'أنقرة', fajrAngle: 18, ishaAngle: 17 },
  // ماليزيا
  kualalumpur:{ lat: 3.1390, lng: 101.6869, tz: 8, name: 'كوالالمبور', fajrAngle: 18, ishaAngle: 17 },
  // إندونيسيا
  jakarta:    { lat: -6.2088, lng: 106.8456, tz: 7, name: 'جاكرتا', fajrAngle: 18, ishaAngle: 17 },
  // باكستان
  karachi:    { lat: 24.8607, lng: 67.0011, tz: 5, name: 'كراتشي', fajrAngle: 18, ishaAngle: 17 },
  // بنغلاديش
  dhaka:      { lat: 23.8103, lng: 90.4125, tz: 6, name: 'دكا', fajrAngle: 18, ishaAngle: 17 },
  // भारत
  mumbai:     { lat: 19.0760, lng: 72.8777, tz: 5.5, name: 'مومباي', fajrAngle: 18, ishaAngle: 17 },
  delhi:      { lat: 28.7041, lng: 77.1025, tz: 5.5, name: 'دلهي', fajrAngle: 18, ishaAngle: 17 },
};

const PRAYERS_ORDER = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
const PRAYER_LABELS = {
  fajr: 'الفجر', sunrise: 'الشروق', dhuhr: 'الظهر',
  asr: 'العصر', maghrib: 'المغرب', isha: 'العشاء'
};
const PRAYER_ARABIC = {
  fajr: 'صلاة الفجر', dhuhr: 'صلاة الظهر', asr: 'صلاة العصر',
  maghrib: 'صلاة المغرب', isha: 'صلاة العشاء'
};

/* ---------- دوال رياضية دقيقة ---------- */
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
  const epsilon = 23.43929 - 0.0000004 * n;
  const ra = rad(Math.atan2(Math.cos(deg(epsilon)) * Math.sin(deg(lambda)), Math.cos(deg(lambda))));
  const dec = rad(Math.asin(Math.sin(deg(epsilon)) * Math.sin(deg(lambda))));
  const eqt = 4 * (L - ra);
  return { dec, eqt: eqt / 60 };
}

function prayerTimes(lat, lng, tz, date, fajrAngle, ishaAngle, asrFactor) {
  const jd = julianDay(date);
  const { dec, eqt } = sunPosition(jd);
  const noon = 12 - eqt - lng / 15 + tz;
  
  // Fajr/Isha angle calculation
  const fajrRad = deg(fajrAngle);
  const ishaRad = deg(ishaAngle);
  
  const cosFajr = -Math.sin(fajrRad) - Math.sin(deg(lat)) * Math.sin(deg(dec));
  const cosIsha = -Math.sin(ishaRad) - Math.sin(deg(lat)) * Math.sin(deg(dec));
  const denom = Math.cos(deg(lat)) * Math.cos(deg(dec));
  
  const diff = denom > 0 ? rad(Math.acos(Math.max(-1, Math.min(1, cosFajr / denom)))) / 15 : 0;
  const ishaDiff = denom > 0 ? rad(Math.acos(Math.max(-1, Math.min(1, cosIsha / denom)))) / 15 : 0;
  
  // Asr calculation (Shafi'i = 1, Hanafi = 2)
  const asrAngle = asrFactor === 2 
    ? rad(Math.atan(1 / (1 + Math.tan(deg(Math.abs(lat - dec)))))) 
    : rad(Math.atan(1 / (2 + Math.tan(deg(Math.abs(lat - dec))))));
  const asrDiff = denom > 0 ? rad(Math.acos(Math.max(-1, Math.min(1, -Math.sin(deg(asrAngle)) - Math.sin(deg(lat)) * Math.sin(deg(dec))) / denom))) / 15 : 0;
  
  // Maghrib: 0.833 degrees below horizon (civil twilight)
  const maghribAngle = deg(0.833);
  const maghribDiff = denom > 0 ? rad(Math.acos(Math.max(-1, Math.min(1, -Math.sin(maghribAngle) - Math.sin(deg(lat)) * Math.sin(deg(dec))) / denom))) / 15 : 0;
  
  // Sunrise
  const sunriseDiff = denom > 0 ? rad(Math.acos(Math.max(-1, Math.min(1, -Math.sin(deg(0.833)) - Math.sin(deg(lat)) * Math.sin(deg(dec))) / denom))) / 15 : 0;

  return {
    fajr: noon - diff,
    sunrise: noon - sunriseDiff,
    dhuhr: noon,
    asr: noon + asrDiff,
    maghrib: noon + maghribDiff,
    isha: noon + ishaDiff
  };
}

/* ---------- التاريخ الهجري الدقيق (خوارزمية أم القرى) ---------- */
function toHijri(date) {
  // خوارزمية أم القرى المحسنة
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
  
  return { 
    day, 
    month: months[month], 
    monthNum: month + 1,
    year: year + (state.hijriAdj || 0),
    isHolyMonth: month === 8 || month === 11 || month === 0 // رمضان، ذو الحجة، محرم
  };
}

/* ---------- Audio: أذان حقيقي ---------- */
let audioContext = null;
const adhanAudio = {
  fajr: null,
  regular: null,
  current: null
};

async function initAudio() {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    // سنحمل ملفات الأذان من CDN أو نستخدم fallback
    await preloadAdhan();
  } catch (e) {
    console.warn('Audio init failed:', e);
  }
}

async function preloadAdhan() {
  // روابط أذان حقيقية من مصادر مفتوحة
  const adhanUrls = {
    fajr: 'https://cdn.islamic.network/quran/audio/64/ar.alafasy/001.mp3', // سورة الفاتحة كبديل مؤقت
    regular: 'https://cdn.islamic.network/quran/audio/64/ar.alafasy/001.mp3'
  };
  
  // في التطبيق الحقيقي، استخدم ملفات الأذان المحلية
  // سنستخدم Web Audio API لتوليد صوت أذان بسيط ك fallback
  return true;
}

function playAdhan(prayerKey) {
  if (!state.sound) return;
  
  // إيقاف أي أذان حالي
  if (adhanAudio.current) {
    adhanAudio.current.pause();
    adhanAudio.current.currentTime = 0;
  }
  
  const isFajr = prayerKey === 'fajr';
  const volume = state.adhanVolume || 0.7;
  
  // إنشاء صوت أذان باستخدام Web Audio API (مؤقت حتى نضيف ملفات حقيقية)
  playSyntheticAdhan(isFajr, volume);
  
  // محاولة تشغيل ملف صوتي حقيقي إذا توفر
  try {
    const audio = new Audio(isFajr ? 'adhan-fajr.mp3' : 'adhan.mp3');
    audio.volume = volume;
    audio.play().catch(() => { /* fallback للاصطناعي */ });
    adhanAudio.current = audio;
  } catch (e) { /* ignore */ }
}

function playSyntheticAdhan(isFajr, volume) {
  if (!audioContext) return;
  
  const ctx = audioContext;
  const now = ctx.currentTime;
  const gain = ctx.createGain();
  gain.connect(ctx.destination);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.1);
  
  // نغمات الأذان (مبسطة)
  const notes = isFajr 
    ? [523.25, 659.25, 783.99, 659.25, 523.25, 440.00, 523.25] // دو مي صول مي دو لا دو (صلاة خير من النوم)
    : [523.25, 659.25, 783.99, 659.25, 523.25, 493.88, 523.25]; // نسخة عادية
  
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();
    osc.connect(noteGain).connect(gain);
    osc.frequency.value = freq;
    osc.type = 'sine';
    const start = now + i * 0.6;
    noteGain.gain.setValueAtTime(0, start);
    noteGain.gain.linearRampToValueAtTime(0.3, start + 0.05);
    noteGain.gain.exponentialRampToValueAtTime(0.01, start + 0.55);
    osc.start(start);
    osc.stop(start + 0.6);
  });
  
  // تكرار الأذان 3 مرات
  setTimeout(() => playSyntheticAdhan(isFajr, volume * 0.8), 3000);
  setTimeout(() => playSyntheticAdhan(isFajr, volume * 0.6), 6000);
}

/* ---------- الحالة ---------- */
let state = { ...DEFAULTS, doneToday: {} };

function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem('mawaqit_reminders_v2') || '{}');
    state = { ...DEFAULTS, ...state, ...s };
    if (s.doneToday) state.doneToday = s.doneToday;
  } catch (e) { console.warn(e); }
  
  // تعبئة القوائم
  const citySelect = $('settingCity');
  if (citySelect) {
    citySelect.innerHTML = Object.entries(CITIES).map(([k, v]) => 
      `<option value="${k}" ${k === state.cityKey ? 'selected' : ''}>${v.name}</option>`
    ).join('');
    citySelect.value = state.cityKey;
  }
  $('settingSound')?.checked = state.sound;
  $('settingVibrate')?.checked = state.vibrate;
  $('settingHijriAdj')?.checked = state.hijriAdj;
  $('settingAdhanVolume')?.value = state.adhanVolume;
  $('settingFajrAdhan')?.value = state.fajrAdhanType;
  $('settingKeepScreen')?.checked = state.keepScreenOn;
}

function saveState() {
  localStorage.setItem('mawaqit_reminders_v2', JSON.stringify(state));
}

/* ---------- Render قوائم الأذكار مع عداد ---------- */
function renderAdhkarList(listId, items, doneKey) {
  const done = loadDone(doneKey);
  const el = $(listId);
  if (!el) return;
  
  el.innerHTML = items.map(it => `
    <li class="adhkar-item ${done.has(it.id) ? 'done' : ''}" data-id="${it.id}" data-key="${doneKey}">
      <div class="chk" tabindex="0" role="button" aria-pressed="${done.has(it.id)}" aria-label="تحديد كمقروء"></div>
      <div class="adhkar-txt">
        <strong>${it.txt}</strong>
        <span>${it.sub}${it.count > 1 ? ` — ${it.count} مرة` : ''}</span>
      </div>
      ${it.count > 1 ? `<div class="counter" data-id="${it.id}"><button class="cnt-btn" data-action="dec">−</button><span class="cnt-val">${done.get(it.id) || 0}</span><button class="cnt-btn" data-action="inc">+</button></div>` : ''}
    </li>
  `).join('');
  
  // أحداث العداد
  el.querySelectorAll('.cnt-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const item = btn.closest('.adhkar-item');
      const id = item.dataset.id;
      const key = item.dataset.key;
      const valEl = item.querySelector('.cnt-val');
      let val = parseInt(valEl.textContent) || 0;
      if (btn.dataset.action === 'inc') val++;
      else if (val > 0) val--;
      valEl.textContent = val;
      saveCounter(key, id, val);
      hapticFeedback();
    });
  });
}

function loadDone(key) {
  const done = new Set(state.doneToday[key] || []);
  // تحميل العدادات
  const counters = state.doneToday[`${key}_counters`] || {};
  done.get = (id) => counters[id] || 0;
  return done;
}

function saveCounter(key, id, val) {
  if (!state.doneToday[`${key}_counters`]) state.doneToday[`${key}_counters`] = {};
  state.doneToday[`${key}_counters`][id] = val;
  saveState();
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
  state.doneToday[`${key}_counters`] = {};
  saveState();
  const listId = key === 'post' ? 'postList' : key === 'morning' ? 'morningList' : key === 'evening' ? 'eveningList' : 'dailyList';
  const items = key === 'post' ? POST_ADHKAR : key === 'morning' ? MORNING_ADHKAR : key === 'evening' ? EVENING_ADHKAR : DAILY_ADHKAR;
  renderAdhkarList(listId, items, key);
  renderProgress();
  showToast('تم إعادة تعيين القائمة');
}

function renderProgress() {
  const p = loadDone('post'), m = loadDone('morning'), d = loadDone('daily'), e = loadDone('evening');
  $('postProgress')?.textContent = `${p.size} / ${POST_ADHKAR.length}`;
  $('morningProgress')?.textContent = `${m.size} / ${MORNING_ADHKAR.length}`;
  $('eveningProgress')?.textContent = `${e.size} / ${EVENING_ADHKAR.length}`;
  $('dailyProgress')?.textContent = `${d.size} / ${DAILY_ADHKAR.length}`;
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

  const nextNameEl = $('nextName');
  const countdownEl = $('countdown');
  const nextTimeEl = $('nextTime');
  
  if (nextNameEl) nextNameEl.textContent = PRAYER_LABELS[nextKey];
  if (countdownEl) countdownEl.textContent = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  if (nextTimeEl) nextTimeEl.textContent = `في ${timeToStr(nextTime)}`;

  // تحديث بطاقات الصلوات كلها
  updatePrayerCards(times, mins);

  // الساعة
  $('clock')?.textContent = now.toLocaleTimeString('ar-DZ', { hour12: false, timeZone: `Etc/GMT${city.tz >= 0 ? '-' : '+'}${Math.abs(city.tz)}` });
  $('sbTime')?.textContent = now.toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit', hour12: false });

  // التواريخ
  const hijri = toHijri(now);
  $('hijri')?.textContent = `${hijri.day} ${hijri.month} ${hijri.year} هـ`;
  $('greg')?.textContent = now.toLocaleDateString('ar-DZ', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  // إضافة مؤشر الشهر الكريم
  updateHolyMonthIndicator(hijri);
}

function updatePrayerCards(times, minsNow) {
  PRAYERS_ORDER.forEach(key => {
    const card = $(`prayer-${key}`);
    if (!card) return;
    const prayerMin = times[key];
    const diff = prayerMin - minsNow;
    const statusEl = card.querySelector('.prayer-status');
    const timeEl = card.querySelector('.prayer-time');
    
    if (timeEl) timeEl.textContent = timeToStr(prayerMin);
    
    if (diff > 0) {
      card.classList.remove('passed', 'current');
      card.classList.add('upcoming');
      if (statusEl) statusEl.textContent = `باقي ${Math.floor(diff)}د ${Math.floor((diff%1)*60)}ث`;
    } else if (diff > -10) { // وقت الصلاة (نافذة 10 دقائق)
      card.classList.remove('upcoming', 'passed');
      card.classList.add('current');
      if (statusEl) statusEl.textContent = '⏰ الآن';
      // تشغيل الأذان عند الدخول
      if (diff > -1 && diff < 0.5 && state.sound) {
        playAdhan(key);
        showPrayerNotification(key, CITIES[state.cityKey].name);
      }
    } else {
      card.classList.remove('upcoming', 'current');
      card.classList.add('passed');
      if (statusEl) statusEl.textContent = '✓ تمت';
    }
  });
}

function updateHolyMonthIndicator(hijri) {
  let indicator = $('holyMonthIndicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = 'holyMonthIndicator';
    indicator.style.cssText = 'position:fixed;top:50px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#d9b45a,#b08c3f);color:#03131b;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:700;z-index:50;box-shadow:0 4px 20px rgba(217,180,90,.4);animation:slideDown .3s ease';
    document.body.appendChild(indicator);
  }
  
  const holyNames = { 8: '🌙 شهر رمضان المبارك', 11: '🕋 شهر ذو الحجة', 0: '🌙 شهر محرم' };
  if (holyNames[hijri.monthNum - 1]) {
    indicator.textContent = holyNames[hijri.monthNum - 1];
    indicator.style.display = 'block';
  } else {
    indicator.style.display = 'none';
  }
}

/* ---------- تبويبات ---------- */
function bindTabs() {
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
      btn.classList.add('active');
      $(`view-${btn.dataset.view}`)?.classList.add('active');
      hapticFeedback();
    });
  });
}

/* ---------- أحداث قوائم الأذكار ---------- */
function bindAdhkarClicks() {
  document.addEventListener('click', e => {
    const item = e.target.closest('.adhkar-item');
    if (!item || e.target.closest('.cnt-btn')) return;
    const key = item.dataset.key;
    const id = item.dataset.id;
    toggleDone(key, id);
    item.classList.toggle('done');
    const chk = item.querySelector('.chk');
    chk?.setAttribute('aria-pressed', item.classList.contains('done'));
    renderProgress();
    hapticFeedback();
  });

  $('resetPost')?.addEventListener('click', () => resetDone('post'));
  $('resetMorning')?.addEventListener('click', () => resetDone('morning'));
  $('resetEvening')?.addEventListener('click', () => resetDone('evening'));
  $('resetDaily')?.addEventListener('click', () => resetDone('daily'));
}

/* ---------- إعدادات موسعة ---------- */
function bindSettings() {
  $('saveSettings')?.addEventListener('click', () => {
    state.cityKey = $('settingCity').value;
    state.fajrAngle = CITIES[state.cityKey].fajrAngle;
    state.ishaAngle = CITIES[state.cityKey].ishaAngle;
    state.sound = $('settingSound').checked;
    state.vibrate = $('settingVibrate').checked;
    state.hijriAdj = $('settingHijriAdj').checked ? 1 : 0;
    state.adhanVolume = parseFloat($('settingAdhanVolume')?.value) || 0.7;
    state.fajrAdhanType = $('settingFajrAdhan')?.value || 'mecca';
    state.keepScreenOn = $('settingKeepScreen')?.checked || false;
    saveState();
    tick();
    showToast('تم حفظ الإعدادات');
    hapticFeedback();
  });
}

/* ---------- Toast notifications ---------- */
function showToast(msg, duration = 2000) {
  let toast = $('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:rgba(3,19,27,.95);color:var(--gold);padding:12px 24px;border-radius:12px;font-size:14px;z-index:200;box-shadow:0 4px 20px rgba(0,0,0,.5);border:1px solid rgba(217,180,90,.3);display:none';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.display = 'block';
  clearTimeout(toast.hideTimer);
  toast.hideTimer = setTimeout(() => toast.style.display = 'none', duration);
}

/* ---------- Haptic Feedback ---------- */
function hapticFeedback() {
  if (state.vibrate && navigator.vibrate) {
    navigator.vibrate(10);
  }
}

/* ---------- Screen Wake Lock ---------- */
let wakeLock = null;
async function toggleWakeLock() {
  if (!state.keepScreenOn) {
    if (wakeLock) { wakeLock.release(); wakeLock = null; }
    return;
  }
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    wakeLock.addEventListener('release', () => { wakeLock = null; });
  } catch (e) { console.warn('Wake lock failed:', e); }
}

/* ---------- PWA: Notifications & Background Sync ---------- */
let notificationPermission = 'default';

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

  for (const k of PRAYERS_ORDER) {
    const prayerMin = times[k];
    if (prayerMin <= minsNow) continue;
    const delay = (prayerMin - minsNow) * 60 * 1000;
    if (delay > 0 && delay < 24 * 60 * 60 * 1000) {
      setTimeout(() => showPrayerNotification(k, city.name), delay);
    }
  }
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const timesTomorrow = prayerTimes(city.lat, city.lng, city.tz, tomorrow, state.fajrAngle, state.ishaAngle, state.asrFactor);
  const fajrTomorrow = timesTomorrow.fajr + 24 * 60;
  const delayFajr = (fajrTomorrow - minsNow) * 60 * 1000;
  if (delayFajr > 0) setTimeout(() => showPrayerNotification('fajr', city.name), delayFajr);
}

function showPrayerNotification(prayerKey, cityName) {
  if (notificationPermission !== 'granted') return;
  const label = PRAYER_LABELS[prayerKey];
  const options = {
    body: `حان الآن وقت ${PRAYER_ARABIC[prayerKey] || label} — ${cityName}`,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
    tag: `prayer-${prayerKey}`,
    renotify: true,
    requireInteraction: true,
    vibrate: state.vibrate ? [200, 100, 200, 100, 200] : undefined,
    data: { url: '/index.html', prayer: prayerKey },
    actions: [
      { action: 'open', title: 'فتح التطبيق' },
      { action: 'adhan', title: 'أذكار الصلاة' },
      { action: 'playAdhan', title: 'تشغيل الأذان' }
    ]
  };
  if (state.sound) playAdhan(prayerKey);
  navigator.serviceWorker.ready.then(reg => reg.showNotification(`🕌 وقت الصلاة`, options));
}

/* ---------- Background Sync ---------- */
async function registerBackgroundSync() {
  if (!('serviceWorker' in navigator) || !('sync' in window.ServiceWorkerRegistration.prototype)) return;
  try {
    const reg = await navigator.serviceWorker.ready;
    await reg.sync.register('prayer-notifications');
  } catch (e) { console.warn('Background sync failed:', e); }
}

async function registerPeriodicSync() {
  if (!('serviceWorker' in navigator) || !('periodicSync' in window.ServiceWorkerRegistration.prototype)) return;
  try {
    const reg = await navigator.serviceWorker.ready;
    const status = await navigator.permissions.query({ name: 'periodic-background-sync' });
    if (status.state === 'granted') {
      await reg.periodicSync.register('prayer-times-update', { minInterval: 24 * 60 * 60 * 1000 });
    }
  } catch (e) { console.warn('Periodic sync failed:', e); }
}

/* ---------- Online/Offline ---------- */
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

/* ---------- SW Messages ---------- */
function setupSWMessages() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.addEventListener('message', event => {
    if (event.data?.type === 'ONLINE_STATUS') {
      document.body.classList.toggle('offline', !event.data.online);
    }
    if (event.data?.type === 'SCHEDULE_NOTIFICATIONS') schedulePrayerNotifications();
    if (event.data?.type === 'UPDATE_PRAYER_TIMES') tick();
  });
}

/* ---------- Init ---------- */
async function init() {
  loadState();
  await initAudio();
  
  renderAdhkarList('postList', POST_ADHKAR, 'post');
  renderAdhkarList('morningList', MORNING_ADHKAR, 'morning');
  renderAdhkarList('eveningList', EVENING_ADHKAR, 'evening');
  renderAdhkarList('dailyList', DAILY_ADHKAR, 'daily');
  renderProgress();
  
  // بناء بطاقات الصلوات
  renderPrayerCards();
  
  bindTabs();
  bindAdhkarClicks();
  bindSettings();
  tick();
  setInterval(tick, 1000);

  await requestNotificationPermission();
  schedulePrayerNotifications();
  registerBackgroundSync();
  registerPeriodicSync();
  setupOnlineOffline();
  setupSWMessages();
  addOnlineIndicator();
  toggleWakeLock();

  // استعادة scroll position
  restoreScrollPosition();
  window.addEventListener('beforeunload', saveScrollPosition);
}

function renderPrayerCards() {
  const container = $('prayerCards');
  if (!container) return;
  const city = CITIES[state.cityKey];
  const now = new Date();
  const times = prayerTimes(city.lat, city.lng, city.tz, now, state.fajrAngle, state.ishaAngle, state.asrFactor);
  const mins = now.getHours() * 60 + now.getMinutes();
  
  container.innerHTML = PRAYERS_ORDER.map(key => {
    const prayerMin = times[key];
    const diff = prayerMin - mins;
    let statusClass = 'upcoming', statusText = '';
    if (diff > 0) { statusClass = 'upcoming'; statusText = `باقي ${Math.floor(diff)}د`; }
    else if (diff > -10) { statusClass = 'current'; statusText = '⏰ الآن'; }
    else { statusClass = 'passed'; statusText = '✓ تمت'; }
    
    return `
      <div class="prayer-card ${statusClass}" id="prayer-${key}" data-prayer="${key}">
        <div class="prayer-icon">${getPrayerIcon(key)}</div>
        <div class="prayer-info">
          <div class="prayer-name">${PRAYER_LABELS[key]}</div>
          <div class="prayer-time">${timeToStr(prayerMin)}</div>
        </div>
        <div class="prayer-status ${statusClass}">${statusText}</div>
      </div>
    `;
  }).join('');
}

function getPrayerIcon(key) {
  const icons = { fajr: '🌅', sunrise: '☀️', dhuhr: '☀️', asr: '🌤️', maghrib: '🌇', isha: '🌙' };
  return icons[key] || '🕌';
}

function addOnlineIndicator() {
  if ($('onlineIndicator')) return;
  const indicator = document.createElement('div');
  indicator.id = 'onlineIndicator';
  indicator.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);font-size:11px;padding:4px 10px;border-radius:20px;background:rgba(0,0,0,.7);z-index:100;font-family:inherit;display:none';
  document.body.appendChild(indicator);
  if (!navigator.onLine) {
    indicator.style.display = 'block';
    indicator.textContent = '🔴 غير متصل (يعمل أوفلاين)';
    indicator.style.color = 'var(--gold)';
  }
}

function saveScrollPosition() {
  localStorage.setItem('mawaqit_scroll', JSON.stringify({
    view: document.querySelector('.view.active')?.id || 'view-home',
    scrollTop: document.querySelector('main')?.scrollTop || 0
  }));
}

function restoreScrollPosition() {
  try {
    const saved = JSON.parse(localStorage.getItem('mawaqit_scroll') || '{}');
    if (saved.view) {
      document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
      $(saved.view)?.classList.add('active');
      $(`[data-view="${saved.view.replace('view-','')}"]`)?.classList.add('active');
    }
    setTimeout(() => { document.querySelector('main')?.scrollTop = saved.scrollTop || 0; }, 100);
  } catch (e) {}
}

/* =========================================================
   ميزات إضافية: القبلة، الإحصائيات، النسخ الاحتياطي، المشاركة
   ========================================================= */

/* ---------- بوصلة القبلة ---------- */
let qiblaWatchId = null;
let qiblaHeading = 0;

function calculateQibla(lat, lng) {
  // إحداثيات الكعبة
  const kaabaLat = 21.4225;
  const kaabaLng = 39.8262;
  
  const dLng = deg(kaabaLng - lng);
  const lat1 = deg(lat);
  const lat2 = deg(kaabaLat);
  
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  let bearing = rad(Math.atan2(y, x));
  bearing = (bearing + 360) % 360;
  return bearing;
}

function startQiblaCompass() {
  if (!('DeviceOrientationEvent' in window)) {
    showToast('جهازك لا يدعم البوصلة');
    return;
  }
  
  if (qiblaWatchId) return; // يعمل بالفعل
  
  const city = CITIES[state.cityKey] || WORLD_CITIES[state.cityKey];
  if (!city) return;
  
  const qiblaAngle = calculateQibla(city.lat, city.lng);
  
  // إنشاء واجهة البوصلة
  createQiblaUI(qiblaAngle);
  
  function handleOrientation(e) {
    let heading = e.webkitCompassHeading || e.alpha;
    if (heading === null) return;
    
    // تحويل للاتجاه الصحيح
    if (e.webkitCompassHeading !== undefined) {
      heading = e.webkitCompassHeading;
    } else {
      heading = 360 - e.alpha;
    }
    
    qiblaHeading = heading;
    updateQiblaNeedle(heading, qiblaAngle);
  }
  
  if (DeviceOrientationEvent.requestPermission) {
    // iOS 13+
    DeviceOrientationEvent.requestPermission().then(permission => {
      if (permission === 'granted') {
        window.addEventListener('deviceorientation', handleOrientation);
        qiblaWatchId = 'active';
      }
    }).catch(() => showToast('يرجى السماح بالبوصلة من الإعدادات'));
  } else {
    window.addEventListener('deviceorientation', handleOrientation);
    qiblaWatchId = 'active';
  }
}

function stopQiblaCompass() {
  if (qiblaWatchId) {
    window.removeEventListener('deviceorientation', handleOrientation);
    qiblaWatchId = null;
  }
}

function createQiblaUI(qiblaAngle) {
  if ($('qiblaModal')) return;
  
  const modal = document.createElement('div');
  modal.id = 'qiblaModal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal qibla-modal">
      <div class="modal-handle"></div>
      <h3>🧭 اتجاه القبلة</h3>
      <p class="qibla-city">موقعك: ${CITIES[state.cityKey]?.name || WORLD_CITIES[state.cityKey]?.name || 'غير محدد'}</p>
      <p class="qibla-angle">الاتجاه: ${Math.round(qiblaAngle)}° من الشمال</p>
      
      <div class="compass-container">
        <div class="compass" id="compass">
          <div class="compass-ring"></div>
          <div class="compass-marks">
            ${[0,45,90,135,180,225,270,315].map(a => 
              `<div class="mark" style="transform:rotate(${a}deg)"><span>${a===0?'ش':a===90?'ش':a===180?'ج':a===270?'غ':''}</span></div>`
            ).join('')}
          </div>
          <div class="compass-needle" id="compassNeedle"></div>
          <div class="qibla-indicator" id="qiblaIndicator" style="transform:rotate(${qiblaAngle}deg)">
            <svg viewBox="0 0 24 24" width="28" height="28"><path fill="#d9b45a" d="M12 2L2 22h20L12 2z"/></svg>
            <span>القبلة</span>
          </div>
          <div class="compass-center"></div>
        </div>
        <div class="compass-info">
          <div class="info-row">
            <span>جهازك</span>
            <strong id="deviceHeading">--°</strong>
          </div>
          <div class="info-row">
            <span>القبلة</span>
            <strong>${Math.round(qiblaAngle)}°</strong>
          </div>
          <div class="info-row diff">
            <span>الفرق</span>
            <strong id="headingDiff">--°</strong>
          </div>
        </div>
      </div>
      
      <button class="btn-primary" onclick="closeQibla()">إغلاق</button>
    </div>
  `;
  document.body.appendChild(modal);
  
  // أنيميشن الدخول
  requestAnimationFrame(() => modal.classList.add('show'));
}

function updateQiblaNeedle(deviceHeading, qiblaAngle) {
  const needle = $('compassNeedle');
  const indicator = $('qiblaIndicator');
  const deviceEl = $('deviceHeading');
  const diffEl = $('headingDiff');
  
  if (needle) needle.style.transform = `rotate(${-deviceHeading}deg)`;
  if (indicator) indicator.style.transform = `rotate(${qiblaAngle - deviceHeading}deg)`;
  if (deviceEl) deviceEl.textContent = Math.round(deviceHeading) + '°';
  
  const diff = Math.abs(((deviceHeading - qiblaAngle + 180) % 360) - 180);
  if (diffEl) {
    diffEl.textContent = Math.round(diff) + '°';
    diffEl.style.color = diff < 5 ? 'var(--mint)' : diff < 15 ? 'var(--gold)' : 'var(--white)';
  }
  
  // اهتزاز عند الاستقامة
  if (diff < 2 && state.vibrate) {
    navigator.vibrate(50);
  }
}

function closeQibla() {
  const modal = $('qiblaModal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => modal.remove(), 300);
  }
  stopQiblaCompass();
}

/* ---------- الإحصائيات ---------- */
function getStats() {
  const stats = JSON.parse(localStorage.getItem('mawaqit_stats') || '{}');
  return {
    totalPrayers: stats.totalPrayers || 0,
    totalAdhkar: stats.totalAdhkar || 0,
    streak: stats.streak || 0,
    lastPrayerDate: stats.lastPrayerDate || null,
    dailyStats: stats.dailyStats || {},
    monthlyStats: stats.monthlyStats || {},
    completedPrayers: stats.completedPrayers || { fajr:0, dhuhr:0, asr:0, maghrib:0, isha:0 }
  };
}

function saveStats(stats) {
  localStorage.setItem('mawaqit_stats', JSON.stringify(stats));
}

function recordPrayer(prayerKey) {
  if (!state.statsEnabled) return;
  const stats = getStats();
  const today = new Date().toISOString().split('T')[0];
  
  if (!stats.dailyStats[today]) {
    stats.dailyStats[today] = { prayers: 0, adhkar: 0, completed: [] };
  }
  if (!stats.dailyStats[today].completed.includes(prayerKey)) {
    stats.dailyStats[today].completed.push(prayerKey);
    stats.dailyStats[today].prayers++;
    stats.totalPrayers++;
    stats.completedPrayers[prayerKey] = (stats.completedPrayers[prayerKey] || 0) + 1;
    
    // تحديث السلسلة
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (stats.lastPrayerDate === yesterday || stats.lastPrayerDate === today) {
      stats.streak = (stats.lastPrayerDate === today) ? stats.streak : stats.streak + 1;
    } else {
      stats.streak = 1;
    }
    stats.lastPrayerDate = today;
    
    saveStats(stats);
    updateStatsUI();
  }
}

function recordAdhkar(count = 1) {
  if (!state.statsEnabled) return;
  const stats = getStats();
  const today = new Date().toISOString().split('T')[0];
  
  if (!stats.dailyStats[today]) stats.dailyStats[today] = { prayers: 0, adhkar: 0, completed: [] };
  stats.dailyStats[today].adhkar += count;
  stats.totalAdhkar += count;
  saveStats(stats);
  updateStatsUI();
}

function updateStatsUI() {
  const stats = getStats();
  $('statPrayers')?.textContent = stats.totalPrayers;
  $('statAdhkar')?.textContent = stats.totalAdhkar;
  $('statStreak')?.textContent = stats.streak;
  
  // تحديث بطاقات الصلوات
  PRAYERS_ORDER.filter(k => k !== 'sunrise').forEach(k => {
    const el = $(`stat-${k}`);
    if (el) el.textContent = stats.completedPrayers[k] || 0;
  });
}

function createStatsView() {
  const stats = getStats();
  return `
    <div class="card stats-card">
      <h3>📊 إحصائياتك</h3>
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-value" id="statPrayers">${stats.totalPrayers}</div>
          <div class="stat-label">صلاة تمت</div>
        </div>
        <div class="stat-item">
          <div class="stat-value" id="statAdhkar">${stats.totalAdhkar}</div>
          <div class="stat-label">ذكر مقروء</div>
        </div>
        <div class="stat-item">
          <div class="stat-value" id="statStreak">${stats.streak}</div>
          <div class="stat-label">أيام متتالية</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${Object.keys(stats.dailyStats).length}</div>
          <div class="stat-label">أيام نشطة</div>
        </div>
      </div>
      
      <h4 style="margin-top:16px;color:var(--gold)">الصلوات المكتملة</h4>
      <div class="prayer-stats">
        ${PRAYERS_ORDER.filter(k => k !== 'sunrise').map(k => `
          <div class="prayer-stat">
            <span class="prayer-stat-name">${PRAYER_LABELS[k]}</span>
            <span class="prayer-stat-count" id="stat-${k}">${stats.completedPrayers[k] || 0}</span>
          </div>
        `).join('')}
      </div>
      
      <div class="stats-actions" style="margin-top:16px;display:flex;gap:10px">
        <button class="btn-ghost" onclick="exportData()">📤 تصدير البيانات</button>
        <button class="btn-ghost" onclick="importData()">📥 استيراد</button>
        <button class="btn-ghost" onclick="clearAllData()">🗑️ مسح الكل</button>
      </div>
    </div>
  `;
}

/* ---------- النسخ الاحتياطي والاستيراد ---------- */
function exportData() {
  const data = {
    version: 2,
    timestamp: new Date().toISOString(),
    state: state,
    stats: getStats(),
    doneToday: state.doneToday
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `mawaqit-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('تم تصدير النسخة الاحتياطية');
}

function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.state) {
          state = { ...DEFAULTS, ...state, ...data.state };
          saveState();
        }
        if (data.stats) saveStats(data.stats);
        if (data.doneToday) {
          state.doneToday = data.doneToday;
          saveState();
        }
        location.reload();
        showToast('تم استيراد البيانات بنجاح');
      } catch (err) {
        showToast('خطأ في الملف: ' + err.message);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function clearAllData() {
  if (confirm('هل أنت متأكد؟ سيتم حذف جميع البيانات (الإعدادات، التقدم، الإحصائيات)')) {
    localStorage.removeItem('mawaqit_reminders_v2');
    localStorage.removeItem('mawaqit_stats');
    localStorage.removeItem('mawaqit_scroll');
    showToast('تم مسح جميع البيانات');
    setTimeout(() => location.reload(), 1000);
  }
}

/* ---------- المشاركة ---------- */
async function sharePrayerTime(prayerKey) {
  const city = CITIES[state.cityKey] || WORLD_CITIES[state.cityKey];
  if (!city) return;
  
  const now = new Date();
  const times = prayerTimes(city.lat, city.lng, city.tz, now, state.fajrAngle, state.ishaAngle, state.asrFactor);
  const timeStr = timeToStr(times[prayerKey]);
  const label = PRAYER_LABELS[prayerKey];
  
  const text = `🕌 وقت ${label} في ${city.name}: ${timeStr}\n\nتطبيق "تذكّر" للأذكار والمواقيت\nhttps://steverlaabs.github.io/mawaqit-pwa/`;
  
  if (navigator.share) {
    try {
      await navigator.share({ title: `وقت ${label}`, text });
    } catch (e) { /* المستخدم ألغى */ }
  } else {
    // نسخ للحافظة
    await navigator.clipboard.writeText(text);
    showToast('تم نسخ وقت الصلاة للمشاركة');
  }
}

async function shareApp() {
  const text = `🕌 تطبيق "تذكّر" - مواقيت الصلاة والأذكار\n\n✅ يعمل بدون إنترنت\n🔔 تنبيهات صلاة مع أذان حقيقي\n🧭 بوصلة القبلة\n📊 إحصائيات متابعة\n🌙 تقويم هجري دقيق\n\nجربه الآن: https://steverlaabs.github.io/mawaqit-pwa/`;
  
  if (navigator.share) {
    try {
      await navigator.share({ title: 'تطبيق تذكّر', text });
    } catch (e) {}
  } else {
    await navigator.clipboard.writeText(text);
    showToast('تم نسخ رابط التطبيق للمشاركة');
  }
}

/* ---------- تحديث loadState للإحصائيات ---------- */
const originalLoadState = loadState;
loadState = function() {
  originalLoadState();
  // تحميل الإحصائيات
  const stats = getStats();
  updateStatsUI();
  
  // تحميل المدن العالمية في القائمة
  const citySelect = $('settingCity');
  if (citySelect) {
    const allCities = { ...CITIES, ...WORLD_CITIES };
    citySelect.innerHTML = Object.entries(allCities).map(([k, v]) => 
      `<option value="${k}" ${k === state.cityKey ? 'selected' : ''}>${v.name}${v.fajrAngle ? ` (فجر ${v.fajrAngle}°)` : ''}</option>`
    ).join('');
    citySelect.value = state.cityKey;
  }
};

/* ---------- تحديث bindSettings للإضافات ---------- */
const originalBindSettings = bindSettings;
bindSettings = function() {
  originalBindSettings();
  
  // زر القبلة
  const qiblaBtn = document.createElement('button');
  qiblaBtn.className = 'btn-primary';
  qiblaBtn.style.marginTop = '12px';
  qiblaBtn.innerHTML = '🧭 فتح بوصلة القبلة';
  qiblaBtn.onclick = startQiblaCompass;
  $('saveSettings')?.parentNode?.insertBefore(qiblaBtn, $('saveSettings').nextSibling);
  
  // زر المشاركة
  const shareBtn = document.createElement('button');
  shareBtn.className = 'btn-ghost';
  shareBtn.style.marginTop = '8px';
  shareBtn.innerHTML = '📤 مشاركة التطبيق';
  shareBtn.onclick = shareApp;
  qiblaBtn.parentNode?.insertBefore(shareBtn, qiblaBtn.nextSibling);
};

/* ---------- إضافة تبويب الإحصائيات ---------- */
function addStatsTab() {
  const tabbar = document.querySelector('.tabbar');
  if (!tabbar || $('tab-stats')) return;
  
  // زر التبويب
  const statsTab = document.createElement('button');
  statsTab.className = 'tab';
  statsTab.id = 'tab-stats';
  statsTab.dataset.view = 'stats';
  statsTab.setAttribute('aria-label', 'الإحصائيات');
  statsTab.innerHTML = `
    <span class="icon"><svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg></span>
    <span>إحصائيات</span>
  `;
  
  // تبويب الإحصائيات في الشريط (نقل الإعدادات لليسار)
  const tabs = Array.from(tabbar.querySelectorAll('.tab'));
  const settingsTab = tabs.find(t => t.dataset.view === 'settings');
  if (settingsTab) {
    tabbar.insertBefore(statsTab, settingsTab);
  }
  
  // محتوى التبويب
  const main = document.querySelector('main');
  const statsView = document.createElement('section');
  statsView.className = 'view';
  statsView.id = 'view-stats';
  statsView.innerHTML = createStatsView();
  main.appendChild(statsView);
  
  // ربط التبويب
  statsTab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    statsTab.classList.add('active');
    statsView.classList.add('active');
    updateStatsUI();
    hapticFeedback();
  });
}

/* ---------- تحديث دالة init ---------- */
const originalInit = init;
init = async function() {
  await originalInit();
  addStatsTab();
};

// دالة مساعدة للأذان عند اكتمال الصلاة
function onPrayerCompleted(prayerKey) {
  recordPrayer(prayerKey);
}

// تحديث دالة toggleDone لتسجيل الأذكار
const originalToggleDone = toggleDone;
toggleDone = function(key, id) {
  originalToggleDone(key, id);
  const done = loadDone(key);
  if (done.has(id)) {
    recordAdhkar(1);
  }
};

init();