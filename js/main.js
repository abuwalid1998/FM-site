/**
 * FM Marketing - Fatima Melhem Agency
 * Interactive Logic, Internationalization & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initCanvas();
  initHeaderScroll();
  initMobileMenu();
  initScrollReveal();
  initCounters();
  initPortfolioFilter();
  initEstimator();
  initContactForm();
  initPortfolioModal();
});

/* ==========================================================================
   1. LANGUAGE & INTERNATIONALIZATION (EN / AR)
   ========================================================================== */
let currentLang = localStorage.getItem('fm_lang') || 'en';

function initLanguage() {
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  const langLabel = document.getElementById('lang-label');

  applyLanguage(currentLang);

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'ar' : 'en';
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
    langLabel.textContent = lang === 'en' ? 'العربية' : 'English';
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
   6. ANIMATED STATISTICS COUNTERS
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
            const duration = 2000;
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
   7. PORTFOLIO FILTER
   ========================================================================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   8. INTERACTIVE ROI ESTIMATOR CALCULATOR
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

  // Calculations
  const baseReach = budget * 450;
  const multiplier = goal === 'awareness' ? 1.4 : goal === 'leads' ? 0.9 : 1.1;
  const estimatedReach = Math.round(baseReach * multiplier);

  if (reachValEl) {
    reachValEl.textContent = `~${(estimatedReach / 1000).toFixed(0)}K - ${( (estimatedReach * 1.5) / 1000 ).toFixed(0)}K`;
  }

  const isAr = currentLang === 'ar';

  if (contentValEl) {
    if (budget < 2500) {
      contentValEl.textContent = isAr 
        ? '8 ريلز سينمائي + إدارة وتنسيق الحساب' 
        : '8 Cinematic 4K Reels + Feed Management';
    } else if (budget < 5000) {
      contentValEl.textContent = isAr 
        ? '16 ريلز سينمائي + حملات إعلانات ممولة + ستوريز يومية' 
        : '16 Cinematic Reels + Paid Ad Scaling + Daily Stories';
    } else {
      contentValEl.textContent = isAr 
        ? '24+ إنتاج سينمائي + تسويق مؤثرين VIP + تغطية شاملة' 
        : '24+ Luxury Productions + VIP Influencer Campaigns + Full Domination';
    }
  }

  if (pkgValEl) {
    if (budget < 2500) {
      pkgValEl.textContent = isAr ? 'باقة النمو الأنيق (Boutique Growth)' : 'The Boutique Growth Tier';
    } else if (budget < 5000) {
      pkgValEl.textContent = isAr ? 'باقة التميز والشهرة (Signature Prestige)' : 'The Signature Prestige Tier';
    } else {
      pkgValEl.textContent = isAr ? 'باقة الإمبراطورية (Omnichannel Empire)' : 'The Omnichannel Empire Tier';
    }
  }
}

/* ==========================================================================
   9. CASE STUDY MODAL PREVIEW
   ========================================================================== */
