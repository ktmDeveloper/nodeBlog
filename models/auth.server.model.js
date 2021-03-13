var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

var Schema = mongoose.Schema;

var authSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  createdOn: { type: Date, default: Date.now },
});

// methods ======================
// generating a hash
authSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
authSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// expose (export) the model now...
module.exports = mongoose.model("auth", authSchema);
