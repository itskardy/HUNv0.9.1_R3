# EK-2 Tam Klinik Audit — 23.09.2026

## Sonuç

- Tarihsel doz satırı: **148/148 incelendi**
- Aktif benzersiz doz kuralı: **147**
- `rule-012`: Aspirin / Asetilsalisilik Asit için tarihsel mükerrer alias satırı; aktif kural `rule-011` olduğu için **retired-duplicate** olarak tutuldu.
- Aktif yönlendirme kenarı: **100/100 kaynak/alias notuyla doğrulandı**
- Doz, maksimum/minimum, tekrar, süre, konsantrasyon, koşul ve hazırlama alanlarındaki **sayısal değerler kaynak sayfalarda eşleştirildi**.
- Kaynak sayfalar algoritmanın `searchPages` kapsamıyla eşleştirildi.

## Audit sırasında düzeltilenler

1. `SB-ASH-Y-02 → SB-ASH-Y-01` kaldırıldı. Kaynak yalnız “İLGİLİ ALGORİTMAYA GİT” diyor; açık hedef adı yok.
2. `SB-ASH-Ç-02 → SB-ASH-Ç-01` kaldırıldı. Aynı gerekçe.
3. `SB-ASH-Y-26 → SB-ASH-Y-22` kaldırıldı. “Alerjik reaksiyon / Anaflaksi varsa İLGİLİ ALGORİTMAYA GİT” ifadesinde hedef algoritma adı açık yazılmıyor.
4. `SB-ASH-Ç-25 → SB-ASH-Ç-21` kaldırıldı. Aynı gerekçe.
5. `rule-066` Salbutamol 2,5–5 mg: kaynak satırında uygulama yolu açık yazılmadığı için otomatik **Nebül** yolu kaldırıldı.
6. `rule-012` mükerrer Aspirin alias kuralı aktif doz motorundan ayrı tutuldu; tek canonical kayıt `Asetilsalisilik Asit` / `rule-011`.

## Pediatrik EKG için EK-2’den doğrulanan sınırlar

- Bebek: **1 yaş altı**
- Çocuk: **1 yaş üstü**
- Sinüs taşikardisi lehine hız: bebekte **<220/dk**, çocukta **<180/dk**
- SVT lehine hız: bebekte **>220/dk**, çocukta **>180/dk**
- QRS dar: **<0,09 sn**
- QRS geniş: **>0,09 sn**
- Bradikardi tedavi eşiği: **KAH <60/dk + kötü perfüzyon + yeterli oksijenasyon/ventilasyona rağmen sürme**

Tam **1 yaş**, tam **180/220/dk** ve tam **0,09 sn** için EK-2 `<` / `>` dili kullandığından uygulama otomatik sınıflama yapmaz; sınır uyarısı gösterir.

## Negatif bağlam kontrolü

EK-2’de “kullanma/kullanılmamalıdır” gibi negatif bağlamlar pozitif doz kuralına çevrilmedi. Özellikle crush sendromunda potasyum içeren sıvı / Ringer Laktat uyarısı pozitif ilgili-ilaç kuralı olarak eklenmez.

> Bu audit metin çıkarımı + kaynak sayfa eşleştirmesiyle yapılmıştır. Uygulama içindeki klinik kaynak yine EK-2 görselidir.
