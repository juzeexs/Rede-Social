document.addEventListener('DOMContentLoaded', () => {
    // Puxa os dados que foram salvos no momento do login
    const nomeSalvo = localStorage.getItem('usuarioNome');
    const emailSalvo = localStorage.getItem('usuarioEmail');

    // Se a pessoa não estiver logada, manda de volta para o index
    if (!nomeSalvo || !emailSalvo) {
        window.location.href = '/login/index.html';
        return;
    }

    // Coloca os dados na tela
    const nomeElemento = document.getElementById('perfil-nome');
    const emailElemento = document.getElementById('perfil-email');

    if (nomeElemento) nomeElemento.textContent = nomeSalvo;
    if (emailElemento) emailElemento.textContent = emailSalvo;



// ============================================
    // LÓGICA DE EDITAR A BIO
    // ============================================
    const bioElemento = document.getElementById('perfil-bio-texto');
    const btnEditar = document.getElementById('btn-editar-perfil');

    // 1. Carrega a bio salva no LocalStorage (se existir)
    const bioSalva = localStorage.getItem('usuarioBio');
    if (bioSalva && bioElemento) {
        bioElemento.innerHTML = bioSalva; 
    }

    // 2. Evento de clique no botão de editar
    if (btnEditar && bioElemento) {
        btnEditar.addEventListener('click', () => {
            // Verifica se o botão já está no modo "Salvando"
            const estaEditando = btnEditar.classList.contains('editando');

            if (!estaEditando) {
                // --- ENTRA NO MODO DE EDIÇÃO ---
                btnEditar.textContent = "Salvar perfil"; // Muda o texto do botão
                btnEditar.classList.add('editando'); // Marca que está editando
                
                // Pega o elemento atual da bio (seja <p> ou <textarea>)
                const bioAtual = document.getElementById('perfil-bio-texto');
                
                // Transforma os <br> do HTML em quebras de linha reais (\n) para a caixa de texto
                const textoAtual = bioAtual.innerHTML.replace(/<br\s*[\/]?>/gi, '\n');
                
                // Cria a caixa de texto (textarea)
                const textarea = document.createElement('textarea');
                textarea.id = 'perfil-bio-texto'; // Mantém o mesmo ID
                textarea.className = 'bio-edit-textarea'; // Puxa o estilo do CSS
                textarea.value = textoAtual; // Coloca o texto que já estava lá
                
                // Troca o parágrafo pela caixa de texto
                bioAtual.replaceWith(textarea);
                
                // Coloca o cursor piscando direto na caixa de texto
                textarea.focus();
                
            } else {
                // --- SALVA O QUE FOI ESCRITO ---
                const textarea = document.getElementById('perfil-bio-texto');
                const novoTexto = textarea.value;
                
                // Transforma as quebras de linha que o usuário deu (Enter) em <br> pro HTML entender
                const textoFormatado = novoTexto.replace(/\n/g, '<br>'); 
                
                // Salva o novo texto no navegador
                localStorage.setItem('usuarioBio', textoFormatado);
                
                // Cria um parágrafo novo para colocar no lugar da caixa de texto
                const novoP = document.createElement('p');
                novoP.id = 'perfil-bio-texto';
                novoP.innerHTML = textoFormatado;
                
                // Troca a caixa de texto pelo parágrafo
                textarea.replaceWith(novoP);
                
                // Volta o botão ao normal
                btnEditar.textContent = "Editar perfil";
                btnEditar.classList.remove('editando');
            }
        });
    }


    // ============================================
    // LÓGICA DO MODAL DE IMAGENS
    // ============================================
    const modal = document.getElementById("image-modal");
    const imgAmpliada = document.getElementById("img-ampliada");
    // Seleciona todas as imagens que estão dentro do grid
    const imagensGrid = document.querySelectorAll(".grid-item img");

    // Adiciona a função de clique para cada foto do perfil
    imagensGrid.forEach(img => {
        img.addEventListener("click", function() {
            modal.style.display = "flex"; // Mostra o modal
            imgAmpliada.src = this.src;   // Pega a URL da foto clicada e passa para o modal
        });
 
    });

// ============================================
    // LÓGICA DE TROCA DE FOTO DE PERFIL
    // ============================================
    const imgPerfil = document.getElementById('foto-perfil-atual');
    const inputFoto = document.getElementById('input-foto-perfil');

    // 1. Carrega a foto salva do LocalStorage (se existir)
    const fotoSalvaLocal = localStorage.getItem('usuarioFoto');
    if (fotoSalvaLocal && imgPerfil) {
        imgPerfil.src = fotoSalvaLocal;
    }

    // 2. Quando o usuário escolher uma nova foto no input
    if (inputFoto && imgPerfil) {
        inputFoto.addEventListener('change', function(event) {
            const file = event.target.files[0];
            
            if (file) {
                // O FileReader lê o arquivo e transforma em uma URL Base64
                const reader = new FileReader();
                reader.onload = function(e) {
                    const novaFotoBase64 = e.target.result;
                    
                    // Atualiza a imagem na tela
                    imgPerfil.src = novaFotoBase64; 
                    
                    // Salva a nova imagem no navegador
                    localStorage.setItem('usuarioFoto', novaFotoBase64); 
                };
                reader.readAsDataURL(file);
            }
        });
    }





});

// Função para fechar o modal
window.fecharModalImagem = function(event) {
    const modal = document.getElementById("image-modal");
    const closeBtn = document.querySelector(".close-modal");

    // Fecha apenas se o usuário clicar no fundo escuro ou no "X"
    if (event.target === modal || event.target === closeBtn) {
        modal.style.display = "none";
    }
};

/********************muda a foto da pessoa para a que voce clicou na barra de pesquisa**************************************** */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Pega os parâmetros da URL
    const parametrosUrl = new URLSearchParams(window.location.search);
    const usuarioClicado = parametrosUrl.get("usuario");

    // 2. Elementos da tela de perfil (certifique-se de que os IDs existam no seu perfil.html)
    const nomePerfilElemento = document.getElementById("nome-do-perfil");
    const fotoPerfilElemento = document.getElementById("foto-do-perfil");
    const bioPerfilElemento = document.getElementById("bio-do-perfil");

    // 3. Verifica quem foi clicado e atualiza a tela
    if (usuarioClicado === "CarlosDev") {
        nomePerfilElemento.textContent = "Carlos Dev";
        bioPerfilElemento.textContent = "Aluno de Front-end";
        fotoPerfilElemento.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80";
        // Aqui você também pode puxar os posts específicos do Carlos do Firebase!
        
    } else if (usuarioClicado === "ProfAna") {
        nomePerfilElemento.textContent = "Prof. Ana";
        bioPerfilElemento.textContent = "Mentora de UX/UI";
        fotoPerfilElemento.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80";
        
    } // ... adicione os outros usuários ...
    
    // Se não tiver parâmetro, carrega o perfil do próprio usuário logado (seu código atual)
});
