document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Pegamos o que o usuário digitou no login
    const emailDigitado = document.getElementById('email').value.trim();
    const senhaDigitada = document.getElementById('password').value.trim();
    
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = '';
    errorDiv.style.color = 'red'; 

    // 1. Campos vazios
    if (emailDigitado === '' || senhaDigitada === '') {
        errorDiv.textContent = 'Por favor, preencha o e-mail e a senha.';
        return; 
    }

    // 2. Bloqueio de segurança: Tem que ser @aluno.senai.br
    if (!emailDigitado.toLowerCase().endsWith('@aluno.senai.br')) {
        errorDiv.textContent = 'Acesso negado: O e-mail deve terminar com @aluno.senai.br';
        return; 
    }

    // 3. Puxar dados que foram salvos no Cadastro
    const emailCadastrado = localStorage.getItem('emailCadastrado');
    const senhaCadastrada = localStorage.getItem('senhaCadastrada');
    const nomeCadastrado = localStorage.getItem('nomeCadastrado');

    // 4. Verifica se existe cadastro
    if (!emailCadastrado || !senhaCadastrada) {
        errorDiv.textContent = 'Nenhum cadastro encontrado. Por favor, cadastre-se primeiro.';
        return;
    }

    // 5. Verifica se o e-mail e a senha digitados são IGUAIS aos do cadastro
    if (emailDigitado !== emailCadastrado || senhaDigitada !== senhaCadastrada) {
        errorDiv.textContent = 'E-mail ou senha incorretos. Tente novamente.';
        return;
    }

    // --- SUCESSO! ---
    // Salva os dados com os nomes exatos que o seu arquivo script.js usa na rede.html
    localStorage.setItem('usuarioEmail', emailDigitado);
    localStorage.setItem('usuarioNome', nomeCadastrado);

    // Redireciona para a rede!
    window.location.href = 'rede.html';
});