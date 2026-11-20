(()=>{
"use strict";
// This GitHub Pages site does not have an account database or a password backend.
// Never collect/store login passwords in the client. Use GitHub's real auth only
// for the existing public Issues-based report/feature suggestion workflow.
const dialog=document.getElementById("accountDialog");
const title=document.getElementById("accountDialogTitle");
const description=document.getElementById("accountDialogDescription");
const link=document.getElementById("accountGithubAction");
const langSelector=document.getElementById("language");
if(!dialog||!title||!description||!link)return;
let selected="signup";
const labels={
 tr:{register:"KAYIT OL",login:"GİRİŞ YAP",accountEyebrow:"BARUT GAMING / HESAP",signupTitle:"KAYIT <em>OL.</em>",loginTitle:"GİRİŞ <em>YAP.</em>",accountNotice:"Barut Gaming web sitesinde bağımsız oyuncu hesabı henüz aktif değil. Şimdilik şikâyet ve script önerileri için ücretsiz GitHub hesabıyla giriş yapabilirsin.",gameAccountNotice:"GitHub hesabın MTA:SA oyun hesabından farklıdır. Oyun şifreni burada paylaşma.",signupAction:"GITHUB'DA KAYIT OL ↗",loginAction:"GITHUB İLE GİRİŞ YAP ↗",close:"KAPAT",accountLinks:"HESAP İŞLEMLERİ",completed:"GITHUB İŞLEMİNİ TAMAMLADIM",completionNotice:"Bu düğme yalnızca site menüsünü kişiselleştirir ve Kayıt Ol / Giriş Yap butonlarını gizler. GitHub girişinin tamamlandığını doğrulamaz."},
 en:{register:"REGISTER",login:"SIGN IN",accountEyebrow:"BARUT GAMING / ACCOUNT",signupTitle:"REGISTER <em>NOW.</em>",loginTitle:"SIGN <em>IN.</em>",accountNotice:"A separate Barut Gaming web account system is not yet active. For now, you can sign into GitHub to submit reports and script requests.",gameAccountNotice:"Your GitHub account is separate from your MTA:SA game account. Never share your game password here.",signupAction:"REGISTER ON GITHUB ↗",loginAction:"SIGN IN WITH GITHUB ↗",close:"CLOSE",accountLinks:"ACCOUNT OPTIONS",completed:"I FINISHED ON GITHUB",completionNotice:"This only hides the register/sign-in buttons on this site. It does not verify that you are signed in to GitHub."},
 ru:{register:"РЕГИСТРАЦИЯ",login:"ВОЙТИ",accountEyebrow:"BARUT GAMING / АККАУНТ",signupTitle:"РЕГИСТРАЦИЯ",loginTitle:"ВОЙТИ <em>В АККАУНТ.</em>",accountNotice:"Отдельная система аккаунтов Barut Gaming ещё не активна. Пока жалобы и идеи скриптов можно отправлять с аккаунтом GitHub.",gameAccountNotice:"Аккаунт GitHub не связан с игровым аккаунтом MTA:SA. Не указывайте игровой пароль.",signupAction:"РЕГИСТРАЦИЯ GITHUB ↗",loginAction:"ВОЙТИ ЧЕРЕЗ GITHUB ↗",close:"ЗАКРЫТЬ",accountLinks:"АККАУНТ",completed:"Я ЗАВЕРШИЛ ДЕЙСТВИЕ НА GITHUB",completionNotice:"Это только скрывает кнопки регистрации и входа на сайте, но не проверяет вход в GitHub."},
 pt:{register:"CADASTRAR",login:"ENTRAR",accountEyebrow:"BARUT GAMING / CONTA",signupTitle:"CADASTRE-<em>SE.</em>",loginTitle:"ENTRAR <em>AGORA.</em>",accountNotice:"O sistema de contas do Barut Gaming ainda não está ativo. Por enquanto, use uma conta gratuita do GitHub para enviar denúncias e pedidos de scripts.",gameAccountNotice:"Sua conta do GitHub é diferente da conta no MTA:SA. Não compartilhe sua senha do jogo.",signupAction:"CADASTRAR NO GITHUB ↗",loginAction:"ENTRAR COM GITHUB ↗",close:"FECHAR",accountLinks:"OPÇÕES DE CONTA",completed:"CONCLUÍ NO GITHUB",completionNotice:"Isso apenas oculta os botões de cadastro e login no site. Não verifica sua sessão do GitHub."}
};
const urlLogin="https://github.com/login?return_to=%2Fecerci555-spec%2Fbarut-gaming-freeroam%2Fissues";
const urlSignup="https://github.com/signup";
const UI_PREFERENCE="barut-ui-hide-account-buttons-v1";
// This is strictly a cosmetic preference. We never infer or claim that
// a GitHub login is verified, and we never store passwords or auth tokens.
function readPreference(){
 try{return window.localStorage.getItem(UI_PREFERENCE)==="yes"}catch{return false}
}
function writePreference(on){
 try{
  if(on)window.localStorage.setItem(UI_PREFERENCE,"yes");
  else window.localStorage.removeItem(UI_PREFERENCE);
 }catch{}
}
let hideAccountActions=readPreference();
function renderAuthActions(){
 document.querySelectorAll(".header-auth,.mobile-auth").forEach(el=>{el.hidden=hideAccountActions});
 document.querySelectorAll("[data-account-manage]").forEach(el=>{el.hidden=!hideAccountActions});
}

function dict(){return labels[langSelector?.value]||labels.tr}
function render(){
 const t=dict();
 document.querySelectorAll("[data-account-i18n]").forEach(el=>{
   const val=t[el.getAttribute("data-account-i18n")];
   if(val)el.textContent=val;
 });
 title.innerHTML=selected==="signup"?t.signupTitle:t.loginTitle;
 description.textContent=t.accountNotice;
 link.href=selected==="signup"?urlSignup:urlLogin;
 link.textContent=selected==="signup"?t.signupAction:t.loginAction;
}
document.querySelectorAll("[data-account-open]").forEach(btn=>{
  btn.setAttribute("aria-haspopup","dialog");
  btn.setAttribute("aria-controls","accountDialog");
  btn.addEventListener("click",()=>{
    selected=btn.getAttribute("data-account-open")==="login"?"login":"signup";
    render();
    if(typeof dialog.showModal==="function"){if(!dialog.open)dialog.showModal()}
    else dialog.setAttribute("open","");
    // The mobile menu should not obscure the account dialog.
    const mobile=document.getElementById("mobileNav");
    if(mobile)mobile.hidden=true;
  });
});
document.querySelectorAll("[data-account-close]").forEach(btn=>btn.addEventListener("click",()=>{
 if(typeof dialog.close==="function")dialog.close();else dialog.removeAttribute("open");
}));
dialog.addEventListener("click",event=>{
 if(event.target===dialog&&typeof dialog.close==="function")dialog.close();
});
document.querySelectorAll("[data-account-complete]").forEach(btn=>btn.addEventListener("click",()=>{
 // User explicitly confirms that they finished their EXTERNAL GitHub step.
 // This is not an authentication signal and must not unlock protected pages.
 hideAccountActions=true;
 writePreference(true);
 renderAuthActions();
 if(typeof dialog.close==="function")dialog.close();
 else dialog.removeAttribute("open");
}));
document.querySelectorAll("[data-account-manage]").forEach(btn=>btn.addEventListener("click",()=>{
 hideAccountActions=false;
 writePreference(false);
 renderAuthActions();
}));
window.addEventListener("storage",event=>{
 if(event.key===UI_PREFERENCE){
  hideAccountActions=event.newValue==="yes";
  renderAuthActions();
 }
});
if(langSelector)langSelector.addEventListener("change",render);
renderAuthActions();
render();
})();
