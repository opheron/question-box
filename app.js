var express				 = require("express");
var app					 = express();
var bodyParser			 = require("body-parser");
var mongoose			 = require("mongoose");
var passport			 = require("passport");
var passportLocalStrategy		 = require("passport-local");
var methodOverride		 = require("method-override");
var flash				 = require("connect-flash");
var User				 = require("./models/user");
var Question 			 = require("./models/question");

// require routes
var indexRoutes			 = require("./routes/index");
var questionRoutes		 = require("./routes/questions");

// set database
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/question-box");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());

// passport configuration
app.use(require("express-session")({
	secret: "this is a secret",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/questions", questionRoutes);

var PORT = 8080;
var IP = "localhost";
app.listen(PORT, IP, function(){
	console.log("The question-box server has started!");
	console.log("Site is at: http://" + IP + ":" + PORT);
});