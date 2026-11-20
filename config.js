window.BARUT_CONFIG = {
  // Barut Gaming MTA:SA server. The game connection uses the mtasa:// protocol.
  serverHost: "185.158.151.103",
  serverPort: 22003,
  // When a verified Discord invite is available, put its HTTPS URL here.
  // V6 transparently shows "Discord coming soon" while empty.
  discordUrl: "",
  // Five-minute server status checker publishes a checkedAt timestamp here.
  statusApiUrl: "data/status.json",
  news: [
    {
      tag: "DUYURU", date: "2026-11-20",
      title: {tr:"Barut Gaming V6 web sitesi",en:"Barut Gaming V6 website",ru:"Сайт Barut Gaming V6",pt:"Site Barut Gaming V6"},
      description: {tr:"Yenilenen tasarım, oyun galerisi, bağlantı rehberi ve oyuncu merkezi yayında.",en:"Refreshed design, gameplay gallery, connection guide and player hub.",ru:"Обновлённый дизайн, галерея, инструкция по подключению и сообщество.",pt:"Novo visual, galeria do jogo, guia de conexão e área da comunidade."}
    },
    {
      tag: "TOPLULUK", date: "2026-11-20",
      title: {tr:"Haftanın videolarını gönder",en:"Submit your weekly gameplay clips",ru:"Присылайте видео недели",pt:"Envie vídeos da semana"},
      description: {tr:"Oyun kayıtlarını paylaş. Yönetici onaylarsa haftalık video vitrininde yayınlansın.",en:"Share gameplay clips. Approved submissions can appear in the weekly video showcase.",ru:"Поделитесь записью игры — одобренные видео появятся в подборке недели.",pt:"Compartilhe clipes; os aprovados podem aparecer na seleção semanal."},
      url: "#video-gonder"
    },
    {
      tag: "REHBER", date: "2026-11-20",
      title: {tr:"MTA:SA ile Barut Gaming'e katıl",en:"Connect to Barut Gaming using MTA:SA",ru:"Как подключиться через MTA:SA",pt:"Como entrar no Barut Gaming via MTA:SA"},
      description: {tr:"Kurulum ve bağlantı adımlarını incele; sunucu adresini kolayca kopyala.",en:"Follow the connection steps and copy the server address.",ru:"Изучите инструкцию и скопируйте IP сервера.",pt:"Siga as instruções e copie o endereço do servidor."},
      url: "#nasil-katilirim"
    }
  ]
};
