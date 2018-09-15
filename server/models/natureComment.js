const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var natureCommentSchema = new Schema({
  rating: {
    type: Number
  },
  author: {
    type: String
  },
  comment: {
    type: String
  },
  natureId: {
    type: String
  },
  date: {
    type: String
  }
}, {
  timestamps: true
});

var NatureComments = mongoose.model('Comment', natureCommentSchema);
module.exports = NatureComments;