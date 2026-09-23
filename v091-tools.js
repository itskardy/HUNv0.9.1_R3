(function(){
'use strict';
const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const pad=n=>String(n).padStart(2,'0');
const nowText=()=>{const d=new Date();return `${pad(d.getDate())}.${pad(d.getMonth()+1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`};
function fillNow(id){const el=q('#'+id);if(!el)return;el.value=nowText();el.dataset.edited='1';el.dispatchEvent(new Event('input',{bubbles:true}));}
qa('[data-now-for]').forEach(b=>b.addEventListener('click',()=>fillNow(b.dataset.nowFor)));

// PWA install flow: shown after successful offline preparation when appropriate.
let deferred=null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferred=e;});
window.addEventListener('appinstalled',()=>{deferred=null;const b=q('#installBtn');if(b)b.style.display='none';});
function isiOS(){return /iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1)}
function isStandalone(){return matchMedia('(display-mode: standalone)').matches||navigator.standalone===true}
function showInstallAfterOffline(){const b=q('#installBtn');if(!b||isStandalone())return;b.style.display='inline-block';b.textContent=isiOS()?'Ana Ekrana Ekle':'Uygulamayı Yükle';b.onclick=async()=>{if(isStandalone()){b.style.display='none';return;}if(deferred){deferred.prompt();await deferred.userChoice;deferred=null;return;}if(isiOS())alert('iPhone / iPad: Paylaş → Ana Ekrana Ekle / Add to Home Screen → Ekle.');else alert('Tarayıcı kurulum istemi şu anda kullanılamıyor. Tarayıcı menüsündeki “Uygulamayı yükle” veya “Ana ekrana ekle” seçeneğini kullanın.');};}

// Patient-specific pinned algorithms.
function caseObj(){return window.HUNV090?.getCase?.()||null}
function pins(){const c=caseObj();if(!c)return [];c.pinnedAlgorithms=Array.isArray(c.pinnedAlgorithms)?c.pinnedAlgorithms:[];return c.pinnedAlgorithms}
function renderPins(){const root=q('#patientPinnedAlgos');if(!root)return;const c=caseObj();if(!c){root.innerHTML='<div class="empty">Aktif hasta oluşturulduğunda algoritmalar buraya sabitlenebilir.</div>';return;}const arr=pins();if(!arr.length){root.innerHTML='<div class="empty">Henüz algoritma sabitlenmedi.</div>';return;}root.innerHTML=arr.map(code=>{const a=window.HUNApp091?.algoByCode?.(code);return a?`<div class="pinnedAlgo"><button class="openPinned" data-code="${esc(code)}"><b>${esc(a.title)}</b><small>${esc(a.code)}</small></button><button class="removePinned" data-code="${esc(code)}" aria-label="Hızlı erişimden kaldır">×</button></div>`:''}).join('');qa('.openPinned').forEach(b=>b.onclick=()=>{const a=window.HUNApp091.algoByCode(b.dataset.code);if(a)window.HUNApp091.openAlgo(a)});qa('.removePinned').forEach(b=>b.onclick=()=>{const c=caseObj();c.pinnedAlgorithms=pins().filter(x=>x!==b.dataset.code);window.HUNV090.persist();renderPins();syncPinButton(window.HUNApp091?.state?.detail?.type==='algo'?window.HUNApp091.algoByCode(window.HUNApp091.state.detail.id):null);});}
function syncPinButton(a){const b=q('#patientPinAlgo');if(!b)return;if(!a||!caseObj()){b.style.display='none';return;}b.style.display='inline-block';const yes=pins().includes(a.code);b.textContent=yes?'Hızlı erişimde ✓':'Hızlı erişime ekle';b.classList.toggle('active',yes);b.onclick=()=>{const c=caseObj();if(!c)return;const p=pins();c.pinnedAlgorithms=p.includes(a.code)?p.filter(x=>x!==a.code):[...p,a.code];window.HUNV090.persist();renderPins();syncPinButton(a);};}

