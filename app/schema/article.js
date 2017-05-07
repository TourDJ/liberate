var mongoose = require('mongoose')
var Schema = mongoose.Schema


var articleSchema = new Schema({
	id: Number,
	title: String,
	content: String,
	postTime: {
		type: Date,
		default: Date.now()
	},
	longid: String,
	cntApprove: Number,
	cntAgainst: Number,
	cntMessage: Number,
	cntRead: Number,
	state: Number,
	keyword: String
})

articleSchema.pre('save', function ( next ) {
	// if(this.isNew) {
	// 	this.meta.createAt = this.meta.updateAt = Date.now()
	// } else {
	// 	this.meta.updateAt = Date.now()
	// }

	next()
})

articleSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('postTime')
			.exec(cb)
	},

	findById: function (id, cb) {
		return this
			.findOne({_id: id})
			.exec(cb)
	}
}

module.exports = articleSchema