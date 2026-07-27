
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
const menu=document.querySelector('.menu-button');
const mobile=document.querySelector('.mobile-nav');
menu?.addEventListener('click',()=>{
  const open=mobile.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(open));
});
