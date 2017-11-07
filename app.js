var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');


var blogRouter = require('./routes/blogRoutes.js');
var singleRouter = require('./routes/singleRoutes.js');
var authRouter = require('./routes/authRoutes.js');

var app = express();

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({secret: 'Auth'}));


//'flash' is used to flash error message in login page
app.use(flash());

//fetch passport.js and pass in 'app'
require('./config/passport.js')(app);
require('./config/strategies/local.strategy')(passport);

//Set static path
app.use('/static', express.static(path.join(__dirname, 'public')))

// Mongoose ODM...
var mongoose = require('mongoose');

//connect to mongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://testUser:testPassword@ds157702.mlab.com:57702/standuptutorial', {
        useMongoClient: true,
         /* other options */
    });

//import mongodb controller to insert, search, delete article
var blogCtrl = require("./controller/blog.server.controller.js");

//Global Vars
app.use(function(req,res,next){
    res.locals.errors = null;
    res.locals.data = null;
    res.locals.title = null;
    res.locals.articles = null;
    res.locals.article = null;
    res.locals.typeOfBlog = null;
    res.locals.entryAdded = null;
    res.locals.message = null;
    res.locals.user = null;
    next();
});

//routes
app.use('/', blogRouter);
app.use('/single', singleRouter);
app.use('/auth', authRouter);

app.set('port', (process.env.OPENSHIFT_NODEJS_PORT || 3000));
app.set('port_ip', (process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'));

app.listen(app.get('port'), app.get('port_ip'),function(){
    console.log('running...');
})




