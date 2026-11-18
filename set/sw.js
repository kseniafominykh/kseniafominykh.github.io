// Old /set location: clean up and step aside. The app now lives at /set-app/.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const old = Array.from({ length: 10 }, (_, i) => 'set-v' + (i + 1));
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => old.includes(k)).map((k) => caches.delete(k)));
    await self.registration.unregister();
    const cs = await self.clients.matchAll({ type: 'window' });
    cs.forEach((c) => c.navigate(c.url));
  })());
});
