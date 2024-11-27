window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    var backToTopButton = document.getElementById('backToTop');
    var backVideo = document.querySelector('.backVideo');

    if (window.scrollY > 50) { // Adjust as needed
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Show or hide the back to top button
    if (window.scrollY > backVideo.clientHeight) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Navbar ClaudeAI HamBurger
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add event listener to the back to top button
document.getElementById('backToTop').addEventListener('click', scrollToTop);