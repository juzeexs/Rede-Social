document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita recarregar a página

    // Pega os dados que o usuário está tentando usar para logar
    const emailDigitado = document.getElementById('email').value.trim();
    const senhaDigitada = document.getElementById('password').value.trim();
    
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = '';
    errorDiv.style.color = 'red'; 

    if (emailDigitado === '' || senhaDigitada === '') {
        errorDiv.textContent = 'Por favor, preencha o e-mail e a senha.';
        return; 
    }

    // A MÁGICA AQUI: Vai buscar os dados que o cadastrar.js salvou
    const emailCadastrado = localStorage.getItem('emailCadastrado');
    const senhaCadastrada = localStorage.getItem('senhaCadastrada');
    const nomeCadastrado = localStorage.getItem('nomeCadastrado');

    // BARREIRA 1: A pessoa nunca se cadastrou?
    if (!emailCadastrado || !senhaCadastrada) {
        errorDiv.textContent = 'Você ainda não tem cadastro! Clique em "Cadastre-se" primeiro.';
        return;
    }

    // BARREIRA 2: Os dados digitados são DIFERENTES dos cadastrados?
    if (emailDigitado !== emailCadastrado || senhaDigitada !== senhaCadastrada) {
        errorDiv.textContent = 'E-mail ou senha incorretos. Tente novamente.';
        return;
    }

    // SUCESSO: Se passou por todas as barreiras, o login é aprovado!
    // Salva o usuário logado para a rede.html usar
    localStorage.setItem('usuarioEmail', emailDigitado);
    localStorage.setItem('usuarioNome', nomeCadastrado);

    // Manda para a página da rede social
    window.location.href = 'rede.html';
});