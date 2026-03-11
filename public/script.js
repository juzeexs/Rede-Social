import { db } from "../firebase.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// ============================================
// DADOS DO USUÁRIO LOGADO
// ============================================
const nomeUsuario = localStorage.getItem("usuarioNome");
const emailUsuario = localStorage.getItem("usuarioEmail");

// Atualiza sidebar com nome e email do usuário logado
document.addEventListener("DOMContentLoaded", () => {
    const sidebarNome = document.getElementById("sidebar-nome");
    const sidebarEmail = document.getElementById("sidebar-email");
    if (sidebarNome && nomeUsuario) sidebarNome.textContent = nomeUsuario;
    if (sidebarEmail && emailUsuario) sidebarEmail.textContent = emailUsuario;

    // Foto de perfil salva
    const fotoSalva = localStorage.getItem('usuarioFoto');
    const sidebarFoto = document.getElementById('sidebar-foto-perfil');
    if (fotoSalva && sidebarFoto) sidebarFoto.src = fotoSalva;
});

// ============================================
// CARREGA POSTS DO FIREBASE EM TEMPO REAL
// ============================================
const postsRef = ref(db, "posts");

onValue(postsRef, (snapshot) => {
    const feedDiv = document.getElementById("feed-posts");
    feedDiv.innerHTML = "";

    if (!snapshot.exists()) {
        feedDiv.innerHTML = `<p style="text-align:center; color: var(--text-muted); margin-top: 40px;">
            Nenhum post ainda. <a href="/criar_post/criar-post.html">Seja o primeiro a publicar!</a>
        </p>`;
        return;
    }

    const posts = [];
    snapshot.forEach((child) => {
        posts.push({ id: child.key, ...child.val() });
    });
    posts.reverse();

    posts.forEach((post) => {
        feedDiv.innerHTML += criarCardPost(post);
    });
});

// ============================================
// MONTA O HTML DE CADA POST
// ============================================
function criarCardPost(post) {
    const imagemHTML = post.imagem
        ? `<img src="${post.imagem}" alt="Post imagem" class="post-image" onerror="this.style.display='none'">`
        : "";

    const dataFormatada = post.data
        ? new Date(post.data).toLocaleDateString("pt-BR")
        : "";

    return `
        <article class="post" data-id="${post.id}">
            <div class="post-header">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&q=80" alt="Avatar" class="post-avatar">
                <span class="post-user">${post.autorNome}</span>
                <span class="post-tag">${post.tag}</span>
            </div>

            ${imagemHTML}

            <div class="post-actions">
                <span class="like-btn" onclick="toggleLike(this)">🤍</span>
                <span class="action-icon" onclick="abrirPainel(this)">💬</span>
            </div>

            <div class="post-content">
                <span class="post-likes">${post.likes || 0} curtidas</span>
                <p><strong>${post.autorNome}</strong> ${post.texto}</p>
                <span style="font-size:0.75rem; color: var(--text-muted);">${dataFormatada}</span>
            </div>
        </article>
    `;
}

// ============================================
// LIKE (local)
// ============================================
window.toggleLike = function (element) {
    element.classList.toggle("liked");
    const postContent = element.closest(".post").querySelector(".post-likes");
    const likesAtuais = parseInt(postContent.textContent) || 0;

    if (element.classList.contains("liked")) {
        element.innerText = "❤️";
        postContent.textContent = `${likesAtuais + 1} curtidas`;
    } else {
        element.innerText = "🤍";
        postContent.textContent = `${Math.max(0, likesAtuais - 1)} curtidas`;
    }
};

// ============================================
// FILTRO DE PALAVRÕES
// ============================================
function censurarMensagem(texto) {
    const palavrasProibidas = ["palavrao1", "palavrao2", "ofensa", "xingamento"];
    let textoFiltrado = texto;
    palavrasProibidas.forEach((palavra) => {
        const regex = new RegExp(`\\b${palavra}\\b`, "gi");
        textoFiltrado = textoFiltrado.replace(regex, "***");
    });
    return textoFiltrado;
}

// ============================================
// PAINEL DE COMENTÁRIOS
// ============================================
let postAtualParaComentar = null;

window.abrirPainel = function (icone) {
    postAtualParaComentar = icone.closest(".post");
    if (!postAtualParaComentar) return;

    const painel = document.getElementById("comentarios-painel");
    const overlay = document.getElementById("comentarios-overlay");
    const listaPainel = document.getElementById("lista-comentarios-painel");

    let containerSalvo = postAtualParaComentar.querySelector(".comentarios-salvos");
    if (!containerSalvo) {
        containerSalvo = document.createElement("div");
        containerSalvo.className = "comentarios-salvos";
        containerSalvo.style.display = "none";
        postAtualParaComentar.appendChild(containerSalvo);
    }

    listaPainel.innerHTML = containerSalvo.innerHTML || "<p style='color:var(--text-muted); font-size:0.85rem;'>Nenhum comentário ainda.</p>";

    painel.classList.add("open");
    overlay.style.display = "block";
};

