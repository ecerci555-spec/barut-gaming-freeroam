(()=>{
"use strict";
const ROOT="https://raw.githubusercontent.com/ecerci555-spec/barut-gaming-freeroam/main/data/weekly-videos.json";
const ISSUE_FORM="https://github.com/ecerci555-spec/barut-gaming-freeroam/issues/new";
const grid=document.getElementById("weeklyVideosGrid");
const state=document.getElementById("weeklyVideosState");
const form=document.getElementById("weeklyVideoForm");
const dialog=document.getElementById("weeklyVideoDialog");
const content=document.getElementById("weeklyVideoPlayer");
const sourceLink=document.getElementById("weeklyVideoSource");
const dialogTitle=document.getElementById("weeklyVideoDialogTitle");
const langSelect=document.getElementById("language");
if(!grid||!state||!form||!dialog||!content||!sourceLink)return;
const texts={
 tr:{submit:"VİDEO GÖNDER",loading:"Onaylı videolar yükleniyor...",empty:"Bu hafta henüz onaylanmış video yok. İlk oyun kaydını sen gönder!",error:"Video listesine şu anda ulaşılamıyor. Daha sonra tekrar deneyebilirsin.",player:"OYUNCU",watch:"VİDEOYU İZLE",source:"GİTHUB'DA AÇ ↗",sent:"Gönderiyi tamamlamak için açılan GitHub formuna video dosyanı eklemeli ve göndermelisin.",invalid:"Geçerli bir YouTube bağlantısı gir veya bağlantı alanını boş bırak; GitHub'da video dosyanı yükleyebilirsin.",count:n=>n+" ONAYLANMIŞ VİDEO"},
 en:{submit:"SEND VIDEO",loading:"Loading approved videos...",empty:"No approved videos yet this week. Submit the first gameplay clip!",error:"The weekly video feed is unavailable. Try again later.",player:"PLAYER",watch:"WATCH VIDEO",source:"VIEW ON GITHUB ↗",sent:"Complete your submission on GitHub by attaching the video file and submitting the form.",invalid:"Use a valid YouTube link or leave it empty and attach the video on GitHub.",count:n=>n+" APPROVED VIDEOS"},
 ru:{submit:"ОТПРАВИТЬ ВИДЕО",loading:"Загрузка видео...",empty:"На этой неделе пока нет одобренных видео.",error:"Список видео временно недоступен.",player:"ИГРОК",watch:"СМОТРЕТЬ",source:"ОТКРЫТЬ GITHUB ↗",sent:"Добавьте файл видео и отправьте заявку на GitHub.",invalid:"Укажите ссылку YouTube или загрузите файл на GitHub.",count:n=>n+" ОДОБРЕННЫХ ВИДЕО"},
 pt:{submit:"ENVIAR VÍDEO",loading:"Carregando vídeos aprovados...",empty:"Ainda não há vídeos aprovados nesta semana.",error:"A lista de vídeos está indisponível.",player:"JOGADOR",watch:"ASSISTIR",source:"VER NO GITHUB ↗",sent:"Finalize no GitHub adicionando o arquivo e enviando o formulário.",invalid:"Use um link válido do YouTube ou envie o arquivo pelo GitHub.",count:n=>n+" VÍDEOS APROVADOS"}
};
function locale(){return texts[langSelect?.value]||texts.tr}
function create(tag,cls,value){
 const el=document.createElement(tag);
 if(cls)el.className=cls;
 if(value!==undefined)el.textContent=value;
 return el;
}
function validVideoId(id){return typeof id==="string"&&/^[A-Za-z0-9_-]{11}$/.test(id)}
function validAssetUrl(url){
 if(typeof url!=="string")return false;
 try {
  const u=new URL(url);
  if(u.protocol!=="https:"||u.username||u.password)return false;
  const host=u.hostname.toLowerCase();
  return(host==="github.com"&&u.pathname.startsWith("/user-attachments/assets/"))||
   host==="user-images.githubusercontent.com"||host==="githubusercontent.com"||
   host.endsWith(".githubusercontent.com");
 }catch{return false}
}
function validIssueUrl(url){
 return typeof url==="string"&&/^https:\/\/github\.com\/ecerci555-spec\/barut-gaming-freeroam\/issues\/\d+$/.test(url);
}
function mondayIstanbul(){
 const current=new Intl.DateTimeFormat("en-GB",{
  timeZone:"Europe/Istanbul",year:"numeric",month:"2-digit",day:"2-digit"
 }).formatToParts(new Date());
 const o={};current.forEach(p=>o[p.type]=p.value);
 const d=new Date(Date.UTC(Number(o.year),Number(o.month)-1,Number(o.day)));
 d.setUTCDate(d.getUTCDate()-(d.getUTCDay()+6)%7);
 return d.toISOString().slice(0,10);
}
function dateText(iso){
 const d=new Date(iso);
 return isNaN(d.getTime())?"":new Intl.DateTimeFormat("tr-TR",{
  timeZone:"Europe/Istanbul",day:"2-digit",month:"short"
 }).format(d);
}
function closePlayer(){
 content.replaceChildren();
 if(typeof dialog.close==="function"&&dialog.open)dialog.close();
 else dialog.removeAttribute("open");
}
function playVideo(v){
 if(!validIssueUrl(v.pageUrl))return;
 content.replaceChildren();
 dialogTitle.textContent=v.title||"Barut Gaming";
 const item=locale();
 sourceLink.href=v.pageUrl;
 sourceLink.textContent=item.source;
 if(v.type==="youtube"&&validVideoId(v.youtubeId)){
  const frame=create("iframe","weekly-video__iframe");
  frame.src="https://www.youtube-nocookie.com/embed/"+v.youtubeId+"?rel=0";
  frame.title=v.title||"Barut Gaming video";
  frame.loading="lazy";
  frame.allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share";
  frame.allowFullscreen=true;
  frame.referrerPolicy="strict-origin-when-cross-origin";
  content.append(frame);
 } else if(v.type==="github"&&validAssetUrl(v.videoUrl)){
  const vid=create("video","weekly-video__native");
  vid.controls=true;vid.playsInline=true;vid.preload="metadata";
  vid.src=v.videoUrl;
  if(validAssetUrl(v.coverUrl))vid.poster=v.coverUrl;
  const fallback=create("p",null,"Video açılamazsa GitHub bağlantısını kullan.");
  content.append(vid,fallback);
 } else return;
 if(typeof dialog.showModal==="function")dialog.showModal();
 else dialog.setAttribute("open","");
}
function render(items){
 grid.replaceChildren();
 state.textContent=items.length?locale().count(items.length):locale().empty;
 for(const v of items){
  if(!validIssueUrl(v.pageUrl))continue;
  if(!(v.type==="youtube"&&validVideoId(v.youtubeId))&&!(v.type==="github"&&validAssetUrl(v.videoUrl)))continue;
  const card=create("article","weekly-video-card");
  const trigger=create("button","weekly-video-card__trigger");
  trigger.type="button";trigger.setAttribute("aria-label",(v.title||"Barut Gaming")+" — "+locale().watch);
  const thumb=create("span","weekly-video-card__thumb");
  const hasCover=validAssetUrl(v.coverUrl);
  if(v.type==="youtube"||hasCover){
   const img=create("img");
   img.src=hasCover?v.coverUrl:"https://i.ytimg.com/vi/"+v.youtubeId+"/hqdefault.jpg";
   img.loading="lazy";img.decoding="async";img.alt="";
   thumb.append(img);
  } else {
   thumb.append(create("span","weekly-video-card__logo","BARUT GAMING"));
  }
  thumb.append(create("span","weekly-video-card__play","▶"));
  trigger.append(thumb);
  const body=create("div","weekly-video-card__body");
  const meta=create("div","weekly-video-card__meta");
  meta.append(create("span",null,locale().player+" • "+(v.player||"Oyuncu").slice(0,45)),
   create("time",null,dateText(v.submittedAt)));
  const title=create("h3",null,(v.title||"Barut Gaming").slice(0,96));
  const desc=create("p",null,(v.description||"").slice(0,220));
  const watch=create("span","weekly-video-card__watch",locale().watch+"  ↗");
  body.append(meta,title,desc,watch);
  trigger.append(body);
  trigger.addEventListener("click",()=>playVideo(v));
  card.append(trigger);grid.append(card);
 }
 if(!grid.children.length)state.textContent=locale().empty;
}
let current=[];
async function loadWeekly(){
 try {
  const result=await fetch(ROOT+"?v="+Date.now(),{cache:"no-store"});
  if(!result.ok)throw new Error("HTTP "+result.status);
  const data=await result.json();
  if(!data||!Array.isArray(data.videos)||typeof data.weekStart!=="string")throw new Error("Bad feed");
  current=data.weekStart===mondayIstanbul()?data.videos:[];
  render(current);
 }catch{
  state.textContent=locale().error;
  grid.replaceChildren();
 }
}
function getYoutubeId(text){
 try {
  const url=new URL(text);
  const host=url.hostname.toLowerCase();
  if(host==="youtu.be"||host==="www.youtu.be")return url.pathname.split("/")[1];
  if(["youtube.com","www.youtube.com","m.youtube.com"].includes(host)){
   if(url.pathname==="/watch")return url.searchParams.get("v");
   const m=url.pathname.match(/^\/(?:live|shorts|embed)\/([A-Za-z0-9_-]{11})/);
   return m?.[1]||"";
  }
 }catch{}
 return "";
}
form.addEventListener("submit",event=>{
 event.preventDefault();
 if(!form.reportValidity())return;
 const nick=document.getElementById("weeklyNick").value.trim();
 const title=document.getElementById("weeklyTitleInput").value.trim();
 const details=document.getElementById("weeklyDescription").value.trim();
 const youtube=document.getElementById("weeklyYoutube").value.trim();
 if(youtube&&!validVideoId(getYoutubeId(youtube))){
  document.getElementById("weeklyVideoHelp").textContent=locale().invalid;
  return;
 }
 const args=new URLSearchParams();
 args.set("template","haftanin-videosu.yml");
 args.set("title","[Haftanın Videosu] "+title);
 args.set("player",nick);
 args.set("video-title",title);
 args.set("description",details);
 if(youtube)args.set("youtube",youtube);
 // File uploads cannot occur on a static site. GitHub's native form handles them.
 const target=ISSUE_FORM+"?"+args.toString();
 window.location.assign(target);
});
document.querySelectorAll("[data-weekly-close]").forEach(b=>b.addEventListener("click",closePlayer));
dialog.addEventListener("click",e=>{if(e.target===dialog)closePlayer()});
dialog.addEventListener("close",()=>content.replaceChildren());
if(langSelect)langSelect.addEventListener("change",()=>render(current));
loadWeekly();
setInterval(loadWeekly,300000);
})();
