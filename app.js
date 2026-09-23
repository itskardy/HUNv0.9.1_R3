
const D=window.EK2_DATA;
const C=window.HUN_CLINICAL_V070||{version:"0.7.0",doseRules:[],relatedAlgorithms:{},navigationNotes:{}};
const sectionLabel={adult:"Yetişkin",birth:"Doğum / Yenidoğan",child:"Çocuk",general:"Genel"};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let state={screen:"home",section:"all",category:"Tümü",detail:null,alpha:"Tümü",keyCategory:"Tümü",preSearchScreen:"home"};
let installPrompt=null;

function norm(s){return (s||"").toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ı/g,"i").replace(/ç/g,"c").replace(/ğ/g,"g").replace(/ö/g,"o").replace(/ş/g,"s").replace(/ü/g,"u")}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function favSet(){return new Set(JSON.parse(localStorage.getItem("ek2-favs")||"[]"))}
function saveFav(s){localStorage.setItem("ek2-favs",JSON.stringify([...s]))}
function recentCodes(){return JSON.parse(localStorage.getItem("ek2-recent")||"[]")}
function addRecent(code){let r=recentCodes().filter(x=>x!==code);r.unshift(code);localStorage.setItem("ek2-recent",JSON.stringify(r.slice(0,10)))}
function algoByCode(c){return D.algorithms.find(a=>a.code===c)}
function keyById(id){return D.keyInfos.find(k=>k.id===id)}
function drugById(id){if(id==="drug-aspirin")id="drug-asetilsalisilik-asit";return D.drugs.find(d=>d.id===id)}
function openImage(src){if(src)window.open(src,"_blank","noopener")}
function pageImg(p){return `./page-${String(p).padStart(3,"0")}.jpg`}

function setNav(name){$$(".navbtn").forEach(b=>b.classList.toggle("active",b.dataset.nav===name))}
function showScreen(id){
  $("#detail").classList.remove("open");
  $$(".screen").forEach(s=>s.classList.remove("active"));
  $("#"+id+"Screen").classList.add("active");
  state.screen=id;window.HUNServices?.track('page_view',id);
  setNav(id==="home"?"home":id==="fav"?"favorites":id==="patient"?"patient":state.section==="adult"?"adult":(state.section==="pediatric"?"pediatric":"home"));
  window.scrollTo(0,0);
}
function sectionMatch(a,section){
  if(section==="adult")return a.section==="adult";
  if(section==="pediatric")return a.section==="child"||a.section==="birth";
  return true;
}
function keySectionMatch(k,section){
  if(section==="adult")return k.section==="adult";
  if(section==="pediatric")return k.section==="child"||k.section==="birth";
  return true;
}

function categories(section){
  return [...new Set(D.algorithms.filter(a=>sectionMatch(a,section)).map(a=>a.category))].sort((a,b)=>a.localeCompare(b,"tr"));
}
function openCategoryModal(section,forKeys=false){
  state.modalForKeys=forKeys;
  const cats=categories(section);
  $("#catModalTitle").textContent=(section==="adult"?"Yetişkin":section==="pediatric"?"Pediatrik":"Tüm")+" Kategorileri";
  const grid=$("#catGrid");grid.innerHTML="";
  const all=["Tümü",...cats];
  all.forEach(cat=>{
    const algCount=D.algorithms.filter(a=>sectionMatch(a,section)&&(cat==="Tümü"||a.category===cat)).length;
    const keyCount=D.keyInfos.filter(k=>keySectionMatch(k,section)&&(cat==="Tümü"||k.category===cat)).length;
    const b=document.createElement("button");b.className="catcard";
    b.innerHTML=`<b>${esc(cat)}</b><small>${algCount} akış şeması · ${keyCount} Anahtar Bilgi</small><div class="catnum">${algCount}</div>`;
    b.onclick=()=>{
      $("#catModal").classList.remove("open");
      if(forKeys){state.keyCategory=cat;state.section=section;renderKeys();showScreen("key")}
      else{state.section=section;state.category=cat;renderList();showScreen("list")}
    };
    grid.appendChild(b);
  });
  $("#catModal").classList.add("open");
}
$("#closeCats").onclick=()=>$("#catModal").classList.remove("open");

function renderHome(){
  $("#keyCount").textContent=D.keyInfos.length;
  $("#keyCount2").textContent=D.keyInfos.length;
  $("#drugCount").textContent=D.drugs.filter(d=>positiveDrugOwners(d).length).length;
  const f=favSet();
  const favAlgos=D.algorithms.filter(a=>f.has(a.code)).slice(0,6);
  $("#quickWrap").style.display=favAlgos.length?"block":"none";
  $("#quick").innerHTML="";
  favAlgos.forEach(a=>{
    const b=document.createElement("button");b.className="quickitem";
    b.innerHTML=`<b>${esc(a.title)}</b><small>${esc(a.code)} · ${esc(sectionLabel[a.section])}</small>`;
    b.onclick=()=>openAlgo(a);$("#quick").appendChild(b)
  });
  const r=recentCodes().map(algoByCode).filter(Boolean);
  $("#recentWrap").style.display=r.length?"block":"none";$("#recent").innerHTML="";
  r.forEach(a=>{const b=document.createElement("button");b.className="quickitem";b.innerHTML=`<b>${esc(a.title)}</b><small>${esc(a.code)} · ${esc(a.category)}</small>`;b.onclick=()=>openAlgo(a);$("#recent").appendChild(b)})
}

