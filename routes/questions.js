var express			 = require("express");
var Question		 = require("../models/question");
var router			 = express.Router();

// INDEX - show all questions
router.get("/", function(req, res){
	// Get all questions from DB
	Question.find({}, function(err, allQuestions){
		if (err) {				// err handling should be fixed here
			console.log(err);
		} else {
			res.render("questions/index", {questions: allQuestions});
		}
	});
});

// NEW - show form to create new question
router.get("/new", function(req, res){
	res.render("questions/new");
});

// CREATE - add new question to DB
router.post("/", function(req, res){
	// get data from form and add to question array
	// This needs user input sanitization to be implemented
	var question_body = req.body.question_body;
	var newQuestion = {body: question_body};
	Question.create(newQuestion, function(err, createdQuestion){
		if (err) {
			console.log(err);
		} else {
			// console.log(createdQuestion);
			res.send("Created successfully!");
			// eventually redirect to show or index
		}
	});
});

// SHOW - show more info about one question
router.get("/:id", function(req, res){
	//find the question with the given ID
	Question.findById(req.params.id).exec(function(err, foundQuestion){
		if (err) {
			console.log(err);
		} else {
			// render show template with that question
			res.render("questions/show", {question: foundQuestion});
		}
	});
});


module.exports = router;