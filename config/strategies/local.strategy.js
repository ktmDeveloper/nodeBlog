
var passport = require('passport');
var passportLocal = require('passport-local');
var authCtrl = require("../../controller/auth.server.controller.js");

module.exports = function(){
    passport.use(new passportLocal({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    }, 
    function(req, email, password, done){
       authCtrl.fetch(req, email, password, done)
    }));

}
