var express = require('express');
var blogCtrl = require("../controller/blog.server.controller.js");

var blogRouter = express.Router();
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');


blogRouter
.get('/',function(req, res){
return blogCtrl.list(req, res);
})
.get('/moreData/:n', function(req, res){
    let n = req.params.n; //n is number of current post showing
    return blogCtrl.loadMore(req, res, n);
})
.get('/login', function(req, res){
    res.render('logIn', {
        title : 'LogIn',
        message: req.flash('error')
    });
})
.get('/articleEntryForm', function(req, res, next){
    if(!req.user){
        res.redirect('/login');
    } //if not logged in, send to login page.

    res.render('articleEntryForm',{
        title: 'Add a Article',
        user: req.user
    });
})
.post('/blogs/add',[
    //validator
    check('date','Date should ASCII Chars').isLength({ min: 1 }).isAscii(),
    check('title','Title should only contain letters').isLength({ min: 1 }).isAscii(),
    check('description','Article should ASCII Chars').isLength({ min: 1 }).isAscii(),
    check('description','NO script tag!').isLength({ min: 1 }).not().matches(/<[^>]*script/), 
    check('article','Article should ASCII Chars').isLength({ min: 1 }).isAscii(),
    check('article','NO script tag!').isLength({ min: 1 }).not().matches(/<[^>]*script/), //no scrip tag
    check('email','Enter a valid email address').isLength({ min: 1 }).isEmail(),
    check('author','Author should only contain letters').isLength({ min: 1 }).isAscii()
    
], function(req,res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    
       return res.render('articleEntryForm',{
            title:'customer',
            user: req.user,
            errors: errors.mapped() //send new index with errors
        });
    } else {
        return blogCtrl.create(req, res);
    }
});


module.exports = blogRouter;