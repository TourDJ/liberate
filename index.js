
var server = require("./app/server")
var route = require("./app/router")
var requestHandlers = require("./app/requestHandlers")

var handle = {}
handle["/"] = requestHandlers.start
handle["/start"] = requestHandlers.start
handle["/upload"] = requestHandlers.upload
handle["/show"] = requestHandlers.show

server.start(route.route, handle)