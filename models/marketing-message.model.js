var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MarketingMsgSchema = new Schema({
  crate: {
    type: Date,
    default: Date.now
  },
  typeMsg:{
    type: Schema.Types.ObjectId,
    ref: 'ServiceProvider'
  },
  isOpenLink: {
    type: Boolean, default: false
  },
  isSendMore:{
    type: Boolean, default: false
  }
});

module.exports = mongoose.model('MarketingMsg', MarketingMsgSchema);
