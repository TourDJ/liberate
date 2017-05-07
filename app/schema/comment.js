var mongoose = require('mongoose')
var Schema = mongoose.Schema

var commentSchema = new Schema({
	id: Number,
	aid: Number,
	message: String,
	msgTime: {
		type: Date,
		default: Date.now()
	}
	msgMan: String
}) 

module.exports = commentSchema