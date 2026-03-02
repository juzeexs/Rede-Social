<?php
include "config.php";

if (!isset($_SESSION["user_id"])) {
    header("Location: index.php");
    exit();
}

$user_id = $_SESSION["user_id"];
$image = $_POST["image"];
$caption = $_POST["caption"];

// Usando Prepared Statement para evitar SQL Injection
$stmt = $conn->prepare("INSERT INTO posts (user_id, image, caption) VALUES (?, ?, ?)");
$stmt->bind_param("iss", $user_id, $image, $caption);
$stmt->execute();

header("Location: feed.php");
?>