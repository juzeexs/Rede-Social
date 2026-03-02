<?php
include "config.php";

if (!isset($_SESSION["user_id"])) {
    header("Location: index.php");
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Feed - Senai Social</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="topbar">
    Senai Social
    <a href="logout.php">Sair</a>
</div>

<div class="post-form">
    <form action="create_post.php" method="POST">
        <input type="text" name="image" placeholder="URL da imagem" required>
        <input type="text" name="caption" placeholder="Legenda" required>
        <button type="submit">Postar</button>
    </form>
</div>

<?php
$posts = $conn->query("SELECT posts.*, users.username 
                       FROM posts 
                       JOIN users ON posts.user_id = users.id 
                       ORDER BY posts.created_at DESC");

while($post = $posts->fetch_assoc()):
?>

<div class="post">
    <h3><?= $post["username"] ?></h3>
    <img src="<?= $post["image"] ?>">
    <p><?= $post["caption"] ?></p>
</div>

<?php endwhile; ?>

<style>
    .post {
    background: white;
    max-width: 500px;
    margin: 20px auto;
    border-radius: 10px;
    border: 1px solid #ddd;
    padding: 15px;
}

.post img {
    width: 100%;
    border-radius: 8px;
    margin: 10px 0;
}

.topbar {
    background: #ff7a00;
    color: white;
    padding: 15px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
}
</style>

</body>
</html>