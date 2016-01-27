var mongoose = require('mongoose');

// connect to the wikistack database
mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'mongodb connection error:'));