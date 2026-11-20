# Barut Gaming Freeroam

Resmi topluluk tanıtım sitesi. Tasarım: siyah-turuncu, mobil uyumlu. 4 dil seçeneği: TR / EN / RU / PT-BR.

## Ayarlar

`config.js` dosyasındaki `serverHost` alanına MTA sunucu IP/host adresini, `serverPort` alanına portu, `discordUrl` alanına davet bağlantısını yazın. Bu alanlar henüz boş ve canlı oyun bağlantısı bu nedenle etkin değildir. `statusApiUrl` isteğe bağlı HTTPS JSON/CORS API'sidir.

## Yayın

GitHub Pages: https://ecerci555-spec.github.io/barut-gaming-freeroam/

GitHub deposunun Settings > Pages alanında **Deploy from a branch**, **main**, **/(root)** ve **Save** seçilmelidir. Google indekslenmesi garanti edilmez; Google Search Console'da URL denetimi ve `sitemap.xml` gönderilebilir.

## V3.1 – Admin ve canlı bilgi güncellemeleri
- Güvenlik: Herkese açık admin.html kaldırıldı. Şikâyet ve script önerilerini yönetmek için GitHub hesabının depo yetkileriyle https://github.com/ecerci555-spec/barut-gaming-freeroam/issues bağlantısından giriş yap.
- Siteye konulan hiçbir istemci dosyasına özel bir admin şifresi eklenmemiştir. Kullanıcı adı + şifreyle gerçek koruma için ayrı güvenli sunucu ve oturum doğrulaması gerekir.
- Oyuna Katıl yanında Admin Paneli butonu, logo yanında üçüncü taraf canlı web ziyaretçisi sayacı var.
- Canlı MTA oyuncu adı ve sayısı doğrudan ASE UDP (oyun portu + 123) sorgusundan; erişilemezse yaklaşık işaretli (~) ana sunucu listesinden gelir. Yaklaşık beş dakikada bir güncellenir.
- Daha önce hazırlanan MTA Lua kaynağı yedek yöntem olarak kalır, doğrudan UDP sorgusu çalışıyorsa kurulması gerekmez.
- Web ziyaretçi sayacı whos.amung.us üçüncü taraf hizmeti üzerinden sunulur: https://whos.amung.us/legal/privacy/

- Web sitesinde admin butonu yoktur; statik GitHub Pages gerçek admin oturumu sunmadığından herkese açık dashboard kaldırılmıştır. GitHub Issues içeriği hâlâ herkese açık görüntülenebilir; tam gizlilik için ayrı yetkili backend/veritabanı gerekir.

## V5 - Bu Haftaki Barut Gaming'den Kareler (oyuncu video vitrini)

Site: https://ecerci555-spec.github.io/barut-gaming-freeroam/#haftanin-kareleri

1. Oyuncu sitede kendi nickini, başlığı ve açıklamayı girer; **Video Gönder / Dosya Yükle** ile GitHub Issue formunu açar. GitHub hesabıyla giriş gerekir.
2. GitHub formuna MP4/MOV/WebM video yükler (ücretsiz depolarda video dosyası için 10 MB limit olabilir) veya YouTube liste dışı bağlantısı paylaşır. Gönderi `video-basvuru` etiketi alır.
3. Yönetici https://github.com/ecerci555-spec/barut-gaming-freeroam/issues?q=is%3Aissue+label%3Avideo-basvuru listesinden videoyu inceler. Uygunsa **Labels > vitrin-onaylandi** ekler.
4. GitHub Actions `.github/workflows/weekly-videos.yml` çalışır, onaylı içerikleri `data/weekly-videos.json` dosyasına yazar. Site bu JSON'u doğrudan GitHub Raw üstünden okur (GitHub Actions bot push'u GitHub Pages dağıtımını tetiklemediği için).
5. İstenmeyen içerik için `vitrin-onaylandi` etiketini kaldır. GitHub Actions listeyi otomatik yeniler. Bir hafta = Türkiye saatine göre Pazartesi-Pazar. Yalnızca o hafta açılan onaylı video başvuruları listelenir.

**Güvenlik/gizlilik:** GitHub deposu ve Issues herkese açıktır. Başvurular, dosyalar ve onaysız içerikler de doğrudan GitHub üzerinden görüntülenebilir; ana sayfanın onay filtresi özel bir dosya kasası değildir. Gerçekten gizli başvurular veya GitHub hesabı gerektirmeyen video yüklemesi için ayrı güvenli sunucu/veritabanı ve depolama servisi gerekir. Şifreler istemci dosyalarında tutulmaz.
