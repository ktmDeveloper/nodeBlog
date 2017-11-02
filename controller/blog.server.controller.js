var blogEntry = require('../models/blog.server.model.js');

exports.create = function(req, res){
    var newArticle = new blogEntry({
        author: req.body.author,
        date: req.body.date,
        title: req.body.title,
        article: req.body.article,
        description: req.body.description,
        email: req.body.email
    });
    newArticle.save(); //save to mongodb
    
    //redirect to home page...
    res.redirect('/');
   
};

exports.list = function(req, res){
    var query = blogEntry.find();
      query.sort({createdOn: 'desc'})
           .limit(3)
           .exec(function(err, results){
              res.render('index', {articles: results, title : 'Home - Blog', user: req.user})
      });
  };

  exports.loadMore = function(req, res, n){
      var skinN = parseInt(n);
    var query = blogEntry.find({}).skip(skinN).limit(1);
    query.exec(function(err, results){
        res.send(JSON.stringify(results));
    });
  };

exports.singleBlog = function(req, res, id){
    var query = blogEntry.findOne({ '_id': id });
      query.exec(function(err, results){
          if(err){
            res.render('error', {error: err.message, title: 'Oops! Something went wrong', user: req.user})
          } else {
            res.render('single', {article: results, title : results.title, user: req.user})
          }
              
      });
  };

// exports.getNote = function(req, res){
//     res.render('newnote',{title: 'Standup - New Note'});
// };


