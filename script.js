async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    localStorage.setItem("token", data.token);
    window.location.href = "feed.html";
}

async function createPost() {
    const image = document.getElementById("image").value;
    const caption = document.getElementById("caption").value;

    await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ user: "Aluno SENAI", image, caption })
    });

    loadPosts();
}

async function loadPosts() {
    const res = await fetch("http://localhost:3000/posts");
    const posts = await res.json();

    const feed = document.getElementById("feed");
    feed.innerHTML = "";

    posts.forEach(post => {
        feed.innerHTML += `
            <div class="post">
                <h3>${post.user}</h3>
                <img src="${post.image}">
                <p>${post.caption}</p>
            </div>
        `;
    });
}

if (window.location.pathname.includes("feed.html")) {
    loadPosts();
}