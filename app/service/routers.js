var home = require('../controller/home')


module.exports = function(app) {

	// respond with ejs when a GET request is made to the homepage
	app.get('/', home.index)
	app.get('/index', home.index)


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