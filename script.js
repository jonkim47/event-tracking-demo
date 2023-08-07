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
        trackLogin(name, email);

        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Product modals functionality

    const productButtons = document.querySelectorAll('.product-button');
    const productModal = document.querySelector('.product-modal');
    const productDetailsContainer = document.querySelector('.product-details');

    productButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            const productDetails = getProductDetails(productId); // Replace with your own function to get product details

            // Populate the modal content with product details
            productDetailsContainer.innerHTML = `
                <h3>${productDetails.name}</h3>
                <p>${productDetails.description}</p>
                <img id="product-image" src="${productDetails.image}" alt="Product Image">
                <!-- Add more product details here -->
            `;

            // Show the product modal
            productModal.style.display = 'block';
        });
    });

    const closeProductModalButton = document.querySelector('.close-product-modal-button');
    closeProductModalButton.addEventListener('click', function() {
        productModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === productModal) {
            productModal.style.display = 'none';
        }
    });

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
    


    // Login Functionality

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

    // Check login status on page load
    updateLoginButton();
});
