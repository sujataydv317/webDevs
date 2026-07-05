/* ============================================
   MODERN PORTFOLIO - JAVASCRIPT
   ============================================ */

// =============== MOBILE NAVIGATION ===============
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle menu
  hamburger?.addEventListener("click", () => {
    navMenu?.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Close menu when link clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu?.classList.remove("active");
      hamburger?.classList.remove("active");
    });
  });

  // Hamburger animation
  hamburger?.addEventListener("click", function () {
    const bars = this.querySelectorAll(".bar");
    if (navMenu.classList.contains("active")) {
      bars[0].style.transform = "rotate(45deg) translate(8px, 8px)";
      bars[1].style.opacity = "0";
      bars[2].style.transform = "rotate(-45deg) translate(7px, -7px)";
    } else {
      bars[0].style.transform = "rotate(0) translate(0, 0)";
      bars[1].style.opacity = "1";
      bars[2].style.transform = "rotate(0) translate(0, 0)";
    }
  });
});

// =============== SMOOTH SCROLLING ===============
document.querySelectorAll("a[href^='#']").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// =============== ACTIVE NAVIGATION HIGHLIGHT ===============
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

// =============== TYPING ANIMATION ===============
function typingAnimation() {
  const typingText = document.querySelector(".typing-text");
  if (!typingText) return;

  const words = ["Frontend Developer", "Web Designer", "Creative Developer", "UI/UX Enthusiast"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayBetweenWords = 2000;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, delayBetweenWords);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(type, speed);
  }

  type();
}

// Start typing animation
typingAnimation();

// =============== SCROLL REVEAL ANIMATION ===============
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements on page load
document.addEventListener("DOMContentLoaded", () => {
  const elementsToObserve = document.querySelectorAll(
    ".skill-card, .service-card, .project-card, .about-text, .contact-info, .contact-form"
  );

  elementsToObserve.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(el);
  });
});

// =============== SCROLL PROGRESS BAR ===============
function updateScrollProgress() {
  const scrollProgress = document.querySelector(".scroll-progress");
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  if (scrollProgress) {
    scrollProgress.style.width = scrollPercent + "%";
  }
}

window.addEventListener("scroll", updateScrollProgress);

// =============== BACK TO TOP BUTTON ===============
function handleBackToTop() {
  const backToTop = document.querySelector(".back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop?.style.display = "flex";
    } else {
      backToTop?.style.display = "none";
    }
  });

  backToTop?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

handleBackToTop();

// =============== FORM HANDLING ===============
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    // Form will be submitted via FormSubmit service
    // Show success message
    setTimeout(() => {
      if (formStatus) {
        formStatus.textContent = "Message sent successfully! ✓";
        formStatus.style.color = "#10b981";
        contactForm.reset();

        setTimeout(() => {
          formStatus.textContent = "";
        }, 3000);
      }
    }, 500);
  });
}

// =============== STICKY NAVBAR EFFECT ===============
let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
  const scrollTop = window.scrollY;

  if (scrollTop > 100) {
    navbar?.style.boxShadow = "0 10px 30px rgba(59, 130, 246, 0.1)";
  } else {
    navbar?.style.boxShadow = "0 0 0 rgba(59, 130, 246, 0)";
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// =============== SKILL CARDS ANIMATION ===============
function animateSkillCards() {
  const skillCards = document.querySelectorAll(".skill-card");

  skillCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const progressFill = this.querySelector(".progress-fill");
      if (progressFill) {
        const percentage = progressFill.style.getPropertyValue("--percentage");
        progressFill.style.strokeDashoffset = 0;
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", animateSkillCards);

// =============== RIPPLE EFFECT ON BUTTONS ===============
function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement("span");

  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";
  ripple.classList.add("ripple");

  button.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", createRipple);
});

// =============== PARALLAX EFFECT ===============
function parallelEffect() {
  const heroSection = document.querySelector(".hero");
  if (!heroSection) return;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const parallaxSpeed = 0.5;

    const floatingShapes = document.querySelectorAll(".floating-shape");
    floatingShapes.forEach((shape, index) => {
      shape.style.transform = `translateY(${scrollTop * parallaxSpeed * (index + 1)}px)`;
    });
  });
}

document.addEventListener("DOMContentLoaded", parallelEffect);

// =============== IMAGE LAZY LOADING ===============
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

document.addEventListener("DOMContentLoaded", lazyLoadImages);

// =============== THEME INITIALIZATION ===============
function initializeTheme() {
  // Check for saved theme preference or default to dark mode
  const currentTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);
}

initializeTheme();

// =============== PAGE LOAD ANIMATION ===============
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Animate hero content on load
  const heroContent = document.querySelector(".hero-content");
  const heroImage = document.querySelector(".hero-image");

  if (heroContent) {
    heroContent.style.animation = "fadeInLeft 0.8s ease-out";
  }
  if (heroImage) {
    heroImage.style.animation = "fadeInRight 0.8s ease-out";
  }
});

// =============== FORM VALIDATION ===============
function validateForm() {
  const inputs = document.querySelectorAll(".form-input");

  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value)) {
          this.style.borderColor = "#ef4444";
        } else {
          this.style.borderColor = "rgba(148, 163, 184, 0.2)";
        }
      } else if (this.value.trim() === "") {
        this.style.borderColor = "#ef4444";
      } else {
        this.style.borderColor = "rgba(148, 163, 184, 0.2)";
      }
    });

    input.addEventListener("focus", function () {
      this.style.borderColor = "#3b82f6";
    });
  });
}

document.addEventListener("DOMContentLoaded", validateForm);

// =============== COUNTER ANIMATION ===============
function animateCounters() {
  const counters = document.querySelectorAll("[data-count]");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    const increment = target / 50;
    let current = 0;

    const updateCount = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = target;
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        updateCount();
        observer.unobserve(counter);
      }
    });

    observer.observe(counter);
  });
}

document.addEventListener("DOMContentLoaded", animateCounters);

// =============== KEYBOARD NAVIGATION ===============
document.addEventListener("keydown", (e) => {
  // Close mobile menu on Escape
  if (e.key === "Escape") {
    const navMenu = document.querySelector(".nav-menu");
    const hamburger = document.querySelector(".hamburger");
    navMenu?.classList.remove("active");
    hamburger?.classList.remove("active");
  }

  // Go to home on Home key
  if (e.key === "Home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

// =============== SCROLL VELOCITY DETECTION ===============
let scrollVelocity = 0;
let lastScrollTime = 0;

window.addEventListener("scroll", () => {
  const now = Date.now();
  const scrollY = window.scrollY;

  if (lastScrollTime) {
    scrollVelocity = Math.abs(scrollY - lastScrollTime) / (now - lastScrollTime);
  }

  lastScrollTime = scrollY;
});

// =============== ACCESSIBILITY IMPROVEMENTS ===============
// Enhance focus visible states
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-nav");
  }
});

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-nav");
});

// =============== PERFORMANCE OPTIMIZATION ===============
// Debounce function
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Apply throttle to scroll events
const throttledScrollHandler = throttle(() => {
  updateScrollProgress();
}, 100);

window.addEventListener("scroll", throttledScrollHandler);

// =============== LOG INITIALIZATION ===============
console.log(
  "%cSujata Yadav Portfolio",
  "color: #3b82f6; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cWelcome to my portfolio! Built with HTML, CSS & JavaScript.",
  "color: #60a5fa; font-size: 14px;"
);

// =============== DOCUMENT READY CHECK ===============
if (
  document.readyState === "loading" ||
  document.readyState === "interactive"
) {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio loaded successfully!");
  });
} else {
  console.log("Portfolio loaded successfully!");
}