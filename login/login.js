import { db } from "../firebase.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

document.getElementById('loginForm').addEventListener('submit', function(event) {

    event.preventDefault();

    const emailDigitado = document.getElementById('email').value.trim();
    const senhaDigitada = document.getElementById('password').value.trim();

    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = '';

    const usuariosRef = ref(db, "usuarios");

    get(usuariosRef).then((snapshot) => {

        if (snapshot.exists()) {

            let usuarioEncontrado = false;

            snapshot.forEach((childSnapshot) => {

                const usuario = childSnapshot.val();

                if (usuario.email === emailDigitado && usuario.senha === senhaDigitada) {

                    usuarioEncontrado = true;

                    localStorage.setItem("usuarioNome", usuario.nome);
                    localStorage.setItem("usuarioEmail", usuario.email);

                    window.location.href = "/public/rede.html";
                }
            });

            if (!usuarioEncontrado) {
                errorDiv.textContent = "Email ou senha incorretos.";
            }

        } else {
            errorDiv.textContent = "Nenhum usuário cadastrado ainda.";
        }

    }).catch((error) => {
        errorDiv.textContent = "Erro ao conectar com o banco de dados.";
        console.error(error);
    });

});
































