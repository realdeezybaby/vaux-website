
const auditState={step:1,answers:{},revenueScore:12};
const steps=[...document.querySelectorAll('.audit-step')];
const nextBtn=document.getElementById('nextBtn');
const backBtn=document.getElementById('backBtn');
const fill=document.getElementById('progressFill');
const label=document.getElementById('stepLabel');

function showAuditStep(){
  steps.forEach(s=>s.classList.toggle('hidden',Number(s.dataset.step)!==auditState.step));
  fill.style.width=(auditState.step*20)+'%';
  label.textContent='Step '+auditState.step+' of 5';
  backBtn.classList.toggle('hidden',auditState.step===1);
  nextBtn.textContent=auditState.step===5?'See my results':'Continue';
}
document.querySelectorAll('.audit-choices button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    btn.closest('.audit-choices').querySelectorAll('button').forEach(b=>b.classList.remove('selected'));
    btn.classList.add('selected');
    auditState.answers['step'+auditState.step]=btn.dataset.value;
    if(btn.dataset.score) auditState.revenueScore=Number(btn.dataset.score);
  });
});
nextBtn.addEventListener('click',()=>{
  if(auditState.step<5){auditState.step++;showAuditStep();return;}
  document.getElementById('auditBody').classList.add('hidden');
  document.getElementById('auditNav').classList.add('hidden');
  const loading=document.getElementById('auditLoading');
  loading.classList.remove('hidden');label.textContent='Analyzing';
  const messages=['Reviewing your answers...','Identifying growth gaps...','Matching the right VAUX system...'];
  let i=0; const timer=setInterval(()=>{i++;if(i<messages.length)document.getElementById('loadingText').textContent=messages[i];},650);
  setTimeout(()=>{clearInterval(timer);renderAuditResult();},2200);
});
backBtn.addEventListener('click',()=>{if(auditState.step>1){auditState.step--;showAuditStep();}});
function renderAuditResult(){
  const selected=[...document.querySelectorAll('.audit-checks input:checked')];
  let score=40+auditState.revenueScore+Math.min(selected.length*4,20);
  if(auditState.answers.step2==='No system')score-=8;
  if(auditState.answers.step2==='Ads not converting')score-=5;
  score=Math.max(42,Math.min(91,score));
  let pkg='Lead Engine',reason='Best for creating a dependable flow of qualified leads.';
  if(score>=62){pkg='Growth System';reason='Best for connecting content, advertising, and conversion tracking.';}
  if(score>=80){pkg='Full Domination';reason='Best for an established company ready for full-service growth support.';}
  document.getElementById('scoreValue').textContent=score;
  document.getElementById('scoreRing').style.background=`conic-gradient(var(--gold) ${score*3.6}deg,#292d30 0deg)`;
  document.getElementById('packageName').textContent=pkg;
  document.getElementById('packageReason').textContent=reason;
  document.getElementById('strengthText').textContent=score>=75?'Your business appears established enough to support more aggressive growth.':'You have a workable foundation and a clear opportunity to organize your marketing.';
  document.getElementById('opportunityText').textContent=auditState.answers.step2||'Build a more consistent customer-acquisition system.';
  document.getElementById('resultHeadline').textContent=score>=80?'Ready to scale with structure.':score>=62?'Strong foundation. Missing a connected system.':'High potential. Core systems need attention.';
  document.getElementById('auditLoading').classList.add('hidden');
  document.getElementById('auditResult').classList.remove('hidden');label.textContent='Audit complete';
}
document.getElementById('restartBtn').addEventListener('click',()=>location.reload());
showAuditStep();
