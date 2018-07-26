
var mongoose = require('mongoose');


var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
};

var userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true},
  picPath:String,//store the path to profilepic
  }, schemaOptions);
var User = mongoose.model('User', userSchema);
module.exports = User;