// Assessment editing: update existing record rather than create a duplicate.
let editing=null;
function setChoice(groupKey,value){const group=q(`[data-choice="${groupKey}"]`);if(!group)return;group.querySelectorAll('button').forEach(b=>{b.classList.toggle('active',b.dataset.value===value);if(b.dataset.value===value)b.click();});}
function editAssessment(e){if(!e||e.type!=='assessment')return;editing=e;const d=e.data||{},tool=d.tool;window.HUNV090.openTools();if(tool==='gcs'){window.HUNV090.setToolTab('gcs');q('#gcsEye').value=d.values?.eye||'';q('#gcsVerbal').value=d.values?.verbal||'';q('#gcsMotor').value=d.values?.motor||'';['gcsEye','gcsVerbal','gcsMotor'].forEach(id=>q('#'+id).dispatchEvent(new Event('change')));}else if(tool==='fast'){window.HUNV090.setToolTab('fast');Object.entries(d.values||{}).forEach(([k,v])=>setChoice(k,v));q('#fastTime').value=d.lastKnownNormal||'';}else if(tool==='avpu'){window.HUNV090.setToolTab('avpu');const b=q(`#avpuChoices button[data-value="${d.value||''}"]`);if(b)b.click();}else if(tool==='hemodynamics'){window.HUNV090.setToolTab('map');q('#mapSys').value=d.input?.sys||'';q('#mapDia').value=d.input?.dia||'';q('#mapPulse').value=d.input?.pulse||'';q('#mapPulse').dispatchEvent(new Event('input'));}else if(['sample','xabcde','opqrst'].includes(tool)){window.HUNV090.setToolTab(tool);(d.answers||[]).forEach((x,i)=>{const el=q(`#${tool}-${i}`);if(el)el.value=x.value||''});}else if(d.label==='EKG manuel değerlendirme'||tool==='ecg'){window.HUNV090.setToolTab('ecg');Object.entries(d.input||{}).forEach(([k,v])=>{if(k==='st'||k==='patientContext'||k==='ecgPoorPerfusion'||k==='ecgDespiteOxygen')return;const el=q('#'+k);if(el)el.value=v??''});q('#ecgPoorPerfusion').checked=!!d.input?.ecgPoorPerfusion;q('#ecgDespiteOxygen').checked=!!d.input?.ecgDespiteOxygen;Object.entries(d.input?.st||{}).forEach(([lead,v])=>{const el=q('#st-'+lead);if(el)el.checked=v==='elevation'});const acs=d.input?.ecgAcs||'';q('#ecgAcs').value=acs;qa('[data-ecg-choice="ecgAcs"] button').forEach(b=>b.classList.toggle('active',b.dataset.value===acs));q('#ecgDirectRate').dispatchEvent(new Event('input'));}
 const t=q('#assessmentTime');if(t){t.value=window.HUNV090.dateTimeOf(e.at);t.dataset.edited='1';}
 let banner=q('#editAssessmentBanner');if(!banner){banner=document.createElement('div');banner.id='editAssessmentBanner';banner.className='editBanner';q('#toolsScreen').prepend(banner);}banner.innerHTML=`<b>Kayıt düzenleniyor:</b> ${esc(d.label||'Klinik değerlendirme')} <button type="button" id="cancelAssessmentEdit">İptal</button>`;q('#cancelAssessmentEdit').onclick=()=>{editing=null;banner.remove();};
}
function replaceLatestAssessment(label,summary,details){if(!editing)return false;const c=caseObj();if(!c)return false;const e=c.events.find(x=>x.id===editing.id);if(!e)return false;e.data={label,summary,...details};const t=q('#assessmentTime');if(t?.value){const m=t.value.match(/^(\d{2})\.(\d{2})\.(\d{4})\s+(\d{2}):(\d{2})$/);if(m)e.at=new Date(+m[3],+m[2]-1,+m[1],+m[4],+m[5]).toISOString();}e.updatedAt=new Date().toISOString();editing=null;q('#editAssessmentBanner')?.remove();window.HUNV090.persist();return true;}
function consumeAssessmentEdit(label,summary,details={}){if(!editing)return false;const expected=editing.data?.label||'';if(expected&&expected!==label){alert('Düzenlenen kayıt '+expected+'. Önce bu kaydı kaydedin veya düzenlemeyi iptal edin.');return true;}return replaceLatestAssessment(label,summary,details);}

// EKG compact clinical controls + ST lead reporting.
qa('[data-ecg-choice="ecgAcs"] button').forEach(b=>b.addEventListener('click',()=>{const input=q('#ecgAcs'),group=b.closest('[data-ecg-choice]'),next=b.classList.contains('active')?'':b.dataset.value;input.value=next;group.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x.dataset.value===next));input.dispatchEvent(new Event('change',{bubbles:true}));}));
const territories={I:'lateral',II:'inferior',III:'inferior',aVR:'',aVL:'lateral',aVF:'inferior',V1:'septal',V2:'septal',V3:'anterior',V4:'anterior',V5:'lateral',V6:'lateral'};
const leadLabel=l=>territories[l]?`${l} (${territories[l]})`:l;
function updateStSummary(){const leads=['I','II','III','aVR','aVL','aVF','V1','V2','V3','V4','V5','V6'].filter(l=>q('#st-'+l)?.checked);const out=q('#stLeadSummary');if(out)out.textContent=leads.length?leads.map(leadLabel).join(', '):'';}
qa('.stCheckboxGrid input[type="checkbox"]').forEach(x=>x.addEventListener('change',updateStSummary));updateStSummary();

// Logo = home, preserving active patient.
q('#homeLogo')?.addEventListener('click',()=>{window.HUNApp091?.renderHome?.();window.HUNApp091?.showScreen?.('home');});

// Keep pinned area synchronized after patient changes/navigation.
new MutationObserver(renderPins).observe(q('#activePatientBar'),{subtree:true,childList:true,characterData:true});
renderPins();if(localStorage.getItem('ek2-offline-version')===window.EK2_DATA?.version)showInstallAfterOffline();
window.HUNV091={showInstallAfterOffline,syncPinButton,renderPins,editAssessment,consumeAssessmentEdit,fillNow};
})();
