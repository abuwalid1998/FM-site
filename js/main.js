/**
 * FM Marketing - Fatima Melhem Agency
 * Interactive Logic, Internationalization (Arabic Default) & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initCanvas();
  initHeaderScroll();
  initMobileMenu();
  initScrollReveal();
  initCounters();
  initEstimator();
  initContactForm();
});

/* ==========================================================================
   1. LANGUAGE & INTERNATIONALIZATION (AR Default / EN)
   ========================================================================== */
let currentLang = localStorage.getItem('fm_lang') || 'ar';

function initLanguage() {
  const langToggleBtn = document.getElementById('lang-toggle-btn');

  applyLanguage(currentLang);

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      currentLang = currentLang === 'ar' ? 'en' : 'ar';
      localStorage.setItem('fm_lang', currentLang);
      applyLanguage(currentLang);
    });
  }
}

function applyLanguage(lang) {
  const html = document.documentElement;
  html.setAttribute('lang', lang);
  html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  const langLabel = document.getElementById('lang-label');
  if (langLabel) {
    langLabel.textContent = lang === 'ar' ? 'English' : 'العربية';
  }

  // Translate all [data-i18n] text nodes
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Translate [data-i18n-placeholder]
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.setAttribute('placeholder', translations[lang][key]);
    }
  });

  // Update Estimator dynamic text
  if (typeof updateEstimatorResults === 'function') {
    updateEstimatorResults();
  }
}

/* ==========================================================================
   2. AMBIENT LUXURY CANVAS PARTICLES
   ========================================================================== */
function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = 45;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.4 ? 'rgba(223, 183, 108,' : 'rgba(184, 45, 82,',
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color} ${p.alpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#dfb76c';
      ctx.fill();

      // Connect near particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(223, 183, 108, ${0.12 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   3. HEADER SCROLL EFFECT
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   4. MOBILE NAVIGATION
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

/* ==========================================================================
   5. SCROLL REVEALS
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   6. ANIMATED STATISTICS COUNTERS (Realistic Scale)
   ========================================================================== */
function initCounters() {
  const counterItems = document.querySelectorAll('.counter-val');
  let started = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          counterItems.forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const prefix = counter.getAttribute('data-prefix') || '';
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 1800;
            const step = Math.ceil(target / (duration / 25));
            let current = 0;

            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              counter.textContent = `${prefix}${current.toLocaleString()}${suffix}`;
            }, 25);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  const statsSection = document.querySelector('.stats-banner');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================================================
   7. INTERACTIVE ROI ESTIMATOR CALCULATOR (Realistic Metrics)
   ========================================================================== */
function initEstimator() {
  const budgetRange = document.getElementById('calc-budget-range');
  const budgetDisplay = document.getElementById('calc-budget-display');
  const goalSelect = document.getElementById('calc-goal-select');

  if (!budgetRange || !budgetDisplay || !goalSelect) return;

  function update() {
    budgetDisplay.textContent = `$${parseInt(budgetRange.value, 10).toLocaleString()}`;
    updateEstimatorResults();
  }

  budgetRange.addEventListener('input', update);
  goalSelect.addEventListener('change', update);

  update();
}

function updateEstimatorResults() {
  const budgetRange = document.getElementById('calc-budget-range');
  const goalSelect = document.getElementById('calc-goal-select');
  const reachValEl = document.getElementById('calc-res-reach-val');
  const contentValEl = document.getElementById('calc-res-content-val');
  const pkgValEl = document.getElementById('calc-res-pkg-val');

  if (!budgetRange || !reachValEl) return;

  const budget = parseInt(budgetRange.value, 10);
  const goal = goalSelect ? goalSelect.value : 'awareness';

  // Realistic Impression Estimates: ~40K to 150K impressions for $1.5K - $5K budgets
  const baseReach = budget * 32;
  const multiplier = goal === 'awareness' ? 1.25 : goal === 'leads' ? 0.95 : 1.1;
  const estimatedReach = Math.round(baseReach * multiplier);

  if (reachValEl) {
    reachValEl.textContent = `~${(estimatedReach).toLocaleString()} - ${Math.round(estimatedReach * 1.35).toLocaleString()}`;
  }

  const isAr = currentLang === 'ar';

  if (contentValEl) {
    if (budget < 2000) {
      contentValEl.textContent = isAr 
        ? '8 ريلز احترافي + تنسيق وإدارة الحسابات' 
        : '8 High-Quality Reels + Feed Management';
    } else if (budget < 4000) {
      contentValEl.textContent = isAr 
        ? '14 ريلز احترافي + حملات إعلانات ممولة + ستوريز يومية' 
        : '14 High-Quality Reels + Paid Ad Campaigns + Daily Stories';
    } else {
      contentValEl.textContent = isAr 
        ? '20+ إنتاج فيديو فائق الجودة + تسويق مؤثرين + تغطية شاملة' 
        : '20+ High-Production Videos + Influencer Campaigns + Full Management';
    }
  }

  if (pkgValEl) {
    if (budget < 2000) {
      pkgValEl.textContent = isAr ? 'باقة النمو المتكامل (Boutique Growth)' : 'The Boutique Growth Tier';
    } else if (budget < 4000) {
      pkgValEl.textContent = isAr ? 'باقة التميز والتوسع (Signature Prestige)' : 'The Signature Prestige Tier';
    } else {
      pkgValEl.textContent = isAr ? 'باقة الريادة الشاملة (Omnichannel Growth)' : 'The Omnichannel Growth Tier';
    }
  }
}

/* ==========================================================================
   8. CONTACT FORM & WHATSAPP REDIRECTION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('consultation-form');
  const toast = document.getElementById('toast-notice');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('c-name').value.trim();
    const brand = document.getElementById('c-brand').value.trim();
    const service = document.getElementById('c-service').value;
    const msg = document.getElementById('c-msg').value.trim();

    if (!name || !brand) {
      alert(currentLang === 'ar' ? 'يرجى إدخال الاسم واسم البراند' : 'Please fill in your name and brand name.');
      return;
    }

    // WhatsApp Message in Arabic / English
    const waText = currentLang === 'ar'
      ? `مرحباً أستاذة فاطمة ملحم (وكالة FM Marketing)،%0Aأود طلب استشارة تسويقية لبراند:%0A- الاسم: ${encodeURIComponent(name)}%0A- اسم العلامة: ${encodeURIComponent(brand)}%0A- الخدمة المطلوبة: ${encodeURIComponent(service)}%0A- التفاصيل: ${encodeURIComponent(msg)}`
      : `Hello Fatima Melhem (FM Marketing Agency),%0AI would like to request a strategic consultation:%0A- Name: ${encodeURIComponent(name)}%0A- Brand: ${encodeURIComponent(brand)}%0A- Service: ${encodeURIComponent(service)}%0A- Notes: ${encodeURIComponent(msg)}`;

    // Show toast
    if (toast) {
      toast.textContent = currentLang === 'ar' ? '✨ جاري توجيهك للمحادثة المباشرة مع فاطمة ملحم...' : '✨ Redirecting to direct chat with Fatima Melhem...';
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    }

    // Direct WhatsApp redirect
    setTimeout(() => {
      window.open(`https://wa.me/96170000000?text=${waText}`, '_blank');
      form.reset();
    }, 1000);
  });
}
