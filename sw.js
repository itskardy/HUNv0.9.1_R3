const VERSION='0.9.1-r11';

const PREFIX='hun-'+encodeURIComponent(new URL(self.registration.scope).pathname)+'-';
const CORE=PREFIX+'core-'+VERSION;
const OFFLINE=PREFIX+'offline-'+VERSION;

const CORE_ASSETS=[
  './drug-info.js',
  './privacy.js',
  './master-logic.js',
  './master-tools.js',
  './services.js',
  './',
  './index.html',
  './app.css',
  './data.js',
  './clinical-data-v070.js',
  './app.js',
  './v090-tools.js',
  './v091-tools.js',
  './manifest.webmanifest',
  './offline-manifest.json',
  './icon-192.png',
  './icon-512.png'
];

/* Yeni SW kurulduğunda yeni dosyaları cache'e al */
self.addEventListener('install',event=>{
  event.waitUntil(
    caches.open(CORE)
      .then(cache=>cache.addAll(CORE_ASSETS))
      .then(()=>self.skipWaiting())
  );
});

/* Eski HUN core cache'lerini temizle ve kontrolü hemen al */
self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(
        keys
          .filter(key=>key.startsWith(PREFIX+'core-') && key!==CORE)
          .map(key=>caches.delete(key))
      ))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;

  const url=new URL(event.request.url);
  const apiPath=new URL('api/',self.registration.scope).pathname;

  if(url.origin!==location.origin || url.pathname.startsWith(apiPath)) return;

  /*
   * HTML / CSS / JS:
   * İnternet varsa önce güncel dosyayı al.
   * İnternet yoksa cache'e dön.
   */
  const isAppAsset=
    event.request.mode==='navigate' ||
    /\.(?:html|css|js)$/i.test(url.pathname) ||
    url.pathname===new URL('./',self.registration.scope).pathname;

  if(isAppAsset){
    event.respondWith((async()=>{
      const core=await caches.open(CORE);

      try{
        const response=await fetch(event.request,{cache:'no-store'});

        if(response.ok){
          await core.put(event.request,response.clone());
        }

        return response;
      }catch{
        const cached=
          await core.match(event.request) ||
          (event.request.mode==='navigate'
            ? await core.match('./index.html')
            : null);

        return cached || Response.error();
      }
    })());

    return;
  }

  /*
   * Diğer offline içerikler:
   * Cache-first davranışı korunur.
   */
  event.respondWith((async()=>{
    const core=await caches.open(CORE);
    const offline=await caches.open(OFFLINE);

    const cached=
      await core.match(event.request) ||
      await offline.match(event.request);

    if(cached) return cached;

    try{
      const response=await fetch(event.request);

      if(
        response.ok &&
        /\/page-\d+\.jpg$/i.test(url.pathname)
      ){
        await offline.put(event.request,response.clone());
      }

      return response;
    }catch{
      return Response.error();
    }
  })());
});

/* Eski update butonuyla uyumluluğu koru */
self.addEventListener('message',event=>{
  if(event.data?.type==='SKIP_WAITING'){
    self.skipWaiting();
  }
});
