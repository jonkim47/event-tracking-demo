document.addEventListener('DOMContentLoaded', function() {
    const userMenu = document.querySelector('.user-menu');
    const loginButton = userMenu.querySelector('a:first-child');
    const logoutButton = userMenu.querySelector('a:last-child');

    loginButton.addEventListener('click', function(event) {
        event.preventDefault();
        // Add your login functionality here
        alert('Login clicked');
    });

    logoutButton.addEventListener('click', function(event) {
        event.preventDefault();
        // Add your logout functionality here
        alert('Logout clicked');
    });

    // ... Add more JavaScript functionality ...
});
