// 한울타리 볼링클럽 Service Worker v13 (점수 데이터 정규화 — Firebase 배열깨짐 수정)
// 네트워크 우선 + 설치 시 일부 파일이 없어도 실패하지 않도록 보강(c.add 개별 처리)
const CACHE = 'hanultari-v13';
const ASSETS = ['./', './index.html', './app.js', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(ASSETS.map(u => c.add(u).catch(() => {}))))  // 하나 없어도 설치 계속
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  let url;
  try { url = new URL(e.request.url); } catch (_) { return; }
  if (url.origin !== self.location.origin) return;  // 외부(Firebase·폰트)는 통과
  // 네트워크 우선: 최신 파일을 받아오고, 오프라인이면 캐시로 폴백
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request).then(cached => cached || caches.match('./index.html')))
  );
});
