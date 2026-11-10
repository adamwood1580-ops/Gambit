(function(){'use strict';
  const cfg=window.GAMBIT||{};
  const tiers=[{name:'NO TIER',min:0,max:0,rate:0},{name:'STARTER',min:0.01,max:49.999999,rate:.05},{name:'BRONZE',min:50,max:99.999999,rate:.07},{name:'SILVER',min:100,max:499.999999,rate:.20},{name:'GOLD',min:500,max:999.999999,rate:.50},{name:'ANGEL',min:1000,max:1000,rate:.70}];
  const byId=id=>document.getElementById(id), fmt=n=>Number.isFinite(n)?new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(n):'—';
  function tierFor(amount){if(!Number.isFinite(amount)||amount<=0)return tiers[0];const safe=Math.min(1000,amount);if(safe>=1000)return tiers[5];if(safe>=500)return tiers[4];if(safe>=100)return tiers[3];if(safe>=50)return tiers[2];return tiers[1];}
  function calculate(amount,net){const invested=Math.max(0,Math.min(1000,Number(amount)||0));const profit=Number.isFinite(Number(net))?Number(net):0;const tier=tierFor(invested);const bonus=Math.max(0,profit)*tier.rate;return{invested,profit,tier,bonus,total:profit+bonus,tokens:invested/(Number(cfg.presaleUsdPrice)||.0001)};}
  function update(){const input=byId('invest-input'),profitInput=byId('profit-input');if(!input||!profitInput)return;const a=Number(input.value),p=Number(profitInput.value),result=calculate(a,p);
    byId('sim-tier').textContent=result.tier.name+' · '+Math.round(result.tier.rate*100)+'%';
    byId('sim-bonus').textContent=fmt(result.bonus)+' GAM';byId('sim-total').textContent=(result.total>0?'+':'')+fmt(result.total)+' GAM';byId('sim-tokens').textContent=fmt(result.tokens)+' GAM';
    const note=byId('sim-note');note.textContent=result.profit<=0?'No positive-profit bonus is due when a day finishes at or below break-even.':`The ${fmt(result.profit)} GAM net result is already reflected in gaming balances; only the ${fmt(result.bonus)} GAM proposed bonus is an additional credit. This calculator illustrates the founding casino reward formula and is not a guarantee of winnings.`;
    document.querySelectorAll('.tier-card').forEach(el=>el.classList.toggle('tier-selected',result.tier.name===el.querySelector('.tier-ordinal').textContent.split('/ ')[1]));
    input.setAttribute('aria-invalid',a<0||a>1000?'true':'false');
  }
  const menu=byId('menu-toggle'),nav=byId('nav-links');if(menu&&nav){menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));}
  byId('invest-input')?.addEventListener('input',update);byId('profit-input')?.addEventListener('input',update);byId('reset-example')?.addEventListener('click',()=>{byId('invest-input').value='1000';byId('profit-input').value='400';update()});update();
  byId('year').textContent=new Date().getFullYear();
  const community=cfg.telegramUrl||'';if(/^https:\/\//i.test(community)){const link=byId('community-link');link.href=community;link.hidden=false;byId('community-placeholder').hidden=true;}
  const launch=cfg.launchAt?Date.parse(cfg.launchAt):NaN;if(Number.isFinite(launch)){byId('launch-countdown-wrap').hidden=false;byId('wallet-cap-hero').hidden=true;byId('launch-label').textContent=new Date(launch).toLocaleDateString('en-GB',{timeZone:'UTC',day:'numeric',month:'short',year:'numeric'}).toUpperCase();function clock(){const sec=Math.max(0,Math.ceil((launch-Date.now())/1000)),d=Math.floor(sec/86400),h=Math.floor((sec%86400)/3600),m=Math.floor((sec%3600)/60),s=sec%60;byId('countdown').textContent=sec===0?'DATE REACHED':`${d}D ${String(h).padStart(2,'0')}H ${String(m).padStart(2,'0')}M ${String(s).padStart(2,'0')}S`;}clock();setInterval(clock,1000);}
  window.GambitDemo=Object.freeze({tiers,tierFor,calculate});
})();
