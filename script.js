document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    const openModalButton = document.querySelector('.open-modal-button');
    const modal = document.querySelector('.modal');
    const closeModalButton = document.querySelector('.close-modal-button');
    const modalForm = document.getElementById('modal-form');

    const logoutButton = document.querySelector('.logout-button');
    const loginButton = document.getElementById('login-button');  
    
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

    // Handle logout button
    logoutButton.addEventListener('click', function(event) {
        event.preventDefault();
        logout();
        updateLoginButton();
    });

    // Handle opening the modal when the "Login" button is clicked
    openModalButton.addEventListener('click', function() {
        if (!isLoggedIn()) {
            modal.style.display = 'block';
        }
    });

    // Handle closing the modal
    closeModalButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    modalForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        login(name, email); // Call the login function to log the user in

        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    function isLoggedIn() {
        return localStorage.getItem('userLoggedIn') === 'true';
    }

    function login(name, email) {
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        updateLoginButton();
    }

    function logout() {
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('userEmail');
        updateLoginButton();
    }

    function trackLogin(name, email) {
        // Replace this with your actual tracking code or other actions
        analytics.identify("97980cfea0067", {
            name: name,
            email: email,
            plan: "premium",
            logins: 5
        });

        console.log(`Logged in: Name - ${name}, Email - ${email}`);
    }

    function updateLoginButton() {
        if (isLoggedIn()) {
            loginButton.classList.add('logged-in');
            loginButton.textContent = 'Logged In';
        } else {
            loginButton.classList.remove('logged-in');
            loginButton.textContent = 'Login';
        }
    }

    // Check login status on page load
    updateLoginButton();
});
