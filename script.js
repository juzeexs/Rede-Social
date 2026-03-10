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


/********************************************************/
// ====================================================
// SISTEMA DE ABA LATERAL DE COMENTÁRIOS
// ====================================================

let postAtualParaComentar = null; // ESSA LINHA É OBRIGATÓRIA AQUI FORA

// 1. Abre o painel lateral
function abrirPainel(icone) {
    postAtualParaComentar = icone.closest('.post');
    
    // Se por acaso não achar o post, cria um aviso no console e para
    if (!postAtualParaComentar) {
        console.log("Erro: O ícone não está dentro de um post.");
        return; 
    }
    
    const painel = document.getElementById('comentarios-painel');
    const overlay = document.getElementById('comentarios-overlay');
    const listaPainel = document.getElementById('lista-comentarios-painel');
    
    // Procura a div invisível
    let containerSalvo = postAtualParaComentar.querySelector('.comentarios-salvos');
    
    // Se a div invisível não existir no HTML, o JS cria ela automaticamente!
    if (!containerSalvo) {
        containerSalvo = document.createElement('div');
        containerSalvo.className = 'comentarios-salvos';
        containerSalvo.style.display = 'none';
        postAtualParaComentar.appendChild(containerSalvo);
    }
    
    // Copia os comentários salvos para a tela do painel
    listaPainel.innerHTML = containerSalvo.innerHTML;

    // Faz o painel deslizar para a tela
    painel.classList.add('open');
    overlay.style.display = 'block';
}

// 2. Fecha o painel lateral
function fecharPainel() {
    document.getElementById('comentarios-painel').classList.remove('open');
    document.getElementById('comentarios-overlay').style.display = 'none';
    postAtualParaComentar = null; 
}

// 3. Publica o comentário
function publicarComentarioPainel() {
    if (!postAtualParaComentar) return; 
    
    const input = document.getElementById('input-comentario-painel');
    let textoComentario = input.value.trim();
    
    if (textoComentario !== '') {
        const nomeSalvo = localStorage.getItem('usuarioNome') || 'Você';
        
        // Aplica a censura (a função censurarMensagem já está no seu arquivo)
        if (typeof censurarMensagem === "function") {
            textoComentario = censurarMensagem(textoComentario);
        }
        
        const novoComentarioHTML = `<p><b>${nomeSalvo}</b> ${textoComentario}</p>`;
        
        document.getElementById('lista-comentarios-painel').innerHTML += novoComentarioHTML;
        postAtualParaComentar.querySelector('.comentarios-salvos').innerHTML += novoComentarioHTML;
        
        input.value = '';
    }
}

// 4. Permite publicar apertando Enter
function verificarEnterPainel(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        publicarComentarioPainel();
    }
}


// ====================================================
// SISTEMA DE STORIES
// ====================================================

let tempoStory; // Variável para controlar o temporizador

function abrirStory(imagemUrl, titulo) {
    const modal = document.getElementById('story-modal');
    const imgStory = document.getElementById('story-image');
    const avatarStory = document.getElementById('story-avatar');
    const tituloStory = document.getElementById('story-username');
    const barraProgresso = document.getElementById('story-progress-bar');

    // 1. Coloca a imagem e o texto corretos no modal
    imgStory.src = imagemUrl;
    avatarStory.src = imagemUrl; // Usando a mesma imagem pro avatar para simplificar
    tituloStory.textContent = titulo;

    // 2. Mostra o modal
    modal.style.display = 'flex';

    // 3. Reseta a barra de progresso para 0% e tira animações velhas
    barraProgresso.style.transition = 'none';
    barraProgresso.style.width = '0%';

    // 4. Inicia a animação de preenchimento após um pequeno atraso (para o CSS reconhecer o 0%)
    setTimeout(() => {
        // Duração do story: 5 segundos (5000ms)
        barraProgresso.style.transition = 'width 5s linear';
        barraProgresso.style.width = '100%';
    }, 50);

    // 5. Agenda o fechamento automático do story após 5 segundos
    clearTimeout(tempoStory); // Limpa temporizadores antigos se o usuário clicar rápido
    tempoStory = setTimeout(() => {
        fecharStory();
    }, 5000);
}

function fecharStory() {
    const modal = document.getElementById('story-modal');
    modal.style.display = 'none';
    clearTimeout(tempoStory); // Para o relógio caso o usuário feche no X antes de acabar
}
