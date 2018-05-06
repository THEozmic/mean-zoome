var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  crate: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  lastSentMailRegistration : {
    type: Date
  },
  isRegistered:{
    type: Boolean, default: false
  },
  numSentMailRegistration : {
    type: Number,
    default: 0
  },
  Assets_id_list :[{
    type: Schema.Types.ObjectId,
    ref: 'Assets'
  }],
  timeAnalysis:{
    type: Date
  },
  rules_id_list :[{
    type: Schema.Types.ObjectId,
    ref: 'Rules'
  }],
  InfroUser_id: {
    type: Schema.Types.ObjectId,
    ref: 'InfroUser'
  },
  marketing_msg_list:[{
    type: Schema.Types.ObjectId,
    ref: 'MarketingMsg'
  }]
});

module.exports = mongoose.model('User', UserSchema);

/*,
 isNew : {
 type: Boolean,
 default: false
 }*/
