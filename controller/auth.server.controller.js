var authModel = require('../models/auth.server.model.js');


exports.create = function(req, res){
    var newAuth = new authModel({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    });
    newAuth.save(function (err, results) {
        if (err) return res.send(err);
        
        // req.login is a function provided by 'passport' that verfies the user
        req.login(results, function(){
            res.redirect('/login');
        });
    }) 
};
exports.fetch = function(email, password, done){
    var query = authModel.findOne({email:email});
        query.exec(function(err, results){
            if(results){

                if(results.password === password){
                    var user = results;
                    done(null, user);
                } else {
                    done(null , false, {message: 'Incorrect password.'});
                }
            } else {
                done(null , false, {message: 'Username not found. Please sign up to create a user'});
            }
        });        
}

