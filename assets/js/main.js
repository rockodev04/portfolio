(function() {
  'use strict';
  const copyBtn = document.querySelector('.contact__copy-btn');
  const time = 2000
  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      const email = this.dataset.email;
      if (!email) return;

      navigator.clipboard.writeText(email).then(() => {
        const originalText = this.textContent;
        this.textContent = '¡Copiado! ✅';
        this.classList.add('copied');

        setTimeout(() => {
          this.textContent = originalText;
          this.classList.remove('copied');
        }, time);
      }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();

        try {
          document.execCommand('copy');
          const originalText = this.textContent;
          this.textContent = '¡Copiado! ✅';
          this.classList.add('copied');
          setTimeout(() => {
            this.textContent = originalText;
            this.classList.remove('copied');
          }, 2000);
        } catch (err) {
          console.error('Error al copiar:', err);
        }

        document.body.removeChild(textarea);
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.projects__card, .youtube__card, .experience__item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    revealObserver.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = `
    .is-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
})();

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const menuLinks = document.getElementById('menu-links');
  const navItems = menuLinks.querySelectorAll('a');

  menuToggle.addEventListener('click', () => {
    const isActive = menuLinks.classList.toggle('is-active');
    menuToggle.textContent = isActive ? '✖ CERRAR' : '☰ MENÚ';
  });

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        menuLinks.classList.remove('is-active');
        menuToggle.textContent = '☰ MENÚ';
      }
    });
  });
});