document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeatPassword').value;

    if (password !== repeatPassword) {
        document.getElementById('message').innerHTML = `<div class="alert alert-danger">Passwords do not match!</div>`;
        return;
    }

    const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username, email, password })
    });

    const data = await response.json();

    if (response.ok) {
        window.location.href = '/login';
    } else {
        document.getElementById('message').innerHTML = `<div class="alert alert-danger">${data.message}</div>`;
    }
});