var express = require('express');
var blogCtrl = require("../controller/blog.server.controller.js");

var singleRouter = express.Router();
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');


singleRouter
.get('/:id', function(req, res){
   let id = req.params.id;
   return blogCtrl.singleBlog(req, res, id);
})
.get('/edit/:id', function(req, res){
    if(!req.user){
        res.redirect('/login');
    } //if not logged in, send to login page.

   let id = req.params.id;
   return blogCtrl.editBlog(req, res, id);
})
.get('/delete/:id', function(req, res){
    if(!req.user){
        res.redirect('/login');
    } else {
        let id = req.params.id;
        return blogCtrl.delete(req, res, id); 
    }//if not logged in, send to login page.

   
});


module.exports = singleRouter;