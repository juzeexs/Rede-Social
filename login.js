 // 1. O JavaScript fica "escutando" o formulário. Quando alguém tenta enviar (submit), ele roda essa função.
document.getElementById('loginForm').addEventListener('submit', function(event) {
    
    // 2. O comportamento padrão de um formulário é recarregar a página. Nós mandamos ele parar de fazer isso.
    event.preventDefault();

    // 3. Pegamos os valores que o usuário digitou nos campos. 
    // O ".trim()" serve para cortar espaços em branco caso o usuário digite " aluno@aluno.senai.br " sem querer.
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // 4. Pegamos o lugarzinho (a div) onde vamos mostrar a mensagem de erro.
    const errorDiv = document.getElementById('error-message');

    // Limpamos qualquer mensagem de erro antiga da tela antes de fazer as verificações.
    errorDiv.textContent = '';

    // --- PRIMEIRA BARREIRA: Campos vazios ---
    // O sinal "===" significa "é exatamente igual a"
    // Os dois canos "||" significam "OU".
    // Lendo a linha abaixo: "Se o email for igual a nada OU a senha for igual a nada..."
    if (email === '' || password === '') {
        errorDiv.textContent = 'Por favor, preencha o e-mail e a senha para entrar.';
        return; // A palavra "return" é a mais importante aqui: ela manda o código PARAR e não ir para a próxima linha.
    }

    // --- SEGUNDA BARREIRA: E-mail do Senai ---
    // O ".toLowerCase()" transforma tudo em letra minúscula para não dar erro se o aluno digitar tudo maiúsculo.
    // O ".endsWith()" é um comando do JS que checa se o texto TERMINA com aquela palavra específica.
    // O sinal de exclamação "!" no começo significa "NÃO". 
    // Lendo a linha abaixo: "Se o email NÃO terminar com @aluno.senai.br..."
    if (!email.toLowerCase().endsWith('@aluno.senai.br')) {
        errorDiv.textContent = 'Acesso negado: Somente alunos com e-mail @aluno.senai.br podem entrar na rede.';
        return; // O código para de novo e barra o usuário.
    }

    // --- SUCESSO! ---
    // Se o código chegou até esta linha, significa que ele não esbarrou em nenhum dos "return" lá de cima.
    // Ou seja: não está vazio E termina com @aluno.senai.br. Então, redirecionamos para a rede!
    window.location.href = 'rede.html';
});