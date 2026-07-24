
lucide.createIcons();
const menu = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
document.getElementById('year').textContent = new Date().getFullYear();

const modal = document.querySelector('.video-modal');
const frame = document.querySelector('.video-frame');
const fallback = frame?.innerHTML || '';
function closeModal(){
  modal?.classList.remove('open');
  if(modal) modal.setAttribute('aria-hidden','true');
  if(frame) frame.innerHTML = fallback;
}
document.querySelectorAll('.video-card').forEach(card => {
  card.querySelector('.play-btn')?.addEventListener('click', () => {
    const url = (card.dataset.video || '').trim();
    if(url){
      frame.innerHTML = url.endsWith('.mp4')
        ? `<video src="${url}" controls autoplay playsinline></video>`
        : `<iframe src="${url}" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
  });
});
document.querySelector('.video-close')?.addEventListener('click', closeModal);
modal?.addEventListener('click', e => { if(e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });
