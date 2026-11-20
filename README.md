# Barut Gaming Freeroam

Resmi topluluk tanıtım sitesi. Tasarım: siyah-turuncu, mobil uyumlu. 4 dil seçeneği: TR / EN / RU / PT-BR.

## Ayarlar

`config.js` dosyasındaki `serverHost` alanına MTA sunucu IP/host adresini, `serverPort` alanına portu, `discordUrl` alanına davet bağlantısını yazın. Bu alanlar henüz boş ve canlı oyun bağlantısı bu nedenle etkin değildir. `statusApiUrl` isteğe bağlı HTTPS JSON/CORS API'sidir.

## Yayın

GitHub Pages: https://ecerci555-spec.github.io/barut-gaming-freeroam/

GitHub deposunun Settings > Pages alanında **Deploy from a branch**, **main**, **/(root)** ve **Save** seçilmelidir. Google indekslenmesi garanti edilmez; Google Search Console'da URL denetimi ve `sitemap.xml` gönderilebilir.

## V3.1 – Admin ve canlı bilgi güncellemeleri
- admin.html: GitHub üzerindeki şikâyetleri ve önerileri listeler; bu okuma ekranı halka açıktır. Yazma işlemleri yalnızca GitHub hesabının depo yetkileriyle yapılabilir.
- Siteye konulan hiçbir istemci dosyasına özel bir admin şifresi eklenmemiştir. Kullanıcı adı + şifreyle gerçek koruma için ayrı güvenli sunucu ve oturum doğrulaması gerekir.
- Oyuna Katıl yanında Admin Paneli butonu, logo yanında üçüncü taraf canlı web ziyaretçisi sayacı var.
- Canlı MTA oyuncu adı ve sayısı doğrudan ASE UDP (oyun portu + 123) sorgusundan; erişilemezse yaklaşık işaretli (~) ana sunucu listesinden gelir. Yaklaşık beş dakikada bir güncellenir.
- Daha önce hazırlanan MTA Lua kaynağı yedek yöntem olarak kalır, doğrudan UDP sorgusu çalışıyorsa kurulması gerekmez.
- Web ziyaretçi sayacı whos.amung.us üçüncü taraf hizmeti üzerinden sunulur: https://whos.amung.us/legal/privacy/
