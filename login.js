
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

import { app } from './firebase/config.js';

console.log("Firebase conectado com sucesso!", app.options.projectId);

// 1. O JavaScript fica "escutando" o formulário. Quando alguém tenta enviar (submit), ele roda essa função.
document.getElementById('loginForm').addEventListener('submit', function(event) {
    
    // 2. O comportamento padrão de um formulário é recarregar a página. Nós mandamos ele parar de fazer isso.
    event.preventDefault();

    // 3. Pegamos os valores que o usuário digitou nos campos. 
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // 4. Pegamos o lugarzinho (a div) onde vamos mostrar a mensagem de erro.
    const errorDiv = document.getElementById('error-message');

    // Limpamos qualquer mensagem de erro antiga da tela antes de fazer as verificações.
    errorDiv.textContent = '';

    // --- PRIMEIRA BARREIRA: Campos vazios ---
    if (email === '' || password === '') {
        errorDiv.textContent = 'Por favor, preencha o e-mail e a senha para entrar.';
        return; 
    }

    // --- SEGUNDA BARREIRA: E-mail do Senai ---
    if (!email.toLowerCase().endsWith('@aluno.senai.br')) {
        errorDiv.textContent = 'Acesso negado: Somente alunos com e-mail @aluno.senai.br podem entrar na rede.';
        return; 
    }

    // --- SUCESSO! ---
    // Se passar por todas as validações, salva os dados e redireciona
    const nomeUsuario = email.split('@')[0]; 
    
    // Salva no navegador
    localStorage.setItem('usuarioEmail', email);
    localStorage.setItem('usuarioNome', nomeUsuario);

    // Redireciona para a página principal

    window.location.href = 'rede.html';
});