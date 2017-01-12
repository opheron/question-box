var express				 = require("express");
var app					 = express();
var bodyParser			 = require("body-parser");
var mongoose			 = require("mongoose");


// require routes
var indexRoutes			 = require("./routes/index");
var questionRoutes		 = require("./routes/questions");

// set database
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/question-box");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", indexRoutes);
app.use("/questions", questionRoutes);

var PORT = 8080;
var IP = "localhost";
app.listen(PORT, IP, function(){
	console.log("The question-box server has started!");
	console.log("Site is at: http://" + IP + ":" + PORT);
});