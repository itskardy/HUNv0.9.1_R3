# HUN v0.9.1 MASTER BACKLOG

**Proje:** Health Unit Navigator (HUN)  
**Sürüm:** v0.9.1  
**Durum:** Aktif geliştirme backlogu  
**Amaç:** v0.9 kapsamındaki mevcut iş akışlarını sadeleştirmek, saha kullanımındaki gereksiz tekrarları azaltmak ve tarih/saat, hızlı test ve PWA kurulum deneyimini tutarlı hale getirmek.

> Bu dosya HUN v0.9.1 için kanonik backlog kaynağıdır. v0.9.1 geliştirmeleri bu kapsam üzerinden izlenmelidir.

---

## HUN-091-001 — Hesaplı dozu hasta kaydına tek adımda aktar

### Sorun
`Algoritma → İlaç → Doz Hesapla → Hesaplı dozu hasta kaydına ekle` akışında uygulama zaten hesaplanan dozu ve klinik bağlamı bildiği halde kullanıcıdan aynı bilgiler tekrar isteniyor.

### Gereksinimler
- `Hesaplı dozu hasta kaydına ekle` seçildiğinde **Durum = Uygulandı** varsayılan gelsin.
- İlaç adı otomatik aktarılsın.
- Kaynak algoritma / klinik bağlam otomatik aktarılsın.
- Hesaplanan doz otomatik aktarılsın.
- Uygulanan doz / miktar başlangıçta hesaplanan dozla aynı gelsin.
- Doz birimi otomatik aktarılsın.
- EK-2 / hesap bağlamında tek anlamlı ise uygulama yolu otomatik seçilsin.
- Tarih ve saat mevcut cihaz saatinden otomatik doldurulsun.
- Kullanıcıdan doz ve birim ikinci kez istenmesin.
- Varsayılan ekran uzun genel ilaç formu yerine kompakt bir **uygulamayı onayla** ekranı olsun.
- Ayrıntılar gerektiğinde `Düzenle` ile değiştirilebilsin.
- Kullanıcı hesaplanan dozdan farklı bir doz girerse **Doz değişikliği nedeni** alanı gösterilsin / zorunlu hale gelsin.
- Hesaplanan doz değiştirilmediyse `Doz değişikliği nedeni` gizli kalsın.
- Uygulayan kişi alanı isteğe bağlı kalabilir.
- Birden fazla olası uygulama yolu varsa otomatik seçim yapılmasın; kullanıcıdan seçim istensin.

**Durum:** Onaylı — Bekliyor

---

## HUN-091-002 — Tarih/saat standardizasyonu ve BE-FAST zaman girişi

### Proje geneli tarih/saat standardı
- Tüm kullanıcıya gösterilen ve kullanıcı tarafından girilen tarihler Türkçe sıra ile gösterilsin:
  - **`GG.AA.YYYY`**
- Saatler 24 saat formatında gösterilsin:
  - **`HH:mm`**
- Birleşik tarih/saat örneği:
  - **`22.09.2026 16:30`**
- AM/PM kullanılmasın.
- Bu standart hasta kaydı, vital kayıtları, ilaç uygulamaları, zaman çizelgesi, klinik araçlar, raporlar ve çıktılarda tutarlı olarak uygulansın.

### BE-FAST — Son bilinen normal zaman
- `Son bilinen normal zaman` alanında AM/PM girişi kaldırılacak.
- Kullanıcı tarih ve saati 24 saatlik tarih/saat seçiciyle girecek.
- Alan sonradan düzenlenebilir olacak.

**Durum:** Onaylı — Bekliyor

---

## HUN-091-003 — Vital ekle içindeki test alanını genelleştir

### Amaç
Troponine özel alanı farklı hızlı testlerin de kullanılabileceği genel bir test sonucu bileşenine dönüştürmek.

### Yeni alanlar
1. **Test adı**
   - Placeholder örneği: `Troponin testi, alkol testi...`
2. **Test sonucu**
   - `Girilmedi`
   - `Pozitif`
   - `Negatif`
   - `Geçersiz`
   - `Belirsiz`
3. **Test değeri**
4. **Birim**

### Davranış
- Alanlar troponine özel adlandırılmayacak.
- Yalnızca kategorik sonuç gereken testlerde `Test değeri` ve `Birim` gereksiz yere zorunlu olmayacak.
- Sayısal sonuç gereken testlerde değer ve birim ayrı tutulacak.
- Bileşen farklı hızlı/POCT testlerinde yeniden kullanılabilir olacak.

**Durum:** Onaylı — Bekliyor

---

## HUN-091-004 — Offline hazırlama sonrası “Ana ekrana ekle / Uygulamayı yükle”

### Akış
`Offline hazırla → Çevrimdışı kullanım hazır → Ana ekrana ekle / Uygulamayı yükle`

### Android / Chromium
- PWA kurulumu uygunsa `beforeinstallprompt` yakalanacak.
- Özel butona basıldığında tarayıcının yerel kurulum istemi açılacak.
- Uygulama zaten kuruluysa buton gizlenecek veya pasif olacak.
- Kurulum istemi kullanılamıyorsa yanıltıcı biçimde otomatik kurulum varmış gibi gösterilmeyecek.

