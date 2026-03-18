import { db, app } from "../firebase.js"; // Certifique-se de exportar 'app' no seu firebase.js
import { ref as dbRef, push, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// Inicializa o Storage do Firebase
const storage = getStorage(app);

// Validação de Login
const nomeUsuario = localStorage.getItem("usuarioNome");
const emailUsuario = localStorage.getItem("usuarioEmail");

if (!nomeUsuario || !emailUsuario) {
    window.location.href = "/login/index.html";
} else {
    document.getElementById("display-username").textContent = nomeUsuario;
}

// Elementos da tela
const fileUpload = document.getElementById("file-upload");
const imagePreview = document.getElementById("image-preview");
const uploadPlaceholder = document.getElementById("upload-placeholder");
const btnCompartilhar = document.getElementById("btn-compartilhar");
const inputLegenda = document.getElementById("input-legenda");

let arquivoSelecionado = null;

// 1. Mostrar o preview da imagem quando selecionada
fileUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        arquivoSelecionado = file;
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = "block"; // Mostra a imagem
            uploadPlaceholder.style.display = "none"; // Esconde os ícones e botão de upload
        };
        reader.readAsDataURL(file);
    }
});

// 2. Fazer Upload e Publicar no Firebase
btnCompartilhar.addEventListener("click", async () => {
    const legenda = inputLegenda.value.trim();

    if (!arquivoSelecionado) {
        alert("Por favor, selecione uma imagem antes de compartilhar!");
        return;
    }

    // Muda o botão para mostrar que está carregando
    btnCompartilhar.disabled = true;
    btnCompartilhar.textContent = "Publicando...";

    try {
        // Passo 1: Fazer o upload da imagem pro Firebase Storage
        const nomeDaImagem = `posts/${Date.now()}_${arquivoSelecionado.name}`;
        const sRef = storageRef(storage, nomeDaImagem);
        const snapshot = await uploadBytes(sRef, arquivoSelecionado);
        
        // Passo 2: Pegar o link da imagem que acabou de ser "upada"
        const imageUrl = await getDownloadURL(snapshot.ref);

        // Passo 3: Salvar os dados do Post no Realtime Database
        const postsRef = dbRef(db, "posts");
        const novoPost = push(postsRef);

        await set(novoPost, {
            autorNome: nomeUsuario,
            autorEmail: emailUsuario,
            texto: legenda,
            imagem: imageUrl, // Aqui salvamos o link gerado pelo Storage
            likes: 0,
            data: new Date().toISOString()
        });

        alert("Post publicado com sucesso!");
        window.location.href = "/public/rede.html"; // Redireciona para o feed

    } catch (error) {
        console.error("Erro ao publicar:", error);
        alert("Erro ao publicar a imagem. Tente novamente.");
        btnCompartilhar.disabled = false;
        btnCompartilhar.textContent = "Compartilhar";
    }
});