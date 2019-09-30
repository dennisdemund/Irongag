var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var uploadSchema = new Schema({
  path:  { type: String },
  caption: { type: String }
  });

module.exports = mongoose.model('Upload', uploadSchema);