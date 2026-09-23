# HUN v0.9 MASTER BACKLOG — Aktif Hasta, Klinik Araçlar ve İlaç/Doz Entegrasyonu

Kaynak: Kardy’nin bu çalışma oturumunda sağladığı nihai kapsam. Aşağıdaki maddeler gereksinimdir; tamamlanma iddiası değildir. Durum ve kanıtlar `RELEASE_GATES.md` ve `../review/` içindedir. Yeni onaylanan değişiklikler bu dosyada izlenir. Sürüm amacı: Aktif Hasta → Algoritma → Hızlı Klinik Araç → İlaç/Doz → Uygulama → Zaman Çizelgesi → Hasta Sonu Özeti.

## 1. Değiştirilmeyecek klinik kurallar
- CORE-001: EK-2 kontrol edici kaynaktır; dış kaynak ayrı etiketlenir, EK-2 mantığını değiştiremez.
- CORE-002: İlgili algoritmalar yalnız açık GİT/UYGULA veya açık isimli hedeflere dayanır. Belirsiz hedef tahmin edilmez, iki hedef varsa ikisi gösterilir.
- CORE-003: Yetişkin ve pediatrik hedef kimliği korunur.
- CORE-004: mg/kg, mcg/kg, mcg/kg/dk, mg/kg/sa; minimum/maksimum; yaş/kilo sınırı; yol; tekrar; infüzyon süresi/hız; sulandırma, preparat, hacim, özel konsantrasyon, hazırlama korunur. Önce ham hesap, sonra EK-2 sınırları.
- CORE-005: Eksik/çelişkili kaynaktan klinik doz üretilmez.
- CORE-006: Verilmemeli/önerilmez/kullanılmamalı bağlamındaki ilaç ilgili ilaç veya doz senaryosu olmaz; kaynak uyarısı kalır.

## 2. Güvenlik
- SEC-001: API key/token/parola/secret/private credential frontend HTML/JS/PWA içine konmaz; private repo istisna değildir.
- SEC-002: Gerekirse Cloudflare Secrets, sunucu ortam değişkenleri ve backend/function kullanılır.
- SEC-003: Çelişkide açık uyarı: **UYARI: BU YAKLAŞIM KAYITLI GÜVENLİK KURALINLA ÇELİŞİYOR. API ANAHTARI VEYA GİZLİ BİLGİ FRONTEND’E KONULMAMALI.**

## 3. Ana sayfa ve navigasyon
- DEV-007: Yetişkin/pediatrik sonrasında kategori ara ekranı yok. Tek listede kategori başlıkları; baloncuklar aynı listeyi filtreler.
- DEV-008: Az tıklama/görsel gürültü; sade algoritma satırları.
- DEV-009: Şemaya dokununca büyür; ayrı PDF/tam ekran düğmeleri yok.
- DEV-011: Uygulama adı her yerde Health Unit Navigator.
- DEV-012: Paramedik temalı uygulama/PWA ikonu.

## 4. Aktif hasta
- V09-PAT-001: Hasta oluşturma görünür ve yukarıda.
- V09-PAT-002: Bağlam algoritma, ilaç, doz, klinik araç, EKG ve hasta kaydında korunur.
- V09-PAT-003: Sürekli şerit yalnız sicil/sivil, yaş, kilo, cinsiyet gösterir.
- V09-PAT-004: İsim-soyisim kullanılmaz; sicil boşsa Sivil.
- V09-PAT-005: Yaş varsayılan yıl; ay/gün seçenekleri, mevcut kayıt birimi korunur.
- V09-PAT-006: Yeni hastaya kadar veya en çok 24 saat saklama.
- V09-PAT-007: Yalnız cihazda; merkezi hasta veritabanı yok.
- V09-PAT-008: Aktif hasta varken yeni hasta uyarısı.
- V09-PAT-009: Eksik alanlar kapatmayı engellemez.
- V09-PAT-010: Vital/ilaç/araç/not/girişim silinebilir; silinen kayıt audit kopyası tutulmaz.
- V09-PAT-011: Storage temizlenince kayıp kabul edilir.

