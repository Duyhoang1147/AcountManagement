const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/account', require('./routes/Account'));
app.use('/auth', require('./routes/Auth') )

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'view', 'home.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'view', 'login.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'view', 'profile.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'view', 'register.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});