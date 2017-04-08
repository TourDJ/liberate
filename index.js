var server = require('./app/service/server')
// var router = require('./app/service/routers')
var tools = require('./app/utils/tools').tools
const path = require('path')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
<<<<<<< HEAD
var cookieParser = require('cookie-parser');
=======
>>>>>>> 548a60804a2212dc1c64c9b4f2ef0cb7664328d8
var session = require('express-session')

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

<<<<<<< HEAD
//Since sessions use cookies to keep track users we need both the cookie parser and 
//the session framework. It is important to note that the cookie parser is used before 
//the session, this order is required for sessions to work.
app.use(cookieParser());

//Create a session middleware with the given options
app.use(session({
	secret: 'jf blog',
	resave: true,
	saveUninitialized: true,
	cookie: { maxAge: 600000, secure: true }
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

=======
//Create a session middleware with the given options
app.use(session({
	secret: 'jf blog',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

>>>>>>> 548a60804a2212dc1c64c9b4f2ef0cb7664328d8
//pre-load handler
app.use(function(req, res, next) {
	//define object save session's data
	if(!req.session.clock) {
		req.session.clock = {}
	}

	next()
})

//add router
require('./app/service/routers')(app)

//404 error
app.all('*', function(req, res, next) {
	res.status(404)
	res.render('pages/error', { "error": 'err.stack' })
})


//start nodejs server
server.start(app, {
	port: 8080,
	msg: "Server has started ... "
})

