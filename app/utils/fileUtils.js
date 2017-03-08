
var fs = require("fs")

// deal static resource
function staticHandler(sPath, ext, response) {
	fs.readFile(sPath, "binary", function(error, file) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/plain"})
			response.end("Server error: " + error)
		} else {
			response.writeHead(200, {"Content-Type": getContentTypeByExt(ext)})
			response.end(file, "binary")
		}
	})
}


exports.staticHandler = staticHandler