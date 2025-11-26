// Navigation Active State and Smooth Scrolling
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Update active nav link on scroll
function updateActiveNav() {
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// Smooth scroll for navigation links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Gallery Modal
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalClose = document.querySelector('.modal-close');

const galleryData = [
  { title: "Vasai Sunset", description: "Evening colors over the streets" },
  { title: "Stormy Skies", description: "Palm trees under dramatic clouds" },
  { title: "Urban Greenery", description: "Nature meets the city" },
  { title: "Pink Horizon", description: "Beautiful sunset moments" },
  { title: "Morning Flight", description: "Dawn with a bird silhouette" },
  { title: "Golden Hour", description: "Palm trees at sunset" },
  { title: "Twilight Magic", description: "Purple evening sky" }
];

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    modalImage.src = img.src;
    modalImage.alt = img.alt;
    modalTitle.textContent = galleryData[index].title;
    modalDescription.textContent = galleryData[index].description;
    modal.classList.add('active');
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

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    modal.classList.remove('active');
  }
});

// Contact Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const toast = document.getElementById('toast');

function showToast(message, type = 'success') {
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validation
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (!name) {
    showToast('Please enter your name', 'error');
    return;
  }

  if (!email || !validateEmail(email)) {
    showToast('Please enter a valid email address', 'error');
    return;
  }

  if (!message) {
    showToast('Please enter a message', 'error');
    return;
  }

  // Simulate form submission
  const submitButton = contactForm.querySelector('.submit-button');
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;

  setTimeout(() => {
    showToast('Message Received! Thank you for reaching out. I\'ll get back to you soon!', 'success');
    contactForm.reset();
    submitButton.innerHTML = 'Send Message<span class="button-icon">➤</span>';
    submitButton.disabled = false;
  }, 1000);
});

// Scroll animations (fade in elements when they come into view)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const fadeElements = document.querySelectorAll('.interest-card, .gallery-item, .contact-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeElements.forEach(element => {
  element.style.opacity = '0';
  observer.observe(element);
});

// Initialize
updateActiveNav();
