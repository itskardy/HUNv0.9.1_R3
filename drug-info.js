(function(root){
'use strict';
// Supplementary product information never enters EK-2 dose rules.
const entries={
  "drug-adrenalin": {
    "ingredient": "Adrenalin (epinefrin)",
    "products": [
      {
        "brand": "Adrenalin Osel",
        "strength": "1 mg/mL",
        "form": "IM/IV/SC enjeksiyonluk çözelti",
        "route": "IM/IV/SC",
        "warning": "EK-2’de 1/1.000 ve 1/10.000 konsantrasyon bağlamları vardır; ürün konsantrasyonu uygulama öncesi mutlaka doğrulanmalıdır."
      },
      {
        "brand": "Adrenalin Osel",
        "strength": "0,5 mg/1 mL",
        "form": "IM/IV/SC enjeksiyonluk çözelti",
        "route": "IM/IV/SC",
        "warning": "Farklı konsantrasyondur; 1 mg/mL preparatla otomatik eşdeğer kabul edilmez."
      },
      {
        "brand": "Adrenalin Osel",
        "strength": "0,25 mg/1 mL",
        "form": "IM/IV/SC enjeksiyonluk çözelti",
        "route": "IM/IV/SC",
        "warning": "Farklı konsantrasyondur; otomatik hacim dönüşümü yapılmaz."
      }
    ],
    "mechanism": "Alfa ve beta adrenerjik reseptör agonistidir. Vazokonstriksiyon, bronkodilatasyon ve kardiyak uyarı oluşturur.",
    "indications": "KÜB ürün bilgileri anafilaksi, kardiyak resüsitasyon ve seçilmiş akut dolaşım/bronşiyal durumlarda kullanımı kapsar; HUN’daki klinik kullanım bağlamı EK-2 ile sınırlandırılır.",
    "caution": "Taşiaritmi, miyokard iskemisi ve hipertansiyon gelişebilir. Konsantrasyon karışıklığı ciddi doz hatasına yol açabileceğinden ampul gücü her uygulamada ayrıca kontrol edilmelidir.",
    "sources": [
      {
        "label": "Haver/Osel ürün ve KÜB/KT",
        "url": "https://www.haver.com.tr/ilaclar/adrenalin-osel-1-mgml-imivsc-enjeksiyonluk-cozelti-10-ampul"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-adenozin": {
    "ingredient": "Adenozin",
    "products": [
      {
        "brand": "Adenotek",
        "strength": "6 mg/2 mL",
        "form": "ampul",
        "route": "IV",
        "warning": "EK-2’nin 6 mg başlangıç dozu ile aynı sunum gücündedir; yine de ürün etiketi doğrulanmalıdır."
      },
      {
        "brand": "Adozin",
        "strength": "6 mg/2 mL",
        "form": "enjeksiyonluk çözelti",
        "route": "IV",
        "warning": "Aynı etken maddeli üründür; yardımcı maddeler/ürün bilgisi kontrol edilmelidir."
      },
      {
        "brand": "Adenosin-L.M.",
        "strength": "5 mg/mL",
        "form": "enjeksiyon/infüzyon çözeltisi",
        "route": "IV",
        "warning": "Farklı konsantrasyondur; Adenotek 6 mg/2 mL ile otomatik hacim eşdeğerliği yapılmaz."
      }
    ],
    "mechanism": "Adenozin A1 reseptörleri üzerinden AV düğüm iletimini çok kısa süreli baskılar. Etkisi saniyeler içinde başlar ve plazmada çok kısa sürer.",
    "indications": "KÜB’de paroksismal supraventriküler taşikardinin sonlandırılması ve bazı tanısal/stres uygulamaları yer alır.",
    "caution": "İleri AV blok veya hasta sinüs sendromunda kalp pili yoksa kullanılmamalıdır. Bronkospazm riski nedeniyle astım/reaktif havayolu hastalığında dikkat gerekir; kafein/teofilin ve dipiridamol etkileşimleri önemlidir.",
    "sources": [
      {
        "label": "Açık İlaç — TİTCK KÜB/KT bağlantılı ürün kaydı",
        "url": "https://acikilac.com/ilac/adenotek"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-amiodaron": {
    "ingredient": "Amiodaron hidroklorür",
    "products": [
      {
        "brand": "Cordarone",
        "strength": "150 mg/3 mL",
        "form": "IV enjeksiyonluk çözelti",
        "route": "IV",
        "warning": "Benzil alkol içerebilir; pediatrik kullanım ve preparat uygunluğu ürün KÜB’ünden doğrulanmalıdır."
      },
      {
        "brand": "Amiodaron içeren diğer ürünler",
        "strength": "ürüne göre değişir",
        "form": "tablet/IV sunumlar olabilir",
        "route": "ürüne göre",
        "warning": "Oral ve IV preparatlar otomatik eşdeğer değildir; yalnız uygun IV preparat HUN acil bağlamıyla ilişkilendirilmelidir."
      }
    ],
    "mechanism": "Başlıca potasyum kanallarını bloke ederek repolarizasyonu ve aksiyon potansiyeli süresini uzatan Sınıf III antiaritmiktir. Sodyum/kalsiyum kanal ve antiadrenerjik etkileri de vardır.",
    "indications": "Ciddi supraventriküler ve ventriküler ritim bozukluklarında kullanılır; HUN’daki doz/endikasyonlar yalnız EK-2’den gelir.",
    "caution": "Bradikardi, iletim bozukluğu, hipotansiyon ve QT uzaması görülebilir. Tiroid, karaciğer ve akciğer toksisitesi uzun süreli kullanımda önemlidir; IV preparatın yardımcı maddeleri ayrıca değerlendirilmelidir.",
    "sources": [
      {
        "label": "Sanofi Cordarone KÜB",
        "url": "https://www.sanofi.com/assets/countries/turkey/docs/products/prescription-products/C/cordarone-150-mg-iv-kub.pdf"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-asetilsalisilik-asit": {
    "ingredient": "Asetilsalisilik asit",
    "products": [
      {
        "brand": "Aspirin",
        "strength": "ürüne göre değişir",
        "form": "tablet",
        "route": "Oral",
        "warning": "EK-2 AKS bağlamında 160–325 mg çiğnetme talimatı verir; enterik kaplı veya farklı güçlü tabletler otomatik olarak aynı uygulama biçimi kabul edilmez."
      },
      {
        "brand": "Coraspin",
        "strength": "100 mg",
        "form": "enterik kaplı tablet",
        "route": "Oral",
        "warning": "Enterik kaplı preparattır; EK-2’deki çiğnetme uygulamasıyla otomatik eşdeğer kabul edilmez."
      },
      {
        "brand": "Ecopirin",
        "strength": "ürüne göre değişir",
        "form": "enterik kaplı tablet",
        "route": "Oral",
        "warning": "Form ve güç farklılığı nedeniyle EK-2 acil yükleme uygulaması için otomatik seçilmez."
      }
    ],
    "mechanism": "Siklooksijenazı geri dönüşümsüz asetilleyerek tromboksan A2 sentezini ve trombosit agregasyonunu azaltır. Trombosit etkisi trombosit ömrü boyunca sürer.",
    "indications": "Antiplatelet amaçla akut koroner sendrom dahil aterotrombotik durumlarda kullanılır; HUN acil dozu EK-2’ye göre gösterilir.",
    "caution": "Aktif kanama ve asetilsalisilik asit/NSAİİ aşırı duyarlılığında kullanılmamalıdır. Gastrointestinal kanama ve bronkospazm riski göz önünde bulundurulmalıdır.",
    "sources": [
      {
        "label": "TİTCK Akılcı İlaç Kullanımı portalı",
        "url": "https://akilciilac.titck.gov.tr/"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-atropin": {
    "ingredient": "Atropin sülfat",
    "products": [
      {
        "brand": "Atropin Sülfat Osel",
        "strength": "1 mg/1 mL",
        "form": "enjeksiyonluk çözelti",
        "route": "IV/IM/SC",
        "warning": "EK-2’deki 1 mg erişkin bradikardi dozu ile aynı toplam miktarı sağlayabilir; hacim etiketten doğrulanmalıdır."
      },
      {
        "brand": "Atropin Sülfat Galen",
        "strength": "1 mg/1 mL",
        "form": "enjeksiyonluk çözelti",
        "route": "IV/IM/SC",
        "warning": "Aynı güçte ürün örneğidir; ürün KÜB/KT’si doğrulanmalıdır."
      },
      {
        "brand": "Turktıpsan Atropin Sülfat",
        "strength": "0,5 mg/mL",
        "form": "enjeksiyonluk çözelti",
        "route": "IV/IM/SC",
        "warning": "Farklı konsantrasyondur; 1 mg/mL preparatla otomatik hacim eşdeğerliği yapılmaz."
      }
    ],
    "mechanism": "Muskarinik asetilkolin reseptörlerini kompetitif olarak bloke eder. Vagal etkiyi azaltarak kalp hızını artırır ve sekresyonları azaltır.",
    "indications": "Semptomatik bradikardi ve kolinerjik/organofosfat zehirlenmesi gibi durumlarda kullanılır; HUN’daki uygulama EK-2 bağlamıyla sınırlıdır.",
    "caution": "Taşikardi, idrar retansiyonu, ağız kuruluğu ve görme bozukluğu yapabilir. Dar açılı glokom ve taşiaritmi eğiliminde dikkat gerekir; farklı ampul konsantrasyonları karıştırılmamalıdır.",
    "sources": [
      {
        "label": "Açık İlaç — TİTCK KÜB/KT bağlantılı ürün kaydı",
        "url": "https://acikilac.com/ilac/atropin-sulfat-osel"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-deksametazon": {
    "ingredient": "Deksametazon sodyum fosfat (deksametazona eşdeğer)",
    "products": [
      {
        "brand": "Deksamet",
        "strength": "8 mg/2 mL",
        "form": "IM/IV enjeksiyonluk çözelti",
        "route": "IM/IV",
        "warning": "Parenteral preparattır; oral deksametazon ürünleriyle otomatik hacim eşdeğerliği yoktur."
      },
      {
        "brand": "Deksametazon içeren oral ürünler",
        "strength": "ürüne göre değişir",
        "form": "tablet/solüsyon",
        "route": "Oral",
        "warning": "EK-2 bazı pediatrik bağlamlarda oral/IM/IV seçenek verir; ürün formu ve güç ayrıca doğrulanmalıdır."
      }
    ],
    "mechanism": "Güçlü ve uzun etkili bir glukokortikoiddir. Glukokortikoid reseptörleri üzerinden inflamatuvar mediyatörlerin sentezini azaltır.",
    "indications": "Alerjik, inflamatuvar ve ödemle ilişkili çok sayıda durumda kullanılır; HUN’daki acil kullanım bağlamı EK-2 ile belirlenir.",
    "caution": "Hiperglisemi, enfeksiyon bulgularının maskelenmesi ve gastrointestinal yan etkiler görülebilir. Tekrarlayan/uzun süreli kullanımda sistemik kortikosteroid riskleri artar.",
    "sources": [
      {
        "label": "Deksamet KÜB",
        "url": "https://prospektus.co/ilaclar/deksamet-8-mg-2-ml-im-iv-enjeksiyonluk-cozelti/kisa-urun-bilgisi"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-diazepam": {
    "ingredient": "Diazepam",
    "products": [
      {
        "brand": "Diazem",
        "strength": "10 mg/2 mL",
        "form": "enjeksiyonluk çözelti",
        "route": "IV/IM",
        "warning": "EK-2’de IV/IM ve rektal kullanım bağlamları vardır; ürünün onaylı uygulama yolu ayrıca kontrol edilmelidir."
      },
      {
        "brand": "Diazepam içeren rektal/oral ürünler",
        "strength": "ürüne göre değişir",
        "form": "rektal/oral",
        "route": "ürüne göre",
        "warning": "Enjeksiyonluk preparatla otomatik eşdeğer değildir."
      }
    ],
    "mechanism": "GABA-A reseptörlerinde benzodiazepin bağlanma bölgesini pozitif allosterik olarak modüle eder. İnhibitör GABA etkisini artırarak sedatif, anksiyolitik, antikonvülsan ve kas gevşetici etki oluşturur.",
    "indications": "Akut nöbet kontrolü, sedasyon ve seçilmiş kas spazmı/anksiyete durumlarında kullanılır.",
    "caution": "Solunum depresyonu, sedasyon ve hipotansiyon yapabilir; opioidler ve diğer santral sinir sistemi depresanlarıyla risk artar. IV uygulamada solunum ve dolaşım izlemi gerekir.",
    "sources": [
      {
        "label": "DEVA Diazem KÜB",
        "url": "https://deva.com.tr/uploads/product_files/uBgRVTV4grvmyuh7fmTh.pdf"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-difenhidramin": {
    "ingredient": "Difenhidramin hidroklorür",
    "products": [
      {
        "brand": "Benison",
        "strength": "20 mg/2 mL",
        "form": "enjeksiyonluk çözelti",
        "route": "IM/IV",
        "warning": "EK-2 IV bağlamıyla uyumlu parenteral sunum örneğidir; ürün durumu/etiketi uygulama öncesi doğrulanmalıdır."
      },
      {
        "brand": "Allenik",
        "strength": "20 mg/2 mL",
        "form": "enjeksiyonluk çözelti",
        "route": "parenteral",
        "warning": "Aynı etken maddeli parenteral ürün örneğidir; güncel piyasa durumu ayrıca kontrol edilmelidir."
      },
      {
        "brand": "Fenotral",
        "strength": "12,5 mg/5 mL",
        "form": "şurup",
        "route": "Oral",
        "warning": "Farklı farmasötik formdur; EK-2 IV uygulamasıyla eşdeğer değildir."
      }
    ],
    "mechanism": "Birinci kuşak H1 histamin reseptör antagonistidir ve belirgin antikolinerjik/sedatif özellik taşır. Alerjik semptomları histamin etkisini bloke ederek azaltır.",
    "indications": "Alerjik reaksiyonlar ve çeşitli alerjik semptomlarda kullanılır; HUN’da yalnız EK-2’nin belirttiği anafilaksi/alerjik reaksiyon bağlamlarıyla ilişkilendirilir.",
    "caution": "Sedasyon, antikolinerjik etkiler, idrar retansiyonu ve bulanık görme yapabilir. Diğer sedatiflerle birlikte solunum/SSS depresyonu artabilir.",
    "sources": [
      {
        "label": "Açık İlaç — TİTCK KÜB/KT bağlantılı ürün kaydı",
        "url": "https://acikilac.com/ilac/benison"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-diltiazem": {
    "ingredient": "Diltiazem hidroklorür",
    "products": [
      {
        "brand": "Diltizem",
        "strength": "25 mg",
        "form": "IV flakon",
        "route": "IV",
        "warning": "EK-2 IV taşikardi bağlamına uygun parenteral form örneğidir."
      },
      {
        "brand": "Tiacard",
        "strength": "25 mg",
        "form": "enjeksiyon/infüzyon çözeltisi hazırlamak için ürün",
        "route": "IV",
        "warning": "Aynı etken maddeli parenteral ürün örneğidir; sulandırma ve konsantrasyon KÜB’den doğrulanmalıdır."
      },
      {
        "brand": "Diltizem SR / Altizem-SR",
        "strength": "ürüne göre değişir",
        "form": "oral uzatılmış salım",
        "route": "Oral",
        "warning": "Oral uzatılmış salım ürünleri EK-2 IV uygulamasıyla otomatik eşdeğer değildir."
      }
    ],
    "mechanism": "Non-dihidropiridin kalsiyum kanal blokörüdür. AV düğüm iletimini ve kalp hızını azaltırken damar düz kasında vazodilatasyon oluşturur.",
    "indications": "Supraventriküler taşiaritmiler, anjina ve hipertansiyon gibi kardiyovasküler durumlarda kullanılır; HUN’daki akut doz yalnız EK-2’den gelir.",
    "caution": "Hipotansiyon, bradikardi ve AV blok yapabilir. Kalp yetersizliği ve beta blokerlerle eşzamanlı kullanımda iletim/kontraktilite baskılanması açısından dikkat gerekir.",
    "sources": [
      {
        "label": "Açık İlaç — TİTCK KÜB/KT bağlantılı ürün kaydı",
        "url": "https://acikilac.com/ilac/diltizem-l"
      },
      {
        "label": "Güncel ürün listesi",
        "url": "https://www.ilacrehberi.com/s/diltiazem_hcl/2/"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-dopamin": {
    "ingredient": "Dopamin hidroklorür",
    "products": [
      {
        "brand": "Dopadren",
        "strength": "200 mg/5 mL",
        "form": "infüzyon için konsantre ampul",
        "route": "IV infüzyon",
        "warning": "EK-2’deki 200 mg ampul referansıyla uyumlu sunum örneğidir; mutlaka seyreltilerek uygulanır."
      },
      {
        "brand": "Dopasel",
        "strength": "200 mg/5 mL",
        "form": "IV infüzyon için konsantre ampul",
        "route": "IV infüzyon",
        "warning": "Aynı güçte ürün örneğidir; hazırlama talimatı ürün KÜB’ünden doğrulanmalıdır."
      },
      {
        "brand": "Predopam",
        "strength": "50 mg/5 mL",
        "form": "infüzyon için konsantre ampul",
        "route": "IV infüzyon",
        "warning": "Farklı konsantrasyondur; 200 mg/5 mL ürünle otomatik hacim eşdeğerliği yapılmaz."
      }
    ],
    "mechanism": "Doza bağlı olarak dopaminerjik, beta-1 ve alfa-adrenerjik reseptörleri uyarır. Kardiyak debiyi ve daha yüksek dozlarda sistemik vasküler direnci artırabilir.",
    "indications": "Şok ve belirgin hipotansiyonda hemodinamik destek amacıyla kullanılır.",
    "caution": "Taşikardi, aritmi, miyokard iskemisi ve aşırı vazokonstriksiyon yapabilir. Ekstravazasyon doku nekrozuna yol açabilir; hipovolemi mümkünse önce düzeltilmelidir.",
    "sources": [
      {
        "label": "Açık İlaç — TİTCK KÜB/KT bağlantılı ürün kaydı",
        "url": "https://acikilac.com/ilac/dopadren"
      },
      {
        "label": "Haver Dopasel",
        "url": "https://www.haver.com.tr/ilaclar/dopasel-200-mg5-ml-iv-infuzyon-icin-konsantre-cozelti-iceren-ampul-3"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-fentanil": {
    "ingredient": "Fentanil sitrat (fentanile eşdeğer)",
    "products": [
      {
        "brand": "Talinat",
        "strength": "0,1 mg/2 mL",
        "form": "IV/IM enjeksiyonluk çözelti",
        "route": "IV/IM",
        "warning": "50 mcg/mL fentanil sunumudur; HUN dozları mcg/kg olduğundan birim dönüşümünde dikkat gerekir."
      },
      {
        "brand": "Talinat",
        "strength": "0,5 mg/10 mL",
        "form": "IV/IM enjeksiyonluk çözelti",
        "route": "IV/IM",
        "warning": "Aynı 50 mcg/mL konsantrasyonun farklı toplam hacimli sunumudur."
      },
      {
        "brand": "Fentanest / Fentanyl ampul ürünleri",
        "strength": "ürüne göre değişir",
        "form": "enjeksiyonluk",
        "route": "IV/IM",
        "warning": "Piyasa durumu ve konsantrasyon ürün bazında doğrulanmadan otomatik seçilmez."
      }
    ],
    "mechanism": "Güçlü bir sentetik µ-opioid reseptör agonistidir. Santral sinir sisteminde analjezi ve sedasyon oluşturur.",
    "indications": "Anestezi/analjezi ve ciddi akut ağrı durumlarında parenteral olarak kullanılabilir; HUN acil analjezi dozu EK-2’den gelir.",
    "caution": "Doza bağlı solunum depresyonu, göğüs duvarı rijiditesi, bradikardi ve hipotansiyon gelişebilir. Diğer sedatif/opioidlerle birlikte etkiler artar; yakın solunum izlemi gerekir.",
    "sources": [
      {
        "label": "VEM Talinat ürün/KÜB-KT",
        "url": "https://vemilac.com/urunler/anestezi-ilaclari"
      },
      {
        "label": "Açık İlaç — TİTCK KÜB/KT bağlantılı ürün kaydı",
        "url": "https://acikilac.com/ilac/talinat"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-feniramin-maleat": {
    "ingredient": "Feniramin hidrojen maleat / feniramin maleat",
    "products": [
      {
        "brand": "Avil",
        "strength": "45,5 mg/2 mL",
        "form": "IM/IV enjeksiyonluk çözelti",
        "route": "IM/IV",
        "warning": "EK-2’deki 45,5 mg parenteral bağlamla aynı toplam miktarı sağlayan sunumdur."
      },
      {
        "brand": "Lamelat",
        "strength": "45,5 mg/2 mL",
        "form": "IM/IV enjeksiyonluk çözelti",
        "route": "IM/IV",
        "warning": "Aynı güçte parenteral ürün örneğidir."
      },
      {
        "brand": "Turktıpsan Feniramin Maleat",
        "strength": "45,5 mg/2 mL",
        "form": "IM/IV enjeksiyonluk çözelti",
        "route": "IM/IV",
        "warning": "Aynı güçte parenteral ürün örneğidir."
      }
    ],
    "mechanism": "Birinci kuşak H1 antihistaminiktir. Histaminin H1 reseptörlerindeki etkisini azaltır ve sedatif/antikolinerjik özellik gösterebilir.",
    "indications": "Aşırı duyarlılık reaksiyonları, ürtiker, anjiyoödem ve anafilaktik reaksiyonlarda yardımcı tedavi olarak parenteral kullanılabilir.",
    "caution": "Uyuşukluk, antikolinerjik etkiler ve hipotansiyon görülebilir. Alkol ve diğer santral sinir sistemi depresanları sedasyonu artırabilir.",
    "sources": [
      {
        "label": "Haver Lamelat ürün/KÜB-KT",
        "url": "https://www.haver.com.tr/ilaclar/parenteral-tedaviler/parenteral-tedaviler-dermatoloji"
      },
      {
        "label": "Açık İlaç — Avil TİTCK KÜB/KT bağlantılı kayıt",
        "url": "https://acikilac.com/ilac/avil"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-fenitoin": {
    "ingredient": "Fenitoin sodyum",
    "products": [
      {
        "brand": "Fenitosel",
        "strength": "250 mg/5 mL",
        "form": "IM/IV enjeksiyonluk çözelti",
        "route": "IV/IM",
        "warning": "EK-2 nöbet yükleme bağlamında IV kullanım esas alınır; infüzyon hızı kaynak uyarıları ayrıca korunur."
      },
      {
        "brand": "Toinex",
        "strength": "250 mg/5 mL",
        "form": "enjeksiyonluk çözelti",
        "route": "parenteral",
        "warning": "Aynı güçte parenteral ürün örneğidir."
      },
      {
        "brand": "Epanutin Parenteral Ready Mixed",
        "strength": "250 mg/5 mL",
        "form": "ampul",
        "route": "IV",
        "warning": "Aynı güçte parenteral ürün örneğidir; piyasa durumu doğrulanmalıdır."
      }
    ],
    "mechanism": "Voltaj bağımlı sodyum kanallarını kullanım-bağımlı biçimde bloke ederek nöronal yüksek frekanslı deşarjları sınırlar. Antikonvülsan etkisi bu membran stabilizasyonuna dayanır.",
    "indications": "Tonik-klonik/status epileptikus gibi seçilmiş nöbet durumlarında parenteral yükleme amacıyla kullanılabilir.",
    "caution": "Hızlı IV uygulama ciddi hipotansiyon ve aritmi yapabilir; EKG ve kan basıncı izlemi gerekir. Yalnız uyumlu çözeltiyle hazırlanmalı ve ekstravazasyon açısından dikkat edilmelidir.",
    "sources": [
      {
        "label": "Haver nöroloji ürünleri/KÜB-KT",
        "url": "https://www.haver.com.tr/ilaclar/parenteral-tedaviler/parenteral-tedaviler-norolojipsikiyatri"
      },
      {
        "label": "Güncel fenitoin ürün listesi",
        "url": "https://www.ilacrehberi.com/s/fenitoin_sodyum/2/"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-furosemid": {
    "ingredient": "Furosemid",
    "products": [
      {
        "brand": "Lasix",
        "strength": "20 mg/2 mL",
        "form": "IM/IV enjeksiyonluk çözelti",
        "route": "IM/IV",
        "warning": "EK-2 akut IV bağlamıyla uyumlu parenteral sunum örneğidir."
      },
      {
        "brand": "Desal",
        "strength": "20 mg/2 mL",
        "form": "IM/IV enjeksiyonluk çözelti",
        "route": "IM/IV",
        "warning": "Aynı güçte parenteral ürün örneğidir."
      },
      {
        "brand": "Lasix",
        "strength": "40 mg",
        "form": "tablet",
        "route": "Oral",
        "warning": "Oral tablet, EK-2 IV uygulamasıyla otomatik eşdeğer değildir."
      }
    ],
    "mechanism": "Henle kulpunun kalın çıkan kolunda Na-K-2Cl kotransporterini inhibe eden kıvrım diüretiğidir. Sodyum ve su atılımını artırır.",
    "indications": "Akut/kronik sıvı yüklenmesi ve ödem durumlarında kullanılır; HUN’daki acil uygulama EK-2 ile sınırlıdır.",
    "caution": "Hipovolemi, hipotansiyon, hipokalemi/hiponatremi ve böbrek fonksiyon bozukluğu gelişebilir. Hızlı IV uygulama ototoksisite riskini artırabilir.",
    "sources": [
      {
        "label": "Sanofi Lasix KÜB",
        "url": "https://www.sanofi.com/assets/countries/turkey/docs/products/prescription-products/L/lasix-20mg-2mL-IM-IV-enjeksiyonluk-cozelti-onayli-KUB-23.03.2022.pdf"
      },
      {
        "label": "Desal KÜB",
        "url": "https://prospektus.co/ilaclar/desal-ampul/kisa-urun-bilgisi"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-ibuprofen": {
    "ingredient": "İbuprofen",
    "products": [
      {
        "brand": "Gerofen",
        "strength": "100 mg/5 mL",
        "form": "süspansiyon",
        "route": "Oral",
        "warning": "Pediatrik oral sunum örneğidir."
      },
      {
        "brand": "Befron",
        "strength": "100 mg/5 mL",
        "form": "süspansiyon",
        "route": "Oral",
        "warning": "Aynı güçte oral süspansiyon örneğidir."
      },
      {
        "brand": "İbu-Fort",
        "strength": "200 mg/5 mL",
        "form": "süspansiyon",
        "route": "Oral",
        "warning": "İki kat konsantrasyondur; 100 mg/5 mL ürünle otomatik hacim eşdeğerliği yapılmaz."
      }
    ],
    "mechanism": "COX-1 ve COX-2 enzimlerini geri dönüşümlü inhibe eden nonsteroid antiinflamatuvar ilaçtır. Prostaglandin sentezini azaltarak analjezik, antipiretik ve antiinflamatuvar etki oluşturur.",
    "indications": "Ateş ve hafif-orta ağrının kısa süreli semptomatik tedavisinde kullanılır.",
    "caution": "Gastrointestinal kanama, böbrek fonksiyon bozukluğu ve aşırı duyarlılık/bronko-spazm riski vardır. EK-2’de 12 ayın altında verilmemesi kuralı ayrıca korunur.",
    "sources": [
      {
        "label": "Gerofen KÜB",
        "url": "https://prospektus.co/ilaclar/gerofen-suspansiyon/kisa-urun-bilgisi"
      },
      {
        "label": "Befron KÜB",
        "url": "https://prospektus.co/ilaclar/befron-100-mg-5ml-suspansiyon/kisa-urun-bilgisi"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-ipratropium-bromur": {
    "ingredient": "İpratropium bromür",
    "products": [
      {
        "brand": "Atrovent",
        "strength": "ürüne göre değişir",
        "form": "inhalasyon/nebül preparatı",
        "route": "İnhalasyon",
        "warning": "Tek etken maddeli ipratropium ürününün güç ve sunumu uygulama öncesi doğrulanmalıdır."
      },
      {
        "brand": "Tropisal",
        "strength": "0,5 mg ipratropium + 2,5 mg salbutamol / 2,5 mL",
        "form": "nebülizasyon çözeltisi",
        "route": "Nebül",
        "warning": "Kombine üründür; tek başına ipratropium preparatı değildir ve EK-2’de ayrı ayrı verilen dozlarla otomatik eşdeğer kabul edilmez."
      },
      {
        "brand": "İprasal",
        "strength": "ipratropium + salbutamol",
        "form": "tek dozluk inhalasyon çözeltisi",
        "route": "Nebül",
        "warning": "Kombine üründür; otomatik muadil değildir."
      }
    ],
    "mechanism": "İnhale antimuskarinik bronkodilatördür. Havayolu düz kasındaki muskarinik reseptörleri bloke ederek vagal bronkokonstriksiyonu azaltır.",
    "indications": "KOAH ve bronkospazmın eşlik ettiği obstrüktif havayolu hastalıklarında bronkodilatör olarak kullanılır.",
    "caution": "Nebülün göze teması glokom semptomlarını tetikleyebilir; ağız kuruluğu ve idrar retansiyonu görülebilir. Kombine salbutamol/ipratropium ürünleri tek etken maddeli preparatla otomatik eşdeğer değildir.",
    "sources": [
      {
        "label": "Tropisal KÜB",
        "url": "https://prospektus.co/ilaclar/tropisal-0-5-mg-2-5-mg-2-5-ml-nebulizasyon-icin-inhalasyon-cozeltisi-20-flakon/kisa-urun-bilgisi"
      },
      {
        "label": "İprasal KÜB",
        "url": "https://prospektus.co/ilaclar/iprasal-nebulizasyon-icin-tek-dozluk-inhalasyon-cozeltisi-iceren-flakon/kisa-urun-bilgisi"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-isosorbid-dinitrat": {
    "ingredient": "İsosorbid dinitrat",
    "products": [
      {
        "brand": "Cardioket",
        "strength": "5 mg",
        "form": "tablet",
        "route": "Oral/SL",
        "warning": "KÜB sublingual kullanımı tanımlar; EK-2 5 mg SL bağlamıyla uyumlu ürün örneğidir."
      },
      {
        "brand": "Isordil",
        "strength": "ürüne göre değişir",
        "form": "tablet",
        "route": "Oral/SL",
        "warning": "Güç ve salım özelliği ürün bazında doğrulanmalıdır."
      },
      {
        "brand": "Nitrofix-TM",
        "strength": "ürüne göre değişir",
        "form": "ürüne göre",
        "route": "ürüne göre",
        "warning": "Aynı etken maddeli ürün adı olarak listelenir; EK-2 uygulamasına otomatik eşdeğer değildir."
      }
    ],
    "mechanism": "Nitrik oksit aracılığıyla guanilat siklaz/cGMP yolunu artırarak damar düz kasını gevşetir. Venodilatasyonla preload’u, daha yüksek dozlarda arteriyel direnci azaltabilir.",
    "indications": "Akut anjina pektoris ve seçilmiş kalp yetersizliği durumlarında kullanılır.",
    "caution": "Hipotansiyon, sağ ventrikül MI ve belirgin bradikardide dikkat/kontrendikasyon vardır. PDE-5 inhibitörleriyle birlikte ciddi hipotansiyon riski nedeniyle kullanılmamalıdır.",
    "sources": [
      {
        "label": "Cardioket KÜB",
        "url": "https://www.ilacrehberi.com/v/cardioket-5-mg-40-tablet-8a15/kub/"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-kalsiyum-glukonat": {
    "ingredient": "Kalsiyum glukonat (ürüne göre farklı kalsiyum tuzu kombinasyonları bulunabilir)",
    "products": [
      {
        "brand": "Calcium Picken %10",
        "strength": "10 mL ampul",
        "form": "enjeksiyonluk çözelti",
        "route": "IV",
        "warning": "Kalsiyum glukonat + kalsiyum levülinat içerir; saf kalsiyum glukonat ampul ile otomatik eşdeğer kabul edilmez."
      },
      {
        "brand": "Calcium-Sandoz %10",
        "strength": "10 mL ampul",
        "form": "enjeksiyonluk çözelti",
        "route": "IV/IM",
        "warning": "Etken tuzu kalsiyum glubiyonattır; EK-2’de adı geçen kalsiyum glukonatla otomatik eşdeğer değildir."
      }
    ],
    "mechanism": "İyonize kalsiyum sağlayarak kardiyak ve nöromüsküler membran fonksiyonunu destekler. Hiperkalemide miyokard hücre membranını stabilize edici etki için kalsiyum tuzları kullanılır.",
    "indications": "Hipokalsemi ve bazı hiperkalemi/ilaç toksisitesi bağlamlarında IV kalsiyum kullanılır; HUN’daki bağlam EK-2’ye göre gösterilir.",
    "caution": "Türkiye’deki ürünlerin kalsiyum tuzu ve elementer kalsiyum miktarı farklı olabilir; ürünler otomatik eşdeğer değildir. Hızlı IV uygulama bradikardi/aritmiye, ekstravazasyon doku hasarına yol açabilir.",
    "sources": [
      {
        "label": "Calcium Picken KÜB",
        "url": "https://www.ilacrehberi.com/v/calcium-picken-10-enjeksiyonluk-cozelti-89fe/kub/"
      },
      {
        "label": "Calcium-Sandoz KÜB",
        "url": "https://www.ilacrehberi.com/v/calcium-sandoz-10-5-ampul-abf0/kub/"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-karbetosin": {
    "ingredient": "Karbetosin",
    "products": [
      {
        "brand": "Karpaver",
        "strength": "100 mcg/1 mL",
        "form": "IV/IM enjeksiyonluk çözelti",
        "route": "IV/IM",
        "warning": "EK-2’deki 100 mcg karbetosin bağlamıyla aynı toplam etkin maddeyi içeren sunum örneğidir."
      },
      {
        "brand": "Pabal",
        "strength": "100 mcg/mL",
        "form": "IV enjeksiyonluk çözelti",
        "route": "IV",
        "warning": "Uygulama yolu ürün KÜB’üne göre doğrulanmalıdır; Karpaver IM/IV sunumuyla otomatik aynı yol kabul edilmez."
      }
    ],
    "mechanism": "Oksitosin reseptör agonisti olan uzun etkili bir oksitosin analoğudur. Uterus düz kasında ritmik kasılmaları ve uterin tonusu artırır.",
    "indications": "Doğum sonrası uterin atoni/kanama profilaksisi ve kontrolünde uterotonik olarak kullanılır.",
    "caution": "Hipertansiyon/hipotansiyon, taşikardi, baş ağrısı ve gastrointestinal etkiler görülebilir. Uygulama yolu ve obstetrik endikasyon ürün bazında doğrulanmalıdır.",
    "sources": [
      {
        "label": "Haver Karpaver ürün/KÜB-KT",
        "url": "https://www.haver.com.tr/ilaclar/ozel-tedaviler"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-levetirasetam": {
    "ingredient": "Levetirasetam",
    "products": [
      {
        "brand": "Lesitam",
        "strength": "500 mg/5 mL",
        "form": "IV infüzyonluk konsantre",
        "route": "IV",
        "warning": "100 mg/mL konsantrasyondur; EK-2 yükleme dozu için toplam mg hesabı ayrı yapılır."
      },
      {
        "brand": "Levetam",
        "strength": "500 mg/5 mL",
        "form": "konsantre infüzyon çözeltisi",
        "route": "IV",
        "warning": "Aynı güçte parenteral ürün örneğidir."
      },
      {
        "brand": "Levenue / Epixx IV",
        "strength": "500 mg/5 mL",
        "form": "IV konsantre",
        "route": "IV",
        "warning": "Aynı güçte parenteral ürün örnekleridir; marka bazında KÜB kontrol edilmelidir."
      }
    ],
    "mechanism": "SV2A sinaptik vezikül proteinine bağlanarak nörotransmitter salınımını ve nöronal aşırı senkronizasyonu modüle eder. Diğer klasik antiepileptiklerden farklı bir mekanizmaya sahiptir.",
    "indications": "Parsiyel, miyoklonik ve primer jeneralize tonik-klonik nöbetlerde antiepileptik olarak kullanılır; IV form oral uygulama mümkün olmadığında alternatif olabilir.",
    "caution": "Somnolans, baş dönmesi ve davranış/duygu durum değişiklikleri görülebilir. Böbrek fonksiyon bozukluğunda doz ayarı gerekebilir; HUN yükleme dozu EK-2’den gelir.",
    "sources": [
      {
        "label": "Polifarma Levetam KÜB",
        "url": "https://www.polifarma.com.tr/media/1621/22_kub_02-30092019.pdf"
      },
      {
        "label": "Haver Lesitam ürün/KÜB-KT",
        "url": "https://www.haver.com.tr/ilaclar/parenteral-tedaviler/parenteral-tedaviler-norolojipsikiyatri"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-lidokain": {
    "ingredient": "Lidokain hidroklorür",
    "products": [
      {
        "brand": "Aritmal %2",
        "strength": "100 mg/5 mL",
        "form": "IM/IV/SC enjeksiyonluk çözelti",
        "route": "IV/IM/SC",
        "warning": "EK-2’de %2 lidokain bağlamıyla uyumlu konsantrasyon örneğidir."
      },
      {
        "brand": "Aritmal %10",
        "strength": "ürüne göre değişir",
        "form": "enjeksiyonluk çözelti",
        "route": "IM/IV",
        "warning": "%2 preparattan beş kat daha konsantredir; otomatik hacim eşdeğerliği yapılmaz."
      },
      {
        "brand": "Lidokain + adrenalin ürünleri",
        "strength": "ürüne göre değişir",
        "form": "lokal anestezik enjeksiyon",
        "route": "lokal",
        "warning": "Adrenalin içeren kombine ürünler antiaritmik IV lidokain preparatıyla eşdeğer değildir."
      }
    ],
    "mechanism": "Voltaj bağımlı sodyum kanallarını bloke eder. Kardiyak dokuda anormal ventriküler otomatikite/iletimi baskılayabilir; periferik sinirlerde lokal anestezi oluşturur.",
    "indications": "Ventriküler aritmilerde antiaritmik ve farklı preparatlarda lokal anestezik olarak kullanılır.",
    "caution": "Yüksek sistemik düzeylerde nörolojik toksisite, nöbet, hipotansiyon ve ciddi aritmi gelişebilir. Konsantrasyon ve adrenalinli kombinasyonlar mutlaka ayırt edilmelidir.",
    "sources": [
      {
        "label": "Açık İlaç — TİTCK KÜB/KT bağlantılı ürün kaydı",
        "url": "https://acikilac.com/ilac/aritmal"
      },
      {
        "label": "Güncel lidokain ürün listesi",
        "url": "https://www.ilacrehberi.com/s/lidokain/2/"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-magnezyum-sulfat": {
    "ingredient": "Magnezyum sülfat heptahidrat",
    "products": [
      {
        "brand": "Magnezyum Sülfat Osel",
        "strength": "%15 (1500 mg/10 mL)",
        "form": "IM/IV enjeksiyonluk çözelti",
        "route": "IM/IV",
        "warning": "EK-2’de %15 ampul hazırlama örnekleri vardır; ürün gücü etiketten doğrulanmalıdır."
      },
      {
        "brand": "Magnezyum Sülfat Galen",
        "strength": "1500 mg/10 mL",
        "form": "enjeksiyonluk çözelti",
        "route": "parenteral",
        "warning": "%15 ile aynı nominal yoğunlukta ürün örneğidir."
      },
      {
        "brand": "Multiflex Magnezyum Sülfat",
        "strength": "4 g/100 mL",
        "form": "infüzyonluk çözelti",
        "route": "IV",
        "warning": "Hazır infüzyon sunumudur; %15 ampulle otomatik hacim eşdeğerliği yapılmaz."
      }
    ],
    "mechanism": "Magnezyum; nöromüsküler iletim, iyon kanalları ve kardiyak elektrofizyolojide düzenleyici rol oynar. Eklampside antikonvülsan, torsades de pointes’te antiaritmik etki için kullanılır.",
    "indications": "Hipomagnezemi, eklampsi/preeklampsi nöbet kontrolü ve torsades de pointes gibi seçilmiş durumlarda kullanılır.",
    "caution": "Hipermagnezemi solunum depresyonu, refleks kaybı, hipotansiyon ve bradikardi yapabilir. Böbrek yetmezliğinde birikim riski artar; solunum, refleks ve dolaşım izlenmelidir.",
    "sources": [
      {
        "label": "Açık İlaç — TİTCK KÜB/KT bağlantılı ürün kaydı",
        "url": "https://acikilac.com/ilac/magnezyum-sulfat-osel"
      },
      {
        "label": "Haver Osel ürün/KÜB-KT",
        "url": "https://www.haver.com.tr/ilaclar/magnezyum-sulfat-osel-15-imiv-enjeksiyonluk-cozelti-iceren-ampul-2"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-metil-prednizolon": {
    "ingredient": "Metilprednizolon / parenteral ürünlerde metilprednizolon sodyum süksinat",
    "products": [
      {
        "brand": "Prednol-L",
        "strength": "20 mg / 250 mg sunumlar",
        "form": "parenteral liyofilize ürün",
        "route": "IM/IV",
        "warning": "Flakon gücü seçilmeden hacim/doz otomatik eşdeğer kabul edilmez."
      },
      {
        "brand": "Precort-Liyo",
        "strength": "20 mg / 40 mg / 250 mg",
        "form": "IM/IV liyofilize ürün",
        "route": "IM/IV",
        "warning": "Birden fazla güç vardır; doğru flakon seçilmelidir."
      },
      {
        "brand": "Tredison",
        "strength": "20 mg / 40 mg",
        "form": "IM/IV enjeksiyon/infüzyon için toz + çözücü",
        "route": "IM/IV",
        "warning": "Ürün gücü ve sulandırma talimatı KÜB’den doğrulanmalıdır."
      }
    ],
    "mechanism": "Sistemik glukokortikoiddir. Hücre içi glukokortikoid reseptörleri üzerinden inflamatuvar gen ekspresyonunu ve immün yanıtı baskılar.",
    "indications": "Şiddetli alerjik/inflamatuvar hastalıklar ve çeşitli akut durumlarda parenteral kortikosteroid olarak kullanılabilir.",
    "caution": "Hiperglisemi, sıvı/elektrolit değişiklikleri, enfeksiyon riskinde artış ve gastrointestinal etkiler görülebilir. Farklı flakon güçleri ve ester/tuz formları otomatik eşdeğer kabul edilmemelidir.",
    "sources": [
      {
        "label": "Güncel parenteral metilprednizolon ürün listesi",
        "url": "https://www.ilac.ai/metilprednizolon"
      },
      {
        "label": "Tredison ürün/KÜB kaydı",
        "url": "https://ilacin.com/ilaclar/tredison-40-mg-imiv-enjeksiyonlukinfuzyonluk-cozelti-hazirlamak-icin-toz-ve-cozucu-1-flakon-1-cozucu-ampul-8680222790075/"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-metoprolol": {
    "ingredient": "Metoprolol tartarat",
    "products": [
      {
        "brand": "Metloc",
        "strength": "5 mg/5 mL",
        "form": "IV infüzyon/enjeksiyon çözeltisi içeren ampul",
        "route": "IV",
        "warning": "EK-2’deki 5 mg IV bağlamıyla aynı toplam etkin maddeyi sağlayan parenteral sunum örneğidir."
      },
      {
        "brand": "Metoprolol süksinat oral ürünleri",
        "strength": "ürüne göre değişir",
        "form": "uzatılmış salımlı tablet",
        "route": "Oral",
        "warning": "Tuz formu ve farmasötik form farklıdır; Metloc IV ile otomatik eşdeğer değildir."
      }
    ],
    "mechanism": "Selektif beta-1 adrenerjik reseptör blokörüdür. Kalp hızını, AV iletimini ve miyokard kontraktilitesini azaltır.",
    "indications": "Hipertansiyon, anjina ve seçilmiş supraventriküler taşiaritmilerde hız kontrolü için kullanılır.",
    "caution": "Bradikardi, hipotansiyon, AV blok ve kalp yetersizliğinde kötüleşme yapabilir. Bronkospastik hastalıkta seçicilik mutlak değildir; diğer AV düğüm baskılayıcı ilaçlarla dikkat gerekir.",
    "sources": [
      {
        "label": "Haver Metloc ürün/KÜB-KT",
        "url": "https://www.haver.com.tr/ilaclar?page=14"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-midazolam": {
    "ingredient": "Midazolam",
    "products": [
      {
        "brand": "Dalizom",
        "strength": "15 mg/3 mL",
        "form": "IM/IV/rektal enjeksiyon/infüzyon çözeltisi",
        "route": "IM/IV/rektal",
        "warning": "EK-2’de IV, IM, nazal/bukkal bağlamlar vardır; ürünün onaylı yolu ile EK-2 uygulama yolu ayrı değerlendirilmelidir."
      },
      {
        "brand": "Dalizom",
        "strength": "5 mg/5 mL",
        "form": "IM/IV/rektal enjeksiyon/infüzyon çözeltisi",
        "route": "IM/IV/rektal",
        "warning": "Farklı konsantrasyondur; 15 mg/3 mL ile otomatik hacim eşdeğerliği yapılmaz."
      },
      {
        "brand": "Demizolam",
        "strength": "15 mg/3 mL",
        "form": "IM/IV enjeksiyonluk çözelti",
        "route": "IM/IV",
        "warning": "Aynı toplam güçte parenteral ürün örneğidir; ürün KÜB’ü doğrulanmalıdır."
      }
    ],
    "mechanism": "Kısa etkili benzodiazepindir; GABA-A reseptörlerinde pozitif allosterik modülasyonla santral inhibisyonu artırır. Sedatif, amnestik ve antikonvülsan etki gösterir.",
    "indications": "Prosedürel sedasyon, anestezi ve akut nöbet kontrolünde kullanılabilir.",
    "caution": "Solunum depresyonu, apne, hipotansiyon ve aşırı sedasyon yapabilir. Opioidler ve diğer SSS depresanlarıyla birlikte risk belirgin artar; hava yolu/ventilasyon hazırlığı gerekir.",
    "sources": [
      {
        "label": "Güncel midazolam ürün listesi",
        "url": "https://www.ilacrehberi.com/s/midazolam/2/"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-nalokson": {
    "ingredient": "Nalokson hidroklorür",
    "products": [
      {
        "brand": "Naloxone / Nalokson ampul",
        "strength": "0,4 mg/mL sunumlar bulunur",
        "form": "enjeksiyonluk çözelti",
        "route": "IV/IM/SC",
        "warning": "Marka ve konsantrasyon kurum stokuna göre doğrulanmalıdır; EK-2 dozu mg/kg veya mg olarak ayrıca hesaplanır."
      }
    ],
    "mechanism": "Opioid reseptörlerinde, özellikle µ reseptöründe kompetitif antagonisttir. Opioidlerin solunum depresyonu ve sedasyon dahil etkilerini hızla geri çevirebilir.",
    "indications": "Bilinen veya şüpheli opioid aşırı dozunda opioid etkilerinin geri çevrilmesinde kullanılır.",
    "caution": "Opioid bağımlılığında akut yoksunluk, ajitasyon, hipertansiyon ve aritmi tetikleyebilir. Etki süresi bazı opioidlerden kısa olduğundan yeniden sedasyon/solunum depresyonu açısından izlem gerekir.",
    "sources": [
      {
        "label": "İstanbul Anadolu İl Ambulans Servisi ilaç listesi",
        "url": "https://istanbulanadoluiasb.saglik.gov.tr/TR-277622/istasyonlarin-dikkat-etmesi-gereken-ilaclar-listesi.html"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-nifedipin": {
    "ingredient": "Nifedipin",
    "products": [
      {
        "brand": "Nidicard",
        "strength": "10 mg",
        "form": "yumuşak kapsül",
        "route": "Oral",
        "warning": "EK-2 gebelikte akut hipertansiyon algoritmasında 10 mg kapsül yutturur; ürün KÜB’ündeki uyarılar ayrıca değerlendirilmelidir."
      },
      {
        "brand": "Adalat Crono",
        "strength": "30 mg ve diğer güçler",
        "form": "kontrollü salım tablet",
        "route": "Oral",
        "warning": "Kontrollü salım formudur; Nidicard 10 mg kapsül ve EK-2 akut dozuyla otomatik eşdeğer değildir."
      }
    ],
    "mechanism": "Dihidropiridin tipi L-tipi kalsiyum kanal blokörüdür. Arteriyel düz kası gevşeterek periferik vasküler direnci ve kan basıncını azaltır.",
    "indications": "Hipertansiyon, anjina ve bazı vazospastik durumlarda kullanılır; HUN obstetrik akut kullanım bağlamı yalnız EK-2’den gelir.",
    "caution": "Belirgin hipotansiyon, baş ağrısı, flushing ve refleks taşikardi gelişebilir. Hızlı salımlı ve kontrollü salımlı preparatlar otomatik eşdeğer değildir.",
    "sources": [
      {
        "label": "Nidicard KÜB",
        "url": "https://prospektus.co/ilaclar/nidicard-10-mg-yumusak-kapsul/kisa-urun-bilgisi"
      },
      {
        "label": "Adalat Crono KÜB",
        "url": "https://prospektus.co/ilaclar/adalat-crono-30-mg-20-kontrollu-salim-tableti/kisa-urun-bilgisi"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-parasetamol": {
    "ingredient": "Parasetamol (asetaminofen)",
    "products": [
      {
        "brand": "Parasetamol IV ürünleri",
        "strength": "genellikle 10 mg/mL",
        "form": "IV infüzyon çözeltisi",
        "route": "IV",
        "warning": "Marka, torba/flakon hacmi ve konsantrasyon uygulama öncesi doğrulanmalıdır."
      },
      {
        "brand": "Parasetamol oral ürünleri",
        "strength": "ürüne göre değişir",
        "form": "tablet/şurup/süspansiyon",
        "route": "Oral",
        "warning": "EK-2 oral ve IV seçeneklerini ayrı bağlamlarda kullanır; farmasötik formlar otomatik hacim eşdeğeri değildir."
      }
    ],
    "mechanism": "Santral ağırlıklı analjezik ve antipiretik etki gösterir; prostaglandin sentezini azaltır. Belirgin periferik antiinflamatuvar etkisi sınırlıdır.",
    "indications": "Ateş ve hafif-orta şiddette ağrının semptomatik tedavisinde kullanılır.",
    "caution": "Doz aşımı ciddi hepatotoksisiteye yol açabilir; tüm parasetamol içeren ürünlerden alınan toplam doz hesaba katılmalıdır. Karaciğer hastalığı ve kronik alkol kullanımında dikkat gerekir.",
    "sources": [
      {
        "label": "TİTCK Akılcı İlaç Kullanımı portalı",
        "url": "https://akilciilac.titck.gov.tr/"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-salbutamol": {
    "ingredient": "Salbutamol (çoğu üründe salbutamol sülfat)",
    "products": [
      {
        "brand": "Salres",
        "strength": "2,5 mg/2,5 mL",
        "form": "tek dozluk nebülizasyon çözeltisi",
        "route": "Nebül",
        "warning": "EK-2’deki 2,5 mg nebül seçeneğiyle uyumlu güç örneğidir."
      },
      {
        "brand": "Albunex",
        "strength": "2,5 mg/2,5 mL",
        "form": "nebülizasyon için inhalasyon çözeltisi",
        "route": "Nebül",
        "warning": "Aynı güçte nebül ürün örneğidir."
      },
      {
        "brand": "Salres / Brecur inhaler",
        "strength": "100 mcg/puf sınıfı sunumlar",
        "form": "ölçülü doz aerosol",
        "route": "İnhalasyon",
        "warning": "Nebül mg dozu ile puf dozu otomatik olarak birbirine çevrilmez; EK-2 ilgili dalı ayrı gösterir."
      }
    ],
    "mechanism": "Selektif beta-2 adrenerjik agonist bronkodilatördür. Bronş düz kasını gevşeterek hava yolu direncini azaltır.",
    "indications": "Astım/KOAH ve bronkospazmın hızlı giderilmesinde inhalasyon yoluyla kullanılır.",
    "caution": "Taşikardi, tremor, hipokalemi ve laktat artışı görülebilir. Nebül ve ölçülü doz inhaler sunumları mg/puf açısından otomatik eşdeğer değildir.",
    "sources": [
      {
        "label": "Güncel salbutamol ürün listesi",
        "url": "https://www.ilacrehberi.com/s/salbutamol/2/"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-sodyum-bikarbonat-nahco3": {
    "ingredient": "Sodyum bikarbonat",
    "products": [
      {
        "brand": "Molar Sodyum Bikarbonat Osel",
        "strength": "%8,4, 10 mL",
        "form": "enjeksiyonluk çözelti ampul",
        "route": "IV",
        "warning": "1 mEq/mL sınıfındaki %8,4 sunumdur; EK-2 mEq/kg hesabında konsantrasyon ayrıca doğrulanmalıdır."
      },
      {
        "brand": "Sodyum bikarbonat içeren diğer parenteral ürünler",
        "strength": "ürüne göre değişir",
        "form": "enjeksiyon/infüzyon",
        "route": "IV",
        "warning": "Konsantrasyon farklılığı ciddi hacim hatasına yol açabilir; otomatik eşdeğer kabul edilmez."
      }
    ],
    "mechanism": "Bikarbonat sağlayarak ekstrasellüler tampon kapasitesini artırır ve metabolik asidozda pH’ı yükseltir. Sodyum yükü de oluşturur.",
    "indications": "Seçilmiş ağır metabolik asidoz ve bazı toksikolojik/hiperkalemi bağlamlarında kullanılır; HUN’daki endikasyon EK-2 ile sınırlıdır.",
    "caution": "Hipernatremi, metabolik alkaloz, sıvı yüklenmesi ve CO2 üretiminde artış yapabilir. Yetersiz ventilasyonda CO2 yükü sorun oluşturabilir; konsantrasyon doğrulanmalıdır.",
    "sources": [
      {
        "label": "Haver/Osel ürün ve KÜB/KT",
        "url": "https://www.haver.com.tr/ilaclar/molar-sodyum-bikarbonat-osel-84-enjeksiyonluk-cozelti-iceren-ampul-2"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-valproik-asit": {
    "ingredient": "Sodyum valproat / valproik asit",
    "products": [
      {
        "brand": "Depakin",
        "strength": "400 mg/4 mL",
        "form": "IV enjeksiyonluk çözelti hazırlamak için liyofilize flakon",
        "route": "IV",
        "warning": "EK-2 yükleme dozu mg/kg’dır; flakon toplam miktarı ve hazırlama talimatı ayrıca uygulanır."
      },
      {
        "brand": "Valproat oral ürünleri",
        "strength": "ürüne göre değişir",
        "form": "tablet/kapsül",
        "route": "Oral",
        "warning": "Oral ürünler EK-2 IV yükleme uygulamasıyla otomatik eşdeğer değildir."
      }
    ],
    "mechanism": "GABA düzeylerini artıran ve voltaj bağımlı iyon kanallarını modüle eden geniş spektrumlu antiepileptiktir. Nöronal aşırı uyarılabilirliği azaltır.",
    "indications": "Çeşitli jeneralize ve fokal nöbet tiplerinde antiepileptik olarak kullanılır; IV form oral uygulama uygun olmadığında kullanılabilir.",
    "caution": "Ciddi hepatotoksisite, pankreatit, trombositopeni ve hiperamonyemi riski vardır. Gebelikte yüksek teratojenite nedeniyle güçlü kısıtlamalar bulunur; HUN acil yükleme dozu EK-2’den gelir.",
    "sources": [
      {
        "label": "Sanofi Depakin IV ürün/KÜB-KT",
        "url": "https://www.sanofi.com/tr/turkiye/saglik-cozumleri/urunlerimiz/receteli-urunler/depakin-400-mg-4-ml-flakon"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-0-9-nacl": {
    "ingredient": "Sodyum klorür %0,9 (9 mg/mL)",
    "products": [
      {
        "brand": "Biofleks %0,9 İzotonik Sodyum Klorür",
        "strength": "%0,9; çeşitli hacimler",
        "form": "IV infüzyon çözeltisi",
        "route": "IV",
        "warning": "50–3000 mL gibi farklı torba hacimleri bulunabilir; uygulama hacmi EK-2 bağlamına göre seçilir."
      },
      {
        "brand": "%0,9 İzotonik Sodyum Klorür ürünleri",
        "strength": "%0,9",
        "form": "IV şişe/torba",
        "route": "IV",
        "warning": "İrrigasyon ürünleri IV infüzyon ürünüyle aynı amaç için kullanılmaz; etiket/farmasötik form doğrulanmalıdır."
      }
    ],
    "mechanism": "İzotonik kristalloid olarak ekstrasellüler hacmi genişletir ve sodyum/klorür sağlar. Taşıyıcı ve sulandırıcı sıvı olarak da kullanılabilir.",
    "indications": "Sıvı/elektrolit replasmanı, hipovolemi ve ilaç sulandırma/taşıma gibi çok sayıda klinik amaçta kullanılır.",
    "caution": "Aşırı hacim yükü, hiperkloremi ve hiperkloremik metabolik asidoz gelişebilir. Kalp/böbrek yetmezliğinde hacim yüklenmesi açısından dikkat gerekir.",
    "sources": [
      {
        "label": "Haver parenteral çözeltiler ürün/KÜB-KT",
        "url": "https://www.haver.com.tr/ilaclar/parenteral-cozeltiler"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-dekstroz": {
    "ingredient": "Dekstroz (glukoz)",
    "products": [
      {
        "brand": "Biofleks / Lafleks Dekstroz",
        "strength": "%5",
        "form": "IV infüzyon çözeltisi",
        "route": "IV",
        "warning": "EK-2 pediatrik idame bağlamındaki %5 sunumla uyumludur; torba hacmi ayrıca doğrulanmalıdır."
      },
      {
        "brand": "Biofleks / Lafleks Dekstroz",
        "strength": "%10",
        "form": "IV hipertonik çözelti",
        "route": "IV",
        "warning": "EK-2 hipoglisemi %10 bağlamıyla uyumlu konsantrasyon örneğidir."
      },
      {
        "brand": "Polifleks Dekstroz",
        "strength": "%50",
        "form": "IV hipertonik çözelti",
        "route": "IV",
        "warning": "Çok daha konsantredir; %5/%10/%20 preparatlarla otomatik hacim eşdeğerliği yapılmaz."
      }
    ],
    "mechanism": "Glukoz sağlayarak hızlı enerji substratı oluşturur ve hipoglisemide kan glukozunu yükseltir. Konsantrasyona göre serbest su ve hipertonik glukoz yükü etkileri değişir.",
    "indications": "Hipoglisemi tedavisi ve bazı sıvı/enerji desteği uygulamalarında kullanılır.",
    "caution": "Hiperglisemi, hiperosmolarite, flebit ve ekstravazasyon riski konsantrasyon arttıkça yükselir. EK-2 %20 dekstrozun periferik damardan verilmemesi uyarısını ayrıca korur.",
    "sources": [
      {
        "label": "Haver parenteral çözeltiler",
        "url": "https://www.haver.com.tr/ilaclar/parenteral-cozeltiler"
      },
      {
        "label": "Polifleks %50 dekstroz KÜB/KT kaydı",
        "url": "https://prospektus.co/ilaclar/polifleks-50-dekstroz-sudaki-i-v-infuzyon-icin-cozelti"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  },
  "drug-ringer-laktat": {
    "ingredient": "Ringer laktat elektrolit çözeltisi",
    "products": [
      {
        "brand": "Ringer Laktat IV ürünleri",
        "strength": "standart dengeli kristalloid bileşim",
        "form": "IV infüzyon çözeltisi",
        "route": "IV",
        "warning": "Üretici/torba hacmi değişebilir; etiket bileşimi ve hacmi doğrulanmalıdır."
      },
      {
        "brand": "Biofleks / Polifleks / Lafleks Ringer Laktat sınıfı ürünler",
        "strength": "ürüne göre",
        "form": "IV torba/şişe",
        "route": "IV",
        "warning": "Marka ve ambalaj farklılıkları olabilir; otomatik hacim seçimi yapılmaz."
      }
    ],
    "mechanism": "Sodyum, klorür, potasyum, kalsiyum ve laktat içeren dengeli kristalloid sıvıdır. Ekstrasellüler hacmi genişletir; laktat karaciğerde bikarbonata metabolize olabilir.",
    "indications": "Hipovolemi, travma/yanık sıvı replasmanı ve perioperatif sıvı tedavisinde kullanılabilir.",
    "caution": "Sıvı yüklenmesi ve elektrolit bozuklukları gelişebilir. Potasyum/kalsiyum içerdiği için özel klinik durumlarda dikkat gerekir; EK-2 crush sendromunda potasyum içeren sıvıların kullanılmaması uyarısını korur.",
    "sources": [
      {
        "label": "Haver parenteral çözeltiler",
        "url": "https://www.haver.com.tr/ilaclar/parenteral-cozeltiler"
      }
    ],
    "sourceStatus": "reviewed-2026-09-23",
    "sourceNote": "İlaç kartı bilgisi EK-2 doz mantığından ayrıdır. Ürün örnekleri otomatik eşdeğerlik anlamına gelmez."
  }
};
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(d,container){
 const e=entries[d.id],box=document.createElement('section');box.className='notice';
 if(!e){box.innerHTML='<b>İlaç bilgi kaynağı doğrulaması bekliyor</b><p>Doğrulanmamış ürün bilgisi klinik içerik olarak eklenmez ve EK-2 doz motorunu değiştirmez.</p>';container.appendChild(box);return;}
 document.querySelector('#dtitle').textContent=d.name+' ('+e.ingredient+')';
 const products=(e.products||[]).map(p=>`<p><strong>${escape((p.brand||'')+(p.strength?' · '+p.strength:''))}</strong>${p.form?' · '+escape(p.form):''}${p.route?' · '+escape(p.route):''}${p.warning?'<br><span class="tiny">⚠ '+escape(p.warning)+'</span>':''}</p>`).join('');
 const sources=(e.sources||[]).map(s=>`<a href="${escape(s.url)}" target="_blank" rel="noopener noreferrer">${escape(s.label||'Kaynak')}</a>`).join(' · ');
 box.innerHTML='<b>EK-2 dışı ürün bilgisi — doğrulanmış kaynak özeti</b><p>Bu bölüm ürün bilgisini açıklar; EK-2 dozunu veya algoritma mantığını değiştirmez. Aşağıdaki ürünler aynı etken maddeyi içeren örneklerdir; form/konsantrasyon/yol farkı varsa otomatik eşdeğer kabul edilmez.</p>'+products+
 `<p><b>Etki mekanizması:</b> ${escape(e.mechanism||'Kaynak denetimi bekliyor.')}</p><p><b>Ürün bilgisi endikasyon özeti:</b> ${escape(e.indications||'Kaynak denetimi bekliyor.')}</p><p><b>Başlıca dikkat noktaları / kontrendikasyonlar:</b> ${escape(e.caution||'Kaynak denetimi bekliyor.')} Bu özet tam KÜB/KT yerine geçmez.</p><p><b>Kaynak:</b> ${sources||'Kaynak doğrulaması bekliyor.'}</p><p class="tiny">Araştırma tarihi: 23.09.2026. Ürün piyasası ve KÜB/KT belgeleri zamanla değişebilir; uygulama öncesi ürün etiketi ve güncel resmî ürün bilgisi doğrulanmalıdır.</p>`;
 container.appendChild(box);
}
root.HUNDrugInfo={entries,render,searchTerms:id=>{const e=entries[id];return e?[e.ingredient,...(e.products||[]).map(p=>p.brand)].join(' '):'';}};
})(typeof window==='undefined'?globalThis:window);
