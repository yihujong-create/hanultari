// 한울타리 볼링클럽 Service Worker v11 (오류 표시 안전장치 추가)
// 변경: 캐시-우선 → 네트워크-우선. 온라인에서 새로고침하면 항상 최신 코드를 받는다.
// (이전 캐시-우선 방식은 파일을 새로 올려도 옛 캐시를 먼저 보여줘 수정이 반영되지 않았음)
const CACHE = 'hanultari-v11';
const ASSETS = ['./', './index.html', './app.js', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
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

  // 같은 출처(앱 파일)만 SW가 처리. 외부(Firebase, 구글폰트 등)는 그대로 통과.
  if (url.origin !== self.location.origin) return;

  // 네트워크 우선: 최신 파일을 먼저 시도하고, 성공하면 캐시에 갱신.
  // 오프라인이면 캐시로 폴백(없으면 index.html).
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() =>
        caches.match(e.request).then(cached => cached || caches.match('./index.html'))
      )
  );
});
