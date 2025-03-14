document.addEventListener('DOMContentLoaded', function() {
    var splashContainer = document.getElementsByClassName('splash-container')[0];
    
    setTimeout(function() {
        splashContainer.classList.add('display-none');
        setTimeout(function() {
            redirectToWebPage();
        }, 3000); 
    }, 2000);
});

function redirectToWebPage() {
    window.location.href = '/Client-Side/HomePage/home.html';
}
