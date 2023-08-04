document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    function smoothScroll(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        window.scrollTo({
            top: target.offsetTop - 100,
            behavior: 'smooth'
        });
    }

    // Slide-in animations for sections
    const sections = document.querySelectorAll('.slide-in');
    const slideOptions = {
        threshold: 0.5
    };

    const slideObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, slideOptions);

    sections.forEach(section => {
        slideObserver.observe(section);
    });

    // Toggle user menu
    const userMenu = document.querySelector('.user-menu');
    const userMenuToggle = document.querySelector('.user-menu-toggle');
    const loginButton = document.querySelector('.login-button');
    const logoutButton = document.querySelector('.logout-button');

    userMenuToggle.addEventListener('click', function() {
        userMenu.classList.toggle('show');
    });

    // Handle login button
    loginButton.addEventListener('click', function(event) {
        event.preventDefault();
        // Add your login functionality here
        alert('Login clicked');
    });

    // Handle logout button
    logoutButton.addEventListener('click', function(event) {
        event.preventDefault();
        // Add your logout functionality here
        alert('Logout clicked');
    });
});
