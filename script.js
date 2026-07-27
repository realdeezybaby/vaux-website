lucide.createIcons();document.getElementById("year").textContent=new Date().getFullYear();const b=document.querySelector(".menu"),n=document.querySelector(".mobile-header nav");b?.addEventListener("click",()=>n.classList.toggle("open"));
const globalMenu=document.querySelector('.global-header .menu');
const globalNav=document.querySelector('.global-nav');
globalMenu?.addEventListener('click',()=>{
  const open=globalNav.classList.toggle('open');
  globalMenu.setAttribute('aria-expanded',String(open));
});
