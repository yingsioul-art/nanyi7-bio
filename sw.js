const CACHE = "n7bio-20261023163804";
const FILES = ["./", "index.html", "manifest.json", "icon.svg", "fig/cap104_01_圖一.png", "fig/cap105_28_表四.png", "fig/cap106_27_圖十五.png", "fig/cap107_18_圖十.png", "fig/cap108_45_圖二十三.png", "fig/cap109_03_full.webp", "fig/cap109_41_表六.png", "fig/cap110_42_full.webp", "fig/cap112_43_表七.webp", "fig/cap113_41_表十一.png", "fig/cap114_08_圖四.png", "fig/cap114_36_表八.png", "fig/cap115_24_full.webp", "fig/cap115_37_圖二十二.webp", "fig/s112_1_q21.webp", "fig/s112_1_q43.webp", "fig/s112_2_q13.webp", "fig/s112_2_q24.webp", "fig/s112_2_q3.webp", "fig/s112_2_q4.webp", "fig/s112_2_q44.webp", "fig/s112_2_q5.webp", "fig/s113_1_q50.webp", "fig/s113_2_q12.webp", "fig/s113_2_q14.webp", "fig/s113_2_q15.webp", "fig/s113_2_q17.webp", "fig/s113_2_q18.webp", "fig/s113_2_q22.webp", "fig/s113_2_q23.webp", "fig/s113_2_q24.webp", "fig/s113_2_q25.webp", "fig/s113_2_q31.webp", "fig/s113_2_q4.webp", "fig/s114_1_q40.webp", "fig/s114_1_q44.webp", "fig/s114_1_q47.webp", "fig/s114_1_q48.webp", "fig/s114_1_q49.webp", "fig/s114_1_q50.webp", "fig/s114_2_q10.webp", "fig/s114_2_q14.webp", "fig/s114_2_q16.webp", "fig/s114_2_q21.webp", "fig/s114_2_q23.webp", "fig/s114_2_q3.webp", "fig/s114_2_q5.webp", "fig/s114_2_q8.webp"];
self.addEventListener("install", e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(u => new Request(u, {cache: "reload"}))))); });
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || !e.request.url.startsWith(self.location.origin)) return;
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request.url, {cache: "no-store"}).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put("index.html", cp)); return r; }).catch(() => caches.match("index.html")));
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
