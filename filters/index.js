module.exports = function(swig) {

  var pageLink = function (page) {
    return '<a href="' + page.route + '">' + page.title + '</a>';
  };

  pageLink.safe = true;

  swig.setFilter('pageLink', pageLink);

  var tagLink = function(tag) {
    return '<a href=/wiki/search?search-by=tags&query=' + tag + '>' + tag + '</a>'
  }

  tagLink.safe = true;

  swig.setFilter('tagLink', tagLink);

};
