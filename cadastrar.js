import { db } from "./firebase.js";
import { ref, push, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

document.getElementById('cadastroForm').addEventListener('submit', function(event) {

    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('password').value.trim();

    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = '';

    if (nome === '' || email === '' || senha === '') {
        errorDiv.textContent = 'Preencha todos os campos.';
        return;
    }

    if (senha.length < 6) {
        errorDiv.textContent = 'A senha deve ter no mínimo 6 caracteres.';
        return;
    }

    const usuariosRef = ref(db, "usuarios");
    const novoUsuario = push(usuariosRef);

    set(novoUsuario, {
        nome: nome,
        email: email,
        senha: senha
    }).then(() => {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "index.html";
    }).catch((error) => {
        errorDiv.textContent = "Erro ao cadastrar. Tente novamente.";
        console.error(error);
    });

});
