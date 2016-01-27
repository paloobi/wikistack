var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.post('/', function(req, res, next) {
  var page = new Page({
    title: req.body.title,
    content: req.body.content
  });

  page.save()
  .then(function success(newpage) {
    console.log('NEW PAGE ADDED:', newpage);
    res.redirect('/');
  }, console.log)
})

module.exports = router;