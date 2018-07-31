var authModel = require('../models/auth.server.model.js');


exports.create = function(req, res){
    // var newAuth = new authModel({
    //     email: req.body.email,
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     password: this.generateHash(req.body.password)
    // });

    // create the user
    var newUser            = new authModel();

    // set the user's local credentials
    newUser.email    = req.body.email;
    newUser.firstName    = req.body.firstName;
    newUser.lastName    = req.body.lastName;
    newUser.password = newUser.generateHash(req.body.password);


    newUser.save(function (err, results) {
        if (err) return res.send(err);
        
        // req.login is a function provided by 'passport' that verfies the user
        req.login(results, function(){
            res.redirect('/login');
        });
    }) 
};
exports.fetch = function(req, email, password, done){
    authModel.findOne({email:email}, function(err, user){
        // if there are any errors, return the error before anything else
        if (err)
            return done(err);

        // if no user is found, return the message
        if (!user)
            return done(null, false); // req.flash is the way to set flashdata using connect-flash

        // if the user is found but the password is wrong
        if (!user.validPassword(password))
            return done(null, false); // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        return done(null, user);
    });
        
        // query.exec(function(err, results){
        //     if(results){

        //         if(authModel.validPassword(password)){
        //             var user = results;
        //             done(null, user);
        //         } else {
        //             done(null , false, {message: 'Incorrect password.'});
        //         }
        //     } else {
        //         done(null , false, {message: 'Username not found. Please sign up to create a user'});
        //     }
        // });        
}