### iPhone / iPad
- Programatik kurulum istemi mümkün olmadığı için buton kısa bir platforma özel rehber açacak.
- Rehber kullanıcıyı `Paylaş → Ana Ekrana Ekle / Add to Home Screen → Ekle` akışına yönlendirecek.
- iOS tarafında otomatik kurulum yapılabildiği izlenimi verilmeyecek.

### Ortak kural
- Bu eylem tercihen **Offline hazırla işlemi başarıyla tamamlandıktan sonra** görünür hale gelsin.

**Durum:** Onaylı — Bekliyor

---

## HUN-091-005 — Tarih/saat alanlarına “Şimdi” butonu

### Gereksinimler
- Uygun tarih/saat alanlarının yanında küçük bir **`Şimdi`** butonu bulunsun.
- Butona basıldığında cihazın mevcut yerel tarih ve saati anında doldurulsun.
- Format:
  - **`GG.AA.YYYY HH:mm`**
- İnternet bağlantısı gerektirmesin; cihaz saatini kullansın.
- Otomatik doldurulan değer kullanıcı tarafından sonradan düzenlenebilsin.

### Kullanılacağı başlıca alanlar
- Vital ekleme
- İlaç uygulama zamanı
- Hasta zaman çizelgesi kayıtları
- BE-FAST zaman alanları
- Olay / işlem zamanı girilen diğer uygun alanlar

**Durum:** Onaylı — Bekliyor

---

## HUN-091-006 — İlaç adlarını tekilleştir ve EK-2 adını ana kayıt yap

### Amaç
Aynı ilaç için farklı adlarla ayrı ilaç kartları oluşmasını engellemek ve ilaç bilgisini tek, tutarlı bir kayıtta toplamak.

### Ana ad kuralı
- Bir ilaç EK-2'de hangi adla geçiyorsa **ana ilaç adı mutlaka o ad olacak**.
- `Asetilsalisilik asit` ve `Aspirin` gibi aynı ilacı temsil eden farklı adlar ayrı ilaç kayıtları olarak oluşturulmayacak.
- Muadil, ticari veya yaygın kullanılan diğer adlar **ayrı ilaç kartı değil**, ana kaydın altında alias/muadil adı olarak tutulacak.
- Aramada kullanıcı muadil/yaygın adlardan biriyle arama yaptığında sonuç yine EK-2'deki ana ilaç kaydına yönlenecek.
- Algoritma → ilaç → doz akışında daima tek kanonik ilaç kaydı kullanılacak.

### İlaç kartında gösterilecek bilgiler
İlaç kartı açıldığında aşağıdaki bilgiler görünmeli:

1. **Ana ilaç adı**
   - EK-2'de geçen isim.
2. **Etken madde**
3. **Muadil / diğer adlar**
   - Ayrı kart oluşturulmadan tek kayıt altında.
4. **Kısa etki mekanizması**
5. **Endikasyonlar**
6. **Kontrendikasyonlar**
7. **EK-2 klinik bağlamları**
   - İlacın geçtiği algoritma / kullanım bağlamları, mevcut EK-2 bağlantı mantığıyla.

### Kaynak ve güvenlik kuralı
- **Ana isim ve EK-2 klinik bağlamı EK-2'den türetilecek ve EK-2 adlandırması korunacak.**
- Etken madde, muadil adları, kısa etki mekanizması, endikasyon ve kontrendikasyon bilgileri EK-2'de açıkça yoksa bunlar EK-2 içeriği gibi gösterilmeyecek; ayrı doğrulanmış ilaç bilgi kaynağından beslenip kaynak türü açıkça ayrıştırılacak.
- EK-2'deki doz, uygulama yolu, sınır ve kullanım talimatları mevcut doz motorunun kaynak kurallarını koruyacak.

**Durum:** Onaylı — Bekliyor

---

## HUN-091-007 — Hasta seyri çıktı düzenini ekranla aynı hiyerarşide göster

### Amaç
Hasta seyri ekranında alt alta ve okunabilir biçimde gösterilen klinik değerlendirme alanlarının çıktı/PDF tarafında da aynı düzen ve hiyerarşiyle korunması.

### Gereksinimler
- Hasta seyri ekranında **SAMPLE, PQRST ve benzeri başlıklar/alt alanlar nasıl alt alta gösteriliyorsa**, çıktı alınırken de aynı şekilde alt alta gösterilsin.
- Bu içerikler tek satıra sıkıştırılmasın, virgülle birleştirilmesin veya yatay özet haline getirilmesin.
- Her ana değerlendirme grubu kendi başlığı altında okunabilir blok olarak yer alsın.
- Alt alanlar kendi sırasını ve etiketini korusun.
- Ekranda bulunan boş olmayan klinik alanların tamamı çıktı/PDF'de de yer alsın.
- Hasta seyri ekranındaki bilgi sırası ile çıktıdaki bilgi sırası mümkün olduğunca aynı olsun.
- Uzun metinler satır kaydırarak gösterilsin; kesilmesin.
- Aynı kural hasta sonu özeti / rapor / PDF çıktısı gibi hasta seyrini dışa aktaran tüm çıktılarda geçerli olsun.

