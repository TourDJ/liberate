var mongoose = require('mongoose')
var Schema = mongoose.Schema

var flowSchmea = new Schema({
	id: Number,
	aid: Number,
	operateTime: {
		type: Date,
		default: Date.now()
	},
	operateType: String,
	operateMan: String
})

module.exports = flowSchmea