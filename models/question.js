var mongoose = require("mongoose");

var questionSchema = new mongoose.Schema(
	{
		body: String,
		author: String
	},
	{timestamps: true}
);

module.exports = mongoose.model("Question", questionSchema);