### Örnek görünüm
**SAMPLE**
- S — Belirti ve bulgular
- A — Alerjiler
- M — Kullanılan ilaçlar
- P — Tıbbi özgeçmiş
- L — Son oral alım / ilgili son bilgi
- E — Olaylar

**PQRST**
- P — Provokasyon / rahatlatan etken
- Q — Ağrının niteliği
- R — Yayılım
- S — Şiddet
- T — Zaman

> Çıktı, hasta seyri ekranındaki gerçek alan adlarını ve mevcut veri modelini esas alacak; örnek etiketler veri modelinin yerine geçmeyecek.

**Durum:** Onaylı — Bekliyor

---

## HUN-091-008 — ST elevasyonu derivasyon seçimi ve raporlama standardı

### Amaç
ST elevasyonu değerlendirmesini serbest metin yerine yapılandırılmış derivasyon seçimiyle kaydetmek ve aynı bilgiyi raporda tutarlı biçimde göstermek.

### Gereksinimler
- EKG değerlendirmesinde **“ST elevasyonu olan derivasyonlar”** alanı bulunacak.
- Kullanıcı derivasyonları serbest metinle yazmak yerine listeden seçecek.
- Birden fazla derivasyon seçilebilecek.
- Seçilen derivasyonlar hasta kaydında yapılandırılmış veri olarak saklanacak.
- Hasta seyri / hasta sonu özeti / PDF / çıktı tarafında seçilen derivasyonlar aynı başlık altında gösterilecek.
- Raporlama biçimi:
  - **ST elevasyonu olan derivasyonlar: II, III, aVF**
- Derivasyonlar virgülle ayrılacak.
- Hiçbir derivasyon seçilmemişse raporda:
  - **“Belirgin ST elevasyonu saptanmadı.”**
  ifadesi gösterilebilecek.
- Kullanıcı daha sonra EKG kaydını düzenlerse rapor da güncel seçimleri yansıtacak.

**Durum:** Onaylı — Bekliyor

---

## HUN-091-009 — Hızlı klinik araç kayıtlarını sonradan düzenlenebilir yap

### Kapsam
Aşağıdaki hızlı klinik araçlarla oluşturulan hasta kayıtları sonradan düzenlenebilir olacak:

- GKS
- BE-FAST
- AVPU
- EKG
- MAP / Şok İndeksi
- SAMPLE
- XABCDE
- OPQRST

### Gereksinimler
- Araç sonucu hasta kaydına / hasta seyrine eklendikten sonra yalnızca okunur hale gelmeyecek.
- Kullanıcı kayıt üzerindeki **Düzenle** eylemiyle aracı tekrar açabilecek.
- Daha önce girilmiş/seçilmiş değerler formda dolu gelecek.
- Kullanıcı gerekli alanları değiştirip kaydı güncelleyebilecek.
- Güncelleme yeni ve mükerrer bir kayıt oluşturmak yerine mevcut kayıt üzerinde yapılacak.
- Hasta seyri, hasta sonu özeti ve PDF/çıktılar her zaman kaydın **son güncel halini** gösterecek.
- Düzenleme sırasında aracın mevcut hesaplama ve doğrulama kuralları yeniden uygulanacak.
- Tarih/saat alanı ayrıca değiştirilmedikçe kaydın olay zamanı korunacak; kullanıcı isterse mevcut tarih/saat düzenleme standardına göre değiştirebilecek.
- Araçların kendi yapılandırılmış alanları korunacak; düzenleme işlemi sonucu serbest metne indirgenmeyecek.

**Durum:** Onaylı — Bekliyor

---

## HUN-091-010 — EKG değerlendirme uyarılarını çıktıda gizle, değerlendirme ekranında koru

### Amaç
EKG yardımcısında kullanıcıyı yönlendiren güvenlik/yorum uyarılarının klinik değerlendirme sırasında görünmeye devam etmesi; ancak hasta çıktısı, hasta sonu özeti ve PDF gibi yazdırılan raporlara dahil edilmemesi.

### Değerlendirme sırasında görünmeye devam edecek uyarılar
- **“Sinüs ritmi ölçütleri açısından değerlendir; normal hız tek başına normal EKG anlamına gelmez.”**
- **“Akut Koroner Sendrom açısından değerlendir. Tek başına ST seçimi kesin MI tanısı değildir.”**

### Çıktı / rapor davranışı
- Yukarıdaki uyarılar **Yazdır / PDF / Hasta sonu özeti / dışa aktarılan rapor** içinde gösterilmeyecek.
- Yalnızca hastaya ait gerçek değerlendirme sonucu, seçilen derivasyonlar, ritim bulguları ve kaydedilmiş yapılandırılmış klinik veriler raporlanacak.
- Uyarılar uygulama içindeki değerlendirme ekranında ve kullanıcı karar desteğinde görünür kalacak.
- Bu ayrım yalnızca görsel gizleme değil, çıktı veri modelinde de uygulanacak; uyarı metinleri rapor içeriğine hiç eklenmeyecek.

**Durum:** Onaylı — Bekliyor

---

