# Barut Gaming – Canlı Oyuncu İsimleri Bağlantısı

Bu resource, MTA sunucusunda çalışan oyuncuların **yalnızca herkese açık oyun içi nicklerini** sitenin otomatik kontrolüne verir. Oyuncu IP'si, seri numarası, hesabı veya şifresi paylaşılmaz.

## Kurulum
1. `barut_website_bridge` klasörünü MTA sunucusunun `mods/deathmatch/resources/` içine yükle.
2. Sunucu konsolundan `refresh` ve `start barut_website_bridge` komutlarını çalıştır.
3. `mtaserver.conf` içindeki **HTTP portunun** (genellikle `22005`) açık olduğundan emin ol. SagaNetwork panelinde farklı bir HTTP portu varsa web sitesi projesindeki `scripts/update_status.py` dosyasının `HTTP_PORT` ayarını değiştir.
4. Test: `http://185.158.151.103:22005/barut_website_bridge/players` adresini tarayıcıda aç. JSON çıktısı görmelisin. HTTP erişimi erişim kontrolüne veya barındırma sağlayıcısının port kurallarına bağlı olabilir.
5. GitHub Actions'ın 10 dakikalık sonraki durum sorgusundan sonra `data/status.json` içinde `playerNamesAvailable: true` görünür ve oyuncu isimleri sitede listelenir.

**Önemli:** Sitenin kendisi HTTPS'tir ve HTTP'den veri çekmez. GitHub Actions HTTP endpointini sunucu tarafında okur, doğrulayıp sitenin HTTPS üzerinden kullanacağı JSON'a aktarır. Bu yöntemde sunucunun HTTP portunun GitHub'ın ağından erişilebilir olması gerekir.

Bu kaynak kurulmadan çevrimiçi oyuncu sayısı çalışır, ancak isimler gösterilmez. Sunucu hesabında admin tokenı veya sır barındırmaz.
