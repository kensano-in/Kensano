/* motion.js — cursor parallax + particle glow */
/* lightweight, no deps */

(function(){
  // preloader hide utility
  window.addEventListener('load', ()=> {
    const p = document.getElementById('ks-preloader');
    if(p){ p.style.opacity=0; setTimeout(()=>p.remove(),700) }
    // year
    const y = new Date().getFullYear(); document.getElementById('year').textContent=y;
  });

  // simple cursor parallax
  const root = document.documentElement;
  document.addEventListener('mousemove', e=>{
    const x = (e.clientX/window.innerWidth - 0.5)*20;
    const y = (e.clientY/window.innerHeight - 0.5)*20;
    root.style.setProperty('--cursor-x', x + 'px');
    root.style.setProperty('--cursor-y', y + 'px');
  });

  // assistant toggle
  const assistant = document.getElementById('assistant');
  document.getElementById('open-assistant').addEventListener('click', ()=> assistant.style.display='block');
  document.getElementById('assistant-close').addEventListener('click', ()=> assistant.style.display='none');
  document.getElementById('assistant-form').addEventListener('submit', e=>{
    e.preventDefault();
    const input = document.getElementById('assistant-input');
    const messages = document.getElementById('assistant-messages');
    const txt = input.value.trim(); if(!txt) return;
    const el = document.createElement('div'); el.className='msg user'; el.textContent=txt; messages.appendChild(el);
    // fake reply
    setTimeout(()=>{ const r=document.createElement('div'); r.className='msg bot'; r.innerHTML='Thanks — our assistant will route this to support. For quotes, include service name and timeline.'; messages.appendChild(r); messages.scrollTop=messages.scrollHeight },700);
    input.value='';
  });

  // hero particles (simple)
  const canvas = document.getElementById('hero-canvas');
  if(canvas){
    canvas.width = canvas.clientWidth * devicePixelRatio;
    canvas.height = canvas.clientHeight * devicePixelRatio;
    const ctx = canvas.getContext('2d');
    const particles = [];
    for(let i=0;i<60;i++){
      particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: Math.random()*1.8 + 0.6,
        vx: (Math.random()-0.5)*0.2,
        vy: (Math.random()-0.5)*0.2,
        hue: 210 + Math.random()*80
      });
    }
    function draw(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for(const p of particles){
        p.x += p.vx; p.y += p.vy;
        if(p.x<0) p.x=canvas.width;
        if(p.x>canvas.width) p.x=0;
        if(p.y<0) p.y=canvas.height;
        if(p.y>canvas.height) p.y=0;
        const grd = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*8);
        grd.addColorStop(0, `hsla(${p.hue},90%,55%,0.12)`);
        grd.addColorStop(1, `hsla(${p.hue},40%,10%,0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r*6,0,Math.PI*2);
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    draw();
    // resize
    window.addEventListener('resize', ()=>{
      canvas.width = canvas.clientWidth * devicePixelRatio;
      canvas.height = canvas.clientHeight * devicePixelRatio;
    });
  }

})();
