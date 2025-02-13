document.addEventListener('DOMContentLoaded', () => {
    console.log("Website loaded successfully.");

    // Select the Learn More button
    const learnMoreBtn = document.querySelector('.btn');

    // Add a click event listener
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            alert("Learn more about our high-quality coal products!");
        });
    }

    function checkScroll() {
        fadeIns.forEach(element => {
            const position = element.getBoundingClientRect().top;
            if (position < window.innerHeight) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Trigger on load

    // Navigation Highlighting
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
