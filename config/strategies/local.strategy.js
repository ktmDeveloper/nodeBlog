
var passport = require('passport');
var passportLocal = require('passport-local');
var authCtrl = require("../../controller/auth.server.controller.js");

module.exports = function(){
    passport.use(new passportLocal({
        usernameField : 'email',
        passwordField : 'password'
    }, 
    function(email, password, done){
       authCtrl.fetch(email, password, done)
    }));

}