## 5–7. Zaman çizelgesi, vital, rapor
- V09-TIME-001: Tarih/saat otomatik, gerektiğinde düzenlenebilir.
- V09-TIME-002: Tüm kayıt türleri tek kronolojik akış.
- V09-TIME-003: Serbest not.
- Varsayılan vital: kan basıncı, nabız, SpO₂, solunum, ateş, kan şekeri.
- V09-VITAL-001: Troponin/Trop kit sonucu.
- V09-REPORT-001: Saatler, vital, test, GKS/araç, EKG, girişim, ilaç, hesaplanan/uygulanan doz ve notları içeren kronolojik hasta sonu özeti.
- V09-REPORT-002: PDF/çıktı sürer.

## 8–10. İlaç/doz ve hasta kaydı
- V09-CTX-001: Algoritmadan ilaca geçişte hasta yaşı/kilosu otomatik; yaş birimi korunur.
- V09-CTX-002: Kaynak endikasyon seçili gelir.
- V09-CTX-003: Bağımsız doz ekranında rastgele varsayılan endikasyon yok.
- V09-CTX-004: Yalnız eksik veri istenir.
- V09-MED-001: İlaç kartında Hasta Kaydına Ekle.
- V09-MED-002: Hesap yoksa doz uydurulmaz; kullanıcı doz/birim/yol/not girer.
- V09-MED-003: Uygulayan kişi opsiyonel.
- V09-DOSE-001: Hesaplanan dozu hasta kaydına ekle.
- V09-DOSE-002: Dozu düzenleyerek hasta kaydına ekle.
- V09-DOSE-003: Hesaplanan ve uygulanan ayrı saklanır.
- V09-DOSE-004: Değişiklikte neden/not istenir.
- V09-DOSE-005: IV/IO/IM/SC/SL/Nebül/İnhaler ve diğer uygun yollar.
- V09-DOSE-006: Sulandırma, konsantrasyon, preparat, infüzyon süresi, tekrar zamanı mümkünse kayda bağlanır.

## 11–12. Hızlı klinik araçlar
Hasta ekranında **+ Hızlı Klinik Araç Ekle**.
- V09-CLN-001: GKS göz/sözel/motor ve otomatik toplam; bileşenlerle kayıt.
- V09-CLN-002: AVPU A/V/P/U.
- V09-CLN-003: BE-FAST hızlı inme değerlendirmesi.
- V09-CLN-004: Kan basıncından MAP.
- V09-CLN-005: SAMPLE Signs/Symptoms, Allergies, Medications, Past Medical History, Last Oral Intake/Last Menstrual Period, Events Preceding Call.
- V09-CLN-006: XABCDE her bileşen için hızlı kayıt.
- V09-CLN-007: OPQRST/PQRST Onset, Provocation/Palliation, Quality, Region/Radiation, Severity, Time; EK-2 dışı doğrulanmış araç etiketi.
- V09-CLN-008: Sonuç aktif hasta zaman çizelgesine eklenir.
- Şok indeksi nabız/sistolik; yalnız yardımcı gösterge; tanı, tedavi veya otomatik algoritma yönlendirmesi yok.
- Sabit uyarı: Hemodinamik değerlendirmeye yardımcı göstergedir. Tek başına tanı veya tedavi kararı için kullanılmaz.

