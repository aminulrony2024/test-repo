document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Hero console "log" typing animation ---------- */
  const consoleBody = document.getElementById('consoleBody');
  const logLines = [
    { prompt: '$', text: 'role.history --list' },
    { text: '  software_engineer   [2020 - 2024]' },
    { text: '  b_tech_cse @ KIIT   [OK]', ok: true },
    { prompt: '$', text: 'role.target --set data_scientist' },
    { text: '  loading m_tech_dsai @ IIT_Madras...' },
    { text: '  status: IN_PROGRESS', ok: true },
    { prompt: '$', text: 'skills.merge web_dev + mlops' },
    { text: '  ready for deployment', ok: true },
  ];

  function typeConsole() {
    consoleBody.innerHTML = '';
    logLines.forEach((line, i) => {
      const el = document.createElement('div');
      el.className = 'console-line';
      el.style.animationDelay = `${i * 0.35 + 0.2}s`;
      const promptSpan = line.prompt ? `<span class="prompt">${line.prompt}</span>` : '';
      const textSpan = line.ok ? line.text.replace('OK', '<span class="ok">OK</span>').replace('IN_PROGRESS', '<span class="ok">IN_PROGRESS</span>') : line.text;
      el.innerHTML = `${promptSpan}${textSpan}`;
      consoleBody.appendChild(el);
    });
    const cursor = document.createElement('span');
    cursor.className = 'cursor-blink';
    cursor.style.marginTop = '0.4rem';
    cursor.style.display = 'inline-block';
    const cursorLine = document.createElement('div');
    cursorLine.style.animationDelay = `${logLines.length * 0.35 + 0.4}s`;
    cursorLine.className = 'console-line';
    cursorLine.appendChild(cursor);
    consoleBody.appendChild(cursorLine);
  }
  typeConsole();

  /* ---------- Random-ish run id ---------- */
  document.getElementById('runId').textContent = '#' + Math.floor(1000 + Math.random() * 9000);

  /* ---------- Pipeline rail: scrollspy ---------- */
  const stages = document.querySelectorAll('.rail-stage');
  const sections = Array.from(stages).map(s => document.getElementById(s.dataset.target)).filter(Boolean);

  stages.forEach(stage => {
    stage.addEventListener('click', () => {
      const target = document.getElementById(stage.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      document.getElementById('rail').classList.remove('is-open');
    });
    stage.setAttribute('tabindex', '0');
    stage.setAttribute('role', 'link');
    stage.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') stage.click();
    });
  });

  const statusLabels = { before: 'queued', active: 'running', done: 'complete' };

  function updateRail() {
    const scrollPos = window.scrollY + window.innerHeight * 0.4;
    let activeIndex = -1;

    sections.forEach((section, i) => {
      if (section && section.offsetTop <= scrollPos) activeIndex = i;
    });

    stages.forEach((stage, i) => {
      const statusEl = stage.querySelector('.stage-status');
      stage.classList.remove('is-active', 'is-done');
      if (i < activeIndex) {
        stage.classList.add('is-done');
        statusEl.textContent = statusLabels.done;
      } else if (i === activeIndex) {
        stage.classList.add('is-active');
        statusEl.textContent = statusLabels.active;
      } else {
        statusEl.textContent = statusLabels.before;
      }
    });
  }
  updateRail();
  window.addEventListener('scroll', updateRail, { passive: true });

  /* ---------- Mobile rail toggle ---------- */
  const railToggle = document.getElementById('railToggle');
  const rail = document.getElementById('rail');
  railToggle.addEventListener('click', () => {
    const open = rail.classList.toggle('is-open');
    railToggle.setAttribute('aria-expanded', open);
  });

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = document.querySelectorAll('.stage-header, .about-copy, .about-record, .skill-block, .project-card, .timeline-item');
  revealTargets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => observer.observe(el));

  /* ---------- Project filter ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('is-hidden', !match);
      });
    });
  });

  /* ---------- Contact form (client-side only) ---------- */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      formNote.textContent = 'Please fill in every field.';
      return;
    }

    // No backend wired up — hands off to the visitor's mail client.
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`;
    formNote.textContent = 'Opening your email client…';
  });

});
