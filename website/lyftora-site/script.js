(() => {
  'use strict';

  /* ============================================
     Custom cursor
     ============================================ */
  (() => {
    const dot = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    // Skip on touch / small screens
    if (window.matchMedia('(hover: none), (max-width: 720px)').matches) return;

    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let rx = x, ry = y;
    document.addEventListener('mousemove', (e) => { x = e.clientX; y = e.clientY; });
    function tick() {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    }
    tick();
    const hoverables = document.querySelectorAll('a, button, .food-card-2, .b-card, .phone-3d');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => { dot.classList.add('is-hover'); ring.classList.add('is-hover'); });
      el.addEventListener('mouseleave', () => { dot.classList.remove('is-hover'); ring.classList.remove('is-hover'); });
    });
  })();

  /* ============================================
     Magnetic buttons
     ============================================ */
  if (!window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-magnet]').forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const mx = e.clientX - rect.left - rect.width / 2;
        const my = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${mx * 0.2}px, ${my * 0.3}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ============================================
     Reveal on scroll
     ============================================ */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ============================================
     Animated counters
     ============================================ */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.counter);
    const suffix = el.dataset.suffix || '';
    const dur = 1800;
    const start = performance.now();
    function step(t) {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(target * eased);
      el.textContent = val.toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); cio.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('[data-counter]').forEach(el => cio.observe(el));

  /* ============================================
     Tap-the-coin (shows what rivals charge)
     ============================================ */
  (() => {
    const btn = document.getElementById('coin-btn');
    const count = document.getElementById('coin-count');
    if (!btn || !count) return;
    let n = 0;
    btn.addEventListener('click', (e) => {
      n++;
      count.textContent = (n * 499).toLocaleString();
      const c = document.createElement('span');
      c.textContent = '+₹499';
      c.style.position = 'fixed';
      c.style.left = e.clientX + 'px';
      c.style.top = e.clientY + 'px';
      c.style.font = '600 14px var(--sans)';
      c.style.color = 'var(--coral)';
      c.style.pointerEvents = 'none';
      c.style.zIndex = 9999;
      c.style.transition = 'transform .9s ease-out, opacity .9s';
      document.body.appendChild(c);
      requestAnimationFrame(() => {
        c.style.transform = `translate(${(Math.random() - .5) * 80}px, -80px)`;
        c.style.opacity = '0';
      });
      setTimeout(() => c.remove(), 900);
    });
  })();

  /* ============================================
     Rep counter
     ============================================ */
  (() => {
    const btn = document.getElementById('rep-btn');
    const num = document.getElementById('rep-num');
    if (!btn || !num) return;
    let r = 0;
    const tick = () => {
      r++;
      num.textContent = r;
      num.classList.add('bump');
      setTimeout(() => num.classList.remove('bump'), 140);
    };
    btn.addEventListener('click', tick);
    document.querySelector('.rep-card').addEventListener('click', (e) => {
      if (e.target === btn) return;
      tick();
    });
  })();

  /* ============================================
     Years comparison chart
     ============================================ */
  (() => {
    const apps = [
      { name: "HealthifyMe",  note: "₹499/mo",  monthly: 499 },
      { name: "Hevy Pro",     note: "$9.99/mo", monthly: 830 },
      { name: "MyFitnessPal", note: "$9.99/mo", monthly: 830 },
      { name: "Cult.fit",     note: "₹999/mo",  monthly: 999 },
      { name: "Lyftora",      note: "₹199/mo",  monthly: 199, win: true }
    ];
    const chart = document.getElementById('cmp-chart');
    const yearPills = document.querySelectorAll('.years-pill');
    if (!chart) return;
    let years = 5;

    function render() {
      const data = apps.map(a => ({
        ...a,
        total: a.monthly * 12 * years
      }));
      const max = Math.max(...data.map(d => d.total));
      chart.innerHTML = data.map(d => `
        <div class="cmp-row ${d.win ? 'win' : ''}" style="--w:${(d.total / max) * 100}%">
          <div class="cmp-app">${d.name}<small>${d.note}</small></div>
          <div class="cmp-track"><div class="cmp-bar"></div></div>
          <div class="cmp-cost">₹${d.total.toLocaleString()}</div>
        </div>
      `).join('');
      requestAnimationFrame(() => {
        chart.querySelectorAll('.cmp-row').forEach(r => r.classList.add('is-visible'));
      });
    }

    yearPills.forEach(p => {
      p.addEventListener('click', () => {
        yearPills.forEach(x => x.classList.remove('active'));
        p.classList.add('active');
        years = parseInt(p.dataset.years, 10);
        render();
      });
    });

    const chartObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { render(); chartObs.disconnect(); } });
    }, { rootMargin: '0px 0px -15% 0px' });
    chartObs.observe(chart);
  })();

  /* ============================================
     Draggable food deck
     ============================================ */
  (() => {
    const foods = [
      { name: "Dal Tadka",       kcal: 420, p: 18, c: 52, f: 14, serv: "1 katori · 180g", bg: "linear-gradient(140deg,#FF7A45,#FF5A3C)" },
      { name: "Chicken Biryani", kcal: 690, p: 34, c: 78, f: 24, serv: "1 plate · 300g",  bg: "linear-gradient(140deg,#7B5CFF,#4A2DE6)" },
      { name: "Masala Dosa",     kcal: 380, p: 8,  c: 55, f: 12, serv: "1 piece · 180g",  bg: "linear-gradient(140deg,#1A1A22,#3A3A48)" },
      { name: "Paneer Butter",   kcal: 540, p: 22, c: 18, f: 42, serv: "1 katori · 200g", bg: "linear-gradient(140deg,#FF9F45,#FF5A3C)" },
      { name: "Poha",            kcal: 290, p: 6,  c: 48, f: 8,  serv: "1 plate · 200g",  bg: "linear-gradient(140deg,#6EE0FF,#4A7EFF)" },
      { name: "Overnight Oats",  kcal: 340, p: 14, c: 58, f: 6,  serv: "1 bowl · 250g",   bg: "linear-gradient(140deg,#D6FF4D,#8FCF24)" }
    ];
    const deck = document.getElementById('food-deck');
    if (!deck) return;
    let i = 0;
    function render() {
      deck.innerHTML = foods.map((f, idx) => {
        const rel = (idx - i + foods.length) % foods.length;
        let z = foods.length - rel;
        let tx = 0, ty = 0, rot = 0, scale = 1, opacity = 1;
        if (rel === 0) { /* front */ }
        else if (rel === 1) { tx = 36; ty = 18; rot = 6; scale = 0.94; opacity = 0.9; }
        else if (rel === 2) { tx = 72; ty = 36; rot = 12; scale = 0.88; opacity = 0.7; }
        else { opacity = 0; tx = 100; scale = 0.8; }
        return `
        <div class="food-card-2" data-idx="${idx}" style="
          background: ${f.bg};
          z-index: ${z};
          transform: translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${scale});
          opacity: ${opacity};
        ">
          <div class="food-deck-top">
            <span class="food-serv">${f.serv}</span>
            <span class="food-serv">${String(idx + 1).padStart(2, '0')} / ${String(foods.length).padStart(2, '0')}</span>
          </div>
          <div>
            <h3>${f.name}</h3>
            <div class="big-kcal">${f.kcal}<small>kcal</small></div>
            <div class="macro">
              <span>P ${f.p}g</span><span>C ${f.c}g</span><span>F ${f.f}g</span>
            </div>
          </div>
        </div>`;
      }).join('') + '<div class="food-hint">Drag <kbd>← →</kbd> or <kbd>tap</kbd></div>';
      attachDrag();
    }
    function attachDrag() {
      const front = deck.querySelector('.food-card-2[data-idx="' + i + '"]');
      if (!front) return;
      let sx = 0, dx = 0, dragging = false;
      const onDown = (e) => {
        dragging = true;
        sx = (e.touches ? e.touches[0].clientX : e.clientX);
        front.style.transition = 'none';
      };
      const onMove = (e) => {
        if (!dragging) return;
        dx = (e.touches ? e.touches[0].clientX : e.clientX) - sx;
        front.style.transform = `translate(${dx}px, ${dx * 0.05}px) rotate(${dx * 0.06}deg)`;
      };
      const onUp = () => {
        if (!dragging) return;
        dragging = false;
        front.style.transition = '';
        if (Math.abs(dx) > 80) {
          front.style.transform = `translate(${dx > 0 ? 400 : -400}px, 60px) rotate(${dx * 0.12}deg)`;
          front.style.opacity = 0;
          setTimeout(() => { i = (i + 1) % foods.length; render(); }, 280);
        } else {
          render();
        }
        dx = 0;
      };
      front.addEventListener('mousedown', onDown);
      front.addEventListener('touchstart', onDown, { passive: true });
      window.addEventListener('mousemove', onMove);
      window.addEventListener('touchmove', onMove, { passive: true });
      window.addEventListener('mouseup', onUp);
      window.addEventListener('touchend', onUp);
      front.addEventListener('click', () => {
        if (Math.abs(dx) < 4) { i = (i + 1) % foods.length; render(); }
      });
    }
    render();
  })();

  /* ============================================
     Phone 3D tilt
     ============================================ */
  (() => {
    const el = document.getElementById('phone3d');
    if (!el) return;
    const wrap = el.parentElement;
    wrap.addEventListener('mousemove', (e) => {
      const r = wrap.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 12}deg)`;
    });
    wrap.addEventListener('mouseleave', () => {
      el.style.transform = 'rotateY(0) rotateX(0)';
    });
  })();

  /* ============================================
     Chat send → new bubble
     ============================================ */
  (() => {
    const input = document.getElementById('coach-input');
    const send = document.getElementById('coach-send');
    const box = document.querySelector('.chat-box');
    if (!send || !input || !box) return;
    const doSend = () => {
      const v = input.value.trim();
      if (!v) return;
      const typing = box.querySelector('.bb.typing');
      const me = document.createElement('div');
      me.className = 'bb user';
      me.textContent = v;
      box.insertBefore(me, typing);
      input.value = '';
      setTimeout(() => {
        const reply = document.createElement('div');
        reply.className = 'bb coach';
        reply.textContent = "Logged. Let's build a week around that — I'll queue the plan in your inbox.";
        box.insertBefore(reply, typing);
      }, 900);
    };
    send.addEventListener('click', doSend);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') doSend(); });
  })();

  /* ============================================
     Confetti on primary CTA click
     ============================================ */
  function confetti(x, y) {
    const wrap = document.createElement('div');
    wrap.className = 'confetti';
    document.body.appendChild(wrap);
    const colors = ['#D6FF4D', '#FF5A3C', '#7B5CFF', '#6EE0FF', '#0E0E12'];
    for (let k = 0; k < 50; k++) {
      const s = document.createElement('span');
      s.style.left = x + 'px';
      s.style.top = y + 'px';
      s.style.background = colors[k % colors.length];
      s.style.setProperty('--dx', ((Math.random() - 0.5) * 400) + 'px');
      s.style.setProperty('--dy', (Math.random() * -400 - 60) + 'px');
      s.style.animationDelay = (Math.random() * 0.15) + 's';
      s.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      wrap.appendChild(s);
    }
    setTimeout(() => wrap.remove(), 2200);
  }
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.btn-primary, #buy-btn').forEach(b => {
      b.addEventListener('click', (e) => {
        confetti(e.clientX, e.clientY);
      });
    });
  }

  /* ============================================
     Price number scramble on hover
     ============================================ */
  (() => {
    const el = document.getElementById('price-num');
    if (!el) return;
    const final = '199';
    let timer;
    el.addEventListener('mouseenter', () => {
      let n = 0;
      clearInterval(timer);
      timer = setInterval(() => {
        el.textContent = String(Math.floor(Math.random() * 900) + 100);
        n++;
        if (n > 8) { clearInterval(timer); el.textContent = final; }
      }, 50);
    });
  })();

  /* ============================================
     Smooth scroll for anchor links (enhance with focus for a11y)
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

})();