function rowAlgo(a){
  const f=favSet(), div=document.createElement("div");div.className="algorow";
  div.innerHTML=`<button class="open"><b>${esc(a.title)}</b><span>›</span></button><button class="star ${f.has(a.code)?"on":""}" aria-label="Favori">${f.has(a.code)?"★":"☆"}</button>`;
  div.querySelector(".open").onclick=()=>openAlgo(a);
  div.querySelector(".star").onclick=e=>{e.stopPropagation();toggleFav(a.code);renderList();renderHome()};
  return div;
}
function rowKey(k){
  const div=document.createElement("div");div.className="row";
  div.innerHTML=`<button class="open" style="border:0;background:transparent;text-align:left;padding:0"><b>${esc(k.title)}</b><div class="meta">${esc(sectionLabel[k.section]||"Genel")} · ${esc(k.category)} · EK-2 s. ${k.page}</div></button><span class="tag gold">Anahtar Bilgi</span>`;
  div.querySelector(".open").onclick=()=>openKey(k);
  return div;
}
function toggleFav(code){let f=favSet();f.has(code)?f.delete(code):f.add(code);saveFav(f)}

function renderList(){
  const sec=state.section;
  $("#listTitle").textContent=sec==="adult"?"Yetişkin Algoritmaları":"Pediatrik Algoritmalar";
  const cats=["Tümü",...categories(sec)], chips=$("#categoryChips");chips.innerHTML="";
  cats.forEach(cat=>{const b=document.createElement("button");b.className=state.category===cat?"active":"";b.textContent=cat;b.onclick=()=>{state.category=cat;renderList()};chips.appendChild(b)});
  const algs=D.algorithms.filter(a=>sectionMatch(a,sec)&&(state.category==="Tümü"||a.category===state.category));
  const root=$("#algoList");root.innerHTML="";
  if(!algs.length){root.innerHTML='<div class="empty">Bu kategoride akış şeması bulunamadı.</div>';return}
  const groups=state.category==="Tümü"?[...new Set(algs.map(a=>a.category))]:[state.category];
  groups.forEach(cat=>{const arr=algs.filter(a=>a.category===cat);if(!arr.length)return;const g=document.createElement("section");g.className="algogroup";g.innerHTML=`<h3>${esc(cat)} <small>${arr.length}</small></h3><div class="algolist"></div>`;arr.forEach(a=>g.querySelector(".algolist").appendChild(rowAlgo(a)));root.appendChild(g)});
}

function renderKeys(){
  let arr=D.keyInfos.filter(k=>keySectionMatch(k,state.section));
  if(state.keyCategory!=="Tümü")arr=arr.filter(k=>k.category===state.keyCategory);
  $("#keyList").innerHTML="";
  if(!arr.length)$("#keyList").innerHTML='<div class="empty">Eşleşen Anahtar Bilgi bulunamadı.</div>';
  arr.forEach(k=>$("#keyList").appendChild(rowKey(k)));
}
$("#keyCats").onclick=()=>openCategoryModal(state.section,true);

const NEGATIVE_DRUG_RE=/(kullanma|kullanılmamal|verilmemel|uygulanmamal|önerilmez|kontrendike|kaçın|kaçınıl)/i;
function drugContextsOnPage(d,p){
  const lines=(D.pages[p]||"").split(/\n+/).map(x=>x.trim()).filter(Boolean), aliases=d.aliases.map(norm), out=[];
  lines.forEach((line,i)=>{if(aliases.some(a=>norm(line).includes(a))){const text=[lines[i-1],line,lines[i+1]].filter(Boolean).join(" ");out.push({line,text,negative:NEGATIVE_DRUG_RE.test(text)})}});
  return out;
}
function positiveDrugContext(d,p){return drugContextsOnPage(d,p).find(x=>!x.negative)||null}
function positiveDrugOwners(d){
  const seen=new Set(),out=[];
  d.relatedCodes.forEach(code=>{
    const a=algoByCode(code);if(!a||seen.has(code))return;
    const structured=rulesFor(d,a).length>0,ctx=positiveDrugContext(d,a.page);
    if(structured||ctx){seen.add(code);out.push({a,ctx:ctx||null})}
  });
  C.doseRules.filter(r=>r.drugId===d.id&&r.status==="verified").forEach(r=>{
    if(seen.has(r.code))return;const a=algoByCode(r.code);if(a){seen.add(r.code);out.push({a,ctx:null})}
  });
  return out;
}
function rulesFor(d,a){
  if(!d||!a)return [];
  return C.doseRules.filter(r=>r.drugId===d.id&&r.code===a.code&&r.status==="verified");
}
function hasCalculableRule(d,a){return rulesFor(d,a).some(r=>r.calc&&r.calc.auto===true)}
function explicitRelatedAlgorithms(a){
  return (C.relatedAlgorithms[a.code]||[]).map(algoByCode).filter(Boolean);
}
function clinicalTitlesForDrug(d){return positiveDrugOwners(d).map(x=>x.a.title)}
function renderDrugs(){
  const visible=D.drugs.filter(d=>positiveDrugOwners(d).length);
  const letters=["Tümü",...new Set(visible.map(d=>norm(d.name).charAt(0).toUpperCase()))].sort((a,b)=>a==="Tümü"?-1:b==="Tümü"?1:a.localeCompare(b,"tr"));
  $("#alpha").innerHTML="";letters.forEach(l=>{const b=document.createElement("button");b.textContent=l;b.className=state.alpha===l?"active":"";b.onclick=()=>{state.alpha=l;renderDrugs()};$("#alpha").appendChild(b)});
  let arr=visible;if(state.alpha!=="Tümü")arr=arr.filter(d=>norm(d.name).charAt(0).toUpperCase()===state.alpha);
  $("#drugGrid").innerHTML="";arr.forEach(d=>{const titles=clinicalTitlesForDrug(d),b=document.createElement("button");b.className="drugcard";b.innerHTML=`<span class="kind">${esc(d.kind)}</span><b>${esc(d.name)}</b><small>${esc(titles.slice(0,3).join(" · "))}${titles.length>3?` +${titles.length-3}`:""}</small>`;b.onclick=()=>openDrug(d);$("#drugGrid").appendChild(b)});
}

