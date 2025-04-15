const express = require('express');
const router = express.Router();

router.get('/authors', (req, res) => {
    res.render('partials/navadmin', {
        viewFile: '../admin/author/index' 
    });
});

router.get('/authors/edit/:id', (req, res) => {
    res.render('partials/navadmin', {
        viewFile: '../admin/author/edit' 
    });
});

router.get('/authors/create', (req, res) => {
    res.render('partials/navadmin', {
        viewFile: '../admin/author/create' 
    });
});

//category
router.get('/categories', (req, res) => {
    res.render('partials/navadmin', {
        viewFile: '../admin/category/index' 
    });
});

router.get('/categories/edit/:id', (req, res) => {
    res.render('partials/navadmin', {
        viewFile: '../admin/category/edit' 
    });
});

router.get('/categories/create', (req, res) => {
    res.render('partials/navadmin', {
        viewFile: '../admin/category/create' 
    });
});

//chapter
router.get('/chapters', (req, res) => {
    res.render('partials/navadmin', {
        viewFile: '../admin/chapter/index' 
    });
});

router.get('/chapters/edit/:id', (req, res) => {
    res.render('partials/navadmin', {
        viewFile: '../admin/chapter/edit' 
    });
});

router.get('/chapters/create', (req, res) => {
    res.render('partials/navadmin', {
        viewFile: '../admin/chapter/create' 
    });
});

//story
router.get('/stories', (req, res) => {
    res.render('partials/navadmin', {
        viewFile: '../admin/story/index' 
    });
});

router.get('/stories/edit/:id', (req, res) => {
    res.render('partials/navadmin', {
        viewFile: '../admin/story/edit' 
    });
});

router.get('/stories/create', (req, res) => {
    res.render('partials/navadmin', {
        viewFile: '../admin/story/create' 
    });
});

module.exports = router;