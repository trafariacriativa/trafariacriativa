let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slideshow-slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; /* Esconde todas as imagens */
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block"; /* Mostra a imagem atual */
    setTimeout(showSlides, 5000); /* Muda a imagem a cada 5 segundos */
}

function plusSlides(n) {
    slideIndex += n;
    if (slideIndex > document.getElementsByClassName("slideshow-slide").length) { slideIndex = 1 }
    if (slideIndex < 1) { slideIndex = document.getElementsByClassName("slideshow-slide").length }
    showSlides();
}
