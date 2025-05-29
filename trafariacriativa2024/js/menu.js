     
  
 


    //menu
    function toggleMenu() {
        const menu = document.querySelector('.menu');
        menu.classList.toggle('active');
        if (menu.classList.contains('active')) {
            menu.style.display = 'flex';
        } else {
            menu.style.display = 'none';
        }
    }


// Adiciona o evento de rolagem para ocultar o menu
window.addEventListener('scroll', function() {
    const menu = document.querySelector('.menu');
    if (menu.classList.contains('active')) {
        menu.style.display = 'none'; // Oculta o menu quando a página é rolada
        menu.classList.remove('active'); // Remove a classe active para refletir o estado oculto
    }
});
    

// Adiciona ou remove a classe sticky com base na rolagem da página
document.addEventListener('scroll', function() {
    const menu = document.querySelector('.menu');
    const scrollPosition = window.scrollY;

    // Verifica se a rolagem é maior que 450px
    if (scrollPosition > 100) {
        menu.classList.add('sticky');
    } else {
        menu.classList.remove('sticky');
    }
});