## HUN-091-011 — Aktif hasta kartını üstte belirginleştir, alttaki tekrarı kaldır

### Amaç
Aktif hasta bilgisinin ekranda daha görünür ve tek noktadan erişilebilir olması; aynı işlevi tekrar eden ikinci aktif hasta alanının kaldırılması.

### Gereksinimler
- Ekranın **en üstündeki Aktif Hasta kutucuğu** görsel olarak biraz daha belirgin hale getirilecek.
- Kartın çerçevesi / yüksekliği / iç boşluğu kontrollü biçimde artırılarak aktif hasta durumu daha kolay fark edilir olacak.
- Tasarım mevcut sade arayüz çizgisini bozmayacak; gereksiz büyük veya ağır bir kart haline getirilmeyecek.
- Alt kısımda bulunan ve üstteki Aktif Hasta alanıyla **fonksiyonel olarak aynı işi yapan ikinci aktif hasta bölümü kaldırılacak**.
- Aktif hasta ile ilgili işlemler tek kaynak olarak üstteki kart üzerinden sürdürülecek.
- Üst kart kaldırılan alt alanın tüm gerekli işlevlerini koruyacak.

**Durum:** Onaylı — Bekliyor

---

## HUN-091-012 — Hasta profiline “Hızlı Erişim Algoritmaları” sabitleme

### Amaç
Aktif hasta için sık dönülmesi gereken algoritmaları hasta profiline manuel olarak sabitleyerek saha kullanımında tekrar arama ve gezinme ihtiyacını azaltmak.

### Algoritma ekranı
- Algoritma ekranında **“Hızlı erişime ekle”** / sabitleme eylemi bulunacak.
- Aktif hasta varsa tek dokunuşla algoritma o hastanın hızlı erişim listesine eklenecek.
- Eklendikten sonra buton durumu **“Hızlı erişimde ✓”** gibi açıkça değişecek.
- Aynı algoritma aynı hastaya ikinci kez eklenemeyecek.
- Kullanıcı isterse algoritmayı hızlı erişim listesinden kaldırabilecek.

### Hasta profili
- Hasta profilinde **“Hızlı Erişim Algoritmaları”** adlı sade bir bölüm bulunacak.
- Sabitlenen algoritmalar adlarıyla hızlı bağlantı olarak gösterilecek.
- Bir hastaya birden fazla algoritma sabitlenebilecek.
- Yetişkin / pediatrik bağlam ve algoritmanın gerçek kimliği korunacak.
- Sabitlenen algoritmaya dokunulduğunda doğrudan ilgili algoritma açılacak.

### Klinik kayıt kuralı
- Hızlı erişime algoritma eklemek **algoritmanın uygulandığı anlamına gelmez**.
- Bu nedenle sabitlenen algoritmalar hasta seyri, hasta sonu özeti veya PDF/çıktıya otomatik olarak klinik uygulama şeklinde yazılmayacak.
- Sistem semptom veya başka verilerden hareketle algoritmayı kullanıcı onayı olmadan otomatik sabitlemeyecek.
- Bu sürümde özellik manuel “hızlı erişime sabitle” mantığında çalışacak.

### Yaşam döngüsü
- Sabitlenen algoritmalar aktif hasta bağlamına ait olacak.
- Hasta kaydı kapatıldığında/silindiğinde ilgili hızlı erişim ilişkileri de o hasta kaydıyla birlikte yönetilecek.

**Durum:** Onaylı — Bekliyor

---

## HUN-091-013 — Uygulama logosuna tıklayınca ana sayfaya dön

### Amaç
Uygulamanın temel gezinme davranışını daha öngörülebilir hale getirmek ve kullanıcıya her ekrandan hızlı bir ana sayfa dönüşü sağlamak.

### Gereksinimler
- Uygulama başlığındaki / üst gezinme alanındaki **HUN logosu tıklanabilir** olacak.
- Logoya dokunulduğunda kullanıcı **ana sayfaya** yönlendirilecek.
- Bu davranış algoritma, ilaç, doz hesaplama, aktif hasta, klinik araç ve diğer alt ekranlarda tutarlı olacak.
- Ana sayfaya dönüş aktif hasta kaydını sonlandırmayacak veya silmeyecek; yalnızca gezinme işlemi olacak.
- Tarayıcı/PWA geri geçmişini gereksiz şekilde bozmayacak.

**Durum:** Onaylı — Bekliyor

---

## HUN-091-014 — Alt navigasyon barını yeniden düzenle ve görsel olarak iyileştir

### Amaç
Saha kullanımında daha sık gereken işlevleri alt navigasyon barına almak, düşük öncelikli/tekrarlı girişleri kaldırmak ve butonların görsel hiyerarşisini iyileştirmek.

### Navigasyon değişiklikleri
- Alt bardaki **“İlaçlar”** butonu kaldırılacak.
- Yerine **“Doz Hesaplama”** butonu eklenecek.
- **“Hasta Kaydı”** butonu, **Favoriler** ile **Doz Hesaplama** arasına yerleştirilecek.
- Yeni sıralama mevcut diğer sekmeler korunarak bu mantığa göre düzenlenecek:
  - … → **Favoriler** → **Hasta Kaydı** → **Doz Hesaplama** → …
