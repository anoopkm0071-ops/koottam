/* Koottam shared runtime: helpers, forms, menu, confetti and the vazha challenge.
   Every page loads config.js, then this file, then its own script. */
window.K=(()=>{
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const store={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};
const fmt=n=>n.toLocaleString('en-IN');
const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const wait=ms=>new Promise(r=>setTimeout(r,reduce?0:ms));
const safe=u=>/^https:\/\//.test(u||'')?u:'';
const EMAIL_RE=/^\S+@\S+\.\S+$/;
const isPhone=t=>/^(\+?91)?[6-9]\d{9}$/.test(String(t).replace(/[\s-]+/g,''));
const CONFIG=Object.assign({API_URL:'',SITE_URL:'',GROUP_LINKS:{},DOMAIN_LINKS:{},DEFAULT_LINK:'',FOUNDER:{},INSTAGRAM:'',GOATCOUNTER:''},window.KOOTTAM_CONFIG||{});
const siteUrl=()=>CONFIG.SITE_URL||location.href.split(/[?#]/)[0].replace(/[^/]*$/,'');
const DOMAIN_LIST=[['it','IT & Software'],['mkt','Marketing'],['sales','Sales'],['founder',"Founder's Office"],['health','Nursing & Healthcare'],['bank','Banking & Finance'],['gulf','Gulf & Abroad'],['edu','Teaching'],['eng','Engineering & Construction'],['hosp','Hospitality & Tourism'],['govt','PSC & Government'],['creative','Design & Creative']];

// analytics (optional)
if(/^[a-z0-9-]+$/.test(CONFIG.GOATCOUNTER)){const g=document.createElement('script');g.async=true;g.src='https://gc.zgo.at/count.js';g.dataset.goatcounter=`https://${CONFIG.GOATCOUNTER}.goatcounter.com/count`;document.head.appendChild(g)}
// remember who invited this visitor, whichever page they land on
const qref=new URLSearchParams(location.search).get('ref');
if(/^\d{1,7}$/.test(qref||'')&&!store.get('koottam_live',{}).memberNo)store.set('koottam_ref',qref);

async function copyText(t,btn,label){
  try{await navigator.clipboard.writeText(t)}catch{const ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();try{document.execCommand('copy')}catch{}ta.remove()}
  btn.textContent='Copied ✓';setTimeout(()=>btn.textContent=label,1800);
}

function burst(){
  if(reduce)return;
  let cv=$('#confetti');
  if(!cv){cv=document.createElement('canvas');cv.id='confetti';document.body.appendChild(cv)}
  const ctx=cv.getContext('2d');cv.width=innerWidth;cv.height=innerHeight;
  const cols=['#e8202a','#ffd60a','#0d0d0d','#ffffff'];
  const ps=Array.from({length:160},()=>({x:innerWidth/2,y:innerHeight*.6,vx:(Math.random()-.5)*18,vy:-Math.random()*17-4,s:5+Math.random()*7,c:cols[Math.random()*4|0],r:Math.random()*6}));
  let f=0;(function tick(){
    ctx.clearRect(0,0,cv.width,cv.height);
    ps.forEach(p=>{p.vy+=.38;p.x+=p.vx;p.y+=p.vy;p.r+=.2;ctx.fillStyle=p.c;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6);ctx.restore()});
    if(++f<130)requestAnimationFrame(tick);else ctx.clearRect(0,0,cv.width,cv.height);
  })();
}

function initReveal(){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.08});
  $$('.rv').forEach(el=>io.observe(el));
}

function initMenu(){
  const burger=$('#burger'),links=$('#links');if(!burger||!links)return;
  burger.addEventListener('click',()=>burger.setAttribute('aria-expanded',links.classList.toggle('open')));
  links.addEventListener('click',e=>{if(e.target.closest('a')){links.classList.remove('open');burger.setAttribute('aria-expanded','false')}});
}

function initFooter(){
  const fl=$('#flinks');
  if(fl&&safe(CONFIG.INSTAGRAM))fl.insertAdjacentHTML('beforeend',`<a href="${esc(CONFIG.INSTAGRAM)}" target="_blank" rel="noopener">Instagram</a>`);
}

// live member count for pages that only show the number
async function loadCount(){
  if(!CONFIG.API_URL)return;
  try{const j=await (await fetch(CONFIG.API_URL+'?stats=1')).json();if(typeof j.members==='number')$$('[data-c="members"]').forEach(el=>el.textContent=fmt(j.members))}catch{}
}

// hiring, stories and scam-report forms
const OKMSG={job:"✓ Got it! We'll check your post and share it in the right group.",story:"✓ Thank you! Your story will appear here once we've checked it.",scam:'✓ Report received. Thank you for protecting other Mallus.'};
function initForms(){
  $$('select[data-domains]').forEach(x=>x.innerHTML='<option value="">Choose…</option>'+DOMAIN_LIST.map(([id,n])=>`<option value="${id}">${n}</option>`).join('')+'<option value="other">Other</option>');
  $$('form.form').forEach(f=>f.addEventListener('submit',async e=>{
    e.preventDefault();
    const msg=f.querySelector('.fmsg'),btn=f.querySelector('button[type=submit]'),bad=t=>{msg.className='fmsg err';msg.textContent=t};
    for(const el of f.querySelectorAll('[required]'))if(el.type==='checkbox'?!el.checked:!el.value.trim()){bad('Please fill in: '+el.dataset.n);el.focus();return}
    const data=Object.fromEntries(new FormData(f));
    if(data.contact&&!(isPhone(data.contact)||EMAIL_RE.test(data.contact.trim())))return bad('Enter a valid 10-digit mobile number or email.');
    if(data.link&&!safe(data.link.trim()))return bad('Links must start with https://');
    if(!CONFIG.API_URL)return bad('Submissions open as soon as our sheet is connected. Please check back soon.');
    btn.disabled=true;msg.className='fmsg';msg.textContent='Sending…';
    try{
      const j=await (await fetch(CONFIG.API_URL,{method:'POST',body:JSON.stringify({type:f.dataset.type,...data})})).json();
      if(!j.ok)throw 0;
      f.reset();msg.className='fmsg';msg.textContent=OKMSG[f.dataset.type];
    }catch{bad('Something went wrong. Please try again.')}
    btn.disabled=false;
  }));
}

// the vazha challenge: tap the banana tree five times, then share the challenge
function initVazha(getMemberNo=()=>null){
  const vst=$('#vstage');if(!vst)return;
  const vtop=$('#vtop'),notch=$('#notch'),vaxe=$('#vaxe'),VCUTS=5;let cuts=0,shareData=null;
  function setShare(done){
    const no=getMemberNo(),url=siteUrl()+'vazha.html'+(no?`?ref=${no}`:''),enc=encodeURIComponent;
    const text=done?'I just cut my vazha 🪓 Not a vazha anymore. Your turn:':'They called us vazha. Can you cut yours? 🪓';
    const H={wa:`https://wa.me/?text=${enc(text+' '+url)}`,fb:`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
      x:`https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(url)}&hashtags=NotAVazhaAnymore`,tg:`https://t.me/share/url?url=${enc(url)}&text=${enc(text)}`};
    $$('#vsharebar [data-net]').forEach(a=>{if(H[a.dataset.net])a.href=H[a.dataset.net]});
    $('#vlink').textContent=url;
    $('#vshareh').textContent=done?'Now challenge your friends 🪓':'Challenge your friends 🪓';
    shareData={title:'The vazha challenge · Koottam',text,url};
  }
  const nat=$('#vsharebar [data-net="native"]');
  if(nat&&navigator.share){nat.hidden=false;nat.addEventListener('click',()=>navigator.share(shareData).catch(()=>{}))}
  $('#vcopy').addEventListener('click',e=>copyText($('#vlink').textContent,e.currentTarget,'Copy link'));
  function chips(depth){
    if(reduce)return;
    const r=vst.getBoundingClientRect(),x=(170+depth)/400*r.width,y=316/480*r.height;
    for(let i=0;i<10;i++){
      const c=document.createElement('i');c.className='chipw';c.style.left=x+'px';c.style.top=y+'px';vst.appendChild(c);
      const dx=-(25+Math.random()*90),dy=-(10+Math.random()*80),rot=(Math.random()-.5)*540;
      c.animate([{transform:'translate(0,0) rotate(0)',opacity:1},{transform:`translate(${dx}px,${dy+60}px) rotate(${rot}deg)`,opacity:0}],{duration:650+Math.random()*250,easing:'cubic-bezier(.2,.7,.4,1)'}).onfinish=()=>c.remove();
    }
  }
  function cut(){
    if(cuts>=VCUTS)return;
    cuts++;const d=cuts/VCUTS*58;
    notch.setAttribute('points',`170,${316-cuts*3} ${170+d},316 170,${316+cuts*3}`);
    vaxe.classList.remove('swing');void vaxe.getBoundingClientRect();vaxe.classList.add('swing');
    vtop.classList.remove('hit');void vtop.getBoundingClientRect();vtop.classList.add('hit');
    chips(d);try{navigator.vibrate&&navigator.vibrate(cuts<VCUTS?25:[40,60,80])}catch{}
    $$('#vdots i').forEach((x,i)=>x.classList.toggle('on',i<cuts));
    $('#vstatus').textContent=cuts<VCUTS?`${VCUTS-cuts} more ${VCUTS-cuts>1?'cuts':'cut'}…`:'Timber!';
    if(cuts===VCUTS)setTimeout(()=>{vtop.classList.remove('hit');vtop.classList.add('fallen');setTimeout(done,reduce?0:1150)},reduce?0:320);
  }
  function done(){
    $('#vstamp').hidden=false;vaxe.classList.add('gone');$('#vbefore').hidden=true;$('#vafter').hidden=false;
    $('#vstatus').textContent='Not a vazha anymore ✊';setShare(true);burst();
  }
  function regrow(){
    cuts=0;vtop.classList.remove('fallen','hit');notch.setAttribute('points','170,316 170,316 170,316');
    $('#vstamp').hidden=true;vaxe.classList.remove('gone');$('#vbefore').hidden=false;$('#vafter').hidden=true;
    $$('#vdots i').forEach(x=>x.classList.remove('on'));$('#vstatus').textContent='Tap the tree. 5 cuts.';setShare(false);
  }
  vst.addEventListener('click',cut);
  $('#vagain').addEventListener('click',regrow);
  setShare(false);
}

return {$,$$,reduce,store,fmt,esc,wait,safe,EMAIL_RE,isPhone,CONFIG,siteUrl,copyText,burst,initReveal,initMenu,initFooter,initForms,initVazha,loadCount};
})();
