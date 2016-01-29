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

  var page = {
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
    tags: tags
  };

  Page.findOne({ title: page.title }).exec().then(function (doc) {
    doc.title = page.title;
    doc.content = page.content;
    doc.status = page.status;
    doc.tags = page.tags;
    return doc.save();
  }, function(err) {
    return new Page(page);
  }).then(function(doc){
    res.redirect(doc.route);
  }).then(null, console.log);

})

router.get('/search', function(req, res, next){
  var query = req.query.query ? req.query.query.split(',').map(function(val) { return val.trim().replace(',', ''); }) : null;
  var searchBy = req.query['search-by'];
  console.log('search for', query, 'by', searchBy)
  if (query) {
    Page.findByTags(query)
    .then(function(pages){
      res.render('search', { results: pages });
    });
  } else {
    res.render('search');
  }
});

router.post('/:urlTitle/tags', function(req, res, next) {
  var tags = req.body.tags.split(",").map(function(val) { return val.trim(); });
  var urlTitle = req.params.urlTitle;
  Page.findOne({ urlTitle: urlTitle }).then(function(page) {
    page.tags = tags;
    page.save().then(function() {
      res.redirect('/wiki/' + urlTitle);
    });
  }).then(null, console.log);
});

router.get('/:urlTitle/edit', function(req, res, next){
  var urlTitle = req.params.urlTitle;
  Page.findOne({urlTitle: urlTitle}).then(function(page){
    res.render('addpage', {page: page, edit: true});
  });
});

router.get('/:urlTitle', function(req, res, next) {
  var urlTitle = req.params.urlTitle;
  Page.findOne( { urlTitle: urlTitle } ).exec().then(function(page) {
    res.render('wikipage', { page: page });
  }).then(null, next);
});


module.exports = router;