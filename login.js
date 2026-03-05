 import { app } from './firebase/config.js';

console.log("Firebase conectado com sucesso!", app.options.projectId);
 
 
 document.getElementById('loginForm').addEventListener('submit', function(event) {
            // Evita que a página recarregue ao clicar no botão
            event.preventDefault();

            // Pega os valores digitados e remove os espaços em branco nas pontas (.trim())
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const errorDiv = document.getElementById('error-message');

            // Limpa mensagens de erro antigas
            errorDiv.textContent = '';

            // 1. Regra de campos vazios
            if (email === '' || password === '') {
                errorDiv.textContent = 'Por favor, digite os dados pedidos nos campos vazios.';
                return; // Para a execução do código aqui
            }

           

           // Se passar por todas as validações, salva os dados e redireciona
            // Pega o que vem antes do @ para ser o nome de usuário provisório
            const nomeUsuario = email.split('@')[0]; 
            
            // Salva no navegador
            localStorage.setItem('usuarioEmail', email);
            localStorage.setItem('usuarioNome', nomeUsuario);

            // Redireciona para a página principal
            window.location.href = 'rede.html';


        });
