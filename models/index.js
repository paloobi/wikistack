var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// connect to the wikistack database
mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'mongodb connection error:'));

// define the page Schema
var pageSchema = new Schema({
  title:    {type: String, required: true},
  urlTitle: {type: String, required: true},
  content:  {type: String, required: true},
  date:     {type: Date, default: Date.now},
  status:   {type: String, enum: ['open', 'closed']},
  author:   {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  tags:     {type: [String]}
});

pageSchema.pre('validate', function(next){
  this.urlTitle = getUrlTitle(this.title);
  next();
});

pageSchema.statics.findByTags = function(tags) {
  return Page.find({ tags: { $in: tags } }).exec();
}

pageSchema.virtual('route').get(function (){
  return '/wiki/' + this.urlTitle;
});


// define the user Schema
var userSchema = new Schema({
  name:   {type: String, required: true},
  email:  {type: String, required: true, unique: true}
});

function getUrlTitle(title) {
    if (!title) {
      return Math.random().toString(36).substring(2, 10);
    } else {
      return title.replace(/\s+/g, '_').replace(/\W/g, '');
    }
}

// compile Schemas into Models
var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
  Page: Page,
  User: User
};