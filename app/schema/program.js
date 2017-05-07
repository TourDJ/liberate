var mongoose = require('mongoose')
var Schema = mongoose.Schema

var programSchema = new Schema({
	id: Number,
	name: String,
	leve: Number
})

programSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('id')
			.exec(cb)
	},

	findById: function (id, cb) {
		return this
			.findOne({_id: id})
			.exec(cb)
	}
}

module.exports = programSchema