//import
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const PORT = 8080;



//config
const app = express();
const authenticaToken = require('./middleware/authMiddleware');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));
app.use('/data', express.static(path.join(__dirname, 'data')));

//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//router
app.use('/account', require('./routes/Account'));
app.use('/auth', require('./routes/Auth'));
app.use('/author', require('./routes/author'));;
app.use('/category', require('./routes/category'));
app.use('/story', require('./routes/story'));
app.use('/chapter', require('./routes/chapter'));
app.use('/comment', require('./routes/comment'));
app.use('/follow', require('./routes/follow'));

//Định tuyến
app.get('/', async (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/profile', (req, res) => {
    res.render('profile');
});

app.get('/detail/:id', (req, res) => {
    res.render('detail');
});

app.get('/detail/:id/:chapterId', (req, res) => {
    res.render('chapter');
});
//trien khai localhost
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});