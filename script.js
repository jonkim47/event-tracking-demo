let loginButton;

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    // Handle logout button
    const logoutButton = document.querySelector('.logout-button');
    logoutButton.addEventListener('click', handleLogout);

    // Assign the loginButton value inside the event listener
    loginButton = document.getElementById('login-button');
    loginButton.addEventListener('click', openLoginModal);

    // Handle login modal functionality
    const openModalButton = document.querySelector('.open-modal-button');
    const closeModalButton = document.querySelector('.login-modal .close-modal-button'); 
    const modal = document.querySelector('.login-modal');
    const modalForm = document.getElementById('modal-form');

    openModalButton.addEventListener('click', openLoginModal); 
    closeModalButton.addEventListener('click', closeLoginModal); 
    modalForm.addEventListener('submit', handleModalFormSubmission);

    // Handle contact modal functionality
    const contactModalButton = document.querySelector('.open-contact-modal-button');
    const closeContactModalButton = document.querySelector('.contact-modal .close-modal-button');
    const contactModal = document.querySelector('.contact-modal');
    const contactModalForm = document.getElementById('contact-modal-form');

    contactModalButton.addEventListener('click', openContactModal);
    closeContactModalButton.addEventListener('click', closeContactModal);
    contactModalForm.addEventListener('submit', handleContactFormSubmission);

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

    // Product modals functionality
    const productButtons = document.querySelectorAll('.product-button');
    const productModal = document.querySelector('.product-modal');
    const productDetailsContainer = document.querySelector('.product-details');
    const closeProductModalButton = productModal.querySelector('.close-modal-button');

    // Functions

    function handleModalFormSubmission(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        login(name, email);
        trackLogin(name, email);
        closeLoginModal();
    }

    function handleContactFormSubmission(event) {
        event.preventDefault();
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const phone = document.getElementById('contact-phone').value;
        const jobTitle = document.getElementById('contact-job-title').value;
        const company = document.getElementById('contact-company').value;

        // Process the form data and show a thank you message
        closeContactModal();
        alert('Thank you for contacting us!');
    }

    // Handle logout button
    function handleLogout(event) {
        event.preventDefault();
        logout();
        updateLoginButton();
    }

    // Handle modal functionality
    function openLoginModal() {
        if (!isLoggedIn()) {
            modal.style.display = 'block';
        } else {
            alert('You are already logged in.');
        }
    }

    function closeLoginModal() {
        modal.style.display = 'none';
    }

    // Contact Modal functions
    function openContactModal() {
        contactModal.style.display = 'block';
    }

    function closeContactModal() {
        contactModal.style.display = 'none';
    }

    // Product modals functionality
    function openProductModal() {
        const productId = this.getAttribute('data-product');
        const productDetails = getProductDetails(productId); 

        // Populate the modal content with product details
        productDetailsContainer.innerHTML = `
            <h3>${productDetails.name}</h3>
            <p>${productDetails.description}</p>
            <img id="product-image" src="${productDetails.image}" alt="Product Image">
            <!-- Add more product details here -->
        `;

        // Show the product modal
        productModal.style.display = 'block';

        // Add event listener to the close button inside the product modal
        closeProductModalButton.addEventListener('click', closeProductModal);
    }

    function closeProductModal() {
        productModal.style.display = 'none';
    }

    // Additional functions for login functionality
    // ...

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
        analytics.reset();
        updateLoginButton();
    }

    function trackLogin(name, email) {
        // Replace this with your actual tracking code or other actions
        analytics.identify(email, {
            name: name,
            email: email
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

    function getProductDetails(productId) {
        // Example data for demonstration purposes
        const products = {
            1: {
                name: 'Product 1',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris id ligula condimentum feugiat.',
                price: '$99.99',
                image: 'product1.png',
                // Add more properties as needed
            },
            2: {
                name: 'Product 2',
                description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                price: '$149.99',
                image: 'product2.png',
                // Add more properties as needed
            },
            3: {
                name: 'Product 3',
                description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                price: '$199.99',
                image: 'product3.png',
                // Add more properties as needed
            },
            4: {
                name: 'Product 4',
                description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                price: '$249.99',
                image: 'product4.png',
                // Add more properties as needed
            },
            5: {
                name: 'Product 5',
                description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
                price: '$299.99',
                image: 'product5.png',
                // Add more properties as needed
            },
            6: {
                name: 'Product 6',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit.',
                price: '$349.99',
                image: 'product6.png',
                // Add more properties as needed
            },
        };
    
        return products[productId];
    }

    // Add event listeners for product buttons
    productButtons.forEach(button => {
        button.addEventListener('click', openProductModal);
    });

    // Check login status on page load
    updateLoginButton();
});
