var express = require('express');
var blogCtrl = require("../controller/blog.server.controller.js");

var singleRouter = express.Router();
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');


singleRouter
.get('/:id', function(req, res){
   let id = req.params.id;
   return blogCtrl.singleBlog(req, res, id);
});


module.exports = singleRouter;