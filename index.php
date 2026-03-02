<?php include "config.php"; ?>

<!DOCTYPE html>
<html>
<head>
    <title>Senai Social</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="login-container">
    <h1>Senai Social</h1>
    <form action="login.php" method="POST">
        <input type="email" name="email" placeholder="Email" required>
        <input type="password" name="password" placeholder="Senha" required>
        <button type="submit">Entrar</button>
    </form>

    <a href="register.php">Crie sua a conta</a>
</div>
<style>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #ffffff, #ffffff);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
}

/* Container do login */
.login-container {
    background: white;
    width: 100%;
    max-width: 380px;
    padding: 40px 30px;
    border-radius: 18px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
    text-align: center;
    transition: 0.3s;
    border: 1px solid #ddd;
}

/* Título */
.login-container h2 {
    margin-bottom: 25px;
    color: #ff7a00;
    font-size: 24px;
}

/* Inputs */
input {
    width: 100%;
    padding: 14px;
    margin: 12px 0;
    border: 1px solid #ddd;
    border-radius: 10px;
    font-size: 15px;
    transition: 0.3s;
}

input:focus {
    border-color: #ff7a00;
    outline: none;
    box-shadow: 0 0 8px rgba(255, 122, 0, 0.2);
}

/* Botão */
button {
    width: 100%;
    padding: 14px;
    background: #ff7a00;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 15px;
    transition: 0.3s;
}

button:hover {
    background: #e66900;
    transform: translateY(-2px);
}

/* Link */
a {
    display: block;
    margin-top: 18px;
    text-decoration: none;
    color: #ff7a00;
    font-size: 14px;
}

a:hover {
    text-decoration: underline;
}

/* RESPONSIVIDADE EXTRA */
@media (max-width: 480px) {
    .login-container {
        padding: 30px 20px;
        border-radius: 15px;
    }

    .login-container h2 {
        font-size: 20px;
    }

    input {
        padding: 12px;
        font-size: 14px;
    }

    button {
        padding: 12px;
        font-size: 15px;
    }
}

</style>

</body>
</html>