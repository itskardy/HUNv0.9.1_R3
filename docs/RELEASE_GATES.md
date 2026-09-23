# HUN v0.9.1 — Release Gates (23.09.2026 yeniden denetim)

## 1. İlaç kartı veri zenginleştirmesi
**Durum: UYGULANDI / RESMÎ-KAYNAK DERİNLİĞİ KISMEN AÇIK**

- 34 canonical ilaç kartının 34/34’ünde etken madde, ürün/preparat örnekleri, kısa etki mekanizması, ürün bilgisi endikasyon özeti, dikkat/kontrendikasyon özeti ve kaynak izi bulunuyor.
- Farklı konsantrasyon/form/yol otomatik eşdeğer kabul edilmiyor; kartta açık uyarı gösteriliyor.
- Aspirin ayrı ilaç kartı olmaktan çıkarılmış, Asetilsalisilik Asit canonical kaydında alias olarak tutuluyor.
- Bazı ürünlerde doğrudan üretici/TİTCK KÜB-KT bağlantısı, bazılarında KÜB aynası veya güncel ürün listesi kullanıldı. **Her listelenen preparat için ayrı ayrı doğrudan TİTCK-hosted güncel KÜB bağlantısı doğrulanmış değildir.** Bu nedenle ürün-bazlı resmî belge derin denetimi açık release gate olarak kalır.
- İlaç kartı bilgisi EK-2 doz motorunu değiştirmez.

## 2. Pediatrik EKG
**Durum: EK-2 KAYNAK MANTIĞI UYGULANDI — YAPIM AŞAMASINDA UYARISI KORUNUYOR**

EK-2’den uygulanan pediatrik sınırlar:
- Bebek: <1 yaş; sinüs taşikardisi lehine <220/dk, SVT lehine >220/dk.
- Çocuk: >1 yaş; sinüs taşikardisi lehine <180/dk, SVT lehine >180/dk.
- QRS: <0,09 sn dar; >0,09 sn geniş.
- Bradikardi tedavi eşiği: KAH <60/dk + kötü perfüzyon + yeterli oksijenasyon/ventilasyona rağmen sürme.
- Tam 1 yaş, tam 180/220/dk ve tam 0,09 sn kaynakta açık eşitlik tanımlanmadığından otomatik sınıflandırılmıyor.
- Pediatrik ST/iskemi girişi yetişkin AKS algoritmasına otomatik yönlendirilmiyor.
- EKG ekranındaki **YAPIM AŞAMASINDA** uyarısı v0.9.1’de kalır.

## 3. EK-2 tam klinik audit
**Durum: TAMAMLANDI**

- Tarihsel doz satırı: 148/148 incelendi.
- Aktif benzersiz doz kuralı: 147.
- `rule-012` tarihsel Aspirin/ASA mükerrer alias satırı retired-duplicate; canonical aktif kural `rule-011`.
- 100/100 aktif algoritma yönlendirme kenarı kaynak/alias notuyla doğrulandı.
- Sayısal doz, maksimum/minimum, tekrar, süre, konsantrasyon, koşul ve hazırlama değerleri kaynak sayfalarda eşleştirildi.
- Audit sırasında dört belirsiz “İLGİLİ ALGORİTMAYA GİT” otomatik linki kaldırıldı: Y-02→Y-01, Ç-02→Ç-01, Y-26→Y-22, Ç-25→Ç-21.
- Anafilaksi sayfasındaki Salbutamol 2,5–5 mg satırında yol açık yazılmadığı için `rule-066` otomatik Nebül yolu kaldırıldı.
- Ayrıntı: `review/EK2_FULL_CLINICAL_AUDIT_2026-09-23.json` ve `.md`.

## 4. PWA / Offline / gerçek cihaz QA
**Durum: OTOMATİK KONTROLLER GEÇTİ; GERÇEK CİHAZ QA YAPILAMADI**

Geçen kontroller:
- 148/148 algoritma görseli paket içinde.
- Offline manifestteki dosyalar mevcut.
- Service worker core dosyaları mevcut.
- Service worker install/update/offline-navigation otomatik testleri geçti.
- Eksik JS isteğinin yanlışlıkla HTML ile cevaplanmaması testi geçti.

Yapılamayan:
- Bu çalışma ortamında gerçek Android/iPhone cihazına kurulum ve uçak modu testi yapılamaz.
- Headless Chromium ile localhost PWA testi ortam güvenlik politikası tarafından `ERR_BLOCKED_BY_ADMINISTRATOR` ile engellendi.
- Bu nedenle Android Chrome ve iPhone Safari/PWA gerçek cihaz testi yayın öncesi manuel release gate olarak kalır.

## 5. Canlı yayın / Cloudflare
**Durum: AÇIK**

- Cloudflare Pages canlı deploy/cache geçişi bu paket üretim ortamından doğrulanmadı.
- Yayından sonra `hun.kardylab.com` üzerinde sürüm, service worker güncellemesi, offline hazırlama ve eski cache temizliği kontrol edilmelidir.

## Sonuç
Bu build, önceki v0.9.1’e göre pediatrik EKG ve EK-2 audit açıklarını kapatır; 34 ilaç kartını boş/placeholder durumundan çıkarır. **Klinik final yayın** için iki manuel gate kalır: (1) listelenen ürünlerin ürün-bazlı doğrudan güncel resmî KÜB/KT belge denetimi, (2) gerçek cihaz PWA/offline testi. Canlı Cloudflare deploy kontrolü de yayın operasyon gate’idir.
