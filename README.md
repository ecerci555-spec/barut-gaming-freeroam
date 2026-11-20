# Barut Gaming Freeroam — Professional Website V6

**Canlı web sitesi:** https://ecerci555-spec.github.io/barut-gaming-freeroam/  
**MTA:SA:** `185.158.151.103:22003`  
**Kaynak:** `main` dalındaki statik HTML/CSS/JavaScript; ücretsiz GitHub Pages.

## V6 içeriği

- Turuncu-siyah responsive tasarım, geniş masaüstü menüsü ve mobil menü.
- Gerçek oyun içi karelerden yeni vitrin: F1, F2, F3, CJ kombinleri ve Barut motosikleti; mevcut 10 fotoğraflı filtrelenebilir galeri korunur.
- Sunucuya 3 adımda katılım rehberi (MTA indir, sunucuya bağlan, freeroam'u keşfet), IP kopyalama, `mtasa://` bağlantısı.
- Şikâyet ve script öneri formları; gerçek GitHub Issue kayıtlarına aktarım.
- Video gönderme ve yöneticinin `vitrin-onaylandi` etiketiyle onayladığı haftalık video vitrini.
- Gerçek MTA ASE sorgusuyla sunucu ve oyuncu bilgileri. Beş dakikalık kontrol planı; kesinti veya eski veri varsa bilinmeyen gösterilir, sahte oyuncu sayısı üretilmez.
- Güncel duyurular, topluluk merkezi, yardım, sunucu kuralları, Gizlilik Bilgileri ve Kullanım Koşulları.
- TR / EN / RU / PT-BR destekli sayfa bölümleri. GitHub Pages SEO: Google verification, meta, structured data, sitemap, HTTPS.
- Erişilebilir klavye odakları, içerik atla bağlantısı, scroll ilerleme çizgisi, azaltılmış animasyon tercihi, lazy-loading fotoğraflar.

## Yönetici işlemleri

GitHub Issues (depo sahibi hesabıyla giriş):
https://github.com/ecerci555-spec/barut-gaming-freeroam/issues

1. Şikâyetleri `[Şikayet]` başlıklı issue'larda incele.
2. Script önerilerini `[Script İsteği]` başlıklı issue'larda değerlendir.
3. Haftalık video başvurularını `video-basvuru` etiketiyle filtrele.
4. Sadece kabul ettiğin videolara `vitrin-onaylandi` etiketini ver.
5. Görünmesini istemediğin kayıtlardan `vitrin-onaylandi` etiketini kaldır. Otomatik görev vitrini günceller.

**Güvenlik:** GitHub Pages statik bir sitedir. `admin.html` özellikle kaldırıldı; gerçek erişim kontrolü olmayan bir "admin şifre sayfası" sunulmuyor. Yetkili değişiklikler GitHub depo izinleriyle korunur. GitHub Issues kayıtları ve ekleri herkese açık olabilir.

## Kayıt Ol ve Giriş Yap

Bu iki düğme GitHub hesabına yönlendirir. Barut Gaming oyuncu hesap veritabanı, oyun hesabı bağlantısı veya gerçek oturum doğrulama backend'i **henüz yoktur**. Kullanıcı "GitHub işlemini tamamladım" derse butonları yalnızca bu tarayıcıda görsel olarak gizler. Bu, hesap doğrulaması değildir. Parolaları HTML/JS, repo veya tarayıcı tarafındaki sabit değişkenlere koyma.

Gelecekte gerçek üyelik için TLS üzerinden sunulan PHP/Node backend, güvenli session çerezleri, CSRF koruması, parola hashleme, rate limiting, şifre sıfırlama ve veritabanı gerekir. MTA oyun hesabıyla entegrasyon ayrıca yetki kontrollü API gerektirir.

## Sunucu durumu

`scripts/update_status.py` MTA:SA sunucusuna UDP ASE sorgusu yapar. Bu sorgu başarısız olursa MTA ana listesindeki değer yaklaşık olarak gösterilebilir. `.github/workflows/server-status.yml` bu veriyi yaklaşık 5 dakikalık aralıklarla `data/status.json` dosyasına yazar. GitHub Actions çalışması gecikebilir; site eskimiş veriyi canlı diye sunmamalıdır.

Oyuncu isimleri için hazırlanmış `mta/barut_website_bridge` resource'u yalnızca alternatif bağlantı yöntemidir. ASE doğrudan çalışıyorsa gerekli değildir.

## Video sistemi

- Oyuncu `#video-gonder` bölümündeki formdan Github Issue formuna geçerek MP4/MOV/WebM veya YouTube linki gönderir.
- Başvurular `.github/ISSUE_TEMPLATE/haftanin-videosu.yml` ve `video-basvuru` ile açılır.
- Etiketleme sonrası `.github/workflows/weekly-videos.yml`, `data/weekly-videos.json` dosyasını günceller.
- Yayın listesi yalnızca Türkiye saatine göre aynı hafta açılmış, video bağlantısı geçerli ve **onay etiketli** başvuruları gösterir.
- Onaylanmamış video web ana sayfasında gösterilmez; ancak GitHub issue'su herkese açık olabilir.
- Video dosyası sınırları GitHub hesabının güncel yükleme sınırlarına tabidir. Daha uzun videolar için YouTube bağlantısı önerilir.

## Ayarlar ve sitenin yönetimi

- `config.js`: Sunucu IP/portu, Discord daveti, duyurular, durum JSON yolu.
- `index.html`: Ana sayfa içeriği ve SEO.
- `assets/css/style.css`: Eski tasarım; `assets/css/pro-v6.css`: V6 iyileştirmeleri.
- `assets/js/app.js`: Mevcut temel etkileşimler.
- `assets/js/pro-v6.js`: V6 çeviriler, erişilebilirlik ve sayfa deneyimi.
- `assets/js/gallery.js`: Fotoğraf galerisi.
- `assets/js/weekly-videos.js`: Haftalık videolar.
- `assets/js/auth.js`: GitHub butonları ve **görsel** hesap tercihi.
- `gizlilik.html`, `kullanim-kosullari.html`: Bilgilendirme sayfaları.
- `sitemap.xml`, `robots.txt`: Arama motorları.

**Discord URL'si boş:** Site "Discord Yakında" yazar. Gerçek davet adresin olduğunda `config.js` içindeki `discordUrl` alanını doldur; ardından buton çalışır.

**Galerinin resimleri:** `assets/gallery/panels`, `assets/gallery/cj`, `assets/gallery/vehicles` içinde, web için optimize edilmiş WebP.

## Yayın ve son kontroller

GitHub > Settings > Pages: Kaynak `main`, klasör `/(root)`.  
Kontroller: GitHub Actions'da "pages build and deployment", "Barut Gaming - Oyuncu Durumu" ve "Barut Gaming - Haftanin Video Vitrini" başarılı olmalı.

Siteyi normal ve özel pencerede, bilgisayar ve telefonda açarak şu akışları test et: Menü / dil değişimi, MTA protokol bağlantısı, IP kopyalama, görüntü galerisi ve büyük gösterim, video gönderme, script isteği, şikâyet, klavye odakları. Güncellemeler sonrasında tarayıcı önbelleği sorun çıkarırsa `Ctrl+F5` kullanılabilir.

## Önemli sınırlamalar

- Site içindeki GitHub giriş butonları Barut Gaming üyelik sistemi değildir.
- Harici Discord daveti eklenmedikçe o özellik pasif kalır.
- Google'da sıralama, anlık oyuncu sayısı veya videoların yayını garanti edilmez.
- GitHub sorun kayıtları ve video ekleri gizli değildir. Gerçekten özel şikâyet ve üye işlemleri için doğrulanmış sunucu tarafı altyapı kurmak gerekir.
