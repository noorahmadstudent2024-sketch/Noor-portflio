/*
 * Portfolio Website JavaScript
 * Implements interactive features for the portfolio
 */

// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contactForm');

// Initialize theme from localStorage or system preference
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (systemPrefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

// Toggle dark/light theme
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  // Update toggle button icon
  if (themeToggle) {
    themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
  }
}

// Toggle mobile menu
function toggleMobileMenu() {
  navMenu.classList.toggle('active');

  // Animate hamburger icon
  const bars = mobileMenu.querySelectorAll('.bar');
  bars[0].classList.toggle('bar1');
  bars[1].classList.toggle('bar2');
  bars[2].classList.toggle('bar3');
}

// Enhanced form validation
function validateForm(formData) {
  const errors = {};

  // Name validation
  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Subject validation
  if (!formData.subject || formData.subject.trim().length < 5) {
    errors.subject = 'Subject must be at least 5 characters long';
  }

  // Message validation
  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }

  return errors;
}

// Show error messages on form
function showFieldErrors(errors) {
  // Clear previous errors
  document.querySelectorAll('.error-message').forEach(el => el.remove());
  document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

  // Show new errors
  Object.keys(errors).forEach(fieldName => {
    const field = document.getElementById(fieldName);
    if (field) {
      field.classList.add('error');

      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = errors[fieldName];
      errorDiv.style.color = '#ef4444';
      errorDiv.style.fontSize = '0.875rem';
      errorDiv.style.marginTop = '0.25rem';

      field.parentNode.appendChild(errorDiv);
    }
  });
}

// Handle form submission with enhanced validation
function handleFormSubmit(event) {
  event.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  // Validate form
  const errors = validateForm(data);

  if (Object.keys(errors).length > 0) {
    showFieldErrors(errors);
    return;
  }

  // Hide any previous error messages
  document.querySelectorAll('.error-message').forEach(el => el.remove());
  document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

  // In a real application, you would send this data to a server
  console.log('Form submitted:', data);

  // Show success message
  alert('Thank you for your message! I will get back to you soon.');

  // Reset form
  contactForm.reset();
}

// Smooth scrolling for anchor links
function smoothScrollTo(targetId) {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');

        // Add staggered animation for project cards
        if (entry.target.classList.contains('project-card')) {
          const projectCards = document.querySelectorAll('.project-card');
          projectCards.forEach((card, index) => {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, index * 100);
          });
        }
      }
    });
  }, observerOptions);

  // Observe elements that should animate on scroll
  document.querySelectorAll('.project-card, .section-title, .hero-title, .hero-subtitle, .cta-button').forEach(el => {
    observer.observe(el);
  });
}

// Update navigation active state based on scroll position
function updateActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-menu a');

  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();

  // Theme toggle
  if (themeToggle) {
    // Set initial icon based on theme
    const currentTheme = document.documentElement.getAttribute('data-theme');
    themeToggle.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', toggleTheme);
  }

  // Mobile menu toggle
  if (mobileMenu) {
    mobileMenu.addEventListener('click', toggleMobileMenu);
  }

  // Close mobile menu when clicking on a link
  if (navMenu) {
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // Form submission
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      smoothScrollTo(targetId);
    });
  });

  // Initialize scroll animations
  initScrollAnimations();

  // Update active nav on scroll
  window.addEventListener('scroll', updateActiveNav);
});

// Add CSS for animations to the page
function addAnimationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* Animation styles */
    .project-card {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }

    .hero-title,
    .hero-subtitle,
    .cta-button,
    .section-title {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .hero-title.animate-in {
      animation: fadeInUp 0.8s ease forwards;
    }

    .hero-subtitle.animate-in {
      animation: fadeInUp 0.8s ease 0.2s forwards;
    }

    .cta-button.animate-in {
      animation: fadeInUp 0.8s ease 0.4s forwards;
    }

    .section-title.animate-in {
      animation: fadeInUp 0.6s ease forwards;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Mobile menu animation */
    .bar1 {
      transform: rotate(-45deg) translate(-5px, 6px);
    }

    .bar2 {
      opacity: 0;
    }

    .bar3 {
      transform: rotate(45deg) translate(-5px, -6px);
    }
  `;
  document.head.appendChild(style);
}

// Add animation styles when DOM is loaded
document.addEventListener('DOMContentLoaded', addAnimationStyles);