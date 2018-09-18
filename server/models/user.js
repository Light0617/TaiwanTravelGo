var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    firstname: {
      type: String,
        default: ''
    },
    lastname: {
      type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        default: ''
    },
    numberOfComments: {
        type: Number,
        default: 0
    },
    numberOfFavorite: {
        type: Number,
        default: 0
    }
});


User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
