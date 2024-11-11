     
        // contador

            // Defina a data e hora do evento
const eventDate = new Date("November 8, 2024 09:00:00").getTime();

// Atualize o contador a cada segundo
const countdownFunction = setInterval(function() {
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    // Calcule os dias, horas, minutos e segundos restantes
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Exiba o resultado no elemento com id "countdown"
    document.getElementById("countdown").innerHTML = 
        days + "d:" + hours + "h:" + minutes + "m:" + seconds + "s";

    // Se a contagem terminar, exiba uma mensagem
    if (timeLeft < 0) {
        clearInterval(countdownFunction);
        document.getElementById("countdown").innerHTML = "Event started";
    }
}, 1000);





