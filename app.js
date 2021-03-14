let appInsights = require("applicationinsights");
appInsights
  .setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY)
  .setAutoDependencyCorrelation(true)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true, true)
  .setAutoCollectExceptions(true)
  .setAutoCollectDependencies(true)
  .setAutoCollectConsole(true)
  .setUseDiskRetryCaching(true)
  .setSendLiveMetrics(false)
  .setDistributedTracingMode(appInsights.DistributedTracingModes.AI)
  .start();

// env variables
require("dotenv").config();

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var expressValidator = require("express-validator");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var passport = require("passport");
var flash = require("connect-flash");

var app = express();

//server
var server = require("http").createServer(app);

var blogRouter = require("./routes/blogRoutes.js");
var singleRouter = require("./routes/singleRoutes.js");
var authRouter = require("./routes/authRoutes.js");
var ccRouter = require("./routes/codingChallenges.js");

//view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//https://stackoverflow.com/questions/40381401/when-to-use-saveuninitialized-and-resave-in-express-session
app.use(
  session({
    secret: "Auth",
    resave: false,
    saveUninitialized: true,
  })
);

//https://stackoverflow.com/questions/40381401/when-to-use-saveuninitialized-and-resave-in-express-session

//'flash' is used to flash error message in login page
app.use(flash());

//fetch passport.js and pass in 'app'
require("./config/passport.js")(app);
require("./config/strategies/local.strategy")(passport);

//Set static path
app.use("/static", express.static(path.join(__dirname, "public")));

// Mongoose ODM...
var mongoose = require("mongoose");

//connect to mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_CRED, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//import mongodb controller to insert, search, delete article
var blogCtrl = require("./controller/blog.server.controller.js");

//Global Vars
app.use(function (req, res, next) {
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
app.use("/", blogRouter);
app.use("/single", singleRouter);
app.use("/auth", authRouter);
app.use("/cc", ccRouter);

app.use(function (req, res, next) {
  res.render("error", {
    error: "The page you are requesting doesnot exist",
    title: "Oops! Something went wrong",
    user: req.user,
  });
});
app.set("port", process.env.PORT || 3000);
//app.set('port_ip', (process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'));

let start = Date.now();
server.listen(app.get("port"), function () {
  console.log("running... in port 3000");
  let duration = Date.now() - start;
  appInsights.defaultClient.trackMetric({
    name: "server startup time",
    value: duration,
  });
});
