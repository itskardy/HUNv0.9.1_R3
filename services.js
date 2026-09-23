(function(){
'use strict';const VERSION='0.9.1',q=s=>document.querySelector(s);
const device=()=>/Mobi|Android|iPhone/i.test(navigator.userAgent)?'mobile':'desktop';
let available={analytics:false,feedback:false},last=new Map(),feedbackScreen='home';
function screen(){return document.querySelector('.screen.active')?.id.replace('Screen','')||(document.querySelector('#detail.open')?'algorithm':'home');}
async function track(event,section,value=''){
 if(!available.analytics||!navigator.onLine)return;
 const clean=window.HUNPrivacy.clean(event,section,value);if(!clean)return;
 const key=JSON.stringify(clean),now=Date.now();if(now-(last.get(key)||0)<1500)return;last.set(key,now);
 const body={...clean,version:VERSION,device:device()};
 try{await fetch('./api/analytics',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),credentials:'omit',referrerPolicy:'no-referrer',keepalive:true,cache:'no-store'});}catch{}
}
window.HUNServices={track};
async function status(){
 if(location.protocol==='file:')return;
 try{const r=await fetch('./api/status',{cache:'no-store',credentials:'omit'});if(r.ok){const s=await r.json();available={analytics:s.analytics===true,feedback:s.feedback===true};track('page_view',screen());}}catch{}
}
q('#openFeedback').onclick=()=>{feedbackScreen=screen();q('#feedbackModal').classList.add('open');q('#feedbackStatus').textContent=available.feedback?'':'Gönderim servisi henüz etkin değil. Mesajınız gönderilmedi.';};
q('#closeFeedback').onclick=()=>q('#feedbackModal').classList.remove('open');
q('#catSupport').onclick=()=>q('#catMessage').textContent='Kediler bu habere çok sevindi! Ama henüz bu mümkün değil. Teşekkür ederiz.';
q('#feedbackForm').onsubmit=async e=>{
 e.preventDefault();const output=q('#feedbackStatus');
 if(!navigator.onLine){output.textContent='Çevrimdışısınız. Mesaj gönderilmedi; internet bağlantısıyla yeniden deneyin.';return;}
 if(!available.feedback){await status();if(!available.feedback){output.textContent='Gönderim servisi henüz etkin değil. Mesajınız gönderilmedi.';return;}}
 const message=q('#feedbackMessage').value.trim();if(message.length<10||message.length>2000||!q('#feedbackConfirm').checked)return;
 const button=q('#feedbackForm button');button.disabled=true;output.textContent='Gönderiliyor…';
 try{const r=await fetch('./api/feedback',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message,version:VERSION,screen:feedbackScreen,device:device(),website:q('#feedbackWebsite').value}),credentials:'omit',referrerPolicy:'no-referrer',cache:'no-store'});output.textContent=r.ok?'Geri bildiriminiz gönderildi. Teşekkür ederiz.':r.status===429?'Çok sık gönderim yapıldı. Bir süre sonra yeniden deneyin.':'Gönderilemedi. Mesajınızı koruduk; daha sonra tekrar deneyin.';if(r.ok){q('#feedbackMessage').value='';q('#feedbackConfirm').checked=false;}}
 catch{output.textContent='Bağlantı kurulamadı. Mesajınız gönderilmedi.';}finally{button.disabled=false;}
};status();
})();