function openAlgo(a){
  window.HUNServices?.track('algorithm_open','algorithm',a.code);
  state.preDetailScreen=state.screen;state.detail={type:"algo",id:a.code};addRecent(a.code);renderHome();
  $$(".screen").forEach(s=>s.classList.remove("active"));$("#detail").classList.add("open");
  $("#algoDetail").style.display="block";$("#keyDetail").style.display="none";$("#drugDetail").style.display="none";
  $("#dtitle").textContent=a.title;$("#dcode").textContent=a.code;$("#dcode").style.display="inline-block";$("#dmeta").textContent=`${sectionLabel[a.section]} · ${a.category} · EK-2 PDF sayfa ${a.page}`;
  $("#dimg").src=a.img;$("#dimg").onclick=()=>openImage(a.img);
  let f=favSet();$("#dfav").style.display="block";window.HUNV091?.syncPinButton?.(a);$("#dfav").textContent=f.has(a.code)?"★":"☆";$("#dfav").classList.toggle("on",f.has(a.code));
  $("#keyTabBtn").textContent=`Anahtar Bilgiler${a.keyPages.length?` (${a.keyPages.length})`:""}`;$("#keyTabBtn").disabled=!a.keyPages.length;$("#keyTabBtn").style.opacity=a.keyPages.length?1:.45;
  $$(".detailtab").forEach(b=>b.classList.toggle("active",b.dataset.dtab==="flow"));$("#flowPane").style.display="block";$("#keysPane").style.display="none";
  $("#detailKeys").innerHTML="";
  a.keyPages.forEach(p=>{const k=D.keyInfos.find(x=>x.page===p);if(!k)return;const box=document.createElement("div");box.className="keyimage";box.innerHTML=`<img src="${k.img}" alt="${esc(k.title)}" title="Büyütmek için dokunun"><div class="caption">${esc(k.title)} · EK-2 s. ${p}</div>`;box.querySelector("img").onclick=()=>openImage(k.img);$("#detailKeys").appendChild(box)});
  const drugs=D.drugs.filter(d=>d.relatedCodes.includes(a.code)&&(rulesFor(d,a).length||positiveDrugContext(d,a.page)));$("#relatedDrugsWrap").style.display=drugs.length?"block":"none";$("#relatedDrugs").innerHTML="";
  drugs.forEach(d=>{const rr=rulesFor(d,a),b=document.createElement("button");b.className="drugcard";b.innerHTML=`<span class="kind">${esc(d.kind)}</span><b>${esc(d.name)}</b><small>${hasCalculableRule(d,a)?"Doz hesapla →":rr.length?"EK-2 uygulama bilgisi →":"Kaynak şemayı aç →"}</small>`;b.onclick=()=>openDoseModal(d,a);$("#relatedDrugs").appendChild(b)});
  const rel=explicitRelatedAlgorithms(a);$("#relatedAlgosWrap").style.display=rel.length?"block":"none";$("#relatedAlgos").innerHTML="";
  rel.forEach(t=>{const b=document.createElement("button");b.className="relatedalgo";b.textContent=t.title+" →";b.onclick=()=>openAlgo(t);$("#relatedAlgos").appendChild(b)});
  window.scrollTo(0,0);
}
$$(".detailtab").forEach(b=>b.onclick=()=>{if(!state.detail||state.detail.type!=="algo")return;$$(".detailtab").forEach(x=>x.classList.toggle("active",x===b));const keys=b.dataset.dtab==="keys";$("#flowPane").style.display=keys?"none":"block";$("#keysPane").style.display=keys?"block":"none"});
$("#dfav").onclick=()=>{if(!state.detail||state.detail.type!=="algo")return;toggleFav(state.detail.id);const f=favSet();$("#dfav").textContent=f.has(state.detail.id)?"★":"☆";$("#dfav").classList.toggle("on",f.has(state.detail.id));renderHome()};

function openKey(k){
  state.preDetailScreen=state.screen;state.detail={type:"key",id:k.id};$$(".screen").forEach(s=>s.classList.remove("active"));$("#detail").classList.add("open");
  $("#algoDetail").style.display="none";$("#keyDetail").style.display="block";$("#drugDetail").style.display="none";$("#dfav").style.display="none";if($("#patientPinAlgo"))$("#patientPinAlgo").style.display="none";$("#dcode").style.display="none";
  $("#dtitle").textContent=k.title;$("#dmeta").textContent=`${sectionLabel[k.section]||"Genel"} · ${k.category} · EK-2 PDF sayfa ${k.page}`;
  const linked=k.linkedCode?algoByCode(k.linkedCode):null;
  $("#keyDetail").innerHTML=k.img?`<div class="sourceframe"><img src="${k.img}" alt="${esc(k.title)}" title="Büyütmek için dokunun"></div>`:`<div class="occ"><b>EK-2 kaynak sayfası</b><p>${esc((D.pages[k.page]||"").slice(0,900))}</p></div>`;
  const keyImg=$("#keyDetail img");if(keyImg)keyImg.onclick=()=>openImage(k.img);
  if(linked){const tools=document.createElement("div");tools.className="tools";tools.innerHTML=`<button class="tool" id="linkedAlgo">İlgili algoritmayı aç</button>`;$("#keyDetail").appendChild(tools);$("#linkedAlgo").onclick=()=>openAlgo(linked)}
  window.scrollTo(0,0);
}

