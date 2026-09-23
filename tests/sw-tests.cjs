const vm=require('vm'),fs=require('fs'),assert=require('assert');
(async()=>{const listeners={},cacheMap=new Map(),deleted=[];let claimed=false,skipped=false,offline=false;
const caches={open:async name=>{if(!cacheMap.has(name)){let items=new Map();cacheMap.set(name,{items,addAll:async urls=>urls.forEach(u=>items.set(u,{ok:true,label:u})),match:async req=>items.get(typeof req==='string'?req:req.url),put:async(req,r)=>items.set(req.url,r)});}return cacheMap.get(name)},keys:async()=>[...cacheMap.keys()],delete:async k=>{deleted.push(k);return cacheMap.delete(k)}};
const ctx={URL,Response,console,location:{origin:'https://hun.test'},caches,fetch:async req=>{if(offline)throw Error('offline');return {ok:true,clone(){return this;}}},self:{registration:{scope:'https://hun.test/sub/'},addEventListener:(n,f)=>listeners[n]=f,clients:{claim:async()=>claimed=true},skipWaiting:()=>skipped=true}};vm.createContext(ctx);vm.runInContext(fs.readFileSync(__dirname+'/../sw.js','utf8'),ctx);
async function life(n){let promise;listeners[n]({waitUntil:p=>promise=p});await promise;}
await caches.open('unrelated-cache');await caches.open('hun-%2Fsub%2F-core-0.8.0');await life('install');assert(!skipped);await life('activate');assert(claimed);assert(cacheMap.has('unrelated-cache'));assert(deleted.includes('hun-%2Fsub%2F-core-0.8.0'));console.log('PASS service worker install, update gate, scoped cleanup');
async function request(url,mode='cors'){let promise;listeners.fetch({request:{url,method:'GET',mode},respondWith:p=>promise=p});return promise;}
offline=true;const nav=await request('https://hun.test/sub/','navigate');assert.equal(nav.label,'./index.html');const missing=await request('https://hun.test/sub/missing.js');assert.equal(missing.type,'error');console.log('PASS offline navigation fallback and missing JS is never replaced by HTML');
listeners.message({data:{type:'SKIP_WAITING'}});assert(skipped);console.log('PASS explicit update activation');
})();
