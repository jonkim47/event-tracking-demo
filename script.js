document.addEventListener('DOMContentLoaded', function() {
    const openModalButton = document.querySelector('.open-modal-button');
    const modal = document.querySelector('.modal');
    const closeModalButton = document.querySelector('.close-modal-button');
    const modalForm = document.getElementById('modal-form');

    const logoutButton = document.querySelector('.logout-button');

    const navLinks = document.querySelectorAll('nav a');
    
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

    logoutButton.addEventListener('click', function(event) {
        event.preventDefault();
        // Add your logout functionality here
        alert('Logout clicked');
    });

    openModalButton.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    closeModalButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    modalForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const contact = document.getElementById('contact').value;
        
        // Perform tracking or any other action you need
        trackLogin(name, contact);

        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    function trackLogin(name, contact) {
        // Replace this with your actual tracking code or other actions
        console.log(`Logged in: Name - ${name}, Contact - ${contact}`);
    }
});
