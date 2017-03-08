


// var server = require("./app/server")
// var route = require("./app/router")
// var requestHandlers = require("./app/requestHandlers")

// var handle = {}
// handle["/"] = requestHandlers.start
// handle["/start"] = requestHandlers.start
// handle["/upload"] = requestHandlers.upload
// handle["/show"] = requestHandlers.show

// server.start(route.route, handle)
module.exports = {

	init: function(app, args){
		app.set('views',  args.path)
		app.set('view engine', args.engine)		
	},

	config: function(app){

	},

	start: function(app, args) {
		app.listen(args.port, function(){
			console.log(args.msg)
		})
	}
}