function bestSnippet(page, aliases){
  const text=D.pages[page]||"";const lines=text.split(/\n+/).map(x=>x.trim()).filter(Boolean);const aa=aliases.map(norm);
  for(let i=0;i<lines.length;i++){const nl=norm(lines[i]);if(aa.some(a=>nl.includes(a))){return [lines[i-1],lines[i],lines[i+1]].filter(Boolean).join(" ").slice(0,450)}}
  return text.slice(0,450);
}
function pageOwner(page){
  const exact=D.algorithms.find(a=>a.page===page);if(exact)return {type:"algo",obj:exact};
  const key=D.keyInfos.find(k=>k.page===page);if(key)return {type:"key",obj:key};
  return null;
}
function openDrug(d){
  state.preDetailScreen=state.screen;state.detail={type:"drug",id:d.id};$$('.screen').forEach(s=>s.classList.remove('active'));$('#detail').classList.add('open');
  $('#algoDetail').style.display='none';$('#keyDetail').style.display='none';$('#drugDetail').style.display='block';$('#dfav').style.display='none';$('#dcode').style.display='none';
  const owners=positiveDrugOwners(d);$('#dtitle').textContent=d.name;$('#dmeta').textContent=`${d.kind} · ${owners.length} klinik bağlam`;
  $('#drugDetail').innerHTML=`<div class="notice"><b>Kaynak ve güvenlik uyarısı</b>Bu kart, ilacın EK-2'de pozitif kullanım bağlamında bağlı olduğu şemaları listeler. Doz ve uygulama bilgisine ilgili şemanın altındaki ilaç bağlantısından geçilir.</div><div class="drugdetail" id="occList"></div>`;
  const add=document.createElement('button');add.className='actionBtn';add.textContent='Hasta Kaydına Ekle';add.onclick=()=>window.HUNV090?.recordDrug(d);$('#drugDetail').insertBefore(add,$('#occList'));
  window.HUNDrugInfo?.render(d,$('#drugDetail'));
  const list=$('#occList');
  owners.forEach(({a})=>{const box=document.createElement('div');box.className='occ occ-simple';box.innerHTML=`<div><b>${esc(a.title)}</b><small>${esc(sectionLabel[a.section])} · ${esc(a.category)}</small></div><button class="owner">Şemayı Aç →</button>`;box.querySelector('.owner').onclick=()=>openAlgo(a);list.appendChild(box)});
  if(!owners.length)list.innerHTML='<div class="empty">Pozitif kullanım bağlamı bulunamadı.</div>';
  window.scrollTo(0,0);
}

$("#back").onclick=()=>{$("#detail").classList.remove("open");state.detail=null;showScreen(state.preDetailScreen||"home");if(state.preDetailScreen==="list")renderList();if(state.preDetailScreen==="drug")renderDrugs();if(state.preDetailScreen==="key")renderKeys();if(state.preDetailScreen==="fav")renderFavs()};

function renderFavs(){
  const f=favSet(),arr=D.algorithms.filter(a=>f.has(a.code));$("#favList").innerHTML="";
  if(!arr.length)$("#favList").innerHTML='<div class="empty">Henüz favori yok. Bir algoritmada ☆ simgesine dokunarak hızlı erişime sabitleyebilirsiniz.</div>';
  arr.forEach(a=>$("#favList").appendChild(rowAlgo(a)));
}

function lineSnippet(text,q){
  const lines=(text||"").split(/\n+/).map(x=>x.trim()).filter(Boolean),nq=norm(q);
  for(let i=0;i<lines.length;i++){if(norm(lines[i]).includes(nq))return [lines[i-1],lines[i],lines[i+1]].filter(Boolean).join(" ").slice(0,360)}
  return "";
}
function runSearch(query){
 const nq=norm(query).trim();if(nq.length<2)return;
 if(state.screen!=='search')state.preSearchScreen=state.screen;showScreen('search');
 const aliases=[['epinefrin','epinephrine','adrenalin'],['dispne','nefes darligi'],['senkop','bayilma'],['carpinti','tasikardi'],['nobet','konvulziyon'],['hipoglisemi','kan sekeri dusuk']];
 let rewritten=nq;aliases.forEach(g=>{g.forEach(term=>{if(term.includes(' ')&&rewritten.includes(term))rewritten=rewritten.replaceAll(term,g[0]);});});
 const tokens=rewritten.split(/\s+/).filter(Boolean);
 const matches=(text)=>tokens.every(t=>{const alternatives=aliases.find(g=>g.includes(t))||[t];return alternatives.some(a=>text.includes(a));});
 const drugs=D.drugs.filter(d=>matches(norm(d.name+' '+d.aliases.join(' ')+' '+(window.HUNDrugInfo?.searchTerms(d.id)||''))));
 const codes=new Set(drugs.flatMap(d=>positiveDrugOwners(d).map(x=>x.a.code)));
 const results=D.algorithms.filter(a=>codes.has(a.code)||matches(norm(a.title+' '+a.category+' '+a.code+' '+a.searchPages.map(p=>D.pages[p]||'').join(' '))));
 $('#searchCount').textContent=`${results.length} algoritma`;const root=$('#searchResults');root.innerHTML='';
 for(const section of ['adult','birth','child']){const arr=results.filter(a=>a.section===section);if(!arr.length)continue;const group=document.createElement('section');group.className='algogroup';group.innerHTML='<h3>'+esc(sectionLabel[section])+'</h3><div class="algolist"></div>';arr.forEach(a=>group.querySelector('.algolist').appendChild(rowAlgo(a)));root.appendChild(group);}
 if(!results.length)root.innerHTML='<div class="empty">Algoritma bulunamadı. Daha kısa veya eşanlamlı terim deneyin.</div>';
 window.HUNServices?.track('search','search',query);
}

let searchTimer=null;
$("#q").oninput=()=>{clearTimeout(searchTimer);const v=$("#q").value;$("#clear").style.display=v?"block":"none";if(!v){showScreen(state.preSearchScreen||"home");return}searchTimer=setTimeout(()=>runSearch(v),80)};
$("#clear").onclick=()=>{$("#q").value="";$("#clear").style.display="none";showScreen(state.preSearchScreen||"home")};

