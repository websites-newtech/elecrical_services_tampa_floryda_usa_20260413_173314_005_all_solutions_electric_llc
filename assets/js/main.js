/* ═══════════════════════════════════════════
   ALL SOLUTIONS ELECTRIC LLC
   Main JavaScript
   ═══════════════════════════════════════════ */

'use strict';

// ─── SCROLL ANIMATIONS (Intersection Observer) ───
(function initScrollAnimations() {
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
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  document.querySelectorAll('[data-animate]').forEach((el) => {
    observer.observe(el);
  });
})();

// ─── NAVBAR SCROLL STATE ─────────────────────────
(function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const updateNavbar = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();
})();

// ─── MOBILE MENU ──────────────────────────────────
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const mobileCta = document.querySelector('.mobile-menu__cta');

  if (!hamburger || !mobileMenu) return;

  let isOpen = false;

  const openMenu = () => {
    isOpen = true;
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close navigation menu');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    isOpen = false;
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close on nav link click
  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  if (mobileCta) {
    mobileCta.addEventListener('click', closeMenu);
  }

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (
      isOpen &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
      hamburger.focus();
    }
  });
})();

// ─── SMOOTH ANCHOR SCROLLING ──────────────────────
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 72;
      const targetTop =
        targetEl.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });
    });
  });
})();

// ─── ACTIVE NAV LINK (scroll spy) ────────────────
(function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.setAttribute('aria-current', 'page');
            } else {
              link.removeAttribute('aria-current');
            }
          });
        }
      });
    },
    {
      threshold: 0.4,
      rootMargin: '-72px 0px 0px 0px',
    }
  );

  sections.forEach((s) => observer.observe(s));
})();

// ─── CONTACT FORM ─────────────────────────────────
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn?.querySelector('.btn-text');
  const btnLoading = submitBtn?.querySelector('.btn-loading');
  const successMsg = document.getElementById('form-success');

  // Validation helpers
  const showError = (input, message) => {
    input.classList.add('error');
    let errEl = input.parentElement.querySelector('.form-error-msg');
    if (!errEl) {
      errEl = document.createElement('span');
      errEl.classList.add('form-error-msg');
      errEl.setAttribute('role', 'alert');
      input.parentElement.appendChild(errEl);
    }
    errEl.textContent = message;
    errEl.classList.add('visible');
    input.setAttribute('aria-invalid', 'true');
  };

  const clearError = (input) => {
    input.classList.remove('error');
    const errEl = input.parentElement.querySelector('.form-error-msg');
    if (errEl) {
      errEl.classList.remove('visible');
    }
    input.removeAttribute('aria-invalid');
  };

  const validateForm = () => {
    let isValid = true;

    const nameInput = form.querySelector('#name');
    const phoneInput = form.querySelector('#phone');

    // Clear previous errors
    clearError(nameInput);
    clearError(phoneInput);

    if (!nameInput.value.trim()) {
      showError(nameInput, 'Please enter your full name.');
      isValid = false;
    }

    if (!phoneInput.value.trim()) {
      showError(phoneInput, 'Please enter your phone number.');
      isValid = false;
    } else if (!/^[\d\s\-\(\)\+\.]{7,20}$/.test(phoneInput.value.trim())) {
      showError(phoneInput, 'Please enter a valid phone number.');
      isValid = false;
    }

    return isValid;
  };

  // Clear error on input
  form.querySelectorAll('input, textarea, select').forEach((el) => {
    el.addEventListener('input', () => {
      if (el.classList.contains('error')) {
        clearError(el);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Focus first error
      const firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    // Loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      if (btnText) btnText.style.display = 'none';
      if (btnLoading) btnLoading.style.display = 'inline-flex';
    }

    // Simulate async submission
    // In production: replace with fetch('/api/contact', { method: 'POST', body: new FormData(form) })
    setTimeout(() => {
      // Reset loading state
      if (submitBtn) {
        submitBtn.disabled = false;
        if (btnText) btnText.style.display = '';
        if (btnLoading) btnLoading.style.display = 'none';
      }

      // Show success
      if (successMsg) {
        successMsg.style.display = 'flex';
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Reset form
      form.reset();

      // Hide success after 8 seconds
      setTimeout(() => {
        if (successMsg) {
          successMsg.style.display = 'none';
        }
      }, 8000);
    }, 1500);
  });
})();

// ─── FOOTER YEAR ──────────────────────────────────
(function setYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

// ─── COUNTER ANIMATION ────────────────────────────
(function initCounters() {
  const counters = document.querySelectorAll('.stat-block__number');
  if (!counters.length) return;

  const parseNumber = (el) => {
    const text = el.textContent;
    const match = text.match(/[\d,]+/);
    return match ? parseInt(match[0].replace(',', ''), 10) : 0;
  };

  const animateCounter = (el, target, duration = 1500) => {
    const accentEl = el.querySelector('.stat-accent');
    const accentText = accentEl ? accentEl.textContent : '';

    const startTime = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOut(progress);
      const current = Math.round(easedProgress * target);

      el.textContent = current;

      // Re-add accent element
      if (accentEl) {
        const accent = document.createElement('span');
        accent.className = 'stat-accent';
        accent.textContent = accentText;
        el.appendChild(accent);
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseNumber(el);
          if (target > 0) {
            animateCounter(el, target);
          }
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
})();