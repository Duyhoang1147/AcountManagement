const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('home');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/profile', (req, res) => {
    res.render('profile');
});

router.get('/detail/:id', (req, res) => {
    res.render('detail');
});

router.get('/detail/:id/:chapterId', (req, res) => {
    res.render('chapter');
});

router.get('/follows', (req, res) => {
    res.render('follow');
});

router.get('/history', (req, res) => {
    res.render('history');
});

router.get('/categories/:id', (req, res) => {
    res.render('category');
});

module.exports = router;