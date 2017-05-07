var mongoose = require('mongoose')
var programSchema = require('../schema/program')


var program = mongoose.model('program', programSchema)

module.exports = program