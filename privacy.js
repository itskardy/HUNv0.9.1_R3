(function(root){
'use strict';
const events=['page_view','algorithm_open','search','dose_use','tool_use','ecg_use'];
const screens=['home','list','algorithm','drug','key','fav','search','patient','tools','dose'];
// Complete-query allowlist. Never extract a symptom from otherwise private free text.
const terms=['gogus agrisi','gogus agrisi terleme','terleme','nefes darligi','dispne','bayilma','senkop','carpinti','nobet','konvulziyon','ates','bas agrisi','kanama','bilinc kaybi','kusma','karin agrisi'];
const norm=s=>String(s||'').toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i').trim().replace(/\s+/g,' ');
function clean(event,screen,value=''){
 if(!events.includes(event)||!screens.includes(screen))return null;
 let detail='';
 if(event==='search'){const n=norm(value);detail=terms.includes(n)?n:'[serbest metin gönderilmedi]';}
 if(event==='algorithm_open')detail=/^SB-ASH-(Y|Ç|DY)-\d{2}$/.test(value)?value:'';
 return {event,screen,detail};
}
root.HUNPrivacy={events,screens,terms,clean};
})(typeof window==='undefined'?globalThis:window);
