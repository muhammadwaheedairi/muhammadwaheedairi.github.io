// DOM Elements
const header = document.getElementById("header")
const hamburger = document.getElementById("hamburger")
const nav = document.getElementById("nav")
const themeToggle = document.getElementById("themeToggle")
const navLinks = document.querySelectorAll(".nav-link")
const lightbox = document.getElementById("lightbox")
const lightboxImage = document.getElementById("lightboxImage")
const lightboxTitle = document.getElementById("lightboxTitle")
const lightboxDesc = document.getElementById("lightboxDesc")

// Gallery data
const galleryData = [
  {
    src: "images/gallery-1.jpg",
    title: "Travel Adventures",
    description: "Exploring new horizons and discovering beautiful places around the world.",
  },
  {
    src: "images/gallery-2.jpg",
    title: "Tech Setup",
    description: "My coding workspace where all the magic happens.",
  },
  {
    src: "images/gallery-3.jpg",
    title: "Creative Works",
    description: "Artistic expressions and creative projects I'm passionate about.",
  },
  {
    src: "images/gallery-4.jpg",
    title: "Daily Moments",
    description: "Capturing the beauty in everyday life and special moments.",
  },
  {
    src: "images/gallery-5.jpg",
    title: "Nature Walks",
    description: "Finding peace and inspiration in the great outdoors.",
  },
  {
    src: "images/gallery-6.jpg",
    title: "Learning Journey",
    description: "Continuous growth and development in technology and life.",
  },
]

let currentLightboxIndex = 0

// Header scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }

  // Update active navigation link
  updateActiveNavLink()
})

// Hamburger menu toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  nav.classList.toggle("active")
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    nav.classList.remove("active")
  })
})

// Theme toggle functionality
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  document.documentElement.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)

  // Update theme toggle icon
  const icon = themeToggle.querySelector("i")
  if (newTheme === "dark") {
    icon.className = "fas fa-sun"
  } else {
    icon.className = "fas fa-moon"
  }
})

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "light"
document.documentElement.setAttribute("data-theme", savedTheme)
const themeIcon = themeToggle.querySelector("i")
if (savedTheme === "dark") {
  themeIcon.className = "fas fa-sun"
} else {
  themeIcon.className = "fas fa-moon"
}

// Smooth scrolling function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    const headerHeight = header.offsetHeight
    const sectionTop = section.offsetTop - headerHeight

    window.scrollTo({
      top: sectionTop,
      behavior: "smooth",
    })
  }
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]")
  const scrollPosition = window.scrollY + header.offsetHeight + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Remove active class from all links
      navLinks.forEach((link) => link.classList.remove("active"))
      // Add active class to current link
      if (navLink) {
        navLink.classList.add("active")
      }
    }
  })
}

// Lightbox functionality
function openLightbox(imageSrc, index) {
  currentLightboxIndex = index
  const data = galleryData[index]

  lightboxImage.src = imageSrc
  lightboxTitle.textContent = data.title
  lightboxDesc.textContent = data.description
  lightbox.style.display = "flex"
  document.body.style.overflow = "hidden"

  // Add fade-in animation
  lightbox.style.opacity = "0"
  setTimeout(() => {
    lightbox.style.opacity = "1"
  }, 10)
}

function closeLightbox() {
  lightbox.style.opacity = "0"
  setTimeout(() => {
    lightbox.style.display = "none"
    document.body.style.overflow = "auto"
  }, 300)
}

function lightboxNav(direction) {
  currentLightboxIndex += direction

  if (currentLightboxIndex >= galleryData.length) {
    currentLightboxIndex = 0
  } else if (currentLightboxIndex < 0) {
    currentLightboxIndex = galleryData.length - 1
  }

  const data = galleryData[currentLightboxIndex]
  lightboxImage.src = data.src
  lightboxTitle.textContent = data.title
  lightboxDesc.textContent = data.description
}

// Close lightbox when clicking outside the image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox()
  }
})

// Close lightbox with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.style.display === "flex") {
    closeLightbox()
  }
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowLeft") {
      lightboxNav(-1)
    } else if (e.key === "ArrowRight") {
      lightboxNav(1)
    }
  }
})

// Smooth scroll for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href").substring(1)
    scrollToSection(targetId)
  })
})

// Add scroll animations for elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for scroll animations
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".social-card, .gallery-item, .text-block, .contact-item")

  animatedElements.forEach((el, index) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    el.style.transitionDelay = `${index * 0.1}s`
    observer.observe(el)
  })
})

// Enhanced social media card animations
document.querySelectorAll(".social-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const icon = card.querySelector(".social-icon")
    icon.style.transform = "scale(1.1) rotate(5deg)"
  })

  card.addEventListener("mouseleave", () => {
    const icon = card.querySelector(".social-icon")
    icon.style.transform = "scale(1) rotate(0deg)"
  })
})

// Add click animation for social buttons
document.querySelectorAll(".social-btn, .cta-button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const ripple = document.createElement("span")
    const rect = btn.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    btn.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const rate = scrolled * -0.3

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`
  }
})

// Performance optimization: Lazy load images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src || img.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
}

// Add CSS for ripple effect
const style = document.createElement("style")
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .social-btn, .cta-button {
    position: relative;
    overflow: hidden;
  }
`
document.head.appendChild(style)
