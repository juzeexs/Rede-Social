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