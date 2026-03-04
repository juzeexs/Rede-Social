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

            // 2. Regra de validação do email SENAI
            // Pega o que vem depois do "@" e verifica se inclui a palavra "senai"
            const dominio = email.split('@')[1]; 
            
            if (!dominio || !dominio.toLowerCase().includes('senai')) {
                errorDiv.textContent = 'Somente usuários com email senai podem entrar na rede.';
                return; // Para a execução do código aqui
            }

            // Se passar por todas as validações, redireciona para a página principal
            window.location.href = 'rede.html';
        });