- Doz Hesaplama butonu doğrudan doz hesaplama ekranına götürecek.
- Hasta Kaydı butonu aktif hasta varsa ilgili hasta kaydını açacak; aktif hasta yoksa mevcut hasta oluşturma/seçme akışına yönlendirecek.

### Görsel tasarım
- Butonlar daha sade, dengeli ve tek tip görsel dil kullanacak.
- İkon ve metin birlikte kullanılacak; ikonlar aynı stil ve stroke/kalınlıkta olacak.
- Aktif sekme belirgin ama abartısız şekilde vurgulanacak.
- Dokunma alanları mobil kullanım için yeterince büyük tutulacak.
- Etiketler kısa ve okunaklı olacak; metin taşması engellenecek.
- Barın yüksekliği ve iç boşlukları mevcut sade HUN tasarımına uygun biçimde optimize edilecek.
- Gereksiz kutu/gölge kullanımı azaltılacak; seçili durum için arka plan/pill veya ince vurgu kullanılabilir.
- Güvenli alan (safe-area) desteği korunacak; özellikle iPhone alt çentiği/home indicator alanı dikkate alınacak.

### İşlevsel tutarlılık
- Alt bar sadece navigasyon görevi görecek; hasta kaydı veya ilaç kaydı gibi işlemleri tek başına tetiklemeyecek.
- Navigasyon değişiklikleri aktif hasta bağlamını bozmamalı.
- Kaldırılan “İlaçlar” erişimi tamamen kaybolmayacak; ilaç arama/kart erişimi mevcut arama ve algoritma bağlamı üzerinden devam edecek.

**Durum:** Onaylı — Bekliyor

---

## HUN-091-015 — Uygulama logosunu kırmızı-siyah yeni medic amblemle değiştir

### Amaç
Uygulamanın görsel kimliğini daha güçlü, modern ve ayırt edilebilir hale getirmek için mevcut logoyu yeni kırmızı-siyah medic amblem ile değiştirmek.

### Tasarım yönü
- Yeni logo, konuşmada onaylanan **kırmızı-siyah medic / Star of Life / skull-emblem** yönünde olacak.
- Renk paleti ağırlıklı olarak:
  - **Siyah arka plan**
  - **Kırmızı ana vurgu**
- Genel his:
  - güçlü
  - modern
  - sahaya uygun
  - paramedik/medic karakterli
- Mevcut uygulama tasarım dili bozulmayacak; yeni logo arayüzle uyumlu kullanılacak.

### Uygulama içi kullanım
- Üst gezinme alanındaki uygulama logosu yeni logoyla değiştirilecek.
- HUN ana sayfası / splash / başlık alanlarında yeni kimlik kullanılacak.
- Logoya tıklanınca ana sayfaya dönme davranışı korunacak (bkz. HUN-091-013).

### Uygulama ikonu / PWA varlıkları
- Yeni logo sadece ekran içi görsel olarak değil, uygulama varlıklarında da kullanılacak:
  - PWA/app icon
  - ana ekran kısayol ikonu
  - favicon
  - gerekirse farklı çözünürlüklü icon setleri
- Koyu arka plan üzerinde okunaklı kalacak varyantlar hazırlanacak.
- Gerekli yerlerde küçük boyut için sadeleştirilmiş/uyarlanmış icon varyantı üretilebilecek.

### Uygulama kuralı
- Yeni logo görsel kimlik öğesidir; klinik içerik veya güvenlik mesajı yerine geçmez.
- Logo değişimi, mevcut navigasyon ve işlevleri bozmayacak şekilde uygulanacak.

**Durum:** Onaylı — Bekliyor

---

## HUN-091-016 — Genel tasarım iyileştirmeleri ve arayüz tutarlılığı

### Amaç
HUN arayüzünü daha modern, daha sakin, daha okunabilir ve saha kullanımında daha hızlı taranabilir hale getirmek; farklı ekranlardaki görsel dil ve etkileşim kalıplarını tutarlılaştırmak.

### Önerilen / onaylanan tasarım iyileştirmeleri

#### 1) Başlık alanı ve görsel hiyerarşi
- Üst başlık alanı sadeleşecek; logo, ekran adı ve temel eylemler daha dengeli hizalanacak.
- Üstteki **Aktif Hasta** kartı görünür kalacak ancak gereksiz kalabalık yaratmayacak.
- Aynı seviyedeki başlıkların puntoları ve boşlukları standardize edilecek.

#### 2) Kart ve kutu sadeleştirmesi
- Gereksiz iç içe kart yapıları azaltılacak.
- Aynı işlevi gören kartlarda ortak kenar yarıçapı, iç boşluk ve border sistemi kullanılacak.
- Ağır gölgeler azaltılacak; hafif border + temiz yüzey yaklaşımı tercih edilecek.
- Uyarı, bilgi ve durum kutuları daha kompakt hale getirilecek.

#### 3) Birincil / ikincil buton sistemi
- Uygulama genelinde tek tip buton sistemi kullanılacak:
  - **Birincil eylem**: dolu / en belirgin stil
  - **İkincil eylem**: konturlu veya daha sade stil
  - **Tehlikeli eylem**: kırmızı/uyarı temelli stil
