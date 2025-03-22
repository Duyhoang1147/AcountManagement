const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const PORT = 8080;

const app = express();
const authenticaToken = require('./middleware/authMiddleware');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use('/account', require('./routes/Account'));
app.use('/auth', require('./routes/Auth'));

//Định tuyến
app.get('/',authenticaToken, (req, res) => {
    const User = req.user;
    res.render('home', {token: User});
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});