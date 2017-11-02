
var passport = require('passport');

module.exports = function(app){
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done){
        done(null, user);
    });

    passport.deserializeUser(function(user, done){
        done(null, user);
    });

     //there can be diff strategies to login( ex. facebok, goolge).
     //we want seperate files for diff strategies. This one is for 'local'
    require('./strategies/local.strategy.js');

}