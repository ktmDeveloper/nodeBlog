var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  authorId: String,
  author: String,
  title: String,
  date: String,
  article: String,
  email: String,
  description: String,
  type: { type: String, default: "blog" },
  createdOn: { type: Date, default: Date.now },
});

// expose (export) the model now...
module.exports = mongoose.model("blog", blogSchema);
