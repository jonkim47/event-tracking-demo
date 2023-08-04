document.addEventListener('DOMContentLoaded', function() {
    const button1 = document.getElementById('button1');
    const button2 = document.getElementById('button2');

    button1.addEventListener('click', function() {
        console.log('Button 1 clicked');
    });

    button2.addEventListener('click', function() {
        console.log('Button 2 clicked');
    });
});
