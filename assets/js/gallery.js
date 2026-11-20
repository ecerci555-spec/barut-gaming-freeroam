(()=>{"use strict";
const root="https://raw.githubusercontent.com/ecerci555-spec/barut-gaming-freeroam/main/assets/gallery/";
const data=[
{file:"panels/f1-panel.webp",category:"panels",label:"F1 • FREEROAM",title:"F1 Genel Kontrol Paneli",desc:"Freeroam, karakter, animasyon ve ayarlar menüsü"},
{file:"panels/f2-market.webp",category:"panels",label:"F2 • MARKET",title:"F2 Market ve Silahlar",desc:"Oyun içi market ve özel silah arayüzü"},
{file:"panels/f3-klan.webp",category:"panels",label:"F3 • KLAN",title:"F3 Klan Yönetimi",desc:"Klan sistemi, sıralama ve liderler"},
{file:"cj/cj-siyah-arka.webp",category:"cj",label:"CJ • SİYAH",title:"Siyah Barut Kombini",desc:"Siyah Barut Gaming kıyafeti – arka görünüş"},
{file:"cj/cj-siyah-on.webp",category:"cj",label:"CJ • SİYAH",title:"Siyah Barut Kombini",desc:"Siyah Barut Gaming kıyafeti – ön görünüş"},
{file:"cj/cj-beyaz-arka.webp",category:"cj",label:"CJ • BEYAZ",title:"Beyaz Barut Kombini",desc:"Beyaz Barut Gaming kıyafeti – arka görünüş"},
{file:"cj/cj-beyaz-on.webp",category:"cj",label:"CJ • BEYAZ",title:"Beyaz Barut Kombini",desc:"Beyaz Barut Gaming kıyafeti – ön görünüş"},
{file:"vehicles/barut-motor-1.webp",category:"vehicles",label:"ARAÇLAR",title:"Barut Motosiklet – Sürüş",desc:"Özel tasarım motosiklet, oyun içi görünüm"},
{file:"vehicles/barut-motor-2.webp",category:"vehicles",label:"ARAÇLAR",title:"Barut Motosiklet – Yandan",desc:"Turuncu-siyah motosiklet detayları"},
{file:"vehicles/barut-motor-3.webp",category:"vehicles",label:"ARAÇLAR",title:"Barut Motosiklet – Önden",desc:"Motosikletin ön far ve sürüş görüntüsü"}
];
const gallery=document.getElementById("galeri");
const grid=document.getElementById("galleryGrid");
const modal=document.getElementById("galleryLightbox");
if(!gallery||!grid||!modal)return;
let active="all",available=false;
const make=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e;};
function openPhoto(item){
 const img=document.getElementById("galleryLightboxImg");
 img.src=root+item.file;img.alt=item.title+" – Barut Gaming MTA:SA oyun ekran görüntüsü";
 document.getElementById("galleryLightboxTitle").textContent=item.title;
 document.getElementById("galleryLightboxCategory").textContent=item.label;
 if(typeof modal.showModal==="function")modal.showModal();
}
function draw(){
 grid.replaceChildren();
 const list=data.filter(item=>active==="all"||item.category===active);
 list.forEach((item,index)=>{
   const card=make("button","gallery-card");
   card.type="button";card.setAttribute("aria-label",item.title+" fotoğrafını büyüt");
   const frame=make("span","gallery-card__photo");
   const img=make("img");img.src=root+item.file;img.loading=index<3?"eager":"lazy";img.decoding="async";img.alt=item.title+" – oyun içi ekran görüntüsü";frame.append(img);
   frame.append(make("span","gallery-card__zoom","↗"));
   const body=make("span","gallery-card__info"),label=make("span","gallery-card__tag",item.label),title=make("strong",null,item.title),desc=make("span","gallery-card__desc",item.desc);
   body.append(label,title,desc);card.append(frame,body);card.addEventListener("click",()=>openPhoto(item));grid.append(card);
 });
}
document.querySelectorAll("[data-gallery-filter]").forEach(btn=>btn.addEventListener("click",()=>{
 active=btn.dataset.galleryFilter;
 document.querySelectorAll("[data-gallery-filter]").forEach(b=>{const a=b===btn;b.classList.toggle("active",a);b.setAttribute("aria-pressed",String(a))});
 draw();
}));
document.querySelectorAll("[data-gallery-close]").forEach(btn=>btn.addEventListener("click",()=>modal.close()));
modal.addEventListener("click",e=>{if(e.target===modal)modal.close()});
function reveal(){if(available)return;available=true;gallery.hidden=false;document.querySelectorAll("[data-gallery-nav]").forEach(el=>el.hidden=false);draw()}
const tester=new Image();
tester.onload=()=>reveal();
tester.onerror=()=>{ /* gallery stays hidden until owner uploads screenshots */ };
tester.src=root+data[0].file;
})();