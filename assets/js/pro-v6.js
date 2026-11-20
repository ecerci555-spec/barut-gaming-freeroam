(()=>{
"use strict";
/* Barut Gaming V6: small, dependency-free enhancements.
   No passwords, tokens, fabricated server stats, or fake login state. */
const langSelect=document.getElementById("language");
const progress=document.getElementById("v6ScrollProgress");
const cfg=window.BARUT_CONFIG||{};
const t={
 tr:{
  navGuide:"Nasıl Katılırım?",kpiLanguages:"DİL DESTEĞİ",kpiPanels:"OYUN İÇİ PANELLER",kpiGallery:"GERÇEK OYUN KARESİ",
  showcaseEyebrow:"OYUNUN İÇİNDEN / GERÇEK GÖRÜNTÜLER",showcaseTitle:"EKRAN DEĞİL.<br><em>BARUT DÜNYASI.</em>",showcaseDesc:"Bunlar stok fotoğraflar değil; sunucumuzdan çekilmiş panel, karakter ve araç görüntüleri. Daha fazlası galeride.",
  shotPanel:"F1 FREEROAM",shotPanelSub:"KONTROL • AYARLAR",shotCharacter:"CJ STİLİ",shotCharacterSub:"BARUT KOMBİNLERİ",shotBike:"ÖZEL MOTOR",shotBikeSub:"OYUN İÇİ GÖRÜNTÜ",
  showcaseDisclaimer:"Galeri, Barut Gaming sunucusundan paylaşılan gerçek ekran görüntülerini içerir.",showAllPhotos:"TÜM FOTOĞRAFLARI GÖR ↗",
  guideEyebrow:"BAĞLANTI REHBERİ / 3 ADIM",guideTitle:"3 ADIMDA<br><em>OYUNDASIN.</em>",guideIntro:"Barut Gaming Freeroam'a katılmak için MTA:SA'yı bilgisayarına kur, oyunu başlat ve sunucu adresini kullan. İşte kısa rehber.",
  stepOneTitle:"MTA:SA'YI İNDİR",stepOneDesc:"Bilgisayarında GTA San Andreas ve uygun bir MTA:SA istemcisi bulunmalı.",stepOneAction:"RESMÎ MTA SİTESİ ↗",
  stepTwoTitle:"SUNUCUYA BAĞLAN",stepTwoDesc:"Oyuna Katıl butonuyla MTA'yı aç veya sunucu adresini MTA'nın bağlantı alanına yapıştır.",stepTwoAction:"DOĞRUDAN BAĞLAN ↗",
  stepThreeTitle:"FREEROAM'U KEŞFET",stepThreeDesc:"Sunucu dosyalarının yüklenmesini tamamla; F1 panelini, marketi ve klan sistemini incele.",stepThreeAction:"PANEL FOTOĞRAFLARINA BAK ↗",
  ipLabel:"SUNUCU IP / PORT",copyIp:"ADRESİ KOPYALA",ipHint:"Sunucu çevrimiçi durum bilgisi gecikmeli olabilir; güncel kontrol zamanı bağlantı bölümünde gösterilir.",
  hubEyebrow:"BARUT GAMING / TOPLULUK MERKEZİ",hubTitle:"OYUNCULAR İÇİN<br><em>TEK MERKEZ.</em>",hubIntro:"Sunucudan kareler, oyuncuların video paylaşımları, şikâyetler ve yeni script fikirleri tek adreste.",
  hubGalleryTitle:"OYUN GALERİSİ",hubGalleryDesc:"F1, F2, F3 panelleri, CJ kıyafetleri ve araç görüntüleri.",hubVideoTitle:"VİDEO GÖNDER",hubVideoDesc:"Oyun videonu gönder; onaylanan kayıtlar haftanın vitrinine girsin.",
  hubReportTitle:"OYUNCU DESTEĞİ",hubReportDesc:"Şikâyet bildir, fotoğraf veya video kanıtı ekle.",hubIdeasTitle:"SCRIPT FİKİRLERİ",hubIdeasDesc:"İstediğin sistemi öner ve diğer fikirleri beğen.",
  hubBrowse:"İNCELE ↗",hubSend:"GÖNDER ↗",hubReport:"BİLDİR ↗",hubSuggest:"ÖNER ↗",
  trustEyebrow:"ŞEFFAFLIK / OYUNCU GÜVENLİĞİ",trustTitle:"OYUNDA ÖZGÜR.<br><em>BİLGİDE AÇIK.</em>",trustDesc:"Barut Gaming tanıtım sitesi ücretsiz GitHub Pages üzerinde yayınlanır. <strong>Şifrelerini sitedeki formlara yazma.</strong> Şikâyetler, script önerileri ve video başvuruları GitHub üzerinden gönderilir ve başvuru içerikleri orada herkese açık olabilir. Web hesabı için ayrı bir oturum doğrulama altyapısı henüz kurulmamıştır.",
  privacyLink:"Gizlilik Bilgileri ↗",termsLink:"Kullanım Koşulları ↗",mtaOfficial:"MTA:SA Resmî Sitesi ↗",discordSoon:"DISCORD YAKINDA"
 },
 en:{
  navGuide:"How to Join",kpiLanguages:"LANGUAGES",kpiPanels:"IN-GAME PANELS",kpiGallery:"REAL GAME SCREENSHOTS",
  showcaseEyebrow:"ACTUAL GAMEPLAY / REAL SCREENSHOTS",showcaseTitle:"NOT JUST A GAME.<br><em>THE BARUT WORLD.</em>",showcaseDesc:"Real screenshots from our server, featuring panels, characters and vehicles. Find more in the gallery.",
  shotPanel:"F1 FREEROAM",shotPanelSub:"CONTROLS • SETTINGS",shotCharacter:"CJ STYLE",shotCharacterSub:"BARUT OUTFITS",shotBike:"CUSTOM BIKE",shotBikeSub:"IN-GAME SCREENSHOT",
  showcaseDisclaimer:"The gallery contains actual gameplay screenshots submitted from Barut Gaming.",showAllPhotos:"SEE ALL SCREENSHOTS ↗",
  guideEyebrow:"CONNECT / THREE STEPS",guideTitle:"JOIN IN<br><em>3 STEPS.</em>",guideIntro:"Install MTA:SA on your PC, launch the client and connect to Barut Gaming Freeroam.",
  stepOneTitle:"GET MTA:SA",stepOneDesc:"You need GTA San Andreas and a compatible MTA:SA client on your computer.",stepOneAction:"OFFICIAL MTA SITE ↗",
  stepTwoTitle:"CONNECT TO SERVER",stepTwoDesc:"Use Join Game to launch MTA, or enter our server address in the MTA connection screen.",stepTwoAction:"CONNECT NOW ↗",
  stepThreeTitle:"EXPLORE FREEROAM",stepThreeDesc:"Let the server resources load, then explore F1, the marketplace and clan controls.",stepThreeAction:"EXPLORE PANELS ↗",
  ipLabel:"SERVER IP / PORT",copyIp:"COPY ADDRESS",ipHint:"The server status can lag behind; the latest check time appears in the connection section.",
  hubEyebrow:"BARUT GAMING / PLAYER HUB",hubTitle:"EVERYTHING IN<br><em>ONE PLACE.</em>",hubIntro:"In-game highlights, community videos, reports and new script ideas in one hub.",
  hubGalleryTitle:"SCREENSHOT GALLERY",hubGalleryDesc:"F1, F2, F3 panels, CJ outfits and vehicles.",hubVideoTitle:"SUBMIT A VIDEO",hubVideoDesc:"Share your gameplay; approved videos can feature in the weekly gallery.",
  hubReportTitle:"PLAYER SUPPORT",hubReportDesc:"Send reports with screenshots or video evidence.",hubIdeasTitle:"SCRIPT IDEAS",hubIdeasDesc:"Suggest new features and like other players' ideas.",
  hubBrowse:"EXPLORE ↗",hubSend:"SUBMIT ↗",hubReport:"REPORT ↗",hubSuggest:"SUGGEST ↗",
  trustEyebrow:"TRANSPARENCY / PLAYER SAFETY",trustTitle:"PLAY FREELY.<br><em>STAY INFORMED.</em>",trustDesc:"This website is hosted on free GitHub Pages. <strong>Never enter passwords into the site forms.</strong> Reports, ideas and video submissions are handled by GitHub and may be public there. A separate Barut Gaming account verification service has not yet been set up.",
  privacyLink:"Privacy Information ↗",termsLink:"Terms of Use ↗",mtaOfficial:"Official MTA:SA Site ↗",discordSoon:"DISCORD COMING SOON"
 },
 ru:{
  navGuide:"Как подключиться",kpiLanguages:"ЯЗЫКА",kpiPanels:"ИГРОВЫЕ ПАНЕЛИ",kpiGallery:"СКРИНШОТОВ ИЗ ИГРЫ",
  showcaseEyebrow:"НАСТОЯЩИЕ КАДРЫ ИЗ ИГРЫ",showcaseTitle:"ЭТО НАШ<br><em>МИР BARUT.</em>",showcaseDesc:"Настоящие скриншоты нашего сервера: панели, персонажи и транспорт.",
  shotPanel:"F1 FREEROAM",shotPanelSub:"УПРАВЛЕНИЕ",shotCharacter:"СТИЛЬ CJ",shotCharacterSub:"ОДЕЖДА BARUT",shotBike:"МОТОЦИКЛ",shotBikeSub:"ИЗ ИГРЫ",
  showcaseDisclaimer:"В галерее представлены реальные скриншоты Barut Gaming.",showAllPhotos:"СМОТРЕТЬ ГАЛЕРЕЮ ↗",
  guideEyebrow:"ПОДКЛЮЧЕНИЕ / 3 ШАГА",guideTitle:"В ИГРУ ЗА<br><em>3 ШАГА.</em>",guideIntro:"Установите MTA:SA на ПК, запустите клиент и подключитесь к Barut Gaming.",
  stepOneTitle:"УСТАНОВИТЕ MTA:SA",stepOneDesc:"Для подключения нужны GTA San Andreas и клиент MTA:SA.",stepOneAction:"ОФИЦИАЛЬНЫЙ САЙТ MTA ↗",
  stepTwoTitle:"ПОДКЛЮЧИТЕСЬ",stepTwoDesc:"Нажмите «Играть» или введите адрес сервера в MTA.",stepTwoAction:"ПОДКЛЮЧИТЬСЯ ↗",
  stepThreeTitle:"ИССЛЕДУЙТЕ СЕРВЕР",stepThreeDesc:"Дождитесь загрузки ресурсов, откройте F1, магазин и кланы.",stepThreeAction:"ПОСМОТРЕТЬ ПАНЕЛИ ↗",
  ipLabel:"IP / ПОРТ",copyIp:"СКОПИРОВАТЬ",ipHint:"Данные статуса могут обновляться с задержкой; время проверки указано ниже.",
  hubEyebrow:"BARUT GAMING / ИГРОКИ",hubTitle:"ВСЁ В<br><em>ОДНОМ МЕСТЕ.</em>",hubIntro:"Галерея, видео игроков, жалобы и предложения новых скриптов.",
  hubGalleryTitle:"ГАЛЕРЕЯ",hubGalleryDesc:"Панели F1/F2/F3, одежда CJ и транспорт.",hubVideoTitle:"ОТПРАВИТЬ ВИДЕО",hubVideoDesc:"Присылайте видео: одобренные могут появиться в подборке недели.",
  hubReportTitle:"ПОДДЕРЖКА",hubReportDesc:"Жалобы со скриншотами или видео.",hubIdeasTitle:"ИДЕИ СКРИПТОВ",hubIdeasDesc:"Предлагайте функции и оценивайте идеи.",
  hubBrowse:"СМОТРЕТЬ ↗",hubSend:"ОТПРАВИТЬ ↗",hubReport:"ПОЖАЛОВАТЬСЯ ↗",hubSuggest:"ПРЕДЛОЖИТЬ ↗",
  trustEyebrow:"ПРОЗРАЧНОСТЬ / БЕЗОПАСНОСТЬ",trustTitle:"ИГРАЙТЕ СВОБОДНО.<br><em>БЕЗ СЕКРЕТОВ.</em>",trustDesc:"Сайт размещён на GitHub Pages. <strong>Никогда не вводите пароли в формы сайта.</strong> Жалобы, идеи и видео передаются через GitHub и могут быть публичными. Отдельной системы проверки аккаунта Barut Gaming пока нет.",
  privacyLink:"Конфиденциальность ↗",termsLink:"Условия использования ↗",mtaOfficial:"Официальный сайт MTA:SA ↗",discordSoon:"DISCORD СКОРО"
 },
 pt:{
  navGuide:"Como Entrar",kpiLanguages:"IDIOMAS",kpiPanels:"PAINÉIS NO JOGO",kpiGallery:"IMAGENS DO JOGO",
  showcaseEyebrow:"IMAGENS REAIS DO JOGO",showcaseTitle:"NÃO É SÓ UM JOGO.<br><em>É O MUNDO BARUT.</em>",showcaseDesc:"Capturas reais do servidor: painéis, personagens e veículos. Veja mais na galeria.",
  shotPanel:"F1 FREEROAM",shotPanelSub:"CONTROLES • AJUSTES",shotCharacter:"ESTILO CJ",shotCharacterSub:"ROUPAS BARUT",shotBike:"MOTO CUSTOMIZADA",shotBikeSub:"IMAGEM DO JOGO",
  showcaseDisclaimer:"A galeria contém capturas de tela reais do Barut Gaming.",showAllPhotos:"VER TODAS AS FOTOS ↗",
  guideEyebrow:"COMO ENTRAR / 3 PASSOS",guideTitle:"ENTRE EM<br><em>3 PASSOS.</em>",guideIntro:"Instale o MTA:SA no seu PC, abra o cliente e conecte ao Barut Gaming.",
  stepOneTitle:"BAIXE O MTA:SA",stepOneDesc:"Você precisa de GTA San Andreas e do cliente MTA:SA no PC.",stepOneAction:"SITE OFICIAL DO MTA ↗",
  stepTwoTitle:"CONECTE AO SERVIDOR",stepTwoDesc:"Clique em Jogar ou digite o IP do servidor na tela de conexão.",stepTwoAction:"CONECTAR AGORA ↗",
  stepThreeTitle:"EXPLORE O FREEROAM",stepThreeDesc:"Espere os recursos carregarem e explore F1, loja e clãs.",stepThreeAction:"CONHECER PAINÉIS ↗",
  ipLabel:"IP / PORTA",copyIp:"COPIAR ENDEREÇO",ipHint:"O status do servidor pode ter atraso; confira a hora da última verificação.",
  hubEyebrow:"BARUT GAMING / COMUNIDADE",hubTitle:"TUDO EM<br><em>UM SÓ LUGAR.</em>",hubIntro:"Galeria, vídeos, denúncias e novas ideias de scripts em uma página.",
  hubGalleryTitle:"GALERIA",hubGalleryDesc:"Painéis F1/F2/F3, roupas CJ e veículos.",hubVideoTitle:"ENVIAR VÍDEO",hubVideoDesc:"Envie suas gravações; vídeos aprovados podem entrar na seleção semanal.",
  hubReportTitle:"SUPORTE",hubReportDesc:"Denúncias com fotos ou vídeos.",hubIdeasTitle:"IDEIAS DE SCRIPTS",hubIdeasDesc:"Sugira recursos e curta ideias dos jogadores.",
  hubBrowse:"VER ↗",hubSend:"ENVIAR ↗",hubReport:"DENUNCIAR ↗",hubSuggest:"SUGERIR ↗",
  trustEyebrow:"TRANSPARÊNCIA / SEGURANÇA",trustTitle:"JOGUE LIVRE.<br><em>COM TRANSPARÊNCIA.</em>",trustDesc:"Este site usa o GitHub Pages gratuito. <strong>Não digite senhas nos formulários.</strong> Denúncias, ideias e vídeos são enviados pelo GitHub e podem ser públicos. Ainda não existe autenticação própria de contas Barut Gaming.",
  privacyLink:"Privacidade ↗",termsLink:"Termos de Uso ↗",mtaOfficial:"Site Oficial MTA:SA ↗",discordSoon:"DISCORD EM BREVE"
 }
};
function currentLang(){return t[langSelect&&langSelect.value]||t.tr}
function translate(){
 const dict=currentLang();
 const locale={tr:"tr",en:"en",ru:"ru",pt:"pt-BR"};
 document.documentElement.lang=locale[langSelect&&langSelect.value]||"tr";
 document.querySelectorAll("[data-v6-i18n]").forEach(el=>{
  const key=el.getAttribute("data-v6-i18n");
  if(Object.prototype.hasOwnProperty.call(dict,key))el.textContent=dict[key];
 });
 document.querySelectorAll("[data-v6-i18n-html]").forEach(el=>{
  const key=el.getAttribute("data-v6-i18n-html");
  // Values come only from constant strings above, never user input.
  if(Object.prototype.hasOwnProperty.call(dict,key))el.innerHTML=dict[key];
 });
 updateDiscord();
}
function updateDiscord(){
 const configured=typeof cfg.discordUrl==="string"&&/^https:\/\//i.test(cfg.discordUrl);
 if(configured)return;
 document.querySelectorAll('button[data-action="discord"]').forEach(btn=>{
  btn.disabled=true;
  btn.classList.add("v6-discord-disabled");
  btn.setAttribute("aria-label",currentLang().discordSoon);
  btn.textContent=currentLang().discordSoon;
  btn.title=currentLang().discordSoon;
 });
}
let queued=false;
function updateProgress(){
 queued=false;
 if(!progress)return;
 const doc=document.documentElement;
 const max=Math.max(0,doc.scrollHeight-window.innerHeight);
 const ratio=max?Math.min(1,window.scrollY/max):0;
 progress.style.width=(ratio*100).toFixed(2)+"%";
}
function onScroll(){
 if(queued)return;
 queued=true;
 requestAnimationFrame(updateProgress);
}
window.addEventListener("scroll",onScroll,{passive:true});
window.addEventListener("resize",onScroll,{passive:true});
updateProgress();
const mobile=document.getElementById("mobileNav");
const menuBtn=document.getElementById("menuToggle");
function syncMenu(){if(menuBtn&&mobile)menuBtn.setAttribute("aria-expanded",String(!mobile.hidden))}
if(mobile){
 mobile.addEventListener("click",ev=>{
  if(ev.target.closest('a[href^="#"]')){
   mobile.hidden=true;
   syncMenu();
  }
 });
}
document.addEventListener("keydown",ev=>{
 if(ev.key==="Escape"&&mobile&&!mobile.hidden){
  mobile.hidden=true;
  syncMenu();
  if(menuBtn)menuBtn.focus();
 }
});
if(menuBtn)menuBtn.addEventListener("click",()=>queueMicrotask(syncMenu));
if(langSelect)langSelect.addEventListener("change",translate);
translate();
const navLinks=[...document.querySelectorAll('.desktop-nav a[href^="#"]')];
if("IntersectionObserver" in window && navLinks.length){
 const targets=[...new Set(navLinks.map(a=>a.getAttribute("href").slice(1)))].map(id=>document.getElementById(id)).filter(Boolean);
 const visible=new Map();
 const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>visible.set(entry.target.id,entry.isIntersecting?entry.intersectionRatio:0));
  let active=null,best=0;
  for(const [id,score] of visible)if(score>best){best=score;active=id}
  navLinks.forEach(a=>{
   if(active&&a.getAttribute("href")==="#"+active)a.setAttribute("aria-current","location");
   else a.removeAttribute("aria-current");
  });
 },{rootMargin:"-15% 0px -60% 0px",threshold:[0,.01,.1,.3,.6]});
 targets.forEach(el=>observer.observe(el));
}
})();