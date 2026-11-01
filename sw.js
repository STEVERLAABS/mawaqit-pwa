/* =========================================================
   Service Worker — تذكّر PWA
   يعمل دائماً: offline-first، background sync، push notifications
   ========================================================= */
'use strict';

const CACHE_NAME = 'mawaqit-reminders-v3';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cairo:wght@400;600;800;900&display=swap',
  'https://fonts.gstatic.com/s/amiri/v23/J7aRnpd8CGxBHpUrtL8.woff2',
  'https://fonts.gstatic.com/s/cairo/v24/SLXJc1nY6HkvalDQ4g.woff2'
];

const FONT_REGEX = /fonts\.g(?:oogleapis|static)\.com/;

/* ---------- Install: pre-cache static assets ---------- */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* ---------- Activate: clean old caches ---------- */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* ---------- Fetch: offline-first for static, network-first for fonts ---------- */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET
  if (request.method !== 'GET') return;

  // Fonts: network-first with cache fallback
  if (FONT_REGEX.test(url.hostname)) {
    event.respondWith(
      fetch(request)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(request, copy));
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Static assets: cache-first
  event.respondWith(
    caches.match(request)
      .then(cached => cached || fetch(request)
        .then(res => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(request, copy));
          }
          return res;
        })
        .catch(() => caches.match('/index.html'))) // fallback to shell
  );
});

/* ---------- Background Sync: schedule prayer notifications ---------- */
self.addEventListener('sync', event => {
  if (event.tag === 'prayer-notifications') {
    event.waitUntil(schedulePrayerNotifications());
  }
});

/* ---------- Push Notifications ---------- */
self.addEventListener('push', event => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
    vibrate: [200, 100, 200],
    tag: data.tag || 'prayer',
    renotify: true,
    requireInteraction: true,
    actions: [
      { action: 'open', title: 'فتح التطبيق' },
      { action: 'dismiss', title: 'تجاهل' }
    ],
    data: { url: data.url || '/index.html' }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

/* ---------- Notification Click ---------- */
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            return client.focus();
          }
        }
        return clients.openWindow(event.notification.data?.url || '/index.html');
      })
  );
});

/* ---------- Periodic Background Sync (if supported) ---------- */
self.addEventListener('periodicsync', event => {
  if (event.tag === 'prayer-times-update') {
    event.waitUntil(updatePrayerTimesCache());
  }
});

/* ---------- Helper: schedule next prayer notifications ---------- */
async function schedulePrayerNotifications() {
  const clients = await self.clients.matchAll({ includeUncontrolled: true });
  clients.forEach(client => client.postMessage({ type: 'SCHEDULE_NOTIFICATIONS' }));
}

/* ---------- Helper: update prayer times cache ---------- */
async function updatePrayerTimesCache() {
  // Could fetch from API if online, but we compute locally
  const clients = await self.clients.matchAll({ includeUncontrolled: true });
  clients.forEach(client => client.postMessage({ type: 'UPDATE_PRAYER_TIMES' }));
}

/* ---------- Message from main thread ---------- */
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data?.type === 'SCHEDULE_NOTIFICATIONS') {
    schedulePrayerNotifications();
  }
});

/* ---------- Offline indicator (broadcast to clients) ---------- */
self.addEventListener('online', () => {
  broadcast({ type: 'ONLINE_STATUS', online: true });
});
self.addEventListener('offline', () => {
  broadcast({ type: 'ONLINE_STATUS', online: false });
});

function broadcast(msg) {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => client.postMessage(msg));
  });
}