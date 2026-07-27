
const state={step:1,answers:{},revenueScore:12};
const questions=[...document.querySelectorAll('.question')];
const dots=[...document.querySelectorAll('.audit-dots i')];
const next=document.getElementById('auditNext');
const back=document.getElementById('auditBack');
const progress=document.getElementById('auditProgress');
const status=document.getElementById('auditStatus');

function renderStep(){
  questions.forEach(q=>q.classList.toggle('active',Number(q.dataset.step)===state.step));
  dots.forEach((d,i)=>d.classList.toggle('active',i<state.step));
  progress.style.width=`${state.step*20}%`;
  status.textContent=`Step ${state.step} of 5`;
  back.classList.toggle('hidden',state.step===1);
  next.textContent=state.step===5?'See my score →':'Next question →';
}
document.querySelectorAll('.choices button').forEach(button=>{
  button.addEventListener('click',()=>{
    button.parentElement.querySelectorAll('button').forEach(b=>b.classList.remove('selected'));
    button.classList.add('selected');
    state.answers[`step${state.step}`]=button.dataset.value;
    if(button.dataset.score)state.revenueScore=Number(button.dataset.score);
  });
});
next.addEventListener('click',()=>{
  if(state.step<5){state.step++;renderStep();return;}
  document.getElementById('auditQuestions').classList.add('hidden');
  document.getElementById('auditControls').classList.add('hidden');
  document.getElementById('auditLoading').classList.remove('hidden');
  status.textContent='Analyzing';
  const messages=['Reviewing your answers…','Identifying growth gaps…','Matching the right VAUX system…'];
  let i=0;
  const timer=setInterval(()=>{i++;if(i<messages.length)document.getElementById('loadingMessage').textContent=messages[i]},700);
  setTimeout(()=>{clearInterval(timer);showResult()},2400);
});
back.addEventListener('click',()=>{if(state.step>1){state.step--;renderStep()}});
function showResult(){
  const active=[...document.querySelectorAll('.checks input:checked')].length;
  let score=42+state.revenueScore+active*4;
  if(state.answers.step2==='No system')score-=7;
  if(state.answers.step2==='Low conversion')score-=4;
  score=Math.max(44,Math.min(92,score));
  let recommendation='Lead Engine';
  if(score>=63)recommendation='Growth System';
  if(score>=82)recommendation='Full Domination';
  document.getElementById('scoreNumber').textContent=score;
  document.getElementById('scoreRing').style.background=`conic-gradient(var(--gold) ${score*3.6}deg,#25292c 0)`;
  document.getElementById('recommendation').textContent=recommendation;
  document.getElementById('scoreHeadline').innerHTML=score>=82?'Ready to scale.<br><em>Build the machine.</em>':score>=63?'Strong foundation.<br><em>Big opportunities.</em>':'High potential.<br><em>Core systems first.</em>';
  const bottleneck=state.answers.step2||'Marketing consistency';
  document.getElementById('oppOne').textContent=bottleneck;
  document.getElementById('oppTwo').textContent=active<3?'Connect more of the customer journey':'Improve conversion efficiency';
  document.getElementById('oppThree').textContent='Tie marketing activity to revenue';
  document.getElementById('auditLoading').classList.add('hidden');
  document.getElementById('auditResult').classList.remove('hidden');
  status.textContent='Audit complete';
}
document.getElementById('auditRestart').addEventListener('click',()=>location.reload());
renderStep();
