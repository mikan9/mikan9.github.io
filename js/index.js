const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');
const topButton = document.querySelector('.top-button');

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    });
});

window.addEventListener("scroll", () => {
    // pageYOffset >= 200 ? topButton.style.display = '' : topButton.style.display = 'none';
    if (pageYOffset >= 200) {
        topButton.classList.add('top-button--show');
        topButton.classList.remove('top-button--hide');
    } else {
        topButton.classList.add('top-button--hide');
        topButton.classList.remove('top-button--show');
    }
});