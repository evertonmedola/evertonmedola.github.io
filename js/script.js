/**
 * EVERTON MEDOLA — PORTFOLIO
 * script.js
 *
 * Features:
 *  1. Animação digitando (hero name)
 *  2. Intersection Observer (section reveal on scroll)
 *  3. Botão de modo escuro / claro (persisted in localStorage)
 *  4. Copiar email para área de transferência
 *  5. Mudar idioma (PT / EN)
 */

/* ════════════════════════════════════════
   1. TYPEWRITER
   ════════════════════════════════════════ */
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  const cursor = document.querySelector('.cursor');
  if (!el) return;

  const lines = ['Everton\nMedola'];
  const full = 'Everton\nMedola';
  let index = 0;
  let output = '';
  let done = false;

  function type() {
    if (done) return;

    if (index < full.length) {
      const ch = full[index];
      output += ch === '\n' ? '<br>' : ch;
      el.innerHTML = output;
      index++;
      setTimeout(type, index < 8 ? 90 : 70);
    } else {
      done = true;
      setTimeout(() => {
        if (cursor) cursor.style.display = 'none';
      }, 1800);
    }
  }

  setTimeout(type, 400);
})();


/* ════════════════════════════════════════
   2. INTERSECTION OBSERVER — SECTION REVEAL
   ════════════════════════════════════════ */
(function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  targets.forEach((el) => observer.observe(el));
})();


/* ════════════════════════════════════════
   3. THEME TOGGLE
   ════════════════════════════════════════ */
(function initTheme() {
  const html = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');

  const saved = localStorage.getItem('em-theme') || 'dark';
  applyTheme(saved);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('em-theme', next);
    });
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
  }
})();


/* ════════════════════════════════════════
   4. COPY EMAIL TO CLIPBOARD
   ════════════════════════════════════════ */
(function initCopyEmail() {
  const btn = document.getElementById('copyEmailBtn');
  const hintPt = document.getElementById('emailHint');
  const hintEn = document.getElementById('emailHintEn');
  const EMAIL = 'evertonmedola87@gmail.com';

  if (!btn) return;

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      showCopied();
    } catch {
      const ta = document.createElement('textarea');
      ta.value = EMAIL;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showCopied();
    }
  });

  function showCopied() {
    btn.classList.add('copied');

    const ptMsg = 'Copiado! ✓';
    const enMsg = 'Copied! ✓';
    const prevPt = hintPt ? hintPt.textContent : '';
    const prevEn = hintEn ? hintEn.textContent : '';

    if (hintPt) hintPt.textContent = ptMsg;
    if (hintEn) hintEn.textContent = enMsg;

    setTimeout(() => {
      btn.classList.remove('copied');
      if (hintPt) hintPt.textContent = prevPt;
      if (hintEn) hintEn.textContent = prevEn;
    }, 2200);
  }
})();


/* ════════════════════════════════════════
   5. LANGUAGE SWITCHER
   ════════════════════════════════════════ */
(function initLang() {
  const body = document.body;
  const buttons = document.querySelectorAll('.lang-btn');

  // Default language
  const saved = localStorage.getItem('em-lang') || 'pt';
  applyLang(saved);

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.langTarget;
      applyLang(lang);
      localStorage.setItem('em-lang', lang);
    });
  });

  function applyLang(lang) {
    body.classList.remove('lang-pt', 'lang-en');
    body.classList.add('lang-' + lang);

    buttons.forEach((btn) => {
      const isActive = btn.dataset.langTarget === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });

    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }
})();