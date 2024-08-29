

//slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

setInterval(() => {
    slides[currentSlide].classList.remove('active');
    slides[currentSlide].classList.add('next');
    indicators[currentSlide].classList.remove('active');

    currentSlide = (currentSlide + 1) % totalSlides;
    
    slides[currentSlide].classList.remove('next');
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}, 10000); // Muda de slide a cada 10 segundos



