var mongoose = require('mongoose');

var User = mongoose.model('user', {
    email: {
        type: String,
        required: true,
        trim: true,
        minLength:1
    },
    name:{
        type:String,
        required: true,
        trim: true
    }
});

module.exports = {User};