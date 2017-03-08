var server = require('./app/service/server')
// var router = require('./app/service/routers')
var tools = require('./app/utils/tools').tools
const path = require('path')
var express = require('express')
var app = express()

//initial args
server.init(app, {
	path: process.cwd() + '/app/view/',
	engine: 'ejs'
})

//setting static resource load path
app.use(express.static(path.join(__dirname, 'bower_components')))
app.use(express.static('public'))

// =========================================================================
// //use Set object save loaded request path
// router.paths = new Set()

// //pre load handler
// app.use(function(req, res, next) {

// 	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
// 	// console.log('fullUrl:' + fullUrl)
// 	// console.log('originalUrl:' + req.originalUrl)

// 	var urlPath = tools.getReqPath(req.originalUrl, '/', 1)
// 	// console.log('urlPath:' + urlPath)
// 	if( !router.paths.has( urlPath ) ){
// 		if( router.routers(urlPath, null, app) ) {
// 			router.paths.add( urlPath )
// 		}
// 	}

// 	next()
		
// })

// app.use(function(err, req, res, next) {
// 	console.error(err.stack)
// 	res.status(500).send('Something broke!')
// })
// app.use(errorHandler)
// function errorHandler(err, req, res, next) {
// 	console.log(res.statusCode)
// 	if (res.headersSent) {
// 		return next(err)
// 	}
// 	res.status(404)
// 	res.render('pages/error', { "error": err.stack })
// }
// =========================================================================

//pre load handler
app.use(function(req, res, next) {


	next()
})

//add router
require('./app/service/routers')(app)

//404 error
app.get('*', function(req, res, next) {
	console.log('err.statusCode')
	res.status(404)
	res.render('pages/error', { "error": 'err.stack' })
})


//start nodejs server
server.start(app, {
	port: 8080,
	msg: "Server has started ... "
})

