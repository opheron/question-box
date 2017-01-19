var mongoose = require("mongoose");

var questionSchema = new mongoose.Schema(
	{
		body: String
	},
	{timestamps: true}
);

module.exports = mongoose.model("Question", questionSchema);