<?php
include "config.php";
$post_id = $_GET['id'];
$user_id = $_SESSION['user_id'];

// Verifica se já curtiu
$check = $conn->query("SELECT * FROM likes WHERE user_id = $user_id AND post_id = $post_id");

if ($check->num_rows == 0) {
    $conn->query("INSERT INTO likes (user_id, post_id) VALUES ($user_id, $post_id)");
} else {
    $conn->query("DELETE FROM likes WHERE user_id = $user_id AND post_id = $post_id");
}

header("Location: feed.php");
?>