// GoDental 患者端 Service Worker
const CACHE_NAME = 'godental-patient-v3';
const STATIC_CACHE = 'godental-static-v3';
const DYNAMIC_CACHE = 'godental-dynamic-v3';

// 静态资源缓存列表（均为自托管路径，避免 CDN 依赖）
const STATIC_ASSETS = [
  '/patient/',
  '/patient/index.html',
  '/patient/styles.css',
  '/patient/app.js',
  '/patient/gestures.js',
  '/patient/notifications.js',
  '/vendor/vue/vue.global.js',
  '/vendor/fontawesome/css/all.min.css'
];

// 安装事件 - 缓存静态资源
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch((err) => console.log('[Service Worker] Cache failed:', err))
  );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 获取事件 - 缓存策略
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // 跳过非GET请求
  if (request.method !== 'GET') return;
  
  // API请求使用网络优先策略
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request));
    return;
  }
  
  // 静态资源使用缓存优先策略
  if (isStaticAsset(request)) {
    event.respondWith(cacheFirst(request));
    return;
  }
  
  // 其他请求使用网络回退缓存
  event.respondWith(networkFirst(request));
});

// 缓存优先策略
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    console.log('[Service Worker] Fetch failed:', error);
    // 返回离线页面
    return caches.match('/patient/');
  }
}

// 网络优先策略
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    console.log('[Service Worker] Network failed, trying cache...');
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // 如果是HTML请求，返回离线页面
    if (request.headers.get('accept').includes('text/html')) {
      return caches.match('/patient/');
    }
    
    throw error;
  }
}

// 判断是否为静态资源
function isStaticAsset(request) {
  const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.woff', '.woff2'];
  const url = new URL(request.url);
  return staticExtensions.some(ext => url.pathname.endsWith(ext));
}

// 后台同步
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-appointments') {
    event.waitUntil(syncAppointments());
  }
});

// 同步预约数据
async function syncAppointments() {
  // 从IndexedDB获取待同步的数据并发送
  console.log('[Service Worker] Syncing appointments...');
}

// 推送通知
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/patient/icons/icon-192x192.png',
    badge: '/patient/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: data.data || {},
    actions: data.actions || [],
    requireInteraction: true,
    tag: data.tag || 'default'
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// 通知点击事件
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const notificationData = event.notification.data;
  let url = '/patient/';
  
  if (notificationData.appointmentId) {
    url = `/patient/?action=appointment&id=${notificationData.appointmentId}`;
  }
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      // 如果已有窗口打开，聚焦并导航
      for (const client of clientList) {
        if (client.url.includes('/patient/') && 'focus' in client) {
          return client.navigate(url).then(client => client.focus());
        }
      }
      // 否则打开新窗口
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
