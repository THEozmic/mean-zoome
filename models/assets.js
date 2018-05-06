var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AssetsSchema = new Schema({
  RequestDate: {
    type: String
  },
  msg: {
    type: String,
    default: ''
  },
  typeUser: {
    type: String,
    enum : ['NUN', 'SALE','RENTING', 'FOR_RENT', 'TO_BUY'],
    default: 'NUN'
    // required: true
  },
  city: {
    type: String
  },
  zone: {
    type: String
  },
  assetType: {
    type: String
  },
  budget : {
    type: String
  },
  numRooms : {
    type: String
  },
  isNewAsset: { type: Boolean, default: false },
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Assets', AssetsSchema);

/*,
 isNew : {
 type: Boolean,
 default: false
 }*/
