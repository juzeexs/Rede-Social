document.addEventListener('DOMContentLoaded', () => {
    // Puxa os dados que foram salvos no momento do login
    const nomeSalvo = localStorage.getItem('usuarioNome');
    const emailSalvo = localStorage.getItem('usuarioEmail');

    // Se a pessoa não estiver logada, manda de volta para o index
    if (!nomeSalvo || !emailSalvo) {
        window.location.href = 'index.html';
        return;
    }

    // Coloca os dados na tela
    const nomeElemento = document.getElementById('perfil-nome');
    const emailElemento = document.getElementById('perfil-email');

    if (nomeElemento) nomeElemento.textContent = nomeSalvo;
    if (emailElemento) emailElemento.textContent = emailSalvo;
});
