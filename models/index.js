var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// connect to the wikistack database
mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'mongodb connection error:'));

// define the page Schema
var pageSchema = new Schema({
  title:    String,
  urlTitle: String,
  content:  String,
  date:     {type: Date, default: Date.now},
  status:   String,
  author:   {type: mongoose.Schema.Types.ObjectId, ref:'User'}
});

// define the user Schema
var userSchema = new Schema({
  name:   String,
  email:  String
});

// compile Schemas into Models
var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
  Page: Page,
  User: User
};