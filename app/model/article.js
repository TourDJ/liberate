var mongoose = require('mongoose')
var articleSchema = require('../schema/article')


var article = mongoose.model('article', articleSchema)

module.exports = article