
/* ═══════════════════════════════════════
   CURSOR
═══════════════════════════════════════ */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
if (cursor && ring) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    ring.style.left   = e.clientX + 'px';
    ring.style.top    = e.clientY + 'px';
  });
}
 
/* ═══════════════════════════════════════
   FLOATING PARTICLES
═══════════════════════════════════════ */
(function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const x     = Math.random() * 100;
    const dur   = 8 + Math.random() * 14;
    const delay = Math.random() * 12;
    const drift = (Math.random() - 0.5) * 200 + 'px';
    p.style.cssText = `left:${x}%;animation-duration:${dur}s;animation-delay:-${delay}s;--drift:${drift};`;
    container.appendChild(p);
  }
})();
 
/* ═══════════════════════════════════════
   STICKY BAR
═══════════════════════════════════════ */
const stickyBar = document.getElementById('stickyBar');
if (stickyBar) {
  let shown = false;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400 && !shown) {
      shown = true;
      stickyBar.classList.add('visible');
    }
  }, { passive: true });
}
 
/* ═══════════════════════════════════════
   SCROLL REVEAL (IntersectionObserver)
═══════════════════════════════════════ */
const revealClasses = ['.reveal', '.reveal-left', '.reveal-right', '.reveal-scale'];
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
revealClasses.forEach(sel => {
  document.querySelectorAll(sel).forEach(el => revealObs.observe(el));
});
 
/* ═══════════════════════════════════════
   COUNTER ANIMATION
═══════════════════════════════════════ */
function animateCounter(el) {
  if (el.dataset.animated) return;
  el.dataset.animated = '1';
 
  const target   = parseInt(el.dataset.target);
  const suffix   = el.dataset.suffix || '';
  const prefix   = el.dataset.prefix || '';
  const duration = 1800;
  const startTime = performance.now();
 
  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    const value    = Math.floor(eased * target);
    el.textContent = prefix + value.toLocaleString('pt-BR') + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
 
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) animateCounter(e.target);
  });
}, { threshold: 0.3 });
document.querySelectorAll('.counter-anim').forEach(el => counterObs.observe(el));
 
/* ═══════════════════════════════════════
   RETENTION BAR ANIMATION
═══════════════════════════════════════ */
const retCard = document.querySelector('.nb-red');
if (retCard) {
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.getElementById('retFill')?.classList.add('active');
        document.getElementById('inacFill')?.classList.add('active');
        barObs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  barObs.observe(retCard);
}
 
/* ═══════════════════════════════════════
   78% GLOW TRIGGER
═══════════════════════════════════════ */
const bigNum = document.getElementById('bigNum');
if (bigNum) {
  const glowObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) bigNum.classList.add('glow-active');
    });
  }, { threshold: 0.5 });
  glowObs.observe(bigNum);
}
 
/* ═══════════════════════════════════════
   PRICING REVEAL
═══════════════════════════════════════ */
let pricingRevealed = false;
 
function revealPricing() {
  if (pricingRevealed) return;
  pricingRevealed = true;
 
  const btn     = document.getElementById('revealBtn');
  const wrapper = document.getElementById('pricingWrapper');
 
  btn.classList.add('unlocked');
  btn.innerHTML = '<span class="lock-icon">🔓</span> Investimento revelado';
  btn.disabled  = true;
 
  wrapper.classList.add('visible');
 
  // Animate counters inside pricing after reveal
  setTimeout(() => {
    wrapper.querySelectorAll('.counter-anim').forEach(el => animateCounter(el));
  }, 500);
}
 
// Expose to HTML onclick
window.revealPricing = revealPricing;
 
/* ═══════════════════════════════════════
   ACTIVE NAV LINK ON SCROLL
═══════════════════════════════════════ */
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
 
const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => navObs.observe(s));
