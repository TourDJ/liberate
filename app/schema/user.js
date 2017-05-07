var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
	id: Number,
	nickname: String,
	username: String,
	password: String,
	state: Number,
	createTime: {
		type: Date,
		default: Date.now()
	}
})

module.schema = userSchema