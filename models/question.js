var mongoose = require("mongoose");

var questionSchema = new mongoose.Schema(
	{
		body: String,
		author: {
			id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User"
			},
			username: String
		}
	},
	{timestamps: true}
);

module.exports = mongoose.model("Question", questionSchema);