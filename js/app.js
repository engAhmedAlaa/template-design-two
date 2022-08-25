// Global Variables
// Burger Toggle Menu
const toggleMeue = document.querySelector('header .toggle-menu');
// Link list
const linkList = document.getElementById('menu-navbar');
// Scroll To Top Button
const toTopButton = document.querySelector('.up');

// Main Function
// Showing And Hidding The Scroll To Top Button
function scrollToTopControl() {
    if (window.scrollY >= 1000) {
        toTopButton.classList.add('show');
    } else {
        toTopButton.classList.remove('show');
    }
}

// Events
toggleMeue.addEventListener('click', () => {
    linkList.classList.toggle('active');
});

// Event Showing and Hidding The Scroll To Top Button
window.onscroll = () => {
    scrollToTopControl();
};

// Scrolling to Top On Clicking
toTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0 });
});
