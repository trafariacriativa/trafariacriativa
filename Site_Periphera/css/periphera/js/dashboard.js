
    // Função para animar os contadores
    function animateCounter(element, start, end, duration) {
        let startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        }

        window.requestAnimationFrame(step);
    }

    // Atualiza os contadores
    document.addEventListener('DOMContentLoaded', function() {
        const eventCounter = document.getElementById('eventCounter');
        const visitorCounter = document.getElementById('visitorCounter');
        const viewerCounter = document.getElementById('viewerCounter');

        animateCounter(eventCounter, 0, 150, 2000);   // Evento: de 0 a 150 em 2 segundos
        animateCounter(visitorCounter, 0, 2000, 2500); // Visitantes: de 0 a 2000 em 2.5 segundos
        animateCounter(viewerCounter, 0, 1200, 2200);  // Viewers: de 0 a 1200 em 2.2 segundos
    });