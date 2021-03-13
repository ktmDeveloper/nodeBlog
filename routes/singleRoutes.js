var express = require("express");
var blogCtrl = require("../controller/blog.server.controller.js");
var blogEntry = require("../models/blog.server.model.js");

var singleRouter = express.Router();
const { check, validationResult } = require("express-validator/check");
const { matchedData, sanitize } = require("express-validator/filter");

singleRouter
  .get("/:id", function (req, res) {
    let id = req.params.id;
    return blogCtrl.singleBlog(req, res, id);
  })
  .get("/edit/:id", function (req, res) {
    if (!req.user) {
      res.redirect("/login");
    } else {
      var query = blogEntry.findOne({ _id: req.params.id });
      query.exec(function (err, results) {
        if (err) {
          res.render("error", {
            error: err.message,
            title: "Oops! Something went wrong",
            user: req.user,
          });
        } else {
          let authorId = results.authorId;
          if (authorId != req.user._id) {
            return res.render("error", {
              error: "Wrong user. LogIn with particular authors credentials",
            });
          } else {
            let id = req.params.id;
            return blogCtrl.editBlog(req, res, id);
          }
        }
      });
    } //if not logged in, send to login page.
  })
  .get("/delete/:id", function (req, res) {
    if (!req.user) {
      return res.redirect("/login");
    } else {
      var query = blogEntry.findOne({ _id: req.params.id });
      query.exec(function (err, results) {
        if (err) {
          res.render("error", {
            error: err.message,
            title: "Oops! Something went wrong",
            user: req.user,
          });
        } else {
          let authorId = results.authorId;
          if (authorId != req.user._id) {
            return res.render("error", {
              error: "Wrong user. LogIn with particular authors credentials",
              user: req.user,
            });
          } else {
            let id = req.params.id;
            return blogCtrl.delete(req, res, id);
          }
        }
      });
    }

    // if(!req.user){
    //     res.redirect('/login');
    // } else {
    //     let id = req.params.id;
    //     return blogCtrl.delete(req, res, id);
    // }//if not logged in, send to login page.
  });

module.exports = singleRouter;
