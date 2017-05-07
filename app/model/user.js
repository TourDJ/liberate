var mongoose = require('mongoose')
var userSchema = require('../schema/user')


var user = mongoose.model('user', userSchema)

module.exports = user