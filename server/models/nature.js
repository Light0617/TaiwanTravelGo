const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var natureSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  image: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    default: ''
  },
  starts: {
    type: Number,
    default: 5
  }
  }, {
    timestamps: true
});

var Natures = mongoose.model('Nature', natureSchema);
module.exports = Natures;