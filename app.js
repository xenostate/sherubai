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

    fetch('https://guarded-reef-00926.herokuapp.com/api/products') // replace with your actual endpoint
        .then(response => response.json())
        .then(data => {
            console.log('Data from backend:', data);
            // Here, you can update the webpage with the fetched data
        })
        .catch(error => console.error('Error fetching data:', error));

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