window.fecharPainel = function () {
    document.getElementById("comentarios-painel").classList.remove("open");
    document.getElementById("comentarios-overlay").style.display = "none";
    postAtualParaComentar = null;
};

window.publicarComentarioPainel = function () {
    if (!postAtualParaComentar) return;

    const input = document.getElementById("input-comentario-painel");
    let textoComentario = input.value.trim();

    if (textoComentario !== "") {
        const nome = nomeUsuario || "Você";
        textoComentario = censurarMensagem(textoComentario);

        const novoHTML = `<p><b>${nome}</b> ${textoComentario}</p>`;
        const listaPainel = document.getElementById("lista-comentarios-painel");

        if (listaPainel.querySelector("p[style]")) {
            listaPainel.innerHTML = "";
        }

        listaPainel.innerHTML += novoHTML;

        let containerSalvo = postAtualParaComentar.querySelector(".comentarios-salvos");
        if (!containerSalvo) {
            containerSalvo = document.createElement("div");
            containerSalvo.className = "comentarios-salvos";
            containerSalvo.style.display = "none";
            postAtualParaComentar.appendChild(containerSalvo);
        }
        containerSalvo.innerHTML += novoHTML;
        input.value = "";
    }
};

window.verificarEnterPainel = function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        publicarComentarioPainel();
    }
};

// ============================================
// SISTEMA DE STORIES
// ============================================
let storyTimer;
let progressoStory = 0;

window.abrirStory = function (imgUrl) {
    const overlay = document.getElementById("story-overlay");
    const storyImg = document.getElementById("story-image");
    const progressBar = document.getElementById("story-progress-bar");
    const storyUsername = document.getElementById("story-username");
    const storyAvatar = document.getElementById("story-avatar");

    storyImg.src = imgUrl;
    if(storyUsername) storyUsername.textContent = "SENAI Connect";
    if(storyAvatar) storyAvatar.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&q=80";

    overlay.style.display = "flex";
    progressoStory = 0;
    progressBar.style.width = "0%";
    clearInterval(storyTimer);

    storyTimer = setInterval(() => {
        progressoStory += 1;
        progressBar.style.width = progressoStory + "%";
        if (progressoStory >= 100) fecharStory();
    }, 50);
};

window.fecharStory = function () {
    document.getElementById("story-overlay").style.display = "none";
    clearInterval(storyTimer);
};

// ============================================
// SISTEMA DE BUSCA
// ============================================
const usuariosBuscaMock = [
    { nome: "Prof. Ana", subtitulo: "Mentora de UX/UI", foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80", link: "/perfil/perfil.html" },
    { nome: "Clube do Python", subtitulo: "Comunidade • 5k membros", foto: "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=100&q=80", link: "#" },
    { nome: "Carlos Dev", subtitulo: "Aluno de Front-end", foto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80", link: "#" },
    { nome: "Mariana Silva", subtitulo: "Professora de Back-end", foto: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80", link: "#" }
];

document.addEventListener("DOMContentLoaded", () => {
    const inputBusca = document.getElementById("input-busca");
    const caixaResultados = document.getElementById("resultados-busca");

    if (inputBusca && caixaResultados) {
        inputBusca.addEventListener("input", (e) => {
            const termo = e.target.value.toLowerCase().trim();

            if (termo.length === 0) {
                caixaResultados.style.display = "none";
                caixaResultados.innerHTML = "";
                return;
            }

            const resultados = usuariosBuscaMock.filter(user =>
                user.nome.toLowerCase().includes(termo) ||
                user.subtitulo.toLowerCase().includes(termo)
            );

            if (resultados.length > 0) {
                caixaResultados.innerHTML = resultados.map(user => `
                    <a href="${user.link}" class="resultado-item">
                        <img src="${user.foto}" alt="${user.nome}">
                        <div class="resultado-info">
                            <h4>${user.nome}</h4>
                            <p>${user.subtitulo}</p>
                        </div>
                    </a>
                `).join('');
            } else {
                caixaResultados.innerHTML = `
                    <div class="resultado-item" style="justify-content: center; cursor: default;">
                        <p style="color: var(--text-muted); margin: 0;">Nenhum usuário encontrado.</p>
                    </div>`;
            }

            caixaResultados.style.display = "block";
        });

        document.addEventListener("click", (e) => {
            if (!e.target.closest('.search-bar')) {
                caixaResultados.style.display = "none";
            }
        });
    }
});