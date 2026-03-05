document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que a página recarregue

    // Pegamos os valores dos campos
    const nomeNovo = document.getElementById('nome').value.trim();
    const emailNovo = document.getElementById('email').value.trim();
    const senhaNova = document.getElementById('password').value.trim();
    
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = '';

    // Barra e-mails que não são do Senai logo no cadastro
    if (!emailNovo.toLowerCase().endsWith('@aluno.senai.br')) {
        errorDiv.textContent = 'Erro: O e-mail deve terminar com @aluno.senai.br';
        return;
    }

    if (senhaNova.length < 6) {
        errorDiv.textContent = 'Erro: A senha deve ter pelo menos 6 caracteres.';
        return;
    }

    // Salva os dados na memória do navegador (localStorage)
    localStorage.setItem('nomeCadastrado', nomeNovo);
    localStorage.setItem('emailCadastrado', emailNovo);
    localStorage.setItem('senhaCadastrada', senhaNova);

    // Avisa que deu certo e manda para a tela de login
    alert('Cadastro realizado com sucesso! Faça seu login.');
    window.location.href = 'index.html'; 
});