var mongoose = require('mongoose')
var commentSchema = require('../schema/comment')


var comment = mongoose.model('comment', commentSchema)

module.exports = comment