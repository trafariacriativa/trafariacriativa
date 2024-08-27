document.addEventListener('DOMContentLoaded', function() {
    var allColumns = document.querySelectorAll('.coluna');
    var expandableContent = document.querySelector('.conteudo-expansivel');
    var tabWrapper = document.querySelector('.tab-wrapper'); // Seleciona o tab-wrapper

    // Função para fechar todos os conteúdos e remover a classe selecionada
    function closeAllContents() {
        allColumns.forEach(function(coluna) {
            coluna.classList.remove('expande', 'selected'); // Remove as classes de expande e selected
        });
        expandableContent.style.display = 'none';
        expandableContent.style.maxHeight = '0';
        expandableContent.style.opacity = '0';
        tabWrapper.classList.remove('tab-shift'); // Remove a classe de deslocamento
    }

    // Função para alternar o conteúdo e adicionar a classe de seleção
    function toggleContent(coluna) {
        var isActive = coluna.classList.contains('expande');
        closeAllContents();
        if (!isActive) {
            coluna.classList.add('expande', 'selected'); // Adiciona as classes de expande e selected
            var contentHTML = '';

            // Definindo o conteúdo do texto com base na coluna clicada
            switch (coluna.classList.contains('coluna-1') ? 'coluna-1' :
                    coluna.classList.contains('coluna-2') ? 'coluna-2' :
                    coluna.classList.contains('coluna-3') ? 'coluna-3' : '') {
                case 'coluna-1':
                    contentHTML = `
                        <table>
                            <thead>
                                <tr>
                                    <th>DIA 8</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>09:00-10:00</td>
                                    <td>Atividade 1</td>
                                </tr>
                                <tr>
                                    <td>10:00-11:00</td>
                                    <td>Atividade 2</td>
                                </tr>
                                <!-- Adicione mais linhas conforme necessário -->
                            </tbody>
                        </table>
                    `;
                    break;
                case 'coluna-2':
                    contentHTML = `
                        <table>
                            <thead>
                                <tr>
                                    <th>DIA 9</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>11:00-12:00</td>
                                    <td>Atividade 3</td>
                                </tr>
                                <tr>
                                    <td>12:00-13:00</td>
                                    <td>Atividade 4</td>
                                </tr>
                                <tr>
                                    <td>11:00-12:00</td>
                                    <td>Atividade 3</td>
                                </tr>
                                <tr>
                                    <td>12:00-13:00</td>
                                    <td>Atividade 4</td>
                                </tr><tr>
                                    <td>11:00-12:00</td>
                                    <td>Atividade 3</td>
                                </tr>
                                <tr>
                                    <td>12:00-13:00</td>
                                    <td>Atividade 4</td>
                                </tr><tr>
                                    <td>11:00-12:00</td>
                                    <td>Atividade 3</td>
                                </tr>
                                <tr>
                                    <td>12:00-13:00</td>
                                    <td>Atividade 4</td>
                                </tr><tr>
                                    <td>11:00-12:00</td>
                                    <td>Atividade 3</td>
                                </tr>
                                <tr>
                                    <td>12:00-13:00</td>
                                    <td>Atividade 4</td>
                                </tr>
                                <!-- Adicione mais linhas conforme necessário -->
                            </tbody>
                        </table>
                    `;
                    break;
                case 'coluna-3':
                    contentHTML = `
                        <table>
                            <thead>
                                <tr>
                                    <th>DIA 10</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>13:00-14:00</td>
                                    <td>Atividade 5</td>
                                </tr>
                                <tr>
                                    <td>14:00-15:00</td>
                                    <td>Atividade 6</td>
                                </tr>
                                <!-- Adicione mais linhas conforme necessário -->
                            </tbody>
                        </table>
                    `;
                    break;
                default:
                    contentHTML = '';
            }

            expandableContent.innerHTML = contentHTML;
expandableContent.style.display = 'block';
expandableContent.style.maxHeight = expandableContent.scrollHeight + 'px'; // Ajusta para a altura do conteúdo
expandableContent.style.opacity = '1';
tabWrapper.classList.add('tab-shift'); // Adiciona a classe de deslocamento
        }
    }

    // Adiciona o evento de clique para cada coluna
    allColumns.forEach(function(coluna) {
        coluna.addEventListener('click', function(event) {
            event.stopPropagation();
            toggleContent(coluna);
        });
    });

    // Fecha todos os conteúdos quando clicar fora
    document.addEventListener('click', function() {
        closeAllContents();
    });

    // Fecha todos os conteúdos quando rolar a página
    document.addEventListener('scroll', function() {
        closeAllContents();
    });
});