$$("[data-homecat]").forEach(b=>b.onclick=()=>{state.section=b.dataset.homecat;state.category="Tümü";renderList();showScreen("list")});
function doseContextsForDrug(d){
  const seen=new Set(),out=[];
  positiveDrugOwners(d).forEach(({a})=>{if(!seen.has(a.code)){seen.add(a.code);out.push(a)}});
  C.doseRules.filter(r=>r.drugId===d.id&&r.status==="verified").forEach(r=>{if(!seen.has(r.code)){const a=algoByCode(r.code);if(a){seen.add(a.code);out.push(a)}}});
  return out;
}
function fillDoseDrugs(selectedId){
  const sel=$('#doseDrug'),visible=D.drugs.filter(d=>positiveDrugOwners(d).length||C.doseRules.some(r=>r.drugId===d.id&&r.status==="verified"));
  sel.innerHTML='<option value="">İlaç seçiniz</option>';visible.forEach(d=>{const o=document.createElement('option');o.value=d.id;o.textContent=d.name;if(d.id===selectedId)o.selected=true;sel.appendChild(o)});fillDoseContexts();
}
function fillDoseContexts(selectedCode){
  const d=drugById($('#doseDrug').value),sel=$('#doseContext');sel.innerHTML='<option value="">Klinik bağlam seçiniz</option>';if(!d){renderDosePreview();return;}
  doseContextsForDrug(d).forEach(a=>{const o=document.createElement('option');o.value=a.code;o.textContent=`${a.title} — ${sectionLabel[a.section]}`;if(a.code===selectedCode)o.selected=true;sel.appendChild(o)});renderDosePreview();
}
function doseAgeYears(){const v=$('#doseAge').value.trim(),n=Number(v);if(!v||!Number.isFinite(n)||n<0)return NaN;return n/({year:1,month:12,day:365,week:52}[$('#doseAgeUnit').value]||1);}
function fmtDoseNumber(v){
  if(!Number.isFinite(v))return "—";
  return v.toLocaleString("tr-TR",{maximumFractionDigits:3,minimumFractionDigits:0});
}
function formatDoseRange(lo,hi,unit,perTime){
  const suffix=` ${unit||""}${perTime?`/${perTime}`:""}`;
  return Math.abs(lo-hi)<1e-9?`${fmtDoseNumber(lo)}${suffix}`:`${fmtDoseNumber(lo)}–${fmtDoseNumber(hi)}${suffix}`;
}
function ruleNeedsAge(r){return !!(r.calc&&(r.calc.ageCaps||Number.isFinite(r.calc.ageMinYears)))}
function matchingAgeCap(age,caps){
  return (caps||[]).find(c=>(c.lt===undefined||age<c.lt)&&(c.lte===undefined||age<=c.lte)&&(c.gt===undefined||age>c.gt)&&(c.gte===undefined||age>=c.gte));
}
function calcRule(r,weight,age){
  const c=r.calc;if(!c||c.auto!==true)return {auto:false};
  if(Number.isFinite(age)&&age<0)return {auto:true,error:"Yaş negatif olamaz."};
  if(!Number.isFinite(weight)||weight<=0)return {auto:true,error:"Hesaplama için vücut ağırlığını girin."};
  if(Number.isFinite(c.ageMinYears)){
    if(!Number.isFinite(age))return {auto:true,error:"Bu kural yaş sınırı içeriyor. Yaşı girin."};
    if(age<c.ageMinYears)return {auto:true,blocked:true,error:r.conditions||`Kaynağa göre ${fmtDoseNumber(c.ageMinYears)} yaş altında uygulanmaz.`};
  }
  let ageCap=null;
  if(c.ageCaps){
    if(!Number.isFinite(age))return {auto:true,error:"Bu doz yaşa bağlı maksimum içeriyor. Yaşı girin."};
    ageCap=matchingAgeCap(age,c.ageCaps);
    if(!ageCap)return {auto:true,blocked:true,error:r.warning||"Bu yaş değeri için EK-2 sınırı açık değildir; otomatik sonuç verilmez."};
  }
  if(c.kind==="weightBands"){
    const band=(c.bands||[]).find(b=>(b.lt===undefined||weight<b.lt)&&(b.lte===undefined||weight<=b.lte)&&(b.gt===undefined||weight>b.gt)&&(b.gte===undefined||weight>=b.gte));
    if(!band)return {auto:true,error:"Bu kilo için doğrulanmış doz bandı bulunamadı."};
    return {auto:true,rawLo:band.value,rawHi:band.value,lo:band.value,hi:band.value,unit:c.unit,changed:false};
  }
  if(c.kind!=="multiply")return {auto:false};
  const rawLo=c.low*weight,rawHi=c.high*weight;let lo=rawLo,hi=rawHi,limits=[];
  if(c.floor){const before=[lo,hi];lo=Math.max(lo,c.floor.value);hi=Math.max(hi,c.floor.value);if(lo!==before[0]||hi!==before[1])limits.push(`Minimum ${fmtDoseNumber(c.floor.value)} ${c.floor.unit||c.unit}`)}
  if(c.cap){const before=[lo,hi];lo=Math.min(lo,c.cap.value);hi=Math.min(hi,c.cap.value);if(lo!==before[0]||hi!==before[1])limits.push(`Maksimum ${fmtDoseNumber(c.cap.value)} ${c.cap.unit||c.unit}`)}
  if(ageCap&&Number.isFinite(ageCap.max)){const before=[lo,hi];lo=Math.min(lo,ageCap.max);hi=Math.min(hi,ageCap.max);if(lo!==before[0]||hi!==before[1])limits.push(`Yaşa bağlı maksimum ${fmtDoseNumber(ageCap.max)} ${c.unit}`)}
  const out={auto:true,rawLo,rawHi,lo,hi,unit:c.unit,perTime:c.perTime||null,changed:Math.abs(rawLo-lo)>1e-9||Math.abs(rawHi-hi)>1e-9,limits};
  if(c.secondary){
    const srLo=c.secondary.low*weight,srHi=c.secondary.high*weight;let sLo=srLo,sHi=srHi;
    if(c.secondary.capFollowsPrimary){if(rawLo>0)sLo=lo*(srLo/rawLo);if(rawHi>0)sHi=hi*(srHi/rawHi)}
    out.secondary={rawLo:srLo,rawHi:srHi,lo:sLo,hi:sHi,unit:c.secondary.unit,label:c.secondary.label||"Hacim",changed:Math.abs(srLo-sLo)>1e-9||Math.abs(srHi-sHi)>1e-9};
  }
  if(Number.isFinite(c.totalMaxPerKg))out.totalMaxPerKg={value:c.totalMaxPerKg*weight,unit:c.unit||"ml",perKg:c.totalMaxPerKg};
  if(c.totalMax)out.totalMax=c.totalMax;
  return out;
}
function fieldRow(label,value){return value?`<div class="doseField"><b>${esc(label)}</b><span>${esc(value)}</span></div>`:""}
function sourceButtons(r){return (r.sourcePages||[]).map(p=>`<button class="doseSourceBtn" data-page="${p}">EK-2 s. ${p} →</button>`).join("")}
function renderRuleCard(r,weight,age,calculate){
  const result=calculate?calcRule(r,weight,age):null;
  let answer="";
  if(calculate&&result){
    if(result.error)answer=`<div class="doseWarn ${result.blocked?"critical":""}"><b>${result.blocked?"Otomatik hesaplama yapılmadı":"Eksik bilgi"}</b>${esc(result.error)}</div>`;
    else if(result.auto){
      const finalText=formatDoseRange(result.lo,result.hi,result.unit,result.perTime),rawText=formatDoseRange(result.rawLo,result.rawHi,result.unit,result.perTime);
      answer=`<div class="doseAnswer"><small>EK-2 KURALINA GÖRE SONUÇ</small><strong>${esc(finalText)}</strong><span>${esc(weight)} kg${Number.isFinite(age)?` · ${esc(age)} yaş`:""}</span></div>`;
      if(result.changed)answer+=`<div class="doseLimit"><b>Ham hesap:</b> ${esc(rawText)}<br><b>Uygulanan sınır:</b> ${esc((result.limits||[]).join(" · "))}<br><b>Nihai sonuç:</b> ${esc(finalText)}</div>`;
      if(result.secondary){const st=formatDoseRange(result.secondary.lo,result.secondary.hi,result.secondary.unit);answer+=`<div class="doseSecondary"><b>${esc(result.secondary.label)}:</b> ${esc(st)}${result.secondary.changed?" (doz sınırı hacme de uygulandı)":""}</div>`}
      if(result.totalMaxPerKg)answer+=`<div class="doseHint"><b>Kaynak toplam üst sınırı:</b> ${esc(fmtDoseNumber(result.totalMaxPerKg.value))} ${esc(result.totalMaxPerKg.unit)} (${esc(fmtDoseNumber(result.totalMaxPerKg.perKg))} ${esc(result.totalMaxPerKg.unit)}/kg)</div>`;
      if(result.totalMax)answer+=`<div class="doseHint"><b>Kaynak toplam maksimumu:</b> ${esc(fmtDoseNumber(result.totalMax.value))} ${esc(result.totalMax.unit)}</div>`;
    }else answer='<div class="doseHint">Bu kayıt kaynakta sabit doz / uygulama talimatı olarak yer alır; otomatik kilo hesabı yapılmaz.</div>';
  }else if(r.calc&&r.calc.auto===true){
    answer=`<div class="doseHint">EK-2 veri setindeki hesaplama kuralı; v0.9 klinik denetimi sürüyor. ${ruleNeedsAge(r)?"Kilo ve gerekiyorsa yaş bilgisini girip Hesapla’ya basın.":"Kilo bilgisini girip Hesapla’ya basın."}</div>`;
  }else answer='<div class="doseHint">Bu kayıt EK-2 kaynak talimatını gösterir; otomatik hesaplama yapılmaz.</div>';
  const prep=(r.preparation||[]).map(x=>`<li>${esc(x)}</li>`).join("");
  return `<section class="doseRule ${r.warning?"hasWarning":""}"><div class="doseRuleHead"><div><small>${esc(r.id)}</small><h3>${esc(r.variant||"EK-2 uygulama kuralı")}</h3></div><span class="verified">EK-2 kaynak kaydı</span></div>${answer}<div class="doseFields">${fieldRow("Doz / kaynak ifadesi",r.doseText)}${fieldRow("Uygulama yolu",r.route)}${fieldRow("Konsantrasyon",r.concentration)}${fieldRow("Süre / hız",r.duration)}${fieldRow("Tekrar",r.repeat)}${fieldRow("Maksimum",r.maxText)}${fieldRow("Minimum",r.minText)}${fieldRow("Koşul",r.conditions)}${fieldRow("Not",r.notes)}</div>${prep?`<div class="dosePrep"><b>Hazırlama / sulandırma</b><ul>${prep}</ul></div>`:""}${r.warning?`<div class="doseWarn critical"><b>Kaynak uyarısı / belirsizlik</b>${esc(r.warning)}</div>`:""}<div class="doseSources">${sourceButtons(r)}</div><div class="buttonRow"><button class="actionBtn doseRecordBtn" data-rule="${esc(r.id)}" data-calculated="${calculate&&result?.auto&&!result.error?'yes':'no'}">${calculate&&result?.auto&&!result.error?'Hesaplanan dozu hasta kaydına ekle':'Hasta Kaydına Ekle — manuel doz'}</button>${calculate&&result?.auto&&!result.error?`<button class="actionBtn ghost doseRecordBtn" data-rule="${esc(r.id)}" data-calculated="yes" data-edit="yes">Dozu düzenleyerek hasta kaydına ekle</button>`:''}</div></section>`;
}
function bindDoseSourceButtons(){
  $$('.doseSourceBtn').forEach(b=>b.onclick=()=>openImage(pageImg(+b.dataset.page)));
  $$('.doseRecordBtn').forEach(b=>b.onclick=()=>window.HUNV090?.recordRule(b.dataset.rule,b.dataset.calculated==='yes',b.dataset.edit==='yes'));
}
function renderDosePreview(){
  const d=drugById($('#doseDrug').value),a=algoByCode($('#doseContext').value),root=$('#doseResult');if(!d||!a){root.innerHTML='<div class="empty">İlaç ve klinik bağlamı seçin.</div>';return}
  const rules=rulesFor(d,a);
  if(!rules.length){root.innerHTML=`<div class="doseWarn critical"><b>Otomatik doz kuralı yok</b>Bu ilaç/bağlam için doğrulanmış yapılandırılmış doz kuralı bulunmuyor. Kaynak şema esas alınmalıdır.</div><div class="doseSources"><button class="doseSourceBtn" data-page="${a.page}">Kaynak şemayı aç — EK-2 s. ${a.page} →</button></div>`;bindDoseSourceButtons();return}
  const needsAge=rules.some(ruleNeedsAge);$('#doseAgeWrap').classList.toggle('needed',needsAge);
  root.innerHTML=`<div class="doseContextHead"><b>${esc(d.name)} · ${esc(a.title)}</b><span>${rules.length} doğrulanmış EK-2 kuralı${needsAge?" · yaş bilgisi gereken kural var":""}</span></div>`+rules.map(r=>renderRuleCard(r,NaN,NaN,false)).join('');bindDoseSourceButtons();
}
function calculateDose(){
  window.HUNServices?.track('dose_use','dose');
  const d=drugById($('#doseDrug').value),a=algoByCode($('#doseContext').value),weight=parseFloat($('#doseWeight').value),age=doseAgeYears(),root=$('#doseResult');if(!d||!a){renderDosePreview();return}
  if(!$('#doseWeight').reportValidity()||!$('#doseAge').reportValidity())return;
  const rules=rulesFor(d,a);if(!rules.length){renderDosePreview();return}
  root.innerHTML=`<div class="doseContextHead"><b>${esc(d.name)} · ${esc(a.title)}</b><span>${rules.length} doğrulanmış EK-2 kuralı</span></div>`+rules.map(r=>renderRuleCard(r,weight,age,true)).join('')+'<div class="doseSafety"><b>Kontrol:</b> Hesaplama yalnızca doğrulanmış EK-2 kuralından yapılır. Kaynakta belirtilen uygulama yolu, hız/süre, tekrar, maksimum/minimum ve hazırlama bilgileri sonuçla birlikte değerlendirilmelidir. Kaynakta olmayan preparat konsantrasyonu varsayılmaz.</div>';bindDoseSourceButtons();
}
function openDoseModal(d,a){$('#doseModal').classList.add('open');fillDoseDrugs(d&&d.id);if(a)fillDoseContexts(a.code);if(window.HUNV090)window.HUNV090.prefillDose(true);$('#doseWeight').focus()}
['#doseWeight','#doseAge','#doseAgeUnit'].forEach(s=>$(s).addEventListener('input',renderDosePreview));
$('#doseDrug').onchange=()=>fillDoseContexts();$('#doseContext').onchange=renderDosePreview;$('#calculateDose').onclick=calculateDose;
$("#drugHome").onclick=()=>{state.alpha="Tümü";renderDrugs();showScreen("drug")};
$("#keyHome").onclick=()=>{state.section="all";state.keyCategory="Tümü";renderKeys();showScreen("key")};
if($("#doseHome"))$("#doseHome").onclick=()=>{$("#doseModal").classList.add("open");fillDoseDrugs();if(window.HUNV090)window.HUNV090.prefillDose(true)};
if($("#closeDose"))$("#closeDose").onclick=()=>$("#doseModal").classList.remove("open");

