(()=>{
"use strict";
const API="https://api.github.com/repos/ecerci555-spec/barut-gaming-freeroam/issues";
const OWNER="https://github.com/ecerci555-spec/barut-gaming-freeroam/issues";
const $=s=>document.querySelector(s);
let records=[],activeFilter="all",selected=null;
const e=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
const classify=x=>/^\[Şikayet\]/i.test(x.title)?"report":/^\[Script İsteği\]/i.test(x.title)?"idea":"other";
const likes=x=>Number(x.reactions?.["+1"]||0);
function updateTotals(){
 const rows=records.filter(x=>classify(x)!=="other");
 $("#total").textContent=rows.length;
 $("#openReports").textContent=rows.filter(x=>classify(x)==="report"&&x.state==="open").length;
 $("#ideaCount").textContent=rows.filter(x=>classify(x)==="idea").length;
 $("#likeCount").textContent=rows.reduce((n,x)=>n+likes(x),0);
 const map={nAll:rows.length,nReport:rows.filter(x=>classify(x)==="report").length,nIdea:rows.filter(x=>classify(x)==="idea").length,nOpen:rows.filter(x=>x.state==="open").length};
 for(const [id,num] of Object.entries(map))$("#"+id).textContent=num;
}
function matching(){
 const q=$("#query").value.toLocaleLowerCase("tr").trim(),state=$("#status").value;
 const filtered=records.filter(x=>{
  const k=classify(x);
  if(k==="other"||(activeFilter==="report"&&k!=="report")||(activeFilter==="idea"&&k!=="idea")||(activeFilter==="open"&&x.state!=="open"))return false;
  if(state!=="all"&&x.state!==state)return false;
  return !q||[x.title,x.body,x.user?.login].join(" ").toLocaleLowerCase("tr").includes(q);
 });
 const sort=$("#sort").value;
 return filtered.sort((a,b)=>sort==="popular"?likes(b)-likes(a):sort==="old"?new Date(a.created_at)-new Date(b.created_at):new Date(b.created_at)-new Date(a.created_at));
}
function paint(){
 const rows=matching();const container=$("#results");container.replaceChildren();
 $("#listHeading").textContent=activeFilter==="report"?"ŞİKÂYETLER":activeFilter==="idea"?"SCRIPT İSTEKLERİ":activeFilter==="open"?"AÇIK KAYITLAR":"TÜM BİLDİRİMLER";
 $("#listCount").textContent=rows.length+" kayıt gösteriliyor";
 if(!rows.length){container.append(e("p","empty","Bu filtre için kayıt bulunamadı."));return}
 for(const item of rows){
  const k=classify(item);
  const btn=e("button","record"+(selected===item.number?" selected":""),undefined);
  btn.type="button";btn.setAttribute("aria-label","Kayıt "+item.number+" ayrıntısını göster");
  const top=e("div","record-top"),pill=e("span","pill "+(k==="idea"?"idea":""),k==="report"?"ŞİKÂYET":"SCRIPT ÖNERİSİ"),status=e("span","pill "+(item.state==="closed"?"closed":""),item.state==="open"?"● AÇIK":"✓ KAPALI");
  top.append(pill,status);
  const h=e("h3",null,item.title.replace(/^\[[^\]]+\]\s*/,""));
  const p=e("p",null,(item.body||"Açıklama girilmedi").replace(/[*#>_\[\]<>]/g,"").slice(0,180));
  const bottom=e("div","record-bottom"),date=e("span",null,new Date(item.created_at).toLocaleString("tr-TR"));
  const vote=e("strong",null,"👍 "+likes(item)+"    #"+item.number);bottom.append(date,vote);btn.append(top,h,p,bottom);
  btn.addEventListener("click",()=>{selected=item.number;paint();paintDetail(item);});
  container.append(btn);
 }
}
function mediaLinks(markdown){
 const urls=[...String(markdown||"").matchAll(/https?:\/\/[^\s)<>]+/g)].map(m=>m[0]).filter((url)=>{try{const u=new URL(url);return u.protocol==="https:"&&(["github.com","user-images.githubusercontent.com","githubusercontent.com"].includes(u.hostname)||u.hostname.endsWith(".githubusercontent.com"))}catch{return false}});
 return [...new Set(urls)].slice(0,14);
}
function paintDetail(x){
 const target=$("#detailInner");target.replaceChildren();
 const h=e("h2",null,x.title),meta=e("div","meta","#"+x.number+" • "+(x.state==="open"?"Açık":"Kapatılmış")+" • "+(x.user?.login||"Bilinmiyor")+" • "+new Date(x.created_at).toLocaleString("tr-TR"));
 const body=e("div","body",x.body||"Açıklama bulunmuyor.");
 target.append(h,meta,body);
 const files=mediaLinks(x.body);
 if(files.length){
  const section=e("div","media");section.append(e("strong",null,"KANITLAR / DOSYALAR"));
  for(const url of files){
   const a=e("a",null,"Dosyayı görüntüle ↗");a.href=url;a.target="_blank";a.rel="noopener noreferrer";
   if(/\.(png|jpe?g|gif|webp|svg)(\?|$)/i.test(url)){const img=e("img");img.src=url;img.loading="lazy";img.alt="Yüklenen kanıt";section.append(img)}
   section.append(a);
  }target.append(section);
 }
 const actions=e("div","actions"),view=e("a","btn","Kaydı GitHub'da yönet ↗");
 view.href=x.html_url;view.target="_blank";view.rel="noopener noreferrer";
 const comment=e("a","btn btn-dark","Yorum / Durum düzenle ↗");
 comment.href=x.html_url+"#issuecomment-new";comment.target="_blank";comment.rel="noopener noreferrer";actions.append(view,comment);target.append(actions);
 const note=e("p","privacy","Durum değiştirme, silme, etiketleme ve yorum işlemleri yalnızca yetkili GitHub hesabıyla yapılabilir.");target.append(note);
}
async function fetchIssues(){
 $("#refresh").disabled=true;$("#updatedAt").textContent="GitHub kayıtları yükleniyor...";
 try{
  const all=[];for(let page=1;page<=4;page++){
   const response=await fetch(API+"?state=all&sort=created&direction=desc&per_page=100&page="+page,{cache:"no-store",headers:{Accept:"application/vnd.github+json"}});
   if(!response.ok)throw Error("GitHub HTTP "+response.status);
   const data=await response.json();all.push(...data.filter(x=>!x.pull_request));if(data.length<100)break;
  }
  records=all;
  updateTotals();paint();const keep=records.find(x=>x.number===selected);if(keep)paintDetail(keep);
  $("#updatedAt").textContent="Son kontrol: "+new Date().toLocaleTimeString("tr-TR");
 }catch(err){
  $("#updatedAt").textContent="Veriler alınamadı";
  const area=$("#results");area.replaceChildren();const msg=e("p","empty","GitHub kayıtları alınamadı. Sayfayı yenile veya GitHub Issues'a git: "+String(err.message));area.append(msg);
 }finally{$("#refresh").disabled=false}
}
document.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>{activeFilter=b.dataset.filter;document.querySelectorAll("[data-filter]").forEach(x=>x.classList.toggle("active",x===b));paint()}));
["query","status","sort"].forEach(id=>$("#"+id).addEventListener(id==="query"?"input":"change",paint));
$("#refresh").addEventListener("click",fetchIssues);fetchIssues();
})();