## 13. EKG
- V09-EKG-001: **YAPIM AŞAMASINDA** ve **EKG klinik karar desteği doğrulama aşamasındadır. Sonuçlar kullanıcı tarafından doğrulanmadan klinik karar için kullanılmamalıdır.** v0.9 boyunca kalır.
- V09-EKG-002: Doğrudan hız veya R-R küçük kare; 25 mm/sn için 1500/kare.
- V09-EKG-003: Bradikardi/normal/taşikardi; bradikardi nabızlı taşikardiye yönlenmez.
- V09-EKG-004: Düzenli/düzensiz.
- V09-EKG-005: P varlığı, her P sonrası QRS, her QRS öncesi P.
- V09-EKG-006: Dar/geniş QRS; gerekirse süre/kare.
- V09-EKG-007: Uygun kriterlerde SVT açısından değerlendir.
- V09-EKG-008: Geniş kompleks taşikardide VT açısından değerlendir.
- V09-EKG-009: Uygun düzensiz dar kompleks için AF vb. açısından değerlendir.
- V09-EKG-010: Bradikardi açısından değerlendir ve uygun algoritma.
- V09-EKG-011: I, II, III, aVR, aVL, aVF, V1–V6 ayrı ST elevasyonu/depresyonu/yok.
- V09-EKG-012: Uygun ST/klinik durumda AKS açısından değerlendir; kesin MI tanısı yok.
- V09-EKG-013: Birden çok olasılık ve ilgili algoritmalar.
- V09-EKG-014: Kesin tanı yerine açısından değerlendir/ilgili algoritmaya git.
- V09-EKG-015: Aktif hasta kaydına zaman damgasıyla eklenir.

## 14–15. İlaç kartı ve muadil denetimi
- V09-DRUG-001: İlaç yanında parantez içinde etken madde.
- V09-DRUG-002: Yaklaşık 2–3 uygun doğrulanmış Türkiye ticari/muadil adı.
- V09-DRUG-003: Marka, konsantrasyon, farmasötik form.
- V09-DRUG-004: Farklı preparat/konsantrasyon gizlenmez; **Farklı preparat/konsantrasyon — otomatik olarak eşdeğer kabul edilmemelidir.**
- V09-DRUG-005: 2–3 kısa cümle mekanizma; güncel TİTCK KÜB/KT, sonra resmi üretici önceliği.
- V09-DRUG-006: Başlıca dikkat noktaları/kontrendikasyonlar.
- V09-DRUG-007: KÜB zenginleştirir, EK-2 dozunu değiştirmez.
- V09-DRUG-008: Karttan hasta kaydına ekleme.
- Etken madde, tuz, konsantrasyon, form, yol, doz/uygulama bağlamı karşılaştırılır. Çelişkide otomatik ekleme yok → çatışma listesi → kullanıcı onayı.
- Özellikle diltiazem, furosemid, diazepam, midazolam, adenozin, magnezyum sülfat, atropin, asetilsalisilik asit, metilprednizolon, dopamin.
- V09-DRUG-AUDIT: EK-2’deki bütün ilaçların etken madde/preparat/konsantrasyon/yol/muadil/mekanizma/dikkat denetimi bitmeden veri seti final sayılmaz.

