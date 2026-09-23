(function(){
'use strict';const q=s=>document.querySelector(s);const qa=s=>[...document.querySelectorAll(s)];
const labels={sample:['Signs/Symptoms','Allergies','Medications','Past Medical History','Last Oral Intake / Last Menstrual Period','Events Preceding Call'],xabcde:['X — Masif kanama','A — Havayolu','B — Solunum','C — Dolaşım','D — Nörolojik değerlendirme','E — Tam değerlendirme / çevre'],opqrst:['Onset','Provocation/Palliation','Quality','Region/Radiation','Severity','Time']};
Object.entries(labels).forEach(([tool,fields])=>q('#save-'+tool).onclick=()=>{const answers=fields.map((label,i)=>({label,value:q('#'+tool+'-'+i).value.trim()}));if(!answers.some(x=>x.value)){alert('En az bir alanı doldurun.');return;}window.HUNV090.addAssessment(tool.toUpperCase(),answers.filter(x=>x.value).map(x=>x.label+': '+x.value).join('\n'),{tool,answers,sourceType:tool==='opqrst'?'EK-2 dışı doğrulanmış kayıt aracı':'EK-2 destekli kayıt aracı'});});
let computed=null;
function renderMap(){computed=window.HUNMasterLogic.hemodynamics(q('#mapSys').value,q('#mapDia').value,q('#mapPulse').value);q('#mapResult').textContent=computed.invalidPressure?'Kan basıncını kontrol edin; sistolik pozitif ve diyastolikten düşük olmamalıdır.':[`MAP: ${computed.map===null?'—':computed.map.toFixed(1)+' mmHg'}`,`Şok indeksi: ${computed.shockIndex===null?'—':computed.shockIndex.toFixed(2)}`].join(' · ');}
qa('#tool-map input').forEach(el=>el.addEventListener('input',renderMap));
q('#useLastVital').onclick=()=>{const c=window.HUNV090.getCase();const e=c?.events.filter(e=>e.type==='vital').sort((a,b)=>Date.parse(b.at)-Date.parse(a.at))[0];if(!e){alert('Aktif hastada vital kaydı yok.');return;}q('#mapSys').value=e.data.sys??'';q('#mapDia').value=e.data.dia??'';q('#mapPulse').value=e.data.pulse??'';renderMap();};
q('#saveMap').onclick=()=>{renderMap();if(computed.invalidPressure||(computed.map===null&&computed.shockIndex===null)){alert('Hesaplama için geçerli ölçümleri girin.');return;}window.HUNV090.addAssessment('MAP / Şok İndeksi',q('#mapResult').textContent,{tool:'hemodynamics',input:{sys:q('#mapSys').value,dia:q('#mapDia').value,pulse:q('#mapPulse').value},result:computed,sourceType:'EK-2 dışı yardımcı hesap'});};
window.addEventListener('hun:patient-reset',()=>{computed=null;renderMap();});
qa('[data-tooltab]').forEach(b=>b.addEventListener('click',()=>window.HUNServices?.track(b.dataset.tooltab==='ecg'?'ecg_use':'tool_use','tools')));
// Modal bars repeat only the approved four patient fields while the main banner is occluded.
const updateBars=()=>{const text=q('#activePatientBar b').textContent;qa('.modal.open .modalPatient').forEach(e=>e.textContent=text);};
qa('#doseModal .modalbar,#medRecordModal .modalbar').forEach(bar=>{const e=document.createElement('small');e.className='modalPatient';bar.appendChild(e);});
new MutationObserver(updateBars).observe(document.body,{attributes:true,attributeFilter:['class'],subtree:true});renderMap();updateBars();
})();
