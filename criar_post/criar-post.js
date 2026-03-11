import { db } from "../firebase.js";
import { ref, push, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Se não estiver logado, manda pro login
const nomeUsuario = localStorage.getItem("usuarioNome");
const emailUsuario = localStorage.getItem("usuarioEmail");

if (!nomeUsuario || !emailUsuario) {
    window.location.href = "/login/index.html";
}

window.publicar = function () {
    const texto = document.getElementById("input-texto").value.trim();
    const imagem = document.getElementById("input-imagem").value.trim();
    const tag = document.getElementById("input-tag").value;
    const msgErro = document.getElementById("msg-erro");
    const btn = document.getElementById("btn-publicar");

    msgErro.textContent = "";

    if (texto === "") {
        msgErro.textContent = "Escreva algo antes de publicar!";
        return;
    }

    btn.disabled = true;
    btn.textContent = "Publicando...";

    const postsRef = ref(db, "posts");
    const novoPost = push(postsRef);

    set(novoPost, {
        autorNome: nomeUsuario,
        autorEmail: emailUsuario,
        texto: texto,
        imagem: imagem || "",
        tag: tag,
        likes: 0,
        data: new Date().toISOString()
    }).then(() => {
        alert("Post publicado!");
        window.location.href = "/public/rede.html";
    }).catch((error) => {
        msgErro.textContent = "Erro ao publicar. Tente novamente.";
        btn.disabled = false;
        btn.textContent = "Publicar";
        console.error(error);
    });
};