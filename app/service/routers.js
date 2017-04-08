var home = require('../controller/home')
var article = require('../controller/article')
var login = require('../controller/login')

module.exports = function(app) {

	// respond with ejs when a GET request is made to the homepage
	app.get('/', home.index)
	app.get('/index', home.index)
	app.get('/index/:id', home.index2)
	app.get('/index/article/:aid', home.index)


	//
	app.get('/article', article.writeArticle)
	app.post('/article/save', article.saveArticle)
	app.get('/article/:articleId', article.getArticleById)
	app.post('/article/saveComment', article.saveComment)

	app.get('/login', login.login)
	app.post('/slogin', login.slogin)
	app.get('/register', login.register)
	app.post('/sregister', login.segister)

	//
	app.get('/article', article.writeArticle)
	app.post('/article/save', article.saveArticle)

	app.get('/login', login.login)
	app.post('/slogin', login.slogin)
	app.get('/register', login.register)
	app.post('/sregister', login.segister)

}

// function index(app) {
// 	// var path
// 	console.log("router a request for index ...")
	
// 	// respond with ejs when a GET request is made to the homepage
// 	try {
// 		app.get('/', home.index)
// 		app.get('/index', home.index)
		
// 		return true
// 	} catch(e) {
// 		console.log(e)
// 		return false
// 	}
// }

// function routers(restPath, subPath, app) {
// 	console.log("router begin ...")

// 	switch (restPath) {
// 		case '/':			
// 		case '/index':
// 			return index(app)

// 		default:
// 			return false
// 	}
// }

// exports.routers = routers