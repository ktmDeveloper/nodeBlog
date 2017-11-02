var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    createdOn: { type: Date, default: Date.now }
});

// expose (export) the model now...
module.exports = mongoose.model('auth', authSchema);