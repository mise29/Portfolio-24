// script.js
let slideIndex = 0;

function moveSlide(n) {
    const slides = document.querySelectorAll('.slide');
    slideIndex += n;

    if (slideIndex >= slides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }

    const newTransformValue = `translateX(-${slideIndex * 100}%)`;
    document.querySelector('.slides').style.transform = newTransformValue;
}
