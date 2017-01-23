var express			 = require("express");
var mongoose		 = require("mongoose");
var Question		 = require("../models/question");
var router			 = express.Router();
var middleware		 = require("../middleware");

// INDEX - show all questions
router.get("/", function(req, res){
	// Get all questions from DB
	Question.find({}, function(err, allQuestions){
		if (err) {				// err handling should be fixed here
			console.log(err);
		} else {
			// for timestamp handling
			allQuestions.forEach(function(question){
				question.createdAtFormatted = question.createdAt.toDateString();
			});
			res.render("questions/index", {questions: allQuestions});
		}
	});
});

// NEW - show form to create new question
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("questions/new");
});

// CREATE - add new question to DB
router.post("/", middleware.isLoggedIn, function(req, res){
	// get data from form and add to question array
	// This needs user input sanitization to be implemented
	var question_body = req.body.question_body;
	var newQuestion = {body: question_body};
	Question.create(newQuestion, function(err, createdQuestion){
		if (err) {
			console.log(err);
		} else {
			// console.log(createdQuestion);
			// eventually redirect to show or index
			res.redirect("/questions");
		}
	});
});

// SHOW - shows more info about one question
router.get("/:id", function(req, res){
	// find question with provided ID
	Question.findById(req.params.id, function(err, foundQuestion){
		if (err) {
			// console.log("Req params id type is: " + typeof req.params.id);
			// console.log("Req params id value is: " + req.params.id);
			// console.log("*******************");
			// console.log("Question value is: " + foundQuestion);
			console.log(err.message);
		} else {
			//render show template with question info
			res.render("questions/show", {question: foundQuestion});
		}
	});
});

// EDIT - display edit question form
router.get("/:id/edit", function(req, res){
	Question.findById(req.params.id, function(err, foundQuestion){
		res.render("questions/edit", {question: foundQuestion});
	});
});

// UPDATE - change question in DB
router.put("/:id", function(req, res){
	// find and update question
	Question.findByIdAndUpdate(req.params.id, req.body.question, function(err, updatedQuestion){
		if (err) {
			res.redirect("/questions");
		} else {
			// redirect to show page
			res.redirect("/questions/" + req.params.id);
		}
	});
});

// DESTROY - delete question from DB
router.delete("/:id", function(req, res){
	Question.findByIdAndRemove(req.params.id, function(err){
		if (err){
			res.redirect("/questions");
		} else {
			res.redirect("/questions");
		}
	});
});

module.exports = router;