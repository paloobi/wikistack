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
  var tags = req.body.tags.split(",").map(function(val) { return val.trim(); });

  var page = new Page({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
    tags: tags
  });

  page.save()
  .then(function success(newpage) {
    console.log('NEW PAGE ADDED:', newpage);
    res.redirect(page.route);
  }, console.log)
})

router.get('/search', function(req, res, next){
  var query = req.query.query.split(',');
  var searchBy = req.query['search-by'];
  console.log('search for', query, 'by', searchBy)
  Page.find({ tags: { $in: query } }).exec().then(function(pages){
    res.json(pages);
  });
})

router.get('/:urlTitle', function(req, res, next) {
  var urlTitle = req.params.urlTitle;
  Page.findOne( { urlTitle: urlTitle } ).exec().then(function(page) {
    console.log(page);
    res.render('wikipage', { page: page });
  }).then(null, next);
});


module.exports = router;