## 16–19. Arama, geri bildirim, destek, analitik
- V09-SRCH-001: Yalnız yazılı semptom araması.
- V09-SRCH-002: Çok kelimeli sorgular.
- V09-SRCH-003: Sonuç yalnız ilgili algoritma adları; tanı yok.
- V09-SRCH-004: İlaç adı/etken madde/doğrulanmış ticari ad araması.
- V09-SRCH-005: Adrenalin/epinefrin gibi alias.
- V09-FEED-001: Bilgilendirme altında Geri bildirim yapmak istiyorum; klinik içerikten ayrı.
- V09-FEED-002: Uygulama içi form.
- V09-FEED-003: Belirlenen adrese sunucu üzerinden; adres frontend’de açık değil, mailto tercih edilmez.
- V09-FEED-004: Sürüm/ekran/gerekli teknik bağlam otomatik; hasta verisi dahil edilmez.
- V09-CAT-001: Güzel iş, biraz kuru mama hediye etmek istiyorum; ödeme yok. Kediler bu habere çok sevindi! Ama henüz bu mümkün değil. Teşekkür ederiz.
- V09-CAT-002: Gelecekte yöntem henüz kararlaştırılmadı (IBAN/doğrudan mama/sepet/petshop/işyeri).
- V09-CAT-003: Gerçek yayından önce işyeri izni, paylaşılabilir teslimat bilgisi, yöntem, gizli saha bilgileri ve IBAN ayrıca sorulur; onaysız yayın yok.
- V09-DATA-001: Mümkünse anonim sayfa/algoritma/arama/arama terimi/doz kullanımı/araç/EKG kullanımı/cihaz/yaklaşık şehir olayları.
- V09-DATA-002: GPS istemeden Cloudflare/IP yaklaşık şehir.
- V09-DATA-003: Yaş, kilo, cinsiyet, sicil, vital, ilaç, doz, test, GKS, EKG sonucu, hasta notu kesinlikle analitiğe gitmez.
- V09-DATA-004: Anonim arama terimi saklanabilir; hasta verisi yasağı üstündür.
- V09-DATA-005: Klinik kayıt merkezi sunucuya gönderilmez.

## 20–22. Beta, PWA, yayın ve Android
- Beta/test uyarısı görünür; uygulama içinde ayrı sürüm notları ekranı yok.
- V09-TECH-001: Offline PWA korunur.
- V09-TECH-002: Tüm şema/anahtar bilgi görselleri offline açılır.
- V09-TECH-003: Eski v0.8 cache dosyaları yeni sürüme karışmaz.
- V09-TECH-004: GitHub → Cloudflare Pages → özel alan adı.
- V09-TECH-005: Private repo ise Cloudflare GitHub izinleri doğrulanır.
- V09-TECH-006: hun.kardylab.com korunur.
- V09-TECH-007: Yayından önce frontend secret taraması.
- Android için yeniden yazım yok; PWA korunur, ileride Capacitor/TWA gereksiz zorlaştırılmaz.

## 23. Regresyon zorunlulukları
REG-001 yetişkin/pediatrik hedef; REG-002 yalnız açık EK-2 hedef; REG-003 çok satırlı ilaç/doz; REG-004 klinik bulgu doz kaynağına karışmaz; REG-005 min/max; REG-006 pediatrik yaş/kilo; REG-007 hız birimleri; REG-008 hazırlama/sulandırma; REG-009 aktif hasta akışı; REG-010 hesaplanan/uygulanan ayrımı; REG-011 araç doğru hastaya; REG-012 bradikardi yanlış taşikardiye gitmez; REG-013 ST kaydı; REG-014 hasta verisi analitiğe gitmez; REG-015 offline; REG-016 tüm offline görseller; REG-017 GitHub/Cloudflare sonrası cache/sürüm.

## 24. Yayın kapıları
GATE-001 EK-2 klinik veri/doz doğrulaması; GATE-002 tüm ekranlarda hasta; GATE-003 ilaç/doz kaydı; GATE-004 EKG mantık denetimi ve kalıcı yapım uyarısı; GATE-005 tüm ilaç veri denetimi; GATE-006 offline/cache/GitHub/Cloudflare testleri; GATE-007 frontend secretsiz ve analitikte hastasız. Hepsi geçmeden final v0.9 ZIP yayınlanmaz.

## 25. Kapsam dışı
32 Parametre Triaj tam geliştirme, OVP, merkezi hasta veritabanı, cloud hasta yedekleme, tam Play yayını, aktif ödeme/IBAN/mama bağışı.

## 26. Nihai akış
Hasta oluştur → aktif bağlam → algoritma → ilaç/araç/EKG → yaş/kilo taşınır → doz → hesaplananı veya düzenleneni kayda ekle → vital/test/ilaç/araç zaman çizelgesi → not → hasta sonu özeti → PDF/çıktı → yeni hasta veya en çok 24 saat lokal saklama.