$$(".navbtn").forEach(b=>b.onclick=()=>{
  const n=b.dataset.nav;$("#q").value="";$("#clear").style.display="none";
  if(n==="home"){renderHome();showScreen("home")}
  if(n==="adult"){state.section="adult";state.category="Tümü";renderList();showScreen("list")}
  if(n==="pediatric"){state.section="pediatric";state.category="Tümü";renderList();showScreen("list")}
  if(n==="favorites"){renderFavs();showScreen("fav")}
  if(n==="patient"){window.HUNV090?.openPatient?.()}
  if(n==="dose"){$("#doseModal").classList.add("open");fillDoseDrugs();if(window.HUNV090)window.HUNV090.prefillDose(true)}
});

window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();installPrompt=e;});
$("#installBtn").onclick=async()=>{if(installPrompt){installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;$("#installBtn").style.display="none"}else{alert("Android/Chrome: tarayıcı menüsünden “Uygulamayı yükle” veya “Ana ekrana ekle” seçeneğini kullanın. iPhone/iPad: Paylaş > Ana Ekrana Ekle.")}};

async function offlineStatus(){
  const dot=$("#offlineText .statusdot");
  if(location.protocol==="file:"){dot.className="statusdot warn";$("#offlineText").childNodes[$("#offlineText").childNodes.length-1].textContent=" Ön izleme modu";$("#offlineSub").textContent="Canlı bağlantıdan açıldığında tek dokunuşla offline hazırlama yapılabilir.";$("#offlineBtn").style.display="none";return}
  if(!("serviceWorker" in navigator)||!("caches" in window)){dot.className="statusdot warn";$("#offlineText").childNodes[$("#offlineText").childNodes.length-1].textContent=" Offline hazırlama desteklenmiyor";$("#offlineSub").textContent="Bu tarayıcı offline hazırlamayı desteklemiyor.";return}
  let ready=false;
  if(localStorage.getItem("ek2-offline-version")===D.version){
    try{const scope=new URL('./',location.href).pathname;
      const cache=await caches.open('hun-'+encodeURIComponent(scope)+'-offline-'+D.version);
      const manifest=await cache.match('./offline-manifest.json');
      const assets=manifest?await manifest.json():[];
      ready=assets.length>0&&(await Promise.all(assets.map(a=>cache.match(a)))).every(Boolean);
    }catch{ready=false;}
    if(!ready)localStorage.removeItem('ek2-offline-version');
  }
  dot.className="statusdot "+(ready?"ready":"warn");
  $("#offlineText").childNodes[$("#offlineText").childNodes.length-1].textContent=ready?" Offline paket hazır":" Offline paket henüz hazırlanmadı";
  $("#offlineSub").textContent=ready?"Bu uygulama artık internet bağlantısı olmadan kullanılabilir.":"Hazırladıktan sonra bu uygulama internet bağlantısı olmadan kullanılabilir.";if(ready)window.HUNV091?.showInstallAfterOffline?.();
}
async function prepareOffline(){
  if(location.protocol==="file:"){alert("Offline hazırlama canlı bağlantı üzerinden yapılır.");return}
  if(!("caches" in window)){alert("Bu tarayıcı offline hazırlamayı desteklemiyor.");return}
  const progress=$("#offlineProgress"), bar=$("#offlineProgress span"), btn=$("#offlineBtn"), sub=$("#offlineSub");
  progress.style.display="block"; bar.style.width="1%"; btn.disabled=true; sub.textContent="Offline paket hazırlanıyor. Lütfen uygulamayı kapatmayın.";
  try{
    const assets=await fetch("offline-manifest.json?version="+encodeURIComponent(D.version),{cache:"no-store"}).then(r=>{if(!r.ok)throw new Error("offline-manifest.json");return r.json()});
    const scope=new URL("./",location.href).pathname;
    const cache=await caches.open("hun-"+encodeURIComponent(scope)+"-offline-"+D.version);
    let done=0;
    for(const url of assets){
      const req=new Request(url,{cache:"reload"});
      const resp=await fetch(req);
      if(!resp.ok)throw new Error("Eksik veya erişilemeyen dosya: "+url);
      await cache.put(req,resp.clone());
      done++;
      bar.style.width=Math.max(2,Math.round(done*100/assets.length))+"%";
      sub.textContent=`Offline paket indiriliyor: ${done}/${assets.length}`;
      await new Promise(r=>setTimeout(r,0));
    }
    localStorage.setItem("ek2-offline-version",D.version);
    sub.textContent="Offline paket hazır. Bu uygulama artık internet bağlantısı olmadan kullanılabilir.";
    btn.disabled=false; offlineStatus(); window.HUNV091?.showInstallAfterOffline?.();
  }catch(e){
    btn.disabled=false; $("#offlineText .statusdot").className="statusdot warn"; $("#offlineText").childNodes[$("#offlineText").childNodes.length-1].textContent=" Offline paket tamamlanamadı"; sub.textContent="Hata: "+(e.message||e)+". Bağlantıyı kontrol edip tekrar deneyin.";
  }
}
$("#offlineBtn").onclick=prepareOffline;
if($("#startOfflineFromOnboard"))$("#startOfflineFromOnboard").onclick=()=>{localStorage.setItem("hun-onboard-v080","1");$("#onboard").classList.remove("open");prepareOffline()};
if($("#skipOnboard"))$("#skipOnboard").onclick=()=>{localStorage.setItem("hun-onboard-v080","1");$("#onboard").classList.remove("open")};

