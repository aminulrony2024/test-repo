// ===============================
// Shared site behaviour
// ===============================

document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  // Highlight active nav link based on current page
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    if (a.getAttribute('data-page') === current) {
      a.classList.add('active');
    }
  });

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Contact form (Web3Forms - free, no signup email relay)
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = document.getElementById('form-status');
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      status.textContent = '';
      status.className = 'form-status';
      btn.disabled = true;
      btn.textContent = 'Sending…';

      const formData = new FormData(form);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        });
        const result = await response.json();

        if (result.success) {
          status.textContent = 'Message sent — thank you. I will get back to you soon.';
          status.classList.add('ok');
          form.reset();
        } else {
          throw new Error(result.message || 'Something went wrong');
        }
      } catch (err) {
        status.textContent = 'Could not send message. Please email directly at aminul.iitm@gmail.com';
        status.classList.add('err');
      } finally {
        btn.disabled = false;
        btn.textContent = originalText;
      }
    });
  }
});