function initPortfolioModal() {
  const modal = document.getElementById('portfolio-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body-content');
  const viewBtns = document.querySelectorAll('.view-case-btn');

  if (!modal || !modalClose || !modalBody) return;

  const caseData = {
    1: {
      en: {
        title: "Élixir Rouge - Luxury Perfume Launch",
        stats: "+480% Online Sales Growth | 3.2M+ Reach | 4.8x ROAS",
        challenge: "A bespoke fragrance brand needed an elite entrance into the Middle Eastern & European markets with a luxury, sultry visual aesthetic.",
        solution: "We directed high-concept 4K sensory video reels focusing on golden mist, marble textures, and velvet rose aesthetics combined with hyper-targeted Meta conversion ads.",
        results: "Generated 3.2M organic impressions within 60 days, achieved a 4.8x return on ad spend, and sold out 3 production batches in record time."
      },
      ar: {
        title: "عطور إكسير روج - إطلاق علامة عطور فاخرة",
        stats: "+480% نمو في المبيعات | +3.2 مليون وصول | 4.8x عائد إعلاني",
        challenge: "احتاجت دار عطور فاخرة لدخول السوق العربي والأوروبي بهوية بصرية ساحرة تجسد الرقي والجاذبية الاستثنائية.",
        solution: "أشرفنا على جلسات تصوير سينمائية 4K تركز على انسيابية رذاذ العطر المخملي وأوراق الورد، مع إطلاق حملات إعلانية دقيقة الاستهداف.",
        results: "تجاوزت المشاهدات 3.2 مليون خلال 60 يوماً، محققة عائداً إعلانياً 4.8 أضعاف ونفاد 3 دفعات إنتاجية بالكامل."
      }
    },
    2: {
      en: {
        title: "Royal Crimson Couture - Fashion House Rebrand",
        stats: "+145K Targeted Followers | 12.4% Engagement Rate",
        challenge: "An exclusive fashion atelier was struggling with low social media visibility despite having world-class dresses.",
        solution: "Engineered a high-fashion editorial grid overhaul, produced viral fashion week backstage reels, and orchestrated strategic gifting to elite tastemakers.",
        results: "Expanded follower base by 145,000 highly targeted fashion enthusiasts and booked custom dress consultations 4 months in advance."
      },
      ar: {
        title: "رويال كريمسون كوتور - إعادة صياغة دار أزياء راقية",
        stats: "+145 ألف متابع نوعي | 12.4% نسبة تفاعل قياسية",
        challenge: "عانت دار الأزياء من ضعف التفاعل على وسائل التواصل رغم رقي فساتينها وتصاميمها العالمية.",
        solution: "أعدنا بناء الهوية البصرية للحساب بالكامل، ونفذنا ريلز احترافية لكواليس أسبوع الموضة وحملات إهداء لنخبة المؤثرات.",
        results: "نمو الحساب بأكثر من 145 ألف متابع مهتم بالموضة الفاخرة واكتمال مواعيد الاستشارات الخاصة لمدة 4 أشهر مقدماً."
      }
    },
    3: {
      en: {
        title: "Opulence Skyline Lounge - Fine Dining & Hospitality",
        stats: "100% Table Occupancy | 5.6M Video Views",
        challenge: "A newly opened rooftop dining venue needed consistent high-ticket table reservations and cultural buzz.",
        solution: "Created viral POV TikTok & Reels content highlighting the champagne experience, city skyline panorama, and celebrity chef specials.",
        results: "Achieved viral fame with 5.6M views, resulting in complete table bookings 6 weeks in advance every single weekend."
      },
      ar: {
        title: "أوبيولنس لاونج - الضيافة الفاخرة والمطاعم",
        stats: "100% نسبة إشغال الطاولات | +5.6 مليون مشاهدة",
        challenge: "احتاج مطعم ولاونج راقٍ جديد إلى جذب رواد التجارب الفاخرة وضمان حجوزات يومية مستمرة.",
        solution: "صناعة محتوى فيديو بتجربة بصرية فريدة تبرز الإطلالة البانورامية وفخامة المأكولات وأجواء الموسيقى الراقية.",
        results: "انتشار فيروسي بأكثر من 5.6 مليون مشاهدة، مما أدى لامتلاء الحجوزات لـ 6 أسابيع مقدماً في عطلات نهاية الأسبوع."
      }
    }
  };

  viewBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-case-id');
      const data = caseData[id] ? caseData[id][currentLang] : null;

      if (data) {
        modalBody.innerHTML = `
          <h2 style="font-family: var(--font-heading-en); color: var(--gold-300); margin-bottom: 0.75rem; font-size: 1.7rem;">${data.title}</h2>
          <div style="background: rgba(223, 183, 108, 0.1); border: 1px solid var(--gold-500); padding: 0.75rem 1.25rem; border-radius: 8px; color: var(--gold-400); font-weight: bold; margin-bottom: 1.5rem;">
            ${data.stats}
          </div>
          <div style="margin-bottom: 1.25rem;">
            <h4 style="color: var(--cream-50); margin-bottom: 0.4rem;">${currentLang === 'ar' ? 'التحدي:' : 'The Challenge:'}</h4>
            <p style="color: var(--cream-muted); font-size: 0.95rem;">${data.challenge}</p>
          </div>
          <div style="margin-bottom: 1.25rem;">
            <h4 style="color: var(--cream-50); margin-bottom: 0.4rem;">${currentLang === 'ar' ? 'استراتيجية وكالة FM:' : 'The FM Strategy:'}</h4>
            <p style="color: var(--cream-muted); font-size: 0.95rem;">${data.solution}</p>
          </div>
          <div>
            <h4 style="color: var(--cream-50); margin-bottom: 0.4rem;">${currentLang === 'ar' ? 'النتائج المحققة:' : 'The Impact & Results:'}</h4>
            <p style="color: var(--cream-muted); font-size: 0.95rem;">${data.results}</p>
          </div>
        `;
        modal.classList.add('active');
      }
    });
  });

  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

/* ==========================================================================
   10. CONTACT FORM & WHATSAPP REDIRECTION
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

    // Compose formatted WhatsApp message
    const waText = currentLang === 'ar'
      ? `مرحباً أستاذة فاطمة ملحم (وكالة FM Marketing)،%0Aأود طلب استشارة تسويقية لبراند:%0A- الاسم: ${encodeURIComponent(name)}%0A- اسم العلامة: ${encodeURIComponent(brand)}%0A- الخدمة المطلوبة: ${encodeURIComponent(service)}%0A- التفاصيل: ${encodeURIComponent(msg)}`
      : `Hello Fatima Melhem (FM Marketing Agency),%0AI would like to request a strategic consultation:%0A- Name: ${encodeURIComponent(name)}%0A- Brand: ${encodeURIComponent(brand)}%0A- Service: ${encodeURIComponent(service)}%0A- Notes: ${encodeURIComponent(msg)}`;

    // Show luxury toast
    if (toast) {
      toast.textContent = currentLang === 'ar' ? '✨ جاري توجيهك للمحادثة المباشرة مع فاطمة ملحم...' : '✨ Redirecting to direct chat with Fatima Melhem...';
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    }

    // Direct WhatsApp link
    setTimeout(() => {
      window.open(`https://wa.me/96170000000?text=${waText}`, '_blank');
      form.reset();
    }, 1000);
  });
}