async function registerSW(){
 if(location.protocol==="file:"||!("serviceWorker" in navigator)){offlineStatus();return}
 try{
  const reg=await navigator.serviceWorker.register("./sw.js");
  if(reg.waiting)showUpdate(reg);
  reg.addEventListener("updatefound",()=>{const nw=reg.installing;if(nw)nw.addEventListener("statechange",()=>{if(nw.state==="installed"&&navigator.serviceWorker.controller)showUpdate(reg)})});
  navigator.serviceWorker.addEventListener("controllerchange",()=>location.reload());
 }catch(e){}
 offlineStatus();
}
function showUpdate(reg){$("#updateBanner").classList.add("show");$("#applyUpdate").onclick=()=>{if(reg.waiting)reg.waiting.postMessage({type:"SKIP_WAITING"})}}

async function checkCoreFiles(){
  if(location.protocol==="file:") return;
  const test=["./icon-192.png","./page-006.jpg","./page-083.jpg","./page-140.jpg"];
  const missing=[];
  for(const url of test){
    try{ const r=await fetch(url,{cache:"no-store"}); if(!r.ok) missing.push(url); }
    catch(e){ missing.push(url); }
  }
  if(missing.length){
    const sub=$("#offlineSub");
    const dot=$("#offlineText .statusdot");
    if(dot) dot.className="statusdot warn";
    if(sub) sub.textContent="Kurulum dosyaları eksik görünüyor: "+missing.join(", ")+". ZIP içindeki tüm dosyaları kök dizine yükleyin.";
  }
}

renderHome();renderDrugs();renderKeys();renderFavs();registerSW();checkCoreFiles();if(localStorage.getItem("hun-onboard-v080")!=="1")setTimeout(()=>$("#onboard").classList.add("open"),500);

window.HUNApp091={showScreen,openAlgo,algoByCode,renderHome,fillDoseDrugs,fillDoseContexts,openDoseModal,state};
