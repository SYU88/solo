var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var utils = require('./utils.js');
var partials = require('express-partials');
// var db = require('server/config.js');
var URI = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL || 'mongodb://localhost/test';
var port = process.env.PORT || 8080;
var app = express();
app.use(partials());
app.use(express.bodyParser());
var mongoURI = URI;
mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
 console.log('Mongodb connection open');
 var userSchema = mongoose.Schema({
    dumpling: String,
    age: Number,
    health: Number,
    intelligence: Number,
    juiciness: Number,
    type: String,
    image: String
  });
  module.exports.User = User = mongoose.model('User', userSchema);
});

app.post('/data', utils.getData);
app.post('/update', utils.updateData);

app.use(express.static(__dirname + '/client'));

app.listen(port);