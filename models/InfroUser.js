var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InfroUserSchema = new Schema({
  isMarried : {
    type: String,
    enum : ['', 'MARRIED','DIVORCEE', 'WIDOWER', 'SINGLE'],
    default: ''
  },
  spousesName : {
    type: String,
    default: ''
  },
  numChildren : {
    type: Number,
    default: 0
  },
  dateOfBirth : {
    type: Date
  },

  revenue : {
    type: String,
    default: ''
  },
  numProperties : {
    type: Number,
    default: 0
  },
  investmentsAbroad : {
    type: String,
    default: ''
  },




  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('InfroUser', InfroUserSchema);

/*,
 isNew : {
 type: Boolean,
 default: false
 }*/
