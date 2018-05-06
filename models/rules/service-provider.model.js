var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServiceProviderSchema = new Schema({
  serviceType: {
    type: String,
    unique: true
  }
});

module.exports = mongoose.model('ServiceProvider', ServiceProviderSchema);
