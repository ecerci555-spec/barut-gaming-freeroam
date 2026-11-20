(()=>{
'use strict';
const cfg=window.BARUT_CONFIG||{};
const $=s=>document.querySelector(s);
const trans={
tr:{playNow:'OYUNA KATIL',navHome:'Ana Sayfa',navFeatures:'Özellikler',navCommunity:'Topluluk',navRules:'Kurallar',navFaq:'SSS',heroLead:'Şehrin kurallarını sen yaz. Direksiyona geç, tarzını göster ve özgürlüğü Barut Gaming’de yaşa.',startPlaying:'HEMEN OYNA',exploreServer:'SUNUCUYU KEŞFET',communityTitle:'OYUN BİTER.<br><em>DOSTLUK BİTMEZ.</em>',joinDiscord:'DISCORD’A KATIL',newsTitle:'SON <em>DUYURULAR.</em>',rulesTitle:'SAYGI VARSA<br><em>EĞLENCE VAR.</em>',faqTitle:'MERAK <em>ETTİKLERİN.</em>',connectToServer:'SUNUCUYA BAĞLAN',statusUnknown:'BİLGİ BEKLENİYOR',statusOnline:'ÇEVRİMİÇİ',statusOffline:'ÇEVRİMDIŞI',statusError:'DURUM ALINAMADI',notConfigured:'Henüz eklenmedi',noticeIp:'Sunucu IP adresi henüz eklenmedi.',noticeDiscord:'Discord davet linki henüz eklenmedi.',noticeCopied:'Sunucu adresi kopyalandı.',noticeCopyFail:'Adresi kopyalayamadık.',ctaTitle:'YERİN HAZIR.<br><em>GAZA BAS.</em>',readMore:'DEVAMINI OKU ↗'},
en:{playNow:'JOIN GAME',navHome:'Home',navFeatures:'Features',navCommunity:'Community',navRules:'Rules',navFaq:'FAQ',heroLead:'Write your own rules, take the wheel and enjoy freedom at Barut Gaming.',startPlaying:'PLAY NOW',exploreServer:'EXPLORE SERVER',communityTitle:'GAMES END.<br><em>FRIENDSHIP DOES NOT.</em>',joinDiscord:'JOIN DISCORD',newsTitle:'LATEST <em>NEWS.</em>',rulesTitle:'PLAY WITH<br><em>RESPECT.</em>',faqTitle:'YOUR <em>QUESTIONS.</em>',connectToServer:'CONNECT TO SERVER',statusUnknown:'AWAITING INFO',statusOnline:'ONLINE',statusOffline:'OFFLINE',statusError:'STATUS UNAVAILABLE',notConfigured:'Not configured',noticeIp:'Server IP is not configured yet.',noticeDiscord:'Discord invite is not configured yet.',noticeCopied:'Address copied.',noticeCopyFail:'Could not copy address.',ctaTitle:'YOUR SPOT IS READY.<br><em>GO DRIVE.</em>',readMore:'READ MORE ↗'},
ru:{playNow:'ИГРАТЬ',navHome:'Главная',navFeatures:'Возможности',navCommunity:'Сообщество',navRules:'Правила',navFaq:'Вопросы',heroLead:'Создавай свои правила и наслаждайся свободой в Barut Gaming.',startPlaying:'ИГРАТЬ',exploreServer:'О СЕРВЕРЕ',communityTitle:'ИГРА КОНЧАЕТСЯ.<br><em>ДРУЖБА ОСТАЁТСЯ.</em>',joinDiscord:'НАШ DISCORD',newsTitle:'ПОСЛЕДНИЕ <em>НОВОСТИ.</em>',rulesTitle:'ИГРАЙТЕ <em>УВАЖИТЕЛЬНО.</em>',faqTitle:'ВОПРОСЫ И <em>ОТВЕТЫ.</em>',connectToServer:'ПОДКЛЮЧИТЬСЯ',statusUnknown:'НЕТ ДАННЫХ',statusOnline:'В СЕТИ',statusOffline:'НЕ В СЕТИ',statusError:'НЕТ СТАТУСА',notConfigured:'Не настроено',noticeIp:'IP сервера ещё не добавлен.',noticeDiscord:'Ссылка Discord ещё не добавлена.',noticeCopied:'Адрес скопирован.',noticeCopyFail:'Ошибка копирования.',ctaTitle:'ТВОЁ МЕСТО <em>ЖДЁТ.</em>',readMore:'ПОДРОБНЕЕ ↗'},
pt:{playNow:'JOGAR',navHome:'Início',navFeatures:'Recursos',navCommunity:'Comunidade',navRules:'Regras',navFaq:'Perguntas',heroLead:'Crie suas regras, assuma o volante e viva a liberdade no Barut Gaming.',startPlaying:'JOGAR AGORA',exploreServer:'VER SERVIDOR',communityTitle:'JOGOS ACABAM.<br><em>AMIZADES NÃO.</em>',joinDiscord:'ENTRAR NO DISCORD',newsTitle:'ÚLTIMAS <em>NOTÍCIAS.</em>',rulesTitle:'JOGUE COM <em>RESPEITO.</em>',faqTitle:'SUAS <em>DÚVIDAS.</em>',connectToServer:'CONECTAR',statusUnknown:'SEM DADOS',statusOnline:'ONLINE',statusOffline:'OFFLINE',statusError:'STATUS INDISPONÍVEL',notConfigured:'Não configurado',noticeIp:'O IP não foi configurado.',noticeDiscord:'O link Discord não foi configurado.',noticeCopied:'Endereço copiado.',noticeCopyFail:'Erro ao copiar.',ctaTitle:'SEU LUGAR <em>ESPERA.</em>',readMore:'SAIBA MAIS ↗'}
};

const addons={
tr:{navReports:"Şikâyetler",navIdeas:"Script İstekleri",reportsTitle:"ŞİKÂYET <em>OLUŞTUR.</em>",reportsDesc:"Oyuncu ihlallerini veya teknik sorunları bildirebilirsin. Bildirimler GitHub üzerinden takip edilir.",seeReports:"Şikâyetleri görüntüle",publicNotice:"Önemli: Şikâyetler herkese açık GitHub sayfasında görünür. Kişisel bilgi veya şifre paylaşma.",nickname:"Oyuncu adın (isteğe bağlı)",reportSubject:"Şikâyet konusu",reportDetail:"Olayı açıkla",submitReport:"ŞİKÂYET OLUŞTUR",githubSignIn:"Gönderiyi tamamlamak için ücretsiz GitHub hesabıyla giriş yapmalısın.",ideasTitle:"SCRIPT <em>İSTEKLERİ.</em>",ideasDesc:"İstediğin sistemi öner, topluluğun fikirlerini oku ve beğen.",addIdea:"YENİ SCRIPT ÖNER",ideaSubject:"Script adı",ideaDetail:"Nasıl çalışsın?",sendIdea:"SCRIPT İSTEĞİ OLUŞTUR",communityIdeas:"OYUNCULARIN İSTEKLERİ",allIdeas:"Tümünü gör ↗",loadingIdeas:"İstekler yükleniyor...",likeNotice:"👍 Beğen ile GitHub'da ilgili isteğe git, 👍 tepkisi bırakarak destekle.",like:"👍 BEĞEN",noIdeas:"Henüz script isteği yok. İlk fikri sen gönder!",ideaError:"İstekler yüklenemedi. GitHub üzerinden görüntüleyebilirsin."},
en:{navReports:"Reports",navIdeas:"Script Requests",reportsTitle:"SUBMIT A <em>REPORT.</em>",reportsDesc:"Report player misconduct or technical problems. Track reports via GitHub.",seeReports:"View reports",publicNotice:"Important: Reports are public on GitHub. Never share private information or passwords.",nickname:"Player name (optional)",reportSubject:"Report title",reportDetail:"Describe the incident",submitReport:"CREATE REPORT",githubSignIn:"Sign in with a free GitHub account to finish submitting.",ideasTitle:"SCRIPT <em>REQUESTS.</em>",ideasDesc:"Suggest new features and support ideas with likes.",addIdea:"SUGGEST A SCRIPT",ideaSubject:"Script title",ideaDetail:"How should it work?",sendIdea:"SUBMIT REQUEST",communityIdeas:"COMMUNITY IDEAS",allIdeas:"See all ↗",loadingIdeas:"Loading requests...",likeNotice:"👍 Like opens the GitHub request, where you can react with 👍.",like:"👍 LIKE",noIdeas:"No requests yet. Submit the first idea!",ideaError:"Couldn't load requests. Open GitHub to view them."},
ru:{navReports:"Жалобы",navIdeas:"Идеи скриптов",reportsTitle:"ОТПРАВИТЬ <em>ЖАЛОБУ.</em>",reportsDesc:"Сообщайте о нарушениях и ошибках через GitHub.",seeReports:"Смотреть жалобы",publicNotice:"Важно: жалобы публичны на GitHub. Не публикуйте личные данные и пароли.",nickname:"Ник (необязательно)",reportSubject:"Тема жалобы",reportDetail:"Опишите ситуацию",submitReport:"ОТПРАВИТЬ ЖАЛОБУ",githubSignIn:"Для отправки необходим бесплатный аккаунт GitHub.",ideasTitle:"ЗАПРОСЫ <em>СКРИПТОВ.</em>",ideasDesc:"Предлагайте идеи и ставьте лайки.",addIdea:"ПРЕДЛОЖИТЬ СКРИПТ",ideaSubject:"Название",ideaDetail:"Как это должно работать?",sendIdea:"ОТПРАВИТЬ ИДЕЮ",communityIdeas:"ИДЕИ ИГРОКОВ",allIdeas:"Все идеи ↗",loadingIdeas:"Загрузка...",likeNotice:"👍 Нажмите и поставьте реакцию в GitHub.",like:"👍 ЛАЙК",noIdeas:"Идей пока нет. Предложите первую!",ideaError:"Не удалось загрузить. Посмотрите на GitHub."},
pt:{navReports:"Denúncias",navIdeas:"Pedidos de Scripts",reportsTitle:"ENVIAR <em>DENÚNCIA.</em>",reportsDesc:"Relate abusos ou erros e acompanhe pelo GitHub.",seeReports:"Ver denúncias",publicNotice:"Atenção: denúncias são públicas no GitHub. Não divulgue dados pessoais ou senhas.",nickname:"Nome (opcional)",reportSubject:"Assunto",reportDetail:"Descreva o ocorrido",submitReport:"ENVIAR DENÚNCIA",githubSignIn:"Entre com sua conta gratuita do GitHub para finalizar.",ideasTitle:"PEDIDOS DE <em>SCRIPTS.</em>",ideasDesc:"Sugira novidades e curta ideias da comunidade.",addIdea:"SUGERIR SCRIPT",ideaSubject:"Título do script",ideaDetail:"Como deve funcionar?",sendIdea:"ENVIAR PEDIDO",communityIdeas:"IDEIAS DOS JOGADORES",allIdeas:"Ver todos ↗",loadingIdeas:"Carregando...",likeNotice:"👍 Clique para abrir o pedido no GitHub e deixar a reação 👍.",like:"👍 CURTIR",noIdeas:"Nenhum pedido ainda. Envie o primeiro!",ideaError:"Não foi possível carregar. Veja no GitHub."}
};for(const [l,data] of Object.entries(addons))Object.assign(trans[l],data);

const rules={tr:[['Saygılı ol','Diğer oyunculara hakaret etme ve ayrımcılık yapma.'],['Hile kullanma','Hile ve oyun açıklarını kötüye kullanma.'],['Spam yapma','Sohbette spam ve izinsiz reklam paylaşma.'],['Trol davranışlardan kaçın','Diğer oyuncuların oyununu sabote etme.'],['Yetkililere uy','Sorunları oyun içi yönetime bildir.']],en:[['Respect everyone','Do not insult or discriminate.'],['No cheating','Cheats and exploits are forbidden.'],['No spam','No spam or unwanted advertising.'],['Do not troll','Respect everyone’s gameplay.'],['Follow staff','Report issues to moderators.']],ru:[['Уважение','Уважайте других игроков.'],['Без читов','Читы и эксплойты запрещены.'],['Без спама','Не засоряйте чат.'],['Без троллинга','Не мешайте другим игрокам.'],['Слушайте модераторов','Сообщайте о проблемах.']],pt:[['Respeito','Respeite os outros jogadores.'],['Sem cheats','Trapaças não são permitidas.'],['Sem spam','Não envie spam no chat.'],['Sem trolling','Não atrapalhe os outros.'],['Respeite a equipe','Relate problemas à moderação.']]};
const faqs={tr:[['Sunucuya nasıl bağlanırım?','MTA:SA kur. Sunucu IP adresi eklendiğinde Oyuna Katıl butonuyla bağlanabilirsin.'],['Oynamak için ne gerekiyor?','GTA: San Andreas ve Multi Theft Auto: San Andreas gerekir.'],['Sunucu ücretsiz mi?','Web sitesi ücretsizdir. Oyun içi koşullar sunucu yönetimi tarafından açıklanır.'],['Discord’a nasıl katılırım?','Davet bağlantısı eklendiğinde Discord butonunu kullanabilirsin.']],en:[['How do I connect?','Install MTA:SA and join when the server IP is provided.'],['What do I need?','GTA: San Andreas and the MTA:SA client.'],['Is it free?','This website is free. Game policies are set by admins.'],['How can I join Discord?','Use the Discord link when it is added.']],ru:[['Как подключиться?','Установите MTA:SA и дождитесь IP сервера.'],['Что нужно?','GTA: San Andreas и MTA:SA.'],['Это бесплатно?','Этот сайт бесплатный.'],['Где Discord?','Ссылка появится позже.']],pt:[['Como conectar?','Instale MTA:SA e use o IP quando disponível.'],['O que preciso?','GTA: San Andreas e MTA:SA.'],['É grátis?','O site é gratuito.'],['Como entrar no Discord?','Use o link quando for adicionado.']]};
let lang=localStorage.getItem('barutLanguage')||'tr';if(!trans[lang])lang='tr';
let timer;const tr=k=>(trans[lang]||trans.tr)[k]||trans.tr[k]||k;
function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>el.classList.remove('show'),3500)}
function address(){const host=String(cfg.serverHost||'').trim(),port=Number(cfg.serverPort||22003);return /^[a-zA-Z0-9.-]+$/.test(host)&&port>=1&&port<=65535?host+':'+port:''}
function news(){const grid=$('#newsGrid');grid.replaceChildren();for(const item of (cfg.news||[]).slice(0,6)){const el=document.createElement('article');el.className='news-card';const meta=document.createElement('div');meta.className='news-card__meta';const tag=document.createElement('span'),date=document.createElement('time');tag.textContent=item.tag||'BARUT';date.textContent=item.date||'BARUT / NEWS';meta.append(tag,date);const h=document.createElement('h3'),p=document.createElement('p');h.textContent=item.title?.[lang]||item.title?.tr||'';p.textContent=item.description?.[lang]||item.description?.tr||'';el.append(meta,h,p);if(/^https:\/\//.test(item.url||'')){const a=document.createElement('a');a.href=item.url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=tr('readMore');el.append(a)}grid.append(el)}}
function draw(){document.documentElement.lang=lang==='pt'?'pt-BR':lang;$('#language').value=lang;document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;if(!trans[lang][k])return;if(['featuresTitle','communityTitle','newsTitle','rulesTitle','faqTitle','ctaTitle'].includes(k))el.innerHTML=tr(k);else el.textContent=tr(k)});$('#serverAddress').textContent=address()||tr('notConfigured');if(!window.barutStatus){$('#serverStatus').textContent=tr('statusUnknown');$('#miniStatus').textContent=tr('statusUnknown')}else updateStatus(window.barutStatus);const rl=$('#rulesList');rl.replaceChildren();for(const [a,b] of rules[lang]){const li=document.createElement('li'),dv=document.createElement('div'),h=document.createElement('h3'),p=document.createElement('p');h.textContent=a;p.textContent=b;dv.append(h,p);li.append(dv);rl.append(li)}const fl=$('#faqList');fl.replaceChildren();for(const [a,b] of faqs[lang]){const d=document.createElement('details'),s=document.createElement('summary'),p=document.createElement('p');s.textContent=a;p.textContent=b;d.append(s,p);fl.append(d)}news()}

function updateStatus(data){
  window.barutStatus=data;
  const state=data.state||"unknown";
  const label=state==="online"?"statusOnline":state==="offline"?"statusOffline":state==="error"?"statusError":"statusUnknown";
  $("#serverStatus").textContent=$("#miniStatus").textContent=tr(label);
  $("#statusPip").className="status-pip "+(state==="online"?"online":state==="offline"?"offline":"");
  const valid=state==="online"&&Number.isInteger(data.players)&&Number.isInteger(data.maxPlayers);
  $("#playersWrap").hidden=!valid;
  if(valid)$("#playerCount").textContent=data.players+" / "+data.maxPlayers;
  const str=valid?(data.countApproximate?"~":"")+data.players+" / "+data.maxPlayers:state==="offline"?"0 / —":"— / —";
  $("#navOnlineCount").textContent=str;
  $("#mobileOnlineCount").textContent=valid?(data.countApproximate?"~":"")+data.players+" oyuncu":state==="offline"?"Çevrimdışı":"Oyuncu bilgisi bekleniyor";
  const roster=$("#rosterList");roster.replaceChildren();
  $("#rosterCount").textContent=valid?(data.countApproximate?"~":"")+data.players+" / "+data.maxPlayers+" ONLINE":"OYUNCU BİLGİSİ BEKLENİYOR";
  const updateEl=$("#statusLastChecked");
  if(updateEl){
    const date=Number.isFinite(data.checkedAt)?new Date(data.checkedAt):null;
    const time=date&&!Number.isNaN(date.getTime())?date.toLocaleTimeString("tr-TR",{timeZone:"Europe/Istanbul",hour:"2-digit",minute:"2-digit"}):"—";
    updateEl.textContent=(data.countApproximate?"⚠ Gecikmeli MTA ana listesi verisi":"● Doğrudan MTA sorgusu")+" • Son kontrol: "+time+" (TR) • Yaklaşık 5 dk aralıklarla yenilenir.";
  }
  if(!valid){roster.append(Object.assign(document.createElement("span"),{textContent:"Canlı oyuncu bilgisi şu an alınamıyor."}));return}
  if(!data.playerNamesAvailable){
    roster.append(Object.assign(document.createElement("span"),{textContent:"Oyuncu isimlerini görüntülemek için barut_website_bridge MTA kaynağının sunucuya yüklenmesi gerekiyor. Oyuncu sayısı yine de canlı olarak güncellenir."}));
    return;
  }
  if(!data.playerNames.length){roster.append(Object.assign(document.createElement("span"),{textContent:"İsim listesi şu anda boş."}));return}
  for(const name of data.playerNames){
    const item=document.createElement("div");item.className="player-roster__player";
    const avatar=document.createElement("span");avatar.className="player-roster__avatar";avatar.textContent="●";
    const text=document.createElement("span");text.textContent=name;item.append(avatar,text);roster.append(item);
  }
}
async function loadStatus(){
  if(!cfg.statusApiUrl)return;
  try{
    const u=new URL(cfg.statusApiUrl,document.baseURI);
    u.searchParams.set("_",Date.now().toString());
    const res=await fetch(u.toString(),{cache:"no-store"});
    if(!res.ok)throw Error("HTTP");
    const data=await res.json();
    const ts=Date.parse(data.checkedAt||"");
    if(!Number.isFinite(ts)||Math.abs(Date.now()-ts)>35*60000)throw Error("stale");
    const names=Array.isArray(data.playerNames)?data.playerNames.filter(x=>typeof x==="string"&&x.length>0&&x.length<=64).slice(0,100):[];
    const okNames=data.playerNamesAvailable===true&&Array.isArray(data.playerNames);
    const info={players:data.players,maxPlayers:data.maxPlayers,playerNames:names,playerNamesAvailable:okNames,countApproximate:data.countApproximate===true,checkedAt:ts};
    if(data.online===true&&Number.isInteger(data.players)&&Number.isInteger(data.maxPlayers))
      updateStatus({state:"online",...info});
    else if(data.online===false)updateStatus({state:"offline",...info});
    else updateStatus({state:"unknown"});
  }catch{updateStatus({state:"error"})}
}
const ISSUES_BASE="https://github.com/ecerci555-spec/barut-gaming-freeroam/issues";
const ISSUES_API="https://api.github.com/repos/ecerci555-spec/barut-gaming-freeroam/issues?state=all&per_page=80";

function submitFeedback(e){
  e.preventDefault();
  const form=e.currentTarget;if(!form.reportValidity())return;
  const data=new FormData(form);
  const txt=key=>String(data.get(key)||"").trim();
  const subject=txt("subject"),details=txt("details");
  if(subject.length<3||details.length<10){toast(lang==="tr"?"Lütfen daha ayrıntılı açıkla.":"Please add more details.");return}
  const report=form.dataset.kind==="report";
  const params=new URLSearchParams();
  params.set("template",report?"sikayet.yml":"script-onerisi.yml");
  params.set("title",(report?"[Şikayet] ":"[Script İsteği] ")+subject);
  for(const key of report?["nickname","accused","category","date","location","details"]:["nickname","category","subject","details","benefit"]){
    if(txt(key))params.set(key,txt(key));
  }
  // Native GitHub Issue Form accepts screenshots/videos in its upload field. A static Pages site cannot upload files to GitHub anonymously.
  window.location.assign(ISSUES_BASE+"/new?"+params.toString());
}
async function loadSuggestions(){
  const el=$("#ideasList");if(!el)return;
  try{
    const res=await fetch(ISSUES_API,{headers:{Accept:"application/vnd.github+json"}});
    if(!res.ok)throw Error("GitHub API");
    const issues=(await res.json()).filter(x=>!x.pull_request&&/^\[Script İsteği\]/i.test(x.title)).slice(0,10);
    el.replaceChildren();
    if(!issues.length){const p=document.createElement("p");p.className="ideas-feed__empty";p.textContent=tr("noIdeas");el.append(p);return}
    for(const issue of issues){
      const card=document.createElement("article");card.className="idea-card";
      const meta=document.createElement("div");meta.className="idea-card__meta";
      meta.textContent="#"+issue.number+" • "+(issue.state==="open"?"AKTİF":"KAPALI");
      const title=document.createElement("h4");title.textContent=issue.title.replace(/^\[Script İsteği\]\s*/i,"");
      const p=document.createElement("p");p.textContent=(issue.body||"").replace(/\*\*/g,"").slice(0,360);
      const footer=document.createElement("div");footer.className="idea-card__footer";
      const a=document.createElement("a");a.href=issue.html_url;a.target="_blank";a.rel="noopener noreferrer";
      const likes=Number(issue.reactions?.["+1"]||0);a.textContent=tr("like")+" • "+likes;
      const small=document.createElement("small");small.textContent=(issue.user?.login||"Oyuncu")+" • "+new Date(issue.created_at).toLocaleDateString(lang==="tr"?"tr-TR":"en-US");
      footer.append(a,small);card.append(meta,title,p,footer);el.append(card);
    }
  }catch{
    el.replaceChildren();const a=document.createElement("a");a.className="ideas-feed__empty";a.href=ISSUES_BASE;a.target="_blank";a.rel="noopener noreferrer";a.textContent=tr("ideaError")+" ↗";el.append(a);
  }
}
for(const id of ["reportForm","ideaForm"]){const form=document.getElementById(id);if(form)form.addEventListener("submit",submitFeedback)}

document.addEventListener('click',async e=>{const btn=e.target.closest('[data-action]');if(!btn)return;const act=btn.dataset.action;if(act==='join'){if(!address()){toast(tr('noticeIp'));$('#connect').scrollIntoView({behavior:'smooth'});return}window.location.href='mtasa://'+address()}else if(act==='discord'){if(!/^https:\/\//.test(cfg.discordUrl||'')){toast(tr('noticeDiscord'));return}window.open(cfg.discordUrl,'_blank','noopener,noreferrer')}else if(act==='copy'){if(!address()){toast(tr('noticeIp'));return}try{await navigator.clipboard.writeText(address());toast(tr('noticeCopied'))}catch{toast(tr('noticeCopyFail'))}}});
$('#language').addEventListener('change',e=>{lang=e.target.value;localStorage.setItem('barutLanguage',lang);draw()});$('#menuToggle').addEventListener('click',()=>{const nav=$('#mobileNav');nav.hidden=!nav.hidden;$('#menuToggle').setAttribute('aria-expanded',String(!nav.hidden))});document.querySelectorAll('#mobileNav a').forEach(a=>a.addEventListener('click',()=>$('#mobileNav').hidden=true));$('#backTop').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));$('#year').textContent=new Date().getFullYear();draw();loadStatus();loadSuggestions();if(cfg.statusApiUrl)setInterval(loadStatus,60000);
})();