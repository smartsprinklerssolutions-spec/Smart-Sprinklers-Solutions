/**
 * Smart Sprinklers Solutions - Main Interactive Script
 * High-performance, lightweight vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initServiceTabs();
  initProjectTabsAndLightbox();
  initWaterSavingsCalculator();
  initFaqAccordion();
  initEstimateForm();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   1. Navigation & Mobile Menu
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        navMenu.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   2. Service Category Filter Tabs
   -------------------------------------------------------------------------- */
function initServiceTabs() {
  const tabButtons = document.querySelectorAll('.service-tabs .tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  if (!tabButtons.length || !serviceCards.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-category');

      serviceCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category') || '';
        const categories = cardCategory.split(' ');
        if (filterCategory === 'all' || categories.includes(filterCategory)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3. Project Filter & Lightbox Modal
   -------------------------------------------------------------------------- */
function initProjectTabsAndLightbox() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('projectLightbox');
  const modalImg = document.getElementById('lightboxImg');
  const modalTitle = document.getElementById('lightboxTitle');
  const modalDesc = document.getElementById('lightboxDesc');
  const closeBtn = document.querySelector('.lightbox-close-btn');

  // Filter tabs
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        const categories = category.split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Lightbox opening
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.project-img');
      const title = card.querySelector('.project-title');
      const desc = card.querySelector('.project-desc');

      if (modal && modalImg && img) {
        modalImg.src = img.src;
        modalImg.alt = img.alt || 'Project Showcase';
        if (modalTitle && title) modalTitle.textContent = title.textContent;
        if (modalDesc && desc) modalDesc.textContent = desc.textContent;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Lightbox closing
  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   4. Water Savings Calculator
   -------------------------------------------------------------------------- */
function initWaterSavingsCalculator() {
  const billSlider = document.getElementById('waterBillSlider');
  const billDisplay = document.getElementById('billDisplay');
  const annualSavingsDisplay = document.getElementById('annualSavings');
  const gallonsSavedDisplay = document.getElementById('gallonsSaved');

  if (!billSlider) return;

  function updateSavings() {
    const monthlyBill = parseInt(billSlider.value, 10);
    billDisplay.textContent = `$${monthlyBill}`;

    // Conservative 35% savings with smart controllers + MP Rotators
    // In Colorado, outdoor watering accounts for ~6 months peak (May-Oct)
    const outdoorWaterMonthly = monthlyBill * 0.70;
    const monthlySaved = outdoorWaterMonthly * 0.38;
    const annualMoneySaved = Math.round(monthlySaved * 6);
    
    // Water cost approx $5 per 1,000 gallons
    const gallonsSavedAnnual = Math.round((annualMoneySaved / 5.2) * 1000);

    annualSavingsDisplay.textContent = `$${annualMoneySaved.toLocaleString()}`;
    gallonsSavedDisplay.textContent = `${gallonsSavedAnnual.toLocaleString()}+ gal`;
  }

  billSlider.addEventListener('input', updateSavings);
  updateSavings();
}

/* --------------------------------------------------------------------------
   5. FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other accordions
      faqItems.forEach(other => {
        other.classList.remove('active');
        const otherAnswer = other.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      // Toggle clicked
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. Estimate Request Form & Quick Action Buttons
   -------------------------------------------------------------------------- */
function initEstimateForm() {
  const form = document.getElementById('estimateForm');
  const serviceSelect = document.getElementById('serviceSelect');
  const serviceActionBtns = document.querySelectorAll('.service-card-action');

  // When clicking "Request Service" on any card, pre-select that service and scroll to form
  serviceActionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service');
      if (serviceSelect && serviceName) {
        serviceSelect.value = serviceName;
      }
      const formSection = document.getElementById('estimate');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
        // Focus first input
        const nameInput = document.getElementById('fullName');
        if (nameInput) setTimeout(() => nameInput.focus(), 600);
      }
    });
  });

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('fullName')?.value.trim();
    const phone = document.getElementById('phoneNumber')?.value.trim();
    const email = document.getElementById('emailAddress')?.value.trim();
    const service = document.getElementById('serviceSelect')?.value;
    const address = document.getElementById('propertyAddress')?.value.trim();
    const notes = document.getElementById('projectNotes')?.value.trim();

    if (!name || !phone) {
      alert('Please provide your name and phone number so we can contact you.');
      return;
    }

    // Prepare SMS body text with all details from the form
    let smsBody = `Hi Smart Sprinklers Solutions! I'd like to request an estimate:\n` +
      `• Name: ${name}\n` +
      `• Phone: ${phone}\n`;

    if (email) smsBody += `• Email: ${email}\n`;
    if (service) smsBody += `• Service: ${service}\n`;
    if (address) smsBody += `• Address: ${address}\n`;
    if (notes) smsBody += `• Details: ${notes}\n`;

    // Phone number to receive the SMS
    const destPhone = '7206200654';

    // iOS uses '&body=' while Android and modern standards use '?body='
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const separator = isIOS ? '&' : '?';
    const smsUrl = `sms:${destPhone}${separator}body=${encodeURIComponent(smsBody)}`;

    // Show toast notice
    showToast(`Opening your text messaging app with your estimate details...`);

    // Launch the SMS app on client's device
    window.location.href = smsUrl;

    // Reset form after short delay
    setTimeout(() => {
      form.reset();
    }, 1000);
  });
}

function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 5000);
}

/* --------------------------------------------------------------------------
   7. Smooth Scrolling for Internal Links
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
