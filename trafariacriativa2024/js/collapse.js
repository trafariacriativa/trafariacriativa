function openTab(event, dayId) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    var selectedTabContent = document.getElementById(dayId);
    if (selectedTabContent.style.display === "block") {
        selectedTabContent.style.display = "none";
        event.currentTarget.className = event.currentTarget.className.replace(" active", "");
    } else {
        selectedTabContent.style.display = "block";
        event.currentTarget.className += " active";
    }
}

// Fechar ao clicar no conteúdo
document.querySelectorAll('.tab-content').forEach(content => {
    content.addEventListener('click', function() {
        this.style.display = 'none';
        var tab = document.querySelector(`.tab[onclick="openTab(event, '${this.id}')"]`);
        if (tab) {
            tab.className = tab.className.replace(" active", "");
        }
    });
});
