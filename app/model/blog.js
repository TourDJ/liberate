var mongoose = require('mongoose')
var blogSchema = require('../schema/blog')


var blog = mongoose.model('blog', blogSchema)

module.exports = blog