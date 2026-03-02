<?php
$conn = new mysqli("localhost", "root", "", "rede_social");

if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

session_start();
?>