// Global Variables
const mainHeader = document.getElementById('main-header');

// NavBar
const navBar = document.getElementById('nav-bar');

// NavBar Trigger
const navBarTrigger = navBar.querySelector('.nav-bar-trigger');

// NavBar Menu
const navBarMenu = navBar.querySelector('.nav-bar-menu');

// NavBar Links
const navBarLinks = [...navBarMenu.querySelectorAll('.nav-bar-link')];

// sections
const sections = [...document.querySelectorAll('section[data-link]')];

// Scroll To Top Button
const scrollToTopButton = document.getElementById('scroll-to-top-button');

// Main Functions
// Function Control Main Header Showing Hiding
function controlMainHeader() {
  if (window.scrollY >= 40) {
    mainHeader.classList.add('scrolled');
  } else {
    mainHeader.classList.remove('scrolled');
  }
}
controlMainHeader();

// Function Add Close Class NavBar Menu
function addClosedClass() {
  navBarMenu.classList.add('closed');
}

// Function Open NavBar Menu
function openNavBarMenu() {
  navBarMenu.removeEventListener('animationend', addClosedClass);
  navBarTrigger.setAttribute('data-state', 'open');
  navBarTrigger.setAttribute('aria-expanded', 'true');
  navBarMenu.setAttribute('data-state', 'open');
  navBarMenu.classList.remove('closed');
}

// Function Close NavBar Menu
function closeNavBarMenu() {
  navBarTrigger.setAttribute('data-state', 'closed');
  navBarTrigger.setAttribute('aria-expanded', 'false');
  navBarMenu.setAttribute('data-state', 'closed');
  navBarMenu.addEventListener('animationend', addClosedClass, {
    once: true,
  });
}

// Function Add Active State To Nav Links On Section Appearing
function activateNavLinks() {
  sections.forEach((section) => {
    const halfScreen = window.innerHeight * 0.5;
    const isVisible =
      section.getBoundingClientRect().top < halfScreen &&
      section.getBoundingClientRect().bottom > halfScreen;
    const navLink = navBarLinks.find(
      (navLink) => navLink.getAttribute('data-section') === section.id
    );
    if (isVisible) navLink.setAttribute('data-state', 'active');
    else navLink.removeAttribute('data-state', 'active');
  });
}
activateNavLinks();

// Function Active Lazy Video On Appearing
function activateLazyVideo() {
  const lazyVideoElement = document.querySelector('.lazy-video');
  if (!lazyVideoElement)
    return window.removeEventListener('scroll', activateLazyVideo);
  const rect = lazyVideoElement.getBoundingClientRect();
  const isVisible = window.innerHeight > rect.top && 0 < rect.bottom;
  if (!isVisible) return;
  const videoSource = lazyVideoElement.children[0];
  videoSource.src = videoSource.dataset.src;
  lazyVideoElement.load();
  lazyVideoElement.classList.remove('lazy-video');
}
activateLazyVideo();

// Function Count Up Stats On Appearing
function countUpStats() {
  const statsSection = document.querySelector('.stats');
  const rect = statsSection.getBoundingClientRect();
  const isVisible = window.innerHeight > rect.top && 0 < rect.bottom;
  if (!isVisible) return;
  const counts = statsSection.querySelectorAll('[data-count]');
  counts.forEach((count) => {
    const countUp = new CountUp(count, count.getAttribute('data-count'), {
      duration: 5,
      easing: 'linear',
    });
    countUp.start();
  });
  window.removeEventListener('scroll', countUpStats);
}
countUpStats();

// Function Add Current Year To Footer
function addYearToFooter() {
  const footerYear = document.getElementById('year');
  const date = new Date();
  const year = date.getFullYear();
  footerYear.textContent = year;
}
addYearToFooter();

// Function Control The Scroll To Top Button Showing And Hiding
function controlScrollToTopButton() {
  if (window.scrollY >= 1000) {
    scrollToTopButton.classList.add('show');
  } else {
    scrollToTopButton.classList.remove('show');
  }
}
controlScrollToTopButton();

// Events
// Event Controlling Main Header
window.addEventListener('scroll', controlMainHeader);

// Event To Open And Close NavBar Menu on Clicking
navBarTrigger.addEventListener('click', () => {
  if (navBarTrigger.getAttribute('data-state') === 'closed') openNavBarMenu();
  else closeNavBarMenu();
});

navBarLinks.forEach((link) =>
  link.addEventListener('click', (event) => {
    event.preventDefault();
    closeNavBarMenu();
    const section = sections.find(
      (section) => section.id === link.getAttribute('data-section')
    );
    section.scrollIntoView();
  })
);

document.addEventListener('click', function (event) {
  if (
    navBarMenu.getAttribute('data-state') === 'open' &&
    !navBar.contains(event.target)
  ) {
    closeNavBarMenu();
  }
});

// Event Activating Lazy Video On Appearing
window.addEventListener('scroll', activateLazyVideo);

// Event Counting Up Stats On Appearing
window.addEventListener('scroll', countUpStats);

// Event Adding Active State To Nav Links On Section Appearing
window.addEventListener('scroll', activateNavLinks);

// Scrolling to Top On Clicking
scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0 });
});

// Event Showing and Hiding The Scroll To Top Button
window.addEventListener('scroll', controlScrollToTopButton);

// WOW
const wow = new WOW({
  animateClass: 'animated',
  offset: 100,
});
wow.init();

// Swiper Home
const homeSwiper = new Swiper('.home', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 'auto',
  pagination: {
    el: '.home .swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.home .swiper-button-next',
    prevEl: '.home .swiper-button-prev',
  },
  autoplay: {
    delay: 5000,
  },
});

// Swiper Testimonials
const testimonialsSwiper = new Swiper('.testimonials-swiper', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 'auto',
  pagination: {
    el: '.testimonials .swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.testimonials .swiper-button-next',
    prevEl: '.testimonials .swiper-button-prev',
  },
  autoplay: {
    delay: 5000,
  },
});

// Mixitup Portfolio
const mixer = mixitup('.portfolio-items');
