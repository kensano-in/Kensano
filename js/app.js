/* app.js — UI interactions, portfolio, product listing mock */
(function(){
  // simple portfolio items (demo). Replace with real data or fetch API.
  const portfolio = [
    {id:'p1',title:'Kensano — Landing',img:'assets/portfolio01.jpg',type:'Website',desc:'High-conversion site, black-label design'},
    {id:'p2',title:'Reel Edit — Brand',img:'assets/portfolio02.jpg',type:'Video',desc:'30s short with VFX polish'},
    {id:'p3',title:'Script Set — Viral',img:'assets/portfolio03.jpg',type:'Script',desc:'Short form viral script pack'}
  ];

  // render portfolio slider
  const slider = document.getElementById('portfolio-slider');
  if(slider){
    slider.innerHTML = '';
    portfolio.forEach(p=>{
      const el = document.createElement('div');
      el.className = 'portfolio-item glass';
      el.style.margin = '8px';
      el.style.padding = '12px';
      el.style.width = '280px';
      el.innerHTML = `
        <div style="height:160px;overflow:hidden;border-radius:10px"><img src="${p.img}" style="width:100%;height:100%;object-fit:cover"></div>
        <h4 style="margin:12px 0 6px">${p.title}</h4>
        <p style="color:var(--muted);font-size:14px">${p.desc}</p>
      `;
      slider.appendChild(el);
    });
    // allow drag to scroll
    let down=false,startX,scrollLeft;
    slider.addEventListener('mousedown',e=>{down=true;startX=e.pageX - slider.offsetLeft;scrollLeft=slider.scrollLeft});
    slider.addEventListener('mouseleave',()=>down=false);
    slider.addEventListener('mouseup',()=>down=false);
    slider.addEventListener('mousemove',e=>{if(!down) return; e.preventDefault(); const x=e.pageX-slider.offsetLeft; const walk=(x-startX)*2; slider.scrollLeft=scrollLeft-walk});
    slider.style.display='flex'; slider.style.overflowX='auto';
  }

  // simple search (client-side)
  const products = [
    {id:'w1',title:'WhatsApp US +1 7097007361',category:'numbers',price:49,desc:'Private, aged, secure delivery',tags:['whatsapp','us','number']},
    {id:'s1',title:'Short Script Pack - Viral',category:'scripts',price:29,desc:'3x short scripts for reels',tags:['script','shorts','viral']},
    {id:'e1',title:'Video Edit - Quick',category:'editing',price:69,desc:'30s reel-grade edit',tags:['video','edit']}
  ];

  // product listing if on product.html
  function renderProducts(){
    if(!document.getElementById('product-list')) return;
    const list = document.getElementById('product-list');
    list.innerHTML = '';
    products.forEach(p=>{
      const item = document.createElement('div');
      item.className='product-item glass';
      item.innerHTML = `
        <h4>${p.title}</h4>
        <p style="color:var(--muted)">${p.desc}</p>
        <div style="display:flex;gap:12px;margin-top:10px">
          <div style="font-weight:700">${p.price} USD</div>
          <button data-id="${p.id}" class="btn-sm btn-primary buy">Buy</button>
          <a href="/product.html?id=${p.id}" class="btn-ghost">Details</a>
        </div>
      `;
      list.appendChild(item);
    });
    // buy click -> cart mock
    list.querySelectorAll('.buy').forEach(b=>{
      b.addEventListener('click', e=>{
        const id=e.target.dataset.id;
        alert('Added to cart: ' + id + ' (this is demo only). Implement order API to proceed.');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', renderProducts);

  // simple mobile menu
  document.getElementById('mobile-menu-toggle').addEventListener('click', ()=> {
    document.body.classList.toggle('mobile-open');
    const menu = document.querySelector('.main-nav');
    if(menu) menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
  });

})();
