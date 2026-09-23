# GitHub → Cloudflare Pages → hun.kardylab.com

Bu çalışma kopyası yayın kapılarını geçmedi. Şimdilik canlı sitenin dosyalarını değiştirmeyin.

## İnceleme için pratik akış
1. Mevcut GitHub projesini GitHub Desktop ile açın.
2. `hun-v09-test` adlı yeni branch oluşturun. `main` üzerinde çalışmayın.
3. Arşivin içindeki uygulama dosyalarını bu branch’in proje köküne aktarın. `index.html` kökte olmalı; ZIP’i olduğu gibi yüklemeyin. Bu kopya klinik kullanım için değildir.
4. Commit ve Push yapın. Cloudflare Pages projenizin GitHub bağlantısını koruyun; yeni proje/domain oluşturmanız gerekmez.
5. Pages’te bu branch için Preview deployment açın. Repo private ise Cloudflare GitHub uygulamasına yalnız ilgili repo erişimini verin.
6. Statik uygulamada framework None, build komutu boş, çıktı klasörü proje kökü (`/`). `functions/` kökte kalmalı. Gerçek Pages build sonucu ayrıca kontrol edilmelidir.
7. Preview adresinde aşağıdaki cihaz testlerini yapın. Preview hasta denemelerinde yalnız sentetik veri kullanın.
8. RELEASE_GATES içindeki tüm kapılar geçtikten sonra `main` merge değerlendirilir; üretim branch main ve `hun.kardylab.com` mevcut projede korunur. Bu pakette o aşamaya henüz gelinmedi.

## Sunucu ayarları — frontend’e yazmayın
Cloudflare Pages proje ayarlarında Preview ve Production değerleri ayrı yönetilir.
- Secret: `RESEND_API_KEY` (gönderim sağlayıcısı), `RATE_SALT` (rastgele gizli değer).
- Sunucu değişkenleri: `FEEDBACK_TO` (kullanıcının belirleyeceği alıcı), `FEEDBACK_FROM` (Resend’de doğrulanmış gönderici).
- KV binding: `FEEDBACK_RATE`.
- Analytics Engine binding: `HUN_ANALYTICS`; ancak etkinleştirilecekse `ANALYTICS_ENABLED=true`.
- Hiçbir gerçek anahtar örnek dosyaya/HTML/JS’ye/GitHub commitine yazılmaz. Alıcı adresi frontend’e konmaz.
- E-posta kurulmadan form gönderildi gibi davranmaz. Analitik kurulmadan olay göndermez.
- Production hasta verisi hiçbir sunucu bağlantısına bağlanmaz. Genel geri bildirim mesajına hasta bilgisi yazılmamalıdır.
- Endpoint adresleri `/api/status`, `/api/feedback`, `/api/analytics`. API yanıtları service worker cache’ine alınmaz.

## Gerçek cihaz kabul testi
- Eski sürüm açıkken yeni sürümü bulma, güncelleme uyarısı, yeniden açılış ve doğru sürüm etiketi.
- Offline paket sayacının 166/166 olması; indirme sırasında kesinti ve tekrar deneme.
- Uçak modunda uygulamayı tamamen kapatıp açma; bütün algoritma ve anahtar bilgi görsellerini açma.
- Hasta oluştur→algoritma→ilaç→doz→kayıt→araç→EKG→rapor zinciri; ay/gün birimi ve eksik kilo.
- İki farklı hasta arasında not/ölçüm/sonuç taşınmaması; silinen kaydın raporda kalmaması.
- GKS, BE-FAST, SAMPLE, XABCDE, OPQRST, MAP ve ST girişlerinin doğru zaman/kişi kaydına gitmesi.
- Yazdır/PDF: mobil ve masaüstünde bütün satırlar ve hesaplanan/uygulanan ayrımı.
- Ağ isteklerini inceleme: klinik hasta alanları yok; serbest arama metni yok; sunucu secrets frontend yok.
- Geri bildirim başarılı/başarısız/offline/hız sınırı; doğrulanmış e-posta teslimi.

Resmi teknik kaynaklar: https://developers.cloudflare.com/pages/functions/ ve https://developers.cloudflare.com/pages/functions/bindings/ ; e-posta API’si https://resend.com/docs/api-reference/emails/send-email . Bunlar klinik kaynak değildir.
