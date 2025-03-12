const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;


app.use(express.json());
app.use(express.static(path.join(__dirname, 'pubAlic')));

app.use('/account', require('./routes/Account'));
app.use('/auth', require('./routes/Auth') )

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'login.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'profile.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});