(function(){
"use strict";

const VERSION="0.9.1";
const STORE="hun-v090-active-case";
const TTL=24*60*60*1000;
const expired=c=>!c||!Number.isFinite(Date.parse(c.createdAt))||Date.now()-Date.parse(c.createdAt)>=TTL||Date.parse(c.createdAt)>Date.now();
const q=s=>document.querySelector(s);
const qa=s=>[...document.querySelectorAll(s)];
const html=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const uid=()=>globalThis.crypto&&crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2);
const pad=n=>String(n).padStart(2,"0");
const currentTime=()=>{const d=new Date();return `${pad(d.getHours())}:${pad(d.getMinutes())}`};
const timeOf=iso=>{const d=new Date(iso);return Number.isNaN(d.getTime())?"—":d.toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"})};
const dateTimeOf=iso=>{const d=new Date(iso);return Number.isNaN(d.getTime())?"—":`${pad(d.getDate())}.${pad(d.getMonth()+1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`};
const num=v=>{const t=String(v).trim().replace(",",".");if(!t)return null;const n=Number(t);return Number.isFinite(n)?n:null};
const localDateTime=()=>{const d=new Date();return `${pad(d.getDate())}.${pad(d.getMonth()+1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`};
const parseLocalDateTime=value=>{const m=String(value||"").trim().match(/^(\d{2})\.(\d{2})\.(\d{4})\s+(\d{2}):(\d{2})$/);if(!m)return new Date(NaN);const d=new Date(+m[3],+m[2]-1,+m[1],+m[4],+m[5],0,0);return d.getFullYear()===+m[3]&&d.getMonth()===+m[2]-1&&d.getDate()===+m[1]&&d.getHours()===+m[4]&&d.getMinutes()===+m[5]?d:new Date(NaN)};

function blankCase(){return {schema:2,version:VERSION,id:uid(),createdAt:new Date().toISOString(),registry:"",sex:"",age:null,ageUnit:"year",weight:null,note:"",events:[]}}
function loadCase(){
  try{
    const value=JSON.parse(localStorage.getItem(STORE)||localStorage.getItem("hun-v080-active-case")||"null");
    localStorage.removeItem("hun-v080-active-case");
    if(!value)return null;
    if(expired(value)){localStorage.removeItem(STORE);return null;}
    localStorage.setItem(STORE,JSON.stringify(value));
    value.events=Array.isArray(value.events)?value.events:[];
    return value;
  }catch(e){return null}
}
let activeCase=loadCase();
function persist(){
  if(expireCase())return false;
  try{if(activeCase)localStorage.setItem(STORE,JSON.stringify(activeCase));else localStorage.removeItem(STORE);}
  catch(e){alert("Kayıt cihazda saklanamadı. Tarayıcının depolama iznini ve boş alanını kontrol edin.");return false;}
  renderAll();return true;
}
function clearPatientDrafts(){
  qa('#patientScreen input,#patientScreen textarea,#patientScreen select,#toolsScreen input,#toolsScreen textarea,#toolsScreen select,#medRecordModal input,#medRecordModal textarea').forEach(el=>{if(el.type==='checkbox')el.checked=false;else if(el.tagName==='SELECT')el.selectedIndex=0;else el.value='';});
  if(typeof fastState!=='undefined')Object.keys(fastState).forEach(k=>fastState[k]='');
  avpu='';lastEcgSummary='';lastEcgDetails=null;pendingMedication=null;
  qa('.segmented button,#avpuChoices button').forEach(b=>b.classList.remove('active'));
  q('#doseWeight').value='';q('#doseAge').value='';q('#doseResult').innerHTML='';
  q('#doseAgeUnit').value='year';window.dispatchEvent?.(new Event('hun:patient-reset'));q('#caseReport').innerHTML='';q('#reportModal').classList.remove('open');q('#medRecordModal').classList.remove('open');q('#doseModal').classList.remove('open');
  ['vitalTime','treatmentTime','assessmentTime'].forEach(id=>delete q('#'+id).dataset.edited);renderGcs();renderFast();renderAvpu();renderEcg();setDefaultTimes();
}
function expireCase(){
  if(!activeCase||!expired(activeCase))return false;
  activeCase=null;localStorage.removeItem(STORE);localStorage.removeItem('hun-v080-active-case');clearPatientDrafts();renderAll();return true;
}

function ageText(c){
  if(!c||!Number.isFinite(c.age))return "Yaş belirtilmedi";
  const units={year:"yaş",month:"aylık",week:"haftalık",day:"günlük"};
  return `${String(c.age).replace(".",",")} ${units[c.ageUnit]||"yaş"}`;
}
function ageYears(c){
  if(!c||!Number.isFinite(c.age))return null;
  return c.ageUnit==="year"?c.age:c.ageUnit==="month"?c.age/12:c.ageUnit==="week"?c.age/52:c.age/365;
}
function registryText(c){return c&&c.registry&&c.registry.trim()?c.registry.trim():"Sivil"}
function patientSummary(c){
  if(!c)return "Aktif hasta yok";
  return [registryText(c),c.sex||"Cinsiyet belirtilmedi",ageText(c),Number.isFinite(c.weight)?`${String(c.weight).replace(".",",")} kg`:"Kilo belirtilmedi"].join(" · ");
}
function localIsoForTime(value){
 const d=parseLocalDateTime(value||localDateTime());
 if(!Number.isFinite(d.getTime())||d.getTime()>Date.now()+60000||d.getTime()<Date.parse(activeCase.createdAt)-TTL){alert('Geçerli kayıt tarihi/saati girin; gelecek tarih kullanılamaz.');return null;}
 return d.toISOString();
}
function ensureCase(){expireCase();if(activeCase)return true;alert("Önce aktif hasta bilgilerini kaydedin.");openPatient();return false}
function singleRoute(route){const r=String(route||"").trim();if(!r||/[\/;,]|\bveya\b|\bya da\b/i.test(r))return "";return r;}

function renderBar(){
  const bar=q("#activePatientBar");if(!bar)return;
  bar.classList.toggle("active",!!activeCase);
  const b=bar.querySelector("b"),small=bar.querySelector("small");
  if(activeCase){b.textContent=patientSummary(activeCase);small.textContent="Hasta kaydını aç"}
  else{b.textContent="Aktif hasta yok";small.textContent="Hasta bilgisi ve vital kaydı için dokunun"}
}
function fillPatientForm(){
  q("#patientRegistry").value=activeCase?.registry||"";
  q("#patientSex").value=activeCase?.sex||"";
  q("#patientAge").value=Number.isFinite(activeCase?.age)?activeCase.age:"";
  q("#patientAgeUnit").value=activeCase?.ageUnit||"year";
  q("#patientWeight").value=Number.isFinite(activeCase?.weight)?activeCase.weight:"";
  q("#caseNote").value=activeCase?.note||"";
  q("#patientTitle").textContent=activeCase?patientSummary(activeCase):"Aktif hasta yok";
}
function vitalSummary(e){
  const d=e.data,items=[];
  if(d.sys!==null||d.dia!==null)items.push(`TA ${d.sys??"—"}/${d.dia??"—"} mmHg`);
  if(d.pulse!==null)items.push(`Nabız ${d.pulse}/dk`);
  if(d.resp!==null)items.push(`Solunum ${d.resp}/dk`);
  if(d.spo2!==null)items.push(`SpO₂ %${d.spo2}`);
  if(d.temp!==null)items.push(`Ateş ${String(d.temp).replace(".",",")} °C`);
  if(d.glucose!==null)items.push(`KŞ ${d.glucose} mg/dL`);
  if(d.etco2!==null)items.push(`ETCO₂ ${d.etco2} mmHg`);
  if(d.gcs!==null)items.push(`GKS ${d.gcs}`);
  if(d.test)items.push(`${d.test.name||"Hızlı test"}: ${d.test.result||"Girilmedi"}${d.test.value?` · ${d.test.value}${d.test.unit?" "+d.test.unit:""}`:""}`);
  return items.join(" · ");
}
function eventView(e){
  if(e.type==="medication")return {title:`${e.data.status==='applied'?'Uygulandı':'Hesap / plan — uygulanmadı'}: ${e.data.name}`,detail:[e.data.context,e.data.variant,`Hesaplanan: ${e.data.calculated||'Otomatik hesap yok'}${e.data.calculatedRoute?' '+e.data.calculatedRoute:''}`,`Uygulanan: ${e.data.status==='applied'?e.data.applied:'Uygulanmadı'}`,e.data.route,e.data.practitioner?`Uygulayan: ${e.data.practitioner}`:'',e.data.reason?`Doz değişikliği nedeni: ${e.data.reason}`:'',e.data.concentration?`Konsantrasyon: ${e.data.concentration}`:'',e.data.duration?`Süre/hız: ${e.data.duration}`:'',e.data.repeat?`Tekrar: ${e.data.repeat}`:'',e.data.note,e.data.preparation?.join(' · '),e.data.sourceInstruction?.maxText,e.data.sourceInstruction?.minText,e.data.sourceInstruction?.conditions,e.data.sourceInstruction?.warning,e.updatedAt?`Düzenlendi: ${dateTimeOf(e.updatedAt)}`:''].filter(Boolean).join(' · ')};
  if(e.type==="note")return {title:"Vaka notu",detail:e.data.note};
  if(e.type==="vital")return {title:"Vital bulgular",detail:vitalSummary(e)};
  if(e.type==="treatment")return {title:`${e.data.type}: ${e.data.name}`,detail:[e.data.dose,e.data.route,e.data.practitioner?`Uygulayan: ${e.data.practitioner}`:"",e.data.note].filter(Boolean).join(" · ")};
  return {title:e.data.label||"Değerlendirme",detail:e.data.summary||""};
}
function renderTimeline(){
  const root=q("#caseTimeline");if(!root)return;
  const events=activeCase?[...activeCase.events].sort((a,b)=>new Date(a.at)-new Date(b.at)):[];
  if(!events.length){root.innerHTML='<div class="empty">Henüz kayıt yok.</div>';return}
  root.innerHTML=events.map(e=>{const view=eventView(e);return `<div class="timelineItem"><time>${html(dateTimeOf(e.at))}</time><div><b>${html(view.title)}</b><p>${html(view.detail||"Ayrıntı girilmedi")}</p></div>${["medication","assessment"].includes(e.type)?`<button data-edit-event="${html(e.id)}">Düzenle</button>`:""}<button data-delete-event="${html(e.id)}">Sil</button></div>`}).join("");
  qa("[data-edit-event]").forEach(b=>b.onclick=()=>{const e=activeCase?.events.find(x=>x.id===b.dataset.editEvent);if(e?.type==="assessment")window.HUNV091?.editAssessment?.(e);else editMedication(b.dataset.editEvent)});
  qa("[data-delete-event]").forEach(b=>b.onclick=()=>{if(!ensureCase()||!confirm("Bu zaman çizelgesi kaydı silinsin mi?"))return;activeCase.events=activeCase.events.filter(e=>e.id!==b.dataset.deleteEvent);activeCase.note=[...activeCase.events].filter(e=>e.type==='note').at(-1)?.data.note||'';q('#caseReport').innerHTML='';persist()});
}
function renderAll(){renderBar();fillPatientForm();renderTimeline();prefillDose();renderEcg()}
function openPatient(){expireCase();showScreen("patient");setDefaultTimes();renderAll();window.scrollTo(0,0)}
function openTools(){expireCase();showScreen("tools");renderAll();window.scrollTo(0,0)}

function savePatient(){
  expireCase();
  if(!qa(".patientFields input").every(i=>i.reportValidity()))return;
  const c=activeCase||blankCase();
  c.registry=q("#patientRegistry").value.trim();
  c.sex=q("#patientSex").value;
  c.age=num(q("#patientAge").value);
  c.ageUnit=q("#patientAgeUnit").value;
  c.weight=num(q("#patientWeight").value);
  activeCase=c;persist();prefillDose(true);renderDosePreview();
}
function newPatient(){
  if(activeCase&&!confirm("Mevcut aktif hasta ve tüm zaman çizelgesi silinecek. Yeni hastaya geçilsin mi?"))return;
  activeCase=null;localStorage.removeItem(STORE);localStorage.removeItem("hun-v080-active-case");clearPatientDrafts();fillPatientForm();renderAll();
  ["#patientRegistry","#patientAge","#patientWeight"].forEach(s=>q(s).value="");q("#patientSex").value="";q("#patientAgeUnit").value="year";
}
function setDefaultTimes(){const t=localDateTime();['vitalTime','treatmentTime','assessmentTime'].forEach(id=>{const el=q('#'+id);if(el&&!el.dataset.edited)el.value=t;});if(q('#vitalNow'))q('#vitalNow').textContent=currentTime();}
['vitalTime','treatmentTime','assessmentTime'].forEach(id=>q('#'+id).addEventListener('input',()=>q('#'+id).dataset.edited='1'));
function addVital(){
  if(!ensureCase())return;
  if(!qa(".vitalFields input,.testFields input").every(i=>i.reportValidity()))return;
  const data={sys:num(q("#vitalSys").value),dia:num(q("#vitalDia").value),pulse:num(q("#vitalPulse").value),resp:num(q("#vitalResp").value),spo2:num(q("#vitalSpo2").value),temp:num(q("#vitalTemp").value),glucose:num(q("#vitalGlucose").value),etco2:num(q("#vitalEtco2").value),gcs:num(q("#vitalGcs").value)};
  const tn=q('#rapidTestName').value.trim(),tr=q('#rapidTestResult').value,tv=q('#rapidTestValue').value.trim(),tu=q('#rapidTestUnit').value.trim();
  if((tr||tv||tu)&&!tn){alert('Test adını girin.');return;}
  data.test=tn?{name:tn,result:tr||'Girilmedi',value:tv,unit:tu}:null;
  if(Object.values(data).every(v=>v===null)){alert("En az bir vital değer girin.");return}
  const at=localIsoForTime(q("#vitalTime").value);if(!at)return;
  activeCase.events.push({id:uid(),type:"vital",at,recordedAt:new Date().toISOString(),data});persist();
  qa(".vitalFields input:not(#vitalTime),.testFields input").forEach(i=>i.value="");q("#rapidTestResult").value="";q("#vitalTime").value=localDateTime();delete q("#vitalTime").dataset.edited;
}
function addTreatment(){
  if(!ensureCase())return;
  const data={type:q("#treatmentType").value,name:q("#treatmentName").value.trim(),dose:q("#treatmentDose").value.trim(),route:q("#treatmentRoute").value.trim(),practitioner:q("#treatmentPractitioner").value.trim(),note:q("#treatmentNote").value.trim()};
  if(!data.name){alert("İşlem veya ilaç adını girin.");return}
  const at=localIsoForTime(q("#treatmentTime").value);if(!at)return;
  activeCase.events.push({id:uid(),type:"treatment",at,recordedAt:new Date().toISOString(),data});persist();
  ["#treatmentName","#treatmentDose","#treatmentRoute","#treatmentNote","#treatmentPractitioner"].forEach(s=>q(s).value="");q("#treatmentTime").value=localDateTime();delete q("#treatmentTime").dataset.edited;
}
function addAssessment(label,summary,details={}){
  if(!ensureCase())return false;
  if(window.HUNV091?.consumeAssessmentEdit?.(label,summary,details))return true;
  const input=q('#assessmentTime'),at=localIsoForTime(input?.dataset.edited?input.value:localDateTime());if(!at)return false;
  activeCase.events.push({id:uid(),type:"assessment",at,recordedAt:new Date().toISOString(),data:{label,summary,...details}});if(input){input.value=localDateTime();delete input.dataset.edited;}return persist();
}

function reportAssessmentDetail(e){
 const d=e.data||{};
 if(Array.isArray(d.answers))return `<div class="reportStructured">${d.answers.filter(x=>x.value).map(x=>`<div><b>${html(x.label)}</b><span>${html(x.value)}</span></div>`).join('')}</div>`;
 if(d.label==='EKG manuel değerlendirme'&&d.result){const st=d.input?.st||{},territories=d.result.leadTerritories||{I:'lateral',II:'inferior',III:'inferior',aVR:'',aVL:'lateral',aVF:'inferior',V1:'septal',V2:'septal',V3:'anterior',V4:'anterior',V5:'lateral',V6:'lateral'},leadLabel=k=>territories[k]?`${k} (${territories[k]})`:k,elev=Object.entries(st).filter(([,v])=>v==='elevation').map(([k])=>leadLabel(k)),dep=Object.entries(st).filter(([,v])=>v==='depression').map(([k])=>k);const entered=[];if(d.input?.ecgRegular)entered.push(`Ritim: ${{yes:'Düzenli',no:'Düzensiz',unknown:'Değerlendirilemedi'}[d.input.ecgRegular]}`);if(d.input?.ecgPVisible)entered.push(`P dalgası: ${{yes:'Var',no:'Yok',unknown:'Değerlendirilemedi'}[d.input.ecgPVisible]}`);if(d.input?.ecgPtoQrs)entered.push(`P sonrası QRS: ${{yes:'Evet',no:'Hayır',unknown:'Değerlendirilemedi'}[d.input.ecgPtoQrs]}`);if(d.input?.ecgQrsBeforeP)entered.push(`QRS öncesi P: ${{yes:'Evet',no:'Hayır',unknown:'Değerlendirilemedi'}[d.input.ecgQrsBeforeP]}`);if(d.input?.ecgPrConstant)entered.push(`PR sabit: ${{yes:'Evet',no:'Hayır',unknown:'Değerlendirilemedi'}[d.input.ecgPrConstant]}`);const base=[d.result.classification?`Sınıflama: ${d.result.classification}`:'',d.result.rate!==null?`Hız: ${d.result.rate}/dk`:'',d.result.width?`QRS: ${d.result.width==='wide'?'Geniş':'Dar'}${d.result.ms!==null?` (${d.result.ms} ms)`:''}`:'',...entered,d.input?.ecgAcs?`AKS klinik bulgusu: ${{yes:'Var',no:'Yok',unknown:'Değerlendirilemedi'}[d.input.ecgAcs]}`:'',d.input?.ecgPoorPerfusion?'Kötü perfüzyon bulguları: Var':'',d.input?.ecgDespiteOxygen?'Yeterli oksijenasyon/ventilasyona rağmen sürüyor':'',elev.length?`ST elevasyonu olan derivasyonlar: ${elev.join(', ')}`:'',dep.length?`ST depresyonu olan derivasyonlar: ${dep.join(', ')}`:''].filter(Boolean);return html(base.join(' · '));}
 return html(d.summary||'—');
}
function reportRows(events,type){
  const rows=type==="all"?events:events.filter(e=>type==="vital"?e.type==="vital":e.type!=="vital");
  if(!rows.length)return '<tr><td colspan="3">Kayıt yok</td></tr>';
  return rows.map(e=>{const v=eventView(e),detail=e.type==='assessment'?reportAssessmentDetail(e):html(v.detail||"—");return `<tr><td>${html(dateTimeOf(e.at))}</td><td>${html(v.title)}</td><td>${detail}</td></tr>`}).join("");
}
function createReport(){
  if(!ensureCase())return;
  const events=[...activeCase.events].sort((a,b)=>new Date(a.at)-new Date(b.at));
  const end=events.length?events[events.length-1].at:new Date().toISOString();
  q("#caseReport").innerHTML=`<h1>Hasta Müdahale ve Seyir Raporu</h1><div class="reportMeta">Health Unit Navigator v${VERSION} · Oluşturulma: ${html(dateTimeOf(new Date().toISOString()))}</div><h2>Hasta / Vaka Bilgisi</h2><table><tbody><tr><th>Sicil / statü</th><td>${html(registryText(activeCase))}</td><th>Cinsiyet</th><td>${html(activeCase.sex||"Belirtilmedi")}</td></tr><tr><th>Yaş</th><td>${html(ageText(activeCase))}</td><th>Kilo</th><td>${Number.isFinite(activeCase.weight)?html(String(activeCase.weight).replace(".",",")+" kg"):"Belirtilmedi"}</td></tr><tr><th>Başlangıç</th><td>${html(dateTimeOf(activeCase.createdAt))}</td><th>Son kayıt</th><td>${html(dateTimeOf(end))}</td></tr></tbody></table><h2>Kronolojik Hasta Seyri</h2><table><thead><tr><th>Tarih / saat</th><th>Kayıt</th><th>Ayrıntı</th></tr></thead><tbody>${reportRows(events,"all")}</tbody></table><h2>Vaka Sonu Notu</h2><p class="noteText">${html(activeCase.note||"Not girilmedi")}</p><div class="reportWarning">Bu çıktı uygulama içi klinik çalışma özetidir. Kurum tarafından resmî form olarak onaylanmadıkça resmî ambulans vaka formunun yerine geçmez.</div>`;
  q("#reportModal").classList.add("open");
}

function setToolTab(name){qa("[data-tooltab]").forEach(b=>b.classList.toggle("active",b.dataset.tooltab===name));qa(".toolPane").forEach(p=>p.classList.toggle("active",p.id===`tool-${name}`))}

function renderGcs(){
  const vals=[q("#gcsEye").value,q("#gcsVerbal").value,q("#gcsMotor").value],all=vals.every(Boolean),numeric=vals.every(v=>/^\d+$/.test(v));
  if(all&&numeric){const total=vals.reduce((s,v)=>s+(+v),0);q("#gcsTotal").textContent=total;q("#gcsSummary").className="resultBox "+(total<=8?"critical":total<=12?"warn":"safe");q("#gcsSummary").innerHTML=`<b>GKS ${total} (E${vals[0]} V${vals[1]} M${vals[2]})</b>Bileşenler ayrı ayrı hasta kaydına işlenir.`;return}
  q("#gcsTotal").textContent="—";q("#gcsSummary").className="resultBox muted";q("#gcsSummary").textContent=all?`Toplam hesaplanmadı: E${vals[0]} V${vals[1]} M${vals[2]}. Değerlendirilemeyen bileşen mevcut.`:"Üç bileşeni seçin.";
}
function gcsSummary(){const e=q("#gcsEye").value,v=q("#gcsVerbal").value,m=q("#gcsMotor").value;if(!e||!v||!m)return null;const total=[e,v,m].every(x=>/^\d+$/.test(x))?(+e)+(+v)+(+m):null;return total?`GKS ${total} (E${e} V${v} M${m})`:`GKS toplamlanmadı (E${e} V${v} M${m})`}

const fastState={fastBalance:"",fastEyes:"",fastFace:"",fastArm:"",fastSpeech:""};
function renderFast(){
  const vals=Object.values(fastState),complete=vals.every(Boolean)&&!vals.includes("unknown"),positive=vals.includes("yes"),labels={fastBalance:"Denge",fastEyes:"Görme",fastFace:"Yüz",fastArm:"Kol",fastSpeech:"Konuşma"},findings=Object.keys(fastState).filter(k=>fastState[k]==="yes").map(k=>labels[k]);
  q("#fastStatus").textContent=!complete?"—":positive?"Pozitif":"Negatif";
  q("#fastSummary").className="resultBox "+(!complete?"muted":positive?"critical":"safe");
  q("#fastSummary").innerHTML=!complete?"Beş BE-FAST bulgusunu değerlendirin; belirsiz bulgu varsa sonuç verilmez.":positive?`<b>BE-FAST pozitif bulgu</b>${html(findings.join(", "))}. Bu sonuç tanı değildir; başlangıç/son bilinen normal zaman ve ilgili algoritmayla birlikte değerlendirin.`:"<b>BE-FAST bulgusu işaretlenmedi</b>Negatif tarama inmeyi tek başına dışlamaz.";
}
function fastSummary(){const vals=Object.values(fastState);if(!vals.every(Boolean)||vals.includes("unknown"))return null;const labels={fastBalance:"Denge",fastEyes:"Görme",fastFace:"yüz",fastArm:"kol",fastSpeech:"konuşma"},f=Object.keys(fastState).filter(k=>fastState[k]==="yes").map(k=>labels[k]);return f.length?`BE-FAST pozitif bulgu: ${f.join(", ")}${q("#fastTime").value?` · Son bilinen normal ${q("#fastTime").value}`:""}`:`BE-FAST bulgusu işaretlenmedi${q("#fastTime").value?` · Son bilinen normal ${q("#fastTime").value}`:""}`}

let avpu="";
function renderAvpu(){q("#avpuStatus").textContent=avpu||"—"}

let lastEcgSummary="",lastEcgDetails=null;
function renderEcg(){
 if(!window.HUNMasterLogic)return;
 const pediatric=q('#ecgGroup').value==='child';
 q('#ecgPediatricAgeWrap').classList.toggle('hidden',!pediatric);
 q('#ecgPediatricPerfusionWrap').classList.toggle('hidden',!pediatric);
 const patient=q('#ecgPatientContext'),ageSource=q('#ecgAgeSource');
 if(activeCase){
   if(patient)patient.innerHTML=`<b>Hasta Kayıt'tan otomatik</b><span>${html(patientSummary(activeCase))}</span>`;
   if(Number.isFinite(activeCase.age)){q('#ecgAge').value=String(activeCase.age);q('#ecgAgeUnit').value=activeCase.ageUnit||'year';q('#ecgAge').readOnly=true;q('#ecgAgeUnit').disabled=true;if(ageSource)ageSource.textContent='Hasta Kayıt verisi kullanılıyor.';}
   else{q('#ecgAge').readOnly=false;q('#ecgAgeUnit').disabled=false;if(ageSource)ageSource.textContent='Hasta kaydında yaş yok; pediatrik değerlendirme için manuel girilebilir.';}
 }else{
   if(patient)patient.innerHTML='<b>Hasta bağlamı</b><span>Aktif hasta yok. Gerekli EKG bilgileri manuel girilebilir.</span>';
   q('#ecgAge').readOnly=false;q('#ecgAgeUnit').disabled=false;if(ageSource)ageSource.textContent='Aktif hasta yok; gerekirse manuel girin.';
 }
 const ids=['ecgGroup','ecgDirectRate','ecgSpeed','ecgRegular','ecgRrBoxes','ecgQrsCount','ecgStripSeconds','ecgQrsBoxes','ecgWidth','ecgPVisible','ecgPtoQrs','ecgQrsBeforeP','ecgPrConstant','ecgAcs'];
 const input=Object.fromEntries(ids.map(id=>[id,q('#'+id).value]));
 const ageValue=Number.isFinite(activeCase?.age)?activeCase.age:num(q('#ecgAge').value),ageUnit=Number.isFinite(activeCase?.age)?(activeCase.ageUnit||'year'):q('#ecgAgeUnit').value;
 input.ecgAgeValue=ageValue;input.ecgAgeUnit=ageUnit;
 input.ecgAgeYears=ageValue===null?null:(ageUnit==='year'?ageValue:ageUnit==='month'?ageValue/12:ageUnit==='week'?ageValue/52:ageValue/365);
 input.patientContext=activeCase?{registry:registryText(activeCase),sex:activeCase.sex||'',age:activeCase.age,ageUnit:activeCase.ageUnit||'year',weight:activeCase.weight}:null;
 input.ecgPoorPerfusion=q('#ecgPoorPerfusion').checked;
 input.ecgDespiteOxygen=q('#ecgDespiteOxygen').checked;
 input.st=Object.fromEntries(window.HUNMasterLogic.leads.map(l=>[l,q('#st-'+l).checked?'elevation':'']));
 const result=window.HUNMasterLogic.ecg(input);lastEcgDetails={input,result};lastEcgSummary=result.summary;
 q('#ecgRateBadge').textContent=result.rate!==null?`${result.rate}/dk`:'—/dk';
 q('#ecgResult').className='resultBox '+(result.possibilities.length?'warn':result.hasInput?'safe':'muted');
 q('#ecgResult').innerHTML=result.hasInput?`${result.classification?'<b>'+html(result.classification)+'</b>':''}${result.possibilities.map(x=>'<p>'+html(x)+'</p>').join('')}${result.summary?'<p>'+html(result.summary)+'</p>':''}`:'EKG verilerini girin.';
 const root=q('#ecgAlgoLinks');root.innerHTML='';
 result.codes.forEach(code=>{const a=algoByCode(code);if(!a)return;const b=document.createElement('button');b.className='actionBtn ghost';b.textContent=`${sectionLabel[a.section]} · ${a.title} — ilgili algoritmaya git`;b.onclick=()=>openAlgo(a);root.appendChild(b);});
}
function prefillDose(force=false){
  if(!force)return;
  expireCase();
  q('#doseWeight').value=Number.isFinite(activeCase?.weight)?activeCase.weight:'';
  q('#doseAge').value=Number.isFinite(activeCase?.age)?String(activeCase.age):'';q('#doseAgeUnit').value=activeCase?.ageUnit||'year';
}

let pendingMedication=null;
function recordRule(id,calculated,edit=false){
 if(!ensureCase())return;
 const r=C.doseRules.find(x=>x.id===id);if(!r)return;
 const weight=num(q('#doseWeight').value),age=doseAgeYears(),result=calculated?calcRule(r,weight,age):null;
 if(calculated&&(!result?.auto||result.error)){alert('Geçerli bir doz hesabı yapın.');return;}
 const d=drugById(r.drugId),a=algoByCode(r.code);
 openMedication({name:d?.name||r.drugId,ruleId:r.id,context:a?.title||r.code,code:r.code,variant:r.variant,calculated:result?formatDoseRange(result.lo,result.hi,result.unit,result.perTime):'',raw:result?formatDoseRange(result.rawLo,result.rawHi,result.unit,result.perTime):'',calculation:result?{weight,age,result}:null,route:singleRoute(r.route),calculatedRoute:singleRoute(r.route),concentration:r.concentration||"",duration:r.duration||"",repeat:r.repeat||"",patientAgeUnit:q("#doseAgeUnit").value,patientAgeValue:num(q("#doseAge").value),preparation:r.preparation||[],sourcePages:r.sourcePages||[],sourceInstruction:{doseText:r.doseText,route:r.route,concentration:r.concentration,duration:r.duration,repeat:r.repeat,preparation:r.preparation||[],maxText:r.maxText,minText:r.minText,conditions:r.conditions,warning:r.warning,notes:r.notes},doseText:r.doseText,status:'applied',applied:calculated?(result?formatDoseRange(result.lo,result.hi,result.unit,result.perTime):''):'',note:'',editRequested:edit});
}
function recordDrug(d){if(ensureCase())openMedication({name:d.name,calculated:'',route:'',status:'applied',applied:'',note:''});}
function editMedication(id){if(!ensureCase())return;const e=activeCase.events.find(x=>x.id===id);if(e)openMedication(structuredClone(e.data),e);}
function openMedication(data,event=null){
 pendingMedication={caseId:activeCase.id,data,eventId:event?.id||null};
 q('#medPatient').textContent=patientSummary(activeCase);
 q('#medName').value=data.name;q('#medCalculated').value=data.calculated||'Otomatik hesap yok';q('#medStatus').value=data.status||'applied';q('#medApplied').value=data.amount??data.applied??(data.calculated||'');q('#medRoute').value=data.route||'';q('#medNote').value=data.note||'';
 q('#medAt').value=event?dateTimeOf(event.at):localDateTime();
 q('#medName').readOnly=!!data.ruleId;q('#medUnit').value=data.unit||'';q('#medReason').value=data.reason||'';q('#medPractitioner').value=data.practitioner||'';
 q('#medSource').textContent=[data.context,data.variant,data.doseText,data.raw?`Ham hesap: ${data.raw}`:'',data.preparation?.join(' · '),data.sourcePages?.length?`EK-2 s. ${data.sourcePages.join(', ')}`:'Manuel ilaç kaydı'].filter(Boolean).join(' · ');
 const compact=!!data.ruleId&&!!data.calculated&&!data.editRequested&&!event;
 q('#medRecordModal').classList.toggle('compactConfirm',compact);q('#expandMedRecord').style.display=compact?'block':'none';
 q('#medConfirmSummary').innerHTML=compact?`<b>Uygulamayı onayla</b><span>${html(data.name)} · ${html(data.calculated)}${data.route?' · '+html(data.route):''}</span><small>${html(data.context||'')}</small>`:'';
 q('#saveMedRecord').textContent=event?'Değişiklikleri Kaydet':compact?'Uygulamayı Onayla ve Kaydet':'Hasta Kaydına Ekle';q('#medRecordModal').classList.add('open');syncMedicationStatus();
}
function syncMedicationReason(){if(!pendingMedication)return;const applied=q('#medStatus').value==='applied',amount=q('#medApplied').value.trim(),unit=q('#medUnit').value.trim(),joined=[amount,unit].filter(Boolean).join(' '),route=q('#medRoute').value.trim();const changed=applied&&pendingMedication.data.calculated&&(norm(joined)!==norm(pendingMedication.data.calculated)||norm(route)!==norm(pendingMedication.data.calculatedRoute||''));q('#medReasonWrap').style.display=changed?'grid':'none';q('#medReason').required=!!changed;if(!changed)q('#medReason').value='';}
function syncMedicationStatus(){const applied=q('#medStatus').value==='applied';q('#medApplied').disabled=!applied;if(!applied)q('#medApplied').value='';syncMedicationReason();}
function saveMedication(){
 if(!ensureCase()||!pendingMedication||pendingMedication.caseId!==activeCase.id){alert('Hasta değişti; kaydı yeniden açın.');return;}
 const at=localIsoForTime(q('#medAt').value);if(!at)return;
 const status=q('#medStatus').value,unit=q('#medUnit').value.trim(),amount=q('#medApplied').value.trim(),applied=[amount,unit].filter(Boolean).join(' '),name=q('#medName').value.trim();
 if(!name||status==='applied'&&!amount){alert('İlaç adı ve uygulandıysa uygulanan doz/miktar gereklidir.');return;}
 const reason=q('#medReason').value.trim();
 const changed=status==='applied'&&pendingMedication.data.calculated&&(norm(applied)!==norm(pendingMedication.data.calculated)||norm(q('#medRoute').value.trim())!==norm(pendingMedication.data.calculatedRoute??pendingMedication.data.route));
 if(changed&&!reason){alert('Hesaplanan doz veya yoldan farklı uygulama için değişiklik nedenini girin.');return;}
 const data={...pendingMedication.data,name,status,unit,amount,reason,practitioner:q('#medPractitioner').value.trim(),applied:status==='applied'?applied:'',route:q('#medRoute').value.trim(),note:q('#medNote').value.trim()};
 const now=new Date().toISOString();
 if(pendingMedication.eventId){const e=activeCase.events.find(x=>x.id===pendingMedication.eventId);if(!e)return;delete e.history;e.at=at;e.data=data;e.updatedAt=now;}
 else activeCase.events.push({id:uid(),type:'medication',at,recordedAt:now,data});
 if(persist()){pendingMedication=null;q('#medRecordModal').classList.remove('open');}
}
q('#closeMedRecord').onclick=()=>{pendingMedication=null;q('#medRecordModal').classList.remove('open')};
q('#saveMedRecord').onclick=saveMedication;q('#medStatus').onchange=syncMedicationStatus;['medApplied','medUnit','medRoute'].forEach(id=>q('#'+id).addEventListener('input',syncMedicationReason));q('#expandMedRecord').onclick=()=>{q('#medRecordModal').classList.remove('compactConfirm');q('#expandMedRecord').style.display='none';};
q('#patientQuickTools').onclick=openTools;
q('#saveCaseNote').onclick=()=>{if(!ensureCase())return;const note=q('#caseNote').value;activeCase.note=note;activeCase.events.push({id:uid(),type:'note',at:new Date().toISOString(),data:{note}});persist();};

q("#activePatientBar").onclick=openPatient;q("#patientHome").onclick=openPatient;q("#toolsHome").onclick=openTools;
q("#savePatientBtn").onclick=savePatient;q("#newPatientBtn").onclick=newPatient;q("#addVitalBtn").onclick=addVital;q("#addTreatmentBtn").onclick=addTreatment;q("#createReportBtn").onclick=createReport;q("#closeReport").onclick=()=>q("#reportModal").classList.remove("open");q("#printReport").onclick=()=>{if(ensureCase())window.print()};
qa("[data-tooltab]").forEach(b=>b.onclick=()=>setToolTab(b.dataset.tooltab));
["#gcsEye","#gcsVerbal","#gcsMotor"].forEach(s=>q(s).onchange=renderGcs);q("#saveGcsBtn").onclick=()=>{const s=gcsSummary();if(!s){alert("GKS bileşenlerini tamamlayın.");return}addAssessment("GKS",s,{tool:"gcs",values:{eye:q("#gcsEye").value,verbal:q("#gcsVerbal").value,motor:q("#gcsMotor").value}})};
qa(".segmented[data-choice] button").forEach(b=>b.onclick=()=>{const group=b.closest("[data-choice]"),key=group.dataset.choice;fastState[key]=b.dataset.value;[...group.children].forEach(x=>x.classList.toggle("active",x===b));renderFast()});
q("#saveFastBtn").onclick=()=>{const s=fastSummary();if(!s){alert("BE-FAST bulgularını tamamlayın.");return}addAssessment("BE-FAST",s,{tool:"fast",values:{...fastState},lastKnownNormal:q("#fastTime").value})};
q("#openStrokeAlgo").onclick=()=>{const years=ageYears(activeCase);if(years===null){alert('Yetişkin/pediatrik ayrımı için hasta yaşını girin.');return;}if(years<16){alert('Bu araçtan pediatrik inme şemasına doğrulanmış bağlantı tanımlanmadı. Pediatrik algoritmalar listesini kullanın.');return;}const a=algoByCode('SB-ASH-Y-18');if(a)openAlgo(a)};
qa("#avpuChoices button").forEach(b=>b.onclick=()=>{avpu=b.dataset.value;qa("#avpuChoices button").forEach(x=>x.classList.toggle("active",x===b));renderAvpu()});q("#saveAvpuBtn").onclick=()=>{if(!avpu){alert("AVPU seçimi yapın.");return}addAssessment("AVPU",`AVPU: ${avpu}`,{tool:"avpu",value:avpu})};
qa("#tool-ecg input,#tool-ecg select").forEach(el=>{el.addEventListener("input",renderEcg);el.addEventListener("change",renderEcg)});q("#saveEcgBtn").onclick=()=>{if(!lastEcgDetails?.result?.hasInput){alert("EKG ölçümlerini tamamlayın.");return}addAssessment("EKG manuel değerlendirme",lastEcgSummary,lastEcgDetails||{})};

setInterval(setDefaultTimes,60000);setDefaultTimes();renderGcs();renderFast();renderAvpu();renderAll();
window.HUNV090={getCase:()=>{expireCase();return activeCase},persist,prefillDose,addAssessment,openPatient,openTools,recordRule,recordDrug,setToolTab,renderAll,localDateTime,dateTimeOf};
setInterval(expireCase,1000);
document.addEventListener('visibilitychange',expireCase);window.addEventListener('focus',expireCase);
window.addEventListener('storage',e=>{if(e.key===STORE){activeCase=loadCase();clearPatientDrafts();renderAll();}});
})();