- Aynı ekranda birden fazla birincil buton kullanılmaması tercih edilecek.
- “Kaydet”, “Hasta kaydına ekle”, “Uygula”, “Düzenle” gibi eylemler önem sırasına göre görsel ayrışacak.

#### 4) İkon dili ve etiket tutarlılığı
- Tüm ikonlar aynı aile / stroke kalınlığı / stil dilinde olacak.
- Alt bar, üst bar ve kart içi aksiyon ikonları aynı görsel mantığı paylaşacak.
- Buton etiketleri kısa, anlaşılır ve tekrar etmeyen biçimde sadeleştirilecek.

#### 5) Liste yoğunluğu ve taranabilirlik
- Algoritma listeleri ve hasta kayıt listeleri daha rahat taranabilir yoğunlukta düzenlenecek.
- Liste öğelerinde gereksiz yardımcı metin azaltılacak.
- Kritik bilgi ilk satırda, ikincil bilgi ikinci satırda gösterilecek.
- Dokunma alanları mobil kullanıma uygun tutulacak.

#### 6) Form deneyimi
- Form alanları aynı yükseklik, aynı kenar yapısı ve aynı label düzeniyle sunulacak.
- Placeholder, yardımcı metin ve hata metni kullanımı standardize edilecek.
- Sık kullanılan alanlarda otomatik doldurma ve akıllı varsayılanlar tercih edilecek.
- Uzun formlarda bölümleme, akordeon veya mantıklı gruplama kullanılabilecek.

#### 7) Durum renkleri ve klinik anlamlar
- Durum renkleri net ve tutarlı kullanılacak:
  - başarı / uygulandı
  - bilgi
  - uyarı
  - kritik / dikkat
- Aynı renk farklı ekranlarda farklı anlamda kullanılmayacak.
- Klinik veriyi taşıyan vurgu renkleri ile yalnızca dekoratif renkler ayrıştırılacak.

#### 8) Hasta seyri ve zaman çizelgesi okunabilirliği
- Zaman çizelgesi öğeleri kart yığını gibi değil, okunması kolay klinik olay akışı gibi gösterilecek.
- Her olayda başlık, saat, tür ve kısa özet net ayrılacak.
- Genişleyen detay görünümü sade ama güçlü olacak.

#### 9) Boş durumlar ve yönlendirme
- Veri olmayan ekranlarda kuru boşluk yerine kısa açıklamalı boş durum gösterilecek.
- Örneğin:
  - aktif hasta yok
  - hızlı erişim algoritması yok
  - henüz vital kaydı yok
- Boş durum ekranında uygun tek bir sonraki adım butonu bulunacak.

#### 10) Koyu tema / logo uyumu
- Canonical siyah zeminli beyaz/gri HUN logosu ile uyumlu olacak şekilde koyu yüzeylerin kullanım dengesi gözden geçirilecek.
- Tam koyu tema zorunlu değil; ancak siyah/koyu üst alan ve logo birlikteliği için tematik uyum sağlanacak.
- Vurgu renkleri yalnızca gerçekten önemli eylem ve klinik durum noktalarında kullanılacak; canonical logonun nötr siyah/beyaz/gri kimliği korunacak.

### Uygulama kuralı
- Bu tasarım iyileştirmeleri klinik güvenliği azaltmayacak; sadeleştirme, bilginin kaybolmasına değil daha iyi görünmesine hizmet edecek.
- Görsel modernizasyon yapılırken mevcut hızlı kullanım mantığı korunacak.
- Yeni tasarım kararları mümkün olduğunca tüm modüllerde ortak tasarım sistemi mantığıyla uygulanacak.

**Durum:** Onaylı — Bekliyor

---

## v0.9.1 sürüm sınırı

Bu sürüm, v0.9 içindeki mevcut işlevlerin **UX, veri girişi ve kurulum akışı iyileştirmesi** olarak ele alınacaktır. Daha büyük yeni modüller ve kapsam genişletmeleri v0.10.0 veya sonraki sürümlere ayrılacaktır.


---

# Uygulama Durumu — 23.09.2026 / v0.9.1 audit-r2

- HUN-091-001 → HUN-091-016 kod/arayüz kapsamı uygulanmış durumda.
- EK-2 tam klinik audit: 148/148 tarihsel doz satırı incelendi; 147 benzersiz aktif doz kuralı kaldı; `rule-012` mükerrer Aspirin/ASA alias satırı retired-duplicate olarak kaydedildi.
- Dört belirsiz `İLGİLİ ALGORİTMAYA GİT` otomatik linki kaldırıldı: Y-02→Y-01, Ç-02→Ç-01, Y-26→Y-22, Ç-25→Ç-21.
- `rule-066` Salbutamol 2,5–5 mg için kaynakta yol açık yazılmadığından otomatik Nebül yolu kaldırıldı.
- Pediatrik EKG: EK-2 bebek/çocuk hız eşikleri, QRS 0,09 sn ayrımı, KAH <60 + kötü perfüzyon + oksijenasyon/ventilasyona rağmen sürme koşulu uygulandı. Pediatrik ST bulgusu yetişkin AKS algoritmasına otomatik bağlanmıyor. `YAPIM AŞAMASINDA` uyarısı korunuyor.
- 34/34 canonical ilaç kartında etken madde, ürün/preparat örnekleri, mekanizma, endikasyon özeti, dikkat/kontrendikasyon ve kaynak izi bulunuyor. Farklı form/konsantrasyon/yol otomatik eşdeğer kabul edilmiyor.
- Açık release gate: her listelenen preparat için ayrı ayrı doğrudan güncel TİTCK-hosted KÜB/KT belge doğrulaması tamamlanmış değildir.
- Otomatik service-worker/offline testleri geçti; gerçek Android/iPhone PWA + uçak modu testi bu build ortamında yapılamadı ve manuel release gate olarak kalır.
- Cloudflare canlı deploy/cache kontrolü yayın operasyon gate’i olarak kalır.

