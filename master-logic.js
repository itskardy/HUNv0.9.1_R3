(function(root){
'use strict';
const leads=['I','II','III','aVR','aVL','aVF','V1','V2','V3','V4','V5','V6'];
const numeric=v=>String(v??'').trim()===''?null:(Number.isFinite(Number(v))?Number(v):null);
function ecg(i){
 const direct=numeric(i.ecgDirectRate),rr=numeric(i.ecgRrBoxes),count=numeric(i.ecgQrsCount),speed=Number(i.ecgSpeed)||25,seconds=Number(i.ecgStripSeconds)||10;
 const pediatric=i.ecgGroup==='child'||i.ecgGroup==='pediatric';
 let rate=null,method='',possibilities=[],codes=[],classification='';
 if(direct!==null&&direct>0){rate=direct;method='Doğrudan giriş';}
 else if(direct!==null){possibilities.push('Doğrudan kalp hızı pozitif olmalıdır.');}
 else if(i.ecgRegular==='yes'&&rr>0){rate=(speed===50?3000:1500)/rr;method=`${speed===50?3000:1500}/${rr} küçük kare`;}
 else if(i.ecgRegular==='no'&&count>0){rate=count*60/seconds;method=`${count} QRS / ${seconds} sn`;}
 const rawRate=rate;rate=rate===null?null:Math.round(rate*10)/10;
 const boxes=numeric(i.ecgQrsBoxes),ms=boxes>0?boxes*(speed===50?20:40):null;
 let measured=null;
 if(ms!==null){
   if(pediatric) measured=ms<90?'narrow':ms>90?'wide':'borderline';
   else measured=ms<120?'narrow':'wide';
 }
 let width=['narrow','wide'].includes(i.ecgWidth)?i.ecgWidth:(measured==='borderline'?null:measured);
 const contradiction=measured&&measured!=='borderline'&&['narrow','wide'].includes(i.ecgWidth)&&measured!==i.ecgWidth;
 if(contradiction){width=null;possibilities.push('QRS seçimi ile kare ölçümü çelişiyor; QRS temelli yorum yapılmadı.');}
 if(pediatric&&ms===90)possibilities.push('QRS tam 0,09 sn: EK-2 <0,09 ve >0,09 sn sınırlarını verir; otomatik dar/geniş sınıflaması yapılmadı.');
 const sinus=i.ecgRegular==='yes'&&i.ecgPVisible==='yes'&&i.ecgPtoQrs==='yes'&&i.ecgQrsBeforeP==='yes'&&i.ecgPrConstant==='yes'&&width==='narrow';
 if(rawRate!==null&&i.ecgGroup==='adult'){
   classification=rawRate<60?'Bradikardi':rawRate>100?'Taşikardi':'Normal hız aralığı (60–100/dk)';
   if(rawRate<60){possibilities.push('Bradikardi açısından değerlendir');codes.push('SB-ASH-Y-07');}
   if(rawRate>100){codes.push('SB-ASH-Y-08');if(width==='wide')possibilities.push('VT dahil geniş kompleks taşikardi açısından değerlendir');if(width==='narrow'&&i.ecgRegular==='yes'&&i.ecgPVisible==='no')possibilities.push('SVT açısından değerlendir');if(sinus)possibilities.push('Sinüs taşikardisi açısından değerlendir');}
   if(i.ecgRegular==='no'&&width==='narrow'&&i.ecgPVisible==='no')possibilities.push('Atriyal fibrilasyon vb. ritimler açısından değerlendir');
   if(sinus&&rawRate>=60&&rawRate<=100)possibilities.push('Sinüs ritmi ölçütleri açısından değerlendir; normal hız tek başına normal EKG anlamına gelmez.');
 }else if(rawRate!==null&&pediatric){
   const age=numeric(i.ecgAgeYears);
   if(rawRate<60){
     classification='Pediatrik KAH <60/dk';
     codes.push('SB-ASH-Ç-10');
     if(i.ecgPoorPerfusion&&i.ecgDespiteOxygen)possibilities.push('EK-2: KAH <60/dk + kötü perfüzyon + yeterli oksijenasyon/ventilasyona rağmen sürme koşulları mevcut; Çocuk Bradikardi algoritması açısından değerlendir.');
     else possibilities.push('Çocuk Bradikardi açısından değerlendir. EK-2 tedavi eşiği için kötü perfüzyon ve yeterli oksijenasyon/ventilasyona rağmen sürme koşullarını ayrıca doğrula.');
   } else if(age===null){
     classification='Pediatrik hız: yaş gerekli';
     possibilities.push('EK-2 pediatrik sinüs taşikardisi/SVT hız ayrımı için yaşı girin.');
   } else if(age===1){
     classification='Pediatrik hız: 1 yaş sınırı';
     possibilities.push('EK-2 tablosu bebek için <1 yaş, çocuk için >1 yaş tanımı verir; tam 1 yaşta otomatik 180/220 eşiği uygulanmadı.');
     codes.push('SB-ASH-Ç-11');
   } else {
     const infant=age<1,thr=infant?220:180,band=infant?'bebek (<1 yaş)':'çocuk (>1 yaş)';
     classification=`Pediatrik ${band}: ${rate}/dk`;
     if(rawRate>thr){
       possibilities.push(`KAH >${thr}/dk: EK-2 tablosunda SVT lehine hız bulgusu.`);
       if(i.ecgRegular==='yes'&&i.ecgPVisible==='no')possibilities.push('Sabit R-R ve seçilemeyen/anormal P dalgası SVT lehine ek bulgulardır.');
       if(width==='narrow')possibilities.push('QRS <0,09 sn ile birlikte SVT açısından değerlendir.');
       codes.push('SB-ASH-Ç-11');
     } else if(rawRate<thr){
       possibilities.push(`KAH <${thr}/dk: EK-2 tablosunda sinüs taşikardisi lehine hız bulgusu; P dalgası ve R-R değişkenliği ile birlikte değerlendir.`);
       codes.push('SB-ASH-Ç-11');
     } else {
       possibilities.push(`KAH tam ${thr}/dk: EK-2 tablosu < ve > eşikleri verir; otomatik sinüs/SVT sınıflaması yapılmadı.`);
       codes.push('SB-ASH-Ç-11');
     }
     if(width==='wide'){possibilities.push('QRS >0,09 sn: geniş kompleks taşikardi/ventriküler ritim olasılıklarını Çocuk Taşikardi algoritmasında değerlendir.');codes.push('SB-ASH-Ç-11');}
   }
 }else if(rawRate!==null){classification='Hasta grubu seçilmedi; hız sınıflaması yapılmadı';}
 const st=Object.fromEntries(leads.map(l=>[l,i.st?.[l]==='elevation'?'elevation':'']));
 const elevated=leads.filter(l=>st[l]==='elevation');
 if(elevated.length||i.ecgAcs==='yes'){
   if(pediatric)possibilities.push('Pediatrik ST/iskemi bulgusu girildi. EK-2’de pediatrik AKS için doğrulanmış hedef algoritma yok; yetişkin AKS algoritmasına otomatik yönlendirme yapılmadı.');
   else {possibilities.push('Akut Koroner Sendrom açısından değerlendir. Tek başına ST seçimi kesin MI tanısı değildir.');if(i.ecgGroup==='adult')codes.push('SB-ASH-Y-06');}
 }
 const leadTerritories={I:'lateral',II:'inferior',III:'inferior',aVR:'',aVL:'lateral',aVF:'inferior',V1:'septal',V2:'septal',V3:'anterior',V4:'anterior',V5:'lateral',V6:'lateral'};
 const leadLabel=l=>leadTerritories[l]?`${l} (${leadTerritories[l]})`:l;
 const rhythmParts=[];
 if(i.ecgRegular)rhythmParts.push(`Ritim: ${{yes:'Düzenli',no:'Düzensiz',unknown:'Değerlendirilemedi'}[i.ecgRegular]}`);
 if(i.ecgPVisible)rhythmParts.push(`P dalgası: ${{yes:'Var',no:'Yok',unknown:'Değerlendirilemedi'}[i.ecgPVisible]}`);
 if(i.ecgPtoQrs)rhythmParts.push(`P sonrası QRS: ${{yes:'Evet',no:'Hayır',unknown:'Değerlendirilemedi'}[i.ecgPtoQrs]}`);
 if(i.ecgQrsBeforeP)rhythmParts.push(`QRS öncesi P: ${{yes:'Evet',no:'Hayır',unknown:'Değerlendirilemedi'}[i.ecgQrsBeforeP]}`);
 if(i.ecgPrConstant)rhythmParts.push(`PR sabit: ${{yes:'Evet',no:'Hayır',unknown:'Değerlendirilemedi'}[i.ecgPrConstant]}`);
 const detail=[...rhythmParts,rate!==null?`Hız ${rate}/dk (${method})`:'',width?`QRS ${width==='wide'?'geniş':'dar'}${ms!==null?` (${ms} ms)`:''}`:(ms===90?'QRS 90 ms — sınır değeri':''),i.ecgAcs?`AKS klinik bulgusu: ${{yes:'Var',no:'Yok',unknown:'Değerlendirilemedi'}[i.ecgAcs]}`:'',i.ecgPoorPerfusion?'Kötü perfüzyon bulguları: Var':'',i.ecgDespiteOxygen?'Yeterli oksijenasyon/ventilasyona rağmen sürüyor':'',elevated.length?`ST elevasyonu: ${elevated.map(leadLabel).join(', ')}`:''];
 const hasInput=rate!==null||elevated.length>0||!!i.ecgAcs||rhythmParts.length>0||ms!==null||!!width||!!i.ecgPoorPerfusion||!!i.ecgDespiteOxygen;
 return {rate,rawRate,width,ms,classification,possibilities,codes:[...new Set(codes)],st,leadTerritories,hasInput,summary:[classification,...possibilities,...detail].filter(Boolean).join(' · ')};
}
function hemodynamics(sys,dia,pulse){sys=numeric(sys);dia=numeric(dia);pulse=numeric(pulse);return {map:sys>0&&dia!==null&&dia>=0&&dia<=sys?(sys+2*dia)/3:null,shockIndex:sys>0&&pulse!==null&&pulse>=0?pulse/sys:null,invalidPressure:sys!==null&&dia!==null&&(sys<=0||dia<0||dia>sys)};}
root.HUNMasterLogic={leads,ecg,hemodynamics};
})(typeof window==='undefined'?globalThis:window);
