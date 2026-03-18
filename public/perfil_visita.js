// Base de dados simulada mais completa (tipo rede social)
const baseDeDadosUsuarios = {
    "prof_joao": { 
        nome: "João Silva", 
        subtitulo: "Professor de Front-end no SENAI", 
        bio: "Apaixonado por tecnologia, códigos e ensinar. HTML, CSS, JS e React. 💻☕",
        foto: "https://i.pravatar.cc/150?img=11",
        capa: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
        conexoes: 1250,
        posts: [
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=60",
            "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=400&q=60",
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=60",
            "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&w=400&q=60"
        ]
    },
    "aluno_carlos": { 
        nome: "Carlos Eduardo", 
        subtitulo: "Aluno de Redes - SENAI", 
        bio: "Estudando infraestrutura, servidores e segurança. Futuro SysAdmin. 🚀",
        foto: "https://i.pravatar.cc/150?img=12",
        capa: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
        conexoes: 145,
        posts: [
            "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=400&q=60",
            "https://images.unsplash.com/photo-1515524738708-327f6b0037a7?auto=format&fit=crop&w=400&q=60"
        ]
    },

    "prof_ana": { 
        nome: "Ana Oliveira", 
        subtitulo: "Professora e Gestora de TI - SENAI", 
        bio: "A liderar a inovação na educação tecnológica. Especialista em Gestão de Projetos Ágeis (Scrum/Kanban) e desenvolvimento de equipas de alta performance. 📊💡",
        foto: "https://i.pravatar.cc/150?img=47",
        capa: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80", // Uma capa de equipa a trabalhar junta
        conexoes: 3420,
        posts: [
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=60", // Foto de uma reunião/mentoria
            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=400&q=60", // Foto de planeamento de projeto/post-its
            "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=400&q=60"  // Foto de um evento de tecnologia
        ]
    },

// Adicione o bloco abaixo:
    "clube_python": {
        nome: "Clube do Python",
        subtitulo: "Comunidade • 5.000 membros",
        bio: "O maior grupo de estudos de Python do SENAI. Compartilhamos dicas, dúvidas, vagas e projetos open-source! 🐍🚀",
        foto: "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=100&q=80",
        capa: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1000&q=80", // Capa de código matrix/python
        conexoes: 5000,
        posts: [
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=60",
            "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=400&q=60"
        ]
    }





};









// Captura o ID da URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

if (userId && baseDeDadosUsuarios[userId]) {
    const usuario = baseDeDadosUsuarios[userId];
    
    // Preenche as informações do cabeçalho
    document.getElementById('visita-nome').textContent = usuario.nome;
    document.getElementById('visita-subtitulo').textContent = usuario.subtitulo;
    document.getElementById('visita-bio').textContent = usuario.bio;
    document.getElementById('visita-foto').src = usuario.foto;
    document.getElementById('visita-capa').src = usuario.capa;
    
    // Preenche os números
    document.getElementById('visita-conexoes').textContent = usuario.conexoes;
    document.getElementById('visita-publicacoes').textContent = usuario.posts.length;

    // Renderiza as fotos do feed do usuário
    const gridPosts = document.getElementById('visita-posts');
    usuario.posts.forEach(postUrl => {
        const img = document.createElement('img');
        img.src = postUrl;
        img.className = 'post-item';
        gridPosts.appendChild(img);
    });

} else {
    document.getElementById('visita-nome').textContent = "Usuário não encontrado";
    document.querySelector('.info-perfil').innerHTML = "<h2>Este perfil não existe ou foi removido.</h2>";
}

// Lógica simples para o botão de conectar
let conectado = false;
function alternarConexao() {
    const btn = document.getElementById('btn-seguir');
    const numConexoes = document.getElementById('visita-conexoes');
    let atual = parseInt(numConexoes.textContent);

    if(!conectado) {
        btn.textContent = "✔ Conectado";
        btn.style.backgroundColor = "#28a745"; // Verde
        numConexoes.textContent = atual + 1;
        conectado = true;
    } else {
        btn.textContent = "Conectar +";
        btn.style.backgroundColor = "var(--primary-color)";
        numConexoes.textContent = atual - 1;
        conectado = false;
    }
}