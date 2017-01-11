var express				 = require("express");
	app					 = express();
	mongoose			 = require("mongoose");


// require routes
var indexRoutes			 = require("./routes/index");
var questionRoutes		 = require("./routes/questions");

// set database
mongoose.connect("mongodb://localhost/question-box");

app.set("view engine", "ejs");

app.use("/", indexRoutes);
app.use("/questions", questionRoutes);

app.listen(8080, function(){
	console.log("The question-box server has started!");
});