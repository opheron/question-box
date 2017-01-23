var express				 = require("express");
var router				 = express.Router();
var passport			 = require("passport");
var User				 = require("../models/user");

// root route
router.get("/", function(req, res){
	res.render("landing");
});

// show register page
router.get("/register", function(req, res){
	res.render("register");
});

// handle sign-up logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if (err) {
			console.log(err);
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to QuestionBox, " + user.username + "!");
			res.redirect("/questions");
		});
	});
});

// show login form
router.get("/login", function(req, res){
	res.render("login");
});

// handle login logic
router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/questions/",
		failureRedirecT: "/login"
	}), function(req, res){}
);

module.exports = router;