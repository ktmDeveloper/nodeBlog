var express = require("express");
var authCtrl = require("../controller/auth.server.controller.js");
var passport = require("passport");

var authRoutes = express.Router();
const { check, validationResult } = require("express-validator/check");
const { matchedData, sanitize } = require("express-validator/filter");

authRoutes
  .post(
    "/signUp/",
    [
      //validator
      check("email", "Enter a valid email address")
        .isLength({ min: 1 })
        .isEmail(),
      check("firstName", "First Name should only contain letters")
        .isLength({ min: 1 })
        .isAscii(),
      check("lastName", "Last Name should only contain letters")
        .isLength({ min: 1 })
        .isAscii(),
      check("password", "Password should be at least 3 characters long")
        .isLength({ min: 3 })
        .isAscii(),
    ],
    function (req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render("login", {
          title: "LogIn",
          errors: errors.mapped(), //send new index with errors
          message: 0,
          user: req.user,
        });
      } else {
        return authCtrl.create(req, res);
      }
    }
  )
  .post(
    "/login/",
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: "Invalid password or username",
    }),
    function (req, res) {
      res.redirect("/");
    }
  )
  .get("/logout", function (req, res, next) {
    req.logout();
    res.redirect("/");
  });

// you can create a different profile to different user using /profile route as shown below
// .all('/profile', function(req, res, next){ //if not logged in then send back to home
//     if(!req.user){
//         res.redirect('/');
//     }
//     next();
// })
// .get('/profile', function(req, res){
//     res.json(req.user);
// })

module.exports = authRoutes;
