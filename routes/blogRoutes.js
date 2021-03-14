var express = require("express");
var blogCtrl = require("../controller/blog.server.controller.js");
var appInsights = require("applicationinsights");
var blogRouter = express.Router();
const { check, validationResult } = require("express-validator/check");
const { matchedData, sanitize } = require("express-validator/filter");

blogRouter
  .get("/", function (req, res) {
    appInsights.defaultClient.trackMetric({
      name: "Homepage for blog loaded. Params are in the value",
      value: req.url,
    });
    return blogCtrl.list(req, res);
  })
  .get("/moreData/:n", function (req, res) {
    let n = req.params.n; //n is number of current post showing
    return blogCtrl.loadMore(req, res, n);
  })
  .get("/login", function (req, res) {
    res.render("logIn", {
      title: "LogIn",
      message: req.flash("error"),
    });
  })
  .get("/articleEntryForm", function (req, res, next) {
    if (!req.user) {
      res.redirect("/login");
    } //if not logged in, send to login page.

    if (req.user) {
      res.render("articleEntryForm", {
        title: "Add a Article",
        user: req.user,
      });
    }
  })
  .get("/coding-challenges", function (req, res, next) {
    res.render("codingChallenges", {
      title: "Coding Challenges",
    });
  })
  .post(
    "/blogs/add",
    [
      //validator
      check("date", "Date should ASCII Chars").isLength({ min: 1 }).isAscii(),
      check("title", "Title should only contain letters")
        .isLength({ min: 1 })
        .isAscii(),
      check("description", "Article should ASCII Chars")
        .isLength({ min: 1 })
        .isAscii(),
      check("description", "NO script tag!")
        .isLength({ min: 1 })
        .not()
        .matches(/<[^>]*script/),
      check("article", "Article should ASCII Chars")
        .isLength({ min: 1 })
        .isAscii(),
      check("article", "NO script tag!")
        .isLength({ min: 1 })
        .not()
        .matches(/<[^>]*script/), //no scrip tag
      check("email", "Enter a valid email address")
        .isLength({ min: 1 })
        .isEmail(),
      check("author", "Author should only contain letters")
        .isLength({ min: 1 })
        .isAscii(),
    ],
    function (req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        var article = {
          author: req.body.author,
          date: req.body.date,
          title: req.body.title,
          article: req.body.article,
          description: req.body.description,
          email: req.body.email,
        };
        return res.render("articleEntryForm", {
          title: "Enter Article",
          user: req.user,
          article: article,
          errors: errors.mapped(), //send new index with errors
        });
      } else {
        return blogCtrl.create(req, res);
      }
    }
  )
  .post(
    "/blogs/update",
    [
      //validator
      check("date", "Date should ASCII Chars").isLength({ min: 1 }).isAscii(),
      check("title", "Title should only contain letters")
        .isLength({ min: 1 })
        .isAscii(),
      check("description", "Article should ASCII Chars")
        .isLength({ min: 1 })
        .isAscii(),
      check("description", "NO script tag!")
        .isLength({ min: 1 })
        .not()
        .matches(/<[^>]*script/),
      check("article", "Article should ASCII Chars")
        .isLength({ min: 1 })
        .isAscii(),
      check("article", "NO script tag!")
        .isLength({ min: 1 })
        .not()
        .matches(/<[^>]*script/), //no scrip tag
      check("email", "Enter a valid email address")
        .isLength({ min: 1 })
        .isEmail(),
      check("author", "Author should only contain letters")
        .isLength({ min: 1 })
        .isAscii(),
    ],
    function (req, res) {
      var id = req.body.articleId;
      console.log(id + "from edit page");
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        var article = {
          author: req.body.author,
          date: req.body.date,
          title: req.body.title,
          article: req.body.article,
          description: req.body.description,
          email: req.body.email,
        };
        return res.render("articleEntryForm", {
          title: "Enter Article",
          user: req.user,
          article: article,
          typeOfBlog: "update",
          errors: errors.mapped(), //send new index with errors
        });
      } else {
        return blogCtrl.update(req, res, id);
      }
    }
  );

module.exports = blogRouter;
