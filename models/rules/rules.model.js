var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RulesSchema = new Schema({
  keyword_id: {
    type: Schema.Types.ObjectId,
    ref: 'Keywords'
  },
  serviceProvider_id: {
    type: Schema.Types.ObjectId,
    ref: 'ServiceProvider'
  },
  matchPerce:{
    type:Number
  }
});

module.exports = mongoose.model('Rules', RulesSchema);
