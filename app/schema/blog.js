var mongoose = require('mongoose')
var Schema = mongoose.Schema

var blogSchema = new Schema({
	id: Number,
	blogName: String,
	blogDesc: String,
	blogAuthor: String,
	blogAuthorDesc: String,
	state: Number
})

blogSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('id')
			.exec(cb)
	}
}

module.exports = blogSchema