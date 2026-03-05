



     /* /*
  /*      /*             /* /*
/*         /*         /*       /*
      /*                  /*  


/*            *//*               /*
  /*            /*  /*           /*
   /*      /*        /*      /*
      /* /*             /* /*
          /*          /*
           /*        /*
            /* /**/ /*
            
            
            /** */

// Importa a sua conexão do Firebase que já está configurada
import { app } from './firebase/config.js';
// Importa as ferramentas de Autenticação do Firebase
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

// Inicializa a Autenticação usando o seu 'app'
const auth = getAuth(app);

document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que a página recarregue

    // Pega os valores dos campos
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorDiv = document.getElementById('error-message');

    errorDiv.textContent = ''; // Limpa erros antigos

    // 1. Regra do Email SENAI (igual você fez no login)
    const dominio = email.split('@')[1]; 
    if (!dominio || !dominio.toLowerCase().includes('senai')) {
        errorDiv.textContent = 'Apenas e-mails do SENAI são permitidos no cadastro.';
        return; 
    }

    // 2. Chama o Firebase para criar o usuário
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Conta criada com sucesso!
            const user = userCredential.user;
            
            // Vamos salvar também o Nome que ele digitou no perfil do Firebase
            return updateProfile(user, {
                displayName: nome
            });
        })
        .then(() => {
            alert('Conta criada com sucesso! Faça login para entrar.');
            window.location.href = 'index.html'; // Manda ele de volta pro Login
        })
        .catch((error) => {
            // Se der erro (ex: email já existe, senha fraca), o Firebase nos avisa aqui
            const errorCode = error.code;
            
            if (errorCode === 'auth/email-already-in-use') {
                errorDiv.textContent = 'Este e-mail já está cadastrado em outra conta.';
            } else if (errorCode === 'auth/weak-password') {
                errorDiv.textContent = 'A senha é muito fraca. Use pelo menos 6 caracteres.';
            } else {
                errorDiv.textContent = 'Erro ao cadastrar: ' + error.message;
            }
        });
});
