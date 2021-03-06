var server = require('./app/service/server')
// var tools = require('./app/utils/tools').tools
const path = require('path')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var session = require('express-session')
var mongoStroe = require('connect-mongo')(session)	//
var mongoose = require('./app/utils/mongodb.js')				// use mongodb

//initial args
server.init(app, {
	path: process.cwd() + '/app/view/',
	engine: 'ejs'
})

//setting static resource load path
app.use(express.static(path.join(__dirname, 'bower_components')))
app.use(express.static('public'))


//Since sessions use cookies to keep track users we need both the cookie parser and 
//the session framework. It is important to note that the cookie parser is used before 
//the session, this order is required for sessions to work.
app.use(cookieParser());

//Create a session middleware with the given options
app.use(session({
	secret: 'jf blog',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 600000, secure: true }
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


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

