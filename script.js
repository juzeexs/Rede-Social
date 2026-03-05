  function toggleLike(element) {
            element.classList.toggle('liked');
            if(element.classList.contains('liked')) {
                element.innerText = '❤️';
            } else {
                element.innerText = '🤍';
            }
        }


// Executa quando a página rede.html terminar de carregar
document.addEventListener('DOMContentLoaded', () => {
    // Busca os dados salvos no login
    const emailSalvo = localStorage.getItem('usuarioEmail');
    const nomeSalvo = localStorage.getItem('usuarioNome');

    if(emailSalvo) {
        // Encontra os elementos na barra lateral da rede.html
        const nomeElemento = document.querySelector('.sidebar .suggestion-info h4');
        const emailElemento = document.querySelector('.sidebar .suggestion-info p');

        // Atualiza os textos com os dados do usuário
        if(nomeElemento) nomeElemento.textContent = nomeSalvo;
        if(emailElemento) emailElemento.textContent = emailSalvo;
    }
});

/**************filtro de censura de palavroes*********************** */
function censurarMensagem(texto) {
    // Adicione as palavras que deseja bloquear nesta lista
    const palavrasProibidas = ['palavrao1', 'palavrao2', 'ofensa', 'xingamento']; 
    let textoFiltrado = texto;

    palavrasProibidas.forEach(palavra => {
        // Cria uma regra para achar a palavra exata, ignorando maiúsculas e minúsculas
        const regex = new RegExp(`\\b${palavra}\\b`, 'gi');
        textoFiltrado = textoFiltrado.replace(regex, '***');
    });

    return textoFiltrado;
}

// Exemplo de como você vai usar isso no futuro:
// const comentario = "Este projeto é muito palavrao1!";
// const comentarioLimpo = censurarMensagem(comentario); 
// Resultado: "Este projeto é muito ***!"