var mongoose = require('mongoose')
var flowSchema = require('../schema/flow')


var flow = mongoose.model('flow', flowSchema)

module.exports = flow