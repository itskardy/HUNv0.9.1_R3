const VERSION='0.9.1-r4';
const PREFIX='hun-'+encodeURIComponent(new URL(self.registration.scope).pathname)+'-';
const CORE=PREFIX+'core-'+VERSION,OFFLINE=PREFIX+'offline-'+VERSION;
const CORE_ASSETS=['./drug-info.js','./privacy.js','./master-logic.js','./master-tools.js','./services.js','./','./index.html','./app.css','./data.js','./clinical-data-v070.js','./app.js','./v090-tools.js','./v091-tools.js','./manifest.webmanifest','./offline-manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CORE).then(c=>c.addAll(CORE_ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX+'core-')&&k!==CORE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);if(url.origin!==location.origin||url.pathname.startsWith(new URL('api/',self.registration.scope).pathname))return;
 event.respondWith((async()=>{
   const core=await caches.open(CORE),offline=await caches.open(OFFLINE);
   const hit=await core.match(event.request)||await offline.match(event.request);if(hit)return hit;
   try{const response=await fetch(event.request);if(response.ok&&/\/page-\d+\.jpg$/.test(url.pathname))await offline.put(event.request,response.clone());return response;}
   catch(error){if(event.request.mode==='navigate')return await core.match('./index.html')||Response.error();return Response.error();}
 })());
});
self.addEventListener('message',e=>{if(e.data?.type==='SKIP_WAITING')self.skipWaiting()});
