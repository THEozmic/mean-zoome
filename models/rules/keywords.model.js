var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KeywordsSchema = new Schema({
  word:{
    type:String,
    unique: true
  }
});

module.exports = mongoose.model('Keywords', KeywordsSchema);
