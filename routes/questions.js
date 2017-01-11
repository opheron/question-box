var express			 = require("express");
var router			 = express.Router();

// INDEX - show all questions
router.get("/", function(req, res){
	// Get all questions from DB
	Question.find({}, function(err, allQuestions){
		if (err) {				// err handling should be fixed here
			console.log(err);
		} else {
			res.render("questions/index", {questions:allQuestions});
		}
	});
});




module.exports = router;