Ayrıntılı audit: `docs/EK2_FULL_CLINICAL_AUDIT_2026-09-23.md` ve `review/EK2_FULL_CLINICAL_AUDIT_2026-09-23.json`.


---

## BUG-091-001 — Yeni ilaç kaydında varsayılan durum

**Sorun:** Yeni ilaç/hasta kaydı akışında `Hesap / plan — uygulanmadı` seçeneği varsayılan gelebiliyordu. Bu davranış HUN-091-001 ile çelişiyordu.

**Karar:**
- Yeni ilaç kaydında varsayılan durum **Uygulandı** olacak.
- Hesaplanmış dozdan hasta kaydına geçildiğinde **Uygulandı** seçili ve hesaplanan doz uygulanan doz alanına önceden doldurulmuş gelecek.
- Manuel ilaç kaydında da **Uygulandı** seçili gelecek; uygulanan doz/miktar kullanıcı tarafından girilecek.
- Eski bir `plan/uygulanmadı` kaydı düzenleniyorsa mevcut durum korunabilir.
- `Hesap / plan — uygulanmadı` seçeneği şimdilik tamamen kaldırılmayacak; yalnızca yeni kayıtların varsayılanı olmayacak.

**Durum:** Uygulandı — sonraki v0.9.1 düzeltme ZIP'ine dahil edilecek.

---

## BUG-091-002 — Vaka sonu çıktısında fazladan boş sayfalar

**Sorun:** `Yazdır / PDF Kaydet` akışında vaka raporunun ardından iki adet boş sayfa oluşabiliyordu. Yazdırma CSS'i rapor dışındaki uygulama öğelerini yalnızca `visibility:hidden` ile gizlediği için bu öğeler baskı düzeninde yer kaplamaya devam edebiliyordu.

**Düzeltme:**
- Yazdırma sırasında `#reportModal` dışındaki doğrudan uygulama öğeleri baskı düzeninden `display:none` ile tamamen çıkarılacak.
- Rapor modalı baskıda `position:static`, otomatik yükseklik ve normal sayfa akışıyla yazdırılacak.
- Rapor ve son elemanda gereksiz `page-break-after / break-after` oluşması engellenecek.
- Ekran görünümü etkilenmeyecek; değişiklik yalnız `@media print` altında uygulanacak.

**Durum:** Uygulandı — sonraki v0.9.1 düzeltme ZIP'ine dahil edilecek.


---

## HUN-091-017 — Canonical HUN logosu

### Karar
- Kullanıcının 23.09.2026 tarihinde sağladığı siyah zeminli, beyaz/gri **Star of Life + Rod of Asclepius** görseli HUN için canonical logo olarak kullanılacak.
- Bundan sonraki v0.9.1 ve devam sürümlerinde kullanıcı açıkça değiştirmedikçe bu logo korunacak.
- Header/app logo, PWA icon seti ve uygun favicon çıktıları bu görselden üretilecek; logonun temel kompozisyonu yeniden tasarlanmayacak.
- Logo tıklanınca ana sayfaya dönme davranışı (HUN-091-013) korunacak.

**Durum:** Uygulandı — v0.9.1 R3 build. 

---

## HUN-091-018 — EKG hasta bağlamı ve form UX revizyonu

### 1) Hasta bilgilerinin otomatik alınması
- Aktif hasta varsa EKG aracındaki hasta bilgileri **Hasta Kayıt** verisinden otomatik alınacak.
- Yaş, yaş birimi, cinsiyet ve EKG mantığının gerektirdiği mevcut hasta bağlamı yeniden manuel girilmeyecek.
- Hasta kaydındaki bilgi değişirse EKG aracı güncel aktif hasta bağlamını kullanacak.
- Aktif hasta yoksa gerekli alanlar manuel girilebilir; sistem veri uydurmayacak.

### 2) AKS şüphesi / pediatrik bradikardi klinik koşullarının görsel düzeni
Mevcut dağınık metin görünümü kaldırılacak:
- `AKS şüphesi oluşturan klinik bulgu — Girilmedi / Var / Yok / Değerlendirilemedi`
- `Kötü perfüzyon bulguları var`
- `Yeterli oksijenasyon/ventilasyona rağmen sürüyor`
- `EK-2 Çocuk Bradikardi algoritmasındaki KAH <60/dk tedavi eşiği...`

Yeni görünüm:
- Bu alanlar ayrı bir **Klinik Bulgular / Klinik Koşullar** kartında gruplanacak.
- AKS şüphesi tek satırlık kompakt segmented/radio seçim olarak sunulacak: **Var / Yok / Değerlendirilemedi**. `Girilmedi` kullanıcıya seçim olarak gösterilmeyecek; hiçbir seçim yapılmaması zaten girilmedi durumunu temsil edecek.
- Pediatrik bradikardi koşulları kompakt checkbox/toggle satırları halinde gösterilecek:
  - **Kötü perfüzyon bulguları**
  - **Yeterli oksijenasyon/ventilasyona rağmen sürüyor**
- EK-2 açıklaması uzun form metni gibi durmayacak; küçük bir `EK-2` bilgi notu / info satırı olarak koşulların altında gösterilecek.
- Pediatrik bradikardi alanı yalnız pediatrik hasta/ilgili bağlamda görünür olacak; yetişkin EKG formunu gereksiz yere kalabalıklaştırmayacak.

### 3) ST elevasyonu derivasyon seçimi
- Mevcut büyük/tek tek seçim kontrolleri yerine **kompakt checkbox grid** kullanılacak.
- 12 derivasyon mobilde az yer kaplayan, hızlı dokunulabilen bir düzende gösterilecek:
  - I, II, III
  - aVR, aVL, aVF
  - V1–V6
- Seçili derivasyonlar görsel olarak belirgin olacak.
- Birden fazla derivasyon tek tek hızlıca seçilip kaldırılabilecek.
- Bu değişiklik mevcut ST klinik mantığını değiştirmeyecek; yalnız veri girişini hızlandıracak.

### 4) ST sonucu ve anatomik bölge etiketi
- Sonuçta **ST elevasyonu olan derivasyonlar** gösterilirken her derivasyonun yanında doğrulanmış anatomik bölge etiketi parantez içinde gösterilecek.
- Örnek görsel format: `II (inferior)`, `aVL (lateral)`.
- Lead→anatomik bölge eşlemesi klinik kaynakla doğrulanmadan final kabul edilmeyecek; EK-2 dışı eşleme EK-2 verisi gibi sunulmayacak.
- Birden fazla derivasyon seçildiğinde sonuç kompakt ve taranabilir biçimde listelenecek.

### 5) EKG özetinde yalnız girilmiş verileri göster
Mevcut örnek gibi girilmemiş alanların yazılması kaldırılacak:
`Ritim düzenli: Evet; P dalgası: Girilmedi; P sonrası QRS: Girilmedi; QRS öncesi P: Girilmedi; PR sabit: Girilmedi`

Yeni kural:
- **Girilmedi / boş / null** alanlar EKG sonuç özetine hiç yazılmayacak.
- Yalnız kullanıcının gerçekten girdiği/değerlendirdiği alanlar gösterilecek.
- Örnek: yalnız ritim düzeni girilmişse sonuçta sadece `Ritim: Düzenli` gösterilecek.
- Bu kural hasta zaman çizelgesi, EKG sonuç kartı ve vaka sonu PDF/çıktısında da aynı şekilde uygulanacak.
- Eksik veri otomatik olarak `Yok` veya negatif kabul edilmeyecek.

### Güvenlik / klinik kural
- `YAPIM AŞAMASINDA` EKG uyarısı v0.9.1 boyunca korunacak.
- Bu UX revizyonu mevcut EK-2 eşiklerini veya klinik yönlendirme mantığını sessizce değiştirmeyecek.

**Durum:** Uygulandı — v0.9.1 R3 build.


---

# Uygulama Durumu — 23.09.2026 / v0.9.1 R3

- HUN-091-017 canonical siyah/beyaz/gri HUN logosu header, ana ekran, onboarding ve PWA icon setine uygulandı.
- HUN-091-018 EKG UX revizyonu uygulandı: aktif hasta bağlamı otomatik gösteriliyor; aktif hastanın yaş/yaş birimi pediatrik EKG alanına otomatik aktarılıyor; AKS ve pediatrik bradikardi koşulları kompakt klinik kartta toplandı.
- ST elevasyonu derivasyon girişi 12 derivasyonlu checkbox grid oldu. Seçilen derivasyonlar AHA kaynaklı EK-2 dışı anatomik bölge etiketiyle gösteriliyor: I/aVL/V5/V6 lateral; II/III/aVF inferior; V1/V2 septal; V3/V4 anterior; aVR için basit bölgesel etiket uygulanmıyor.
- EKG canlı sonuç, hasta zaman çizelgesi ve vaka sonu raporunda girilmemiş/null ritim alanları artık `Girilmedi` olarak yazılmıyor; yalnız gerçekten girilmiş alanlar gösteriliyor.
- ST checkboxlarının boş bırakılması negatif klinik bulgu olarak raporlanmıyor.
- `YAPIM AŞAMASINDA` EKG güvenlik uyarısı korunuyor.
- Gerçek Android/iPhone PWA ve uçak modu testi manuel release gate olarak devam ediyor.
