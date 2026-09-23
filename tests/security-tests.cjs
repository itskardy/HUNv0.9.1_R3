const fs=require('fs'),vm=require('vm'),assert=require('assert');
const root=__dirname+'/../';let count=0;
const c={};vm.createContext(c);for(const f of ['privacy.js','master-logic.js'])vm.runInContext(fs.readFileSync(root+f,'utf8'),c);
function test(n,f){f();count++;console.log('PASS '+n);}
test('privacy: raw free text and clinical detail never pass',()=>{for(const s of ['Sicil 200.123 göğüs ağrısı','70 kg 45 yaş erkek','Adrenalin 0,3 mg','<script>x</script>','göğüs ağrısı hasta Ali','GKS 7','EKG ST V1'])assert.equal(c.HUNPrivacy.clean('search','search',s).detail,'[serbest metin gönderilmedi]');assert.equal(c.HUNPrivacy.clean('dose_use','dose','0,3 mg').detail,'');});
test('privacy: safe exact query and explicit algorithm codes',()=>{assert.equal(c.HUNPrivacy.clean('search','search','Göğüs ağrısı terleme').detail,'gogus agrisi terleme');assert.equal(c.HUNPrivacy.clean('algorithm_open','algorithm','SB-ASH-DY-05').detail,'SB-ASH-DY-05');assert.equal(c.HUNPrivacy.clean('patient_data','patient','a'),null);});
test('ECG: adult boundaries do not depend on rounded display',()=>{for(const [rate,classification] of [[59.99,'Bradikardi'],[60,'Normal'],[100,'Normal'],[100.01,'Taşikardi']])assert(c.HUNMasterLogic.ecg({ecgDirectRate:rate,ecgGroup:'adult'}).classification.startsWith(classification));});
test('ECG: brady never routes to tachy and pediatric not classified by adult thresholds',()=>{assert(!c.HUNMasterLogic.ecg({ecgDirectRate:40,ecgGroup:'adult',ecgWidth:'wide'}).codes.includes('SB-ASH-Y-08'));assert.equal(c.HUNMasterLogic.ecg({ecgDirectRate:140,ecgGroup:'child'}).codes.length,0);});
test('ECG: 25/50 mm speed, contradiction and multi-possibility',()=>{assert.equal(c.HUNMasterLogic.ecg({ecgRegular:'yes',ecgRrBoxes:20,ecgSpeed:25}).rate,75);assert.equal(c.HUNMasterLogic.ecg({ecgRegular:'yes',ecgRrBoxes:20,ecgSpeed:50}).rate,150);assert.equal(c.HUNMasterLogic.ecg({ecgWidth:'wide',ecgQrsBoxes:2,ecgSpeed:25}).width,null);const e=c.HUNMasterLogic.ecg({ecgDirectRate:160,ecgGroup:'adult',ecgWidth:'wide',st:{V1:'elevation'}});assert(e.codes.includes('SB-ASH-Y-06')&&e.codes.includes('SB-ASH-Y-08'));assert.equal(e.st.V1,'elevation');});
test('MAP and shock index: valid math, missing fields, zero divisor',()=>{const e=c.HUNMasterLogic.hemodynamics(90,60,120);assert.equal(e.map,70);assert.equal(e.shockIndex,120/90);assert.equal(c.HUNMasterLogic.hemodynamics(0,0,120).shockIndex,null);assert.equal(c.HUNMasterLogic.hemodynamics('','','').map,null);assert(c.HUNMasterLogic.hemodynamics(60,90,100).invalidPressure);});
(async()=>{
 const ctx={Response,Request,TextDecoder,Uint8Array,URL,Number,console};vm.createContext(ctx);
 vm.runInContext(fs.readFileSync(root+'functions/api/_shared.js','utf8').replace(/export /g,''),ctx);
 vm.runInContext(fs.readFileSync(root+'functions/api/analytics.js','utf8').replace(/^import .*\n/,'').replace(/export /g,''),ctx);
 let writes=[];const env={ANALYTICS_ENABLED:'true',HUN_ANALYTICS:{writeDataPoint:x=>writes.push(x)}};
 const valid={event:'search',screen:'search',detail:'gogus agrisi',version:'0.9.1',device:'mobile'};
 async function call(b,origin='https://hun.test'){const request=new Request('https://hun.test/api/analytics',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify(b)});return ctx.onRequest({request,env});}
 for(const b of [{...valid,age:40},{...valid,detail:'Adrenalin 1 mg'},{...valid,event:'dose_use',detail:'12 kg'},{...valid,screen:'Sicil 200'}])assert.equal((await call(b)).status,400);
 assert.equal(writes.length,0);console.log('PASS backend rejects patient fields, arbitrary searches and clinical event detail');count++;
 assert.equal((await call(valid,'https://evil.test')).status,403);assert.equal((await call(valid)).status,200);assert.equal(writes.length,1);assert.equal(writes[0].blobs.length,6);console.log('PASS backend origin enforcement and strict output schema');count++;
 console.log(JSON.stringify({passed:count}));
})().catch(e=>{console.error(e);process.exitCode=1});
