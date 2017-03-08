
// var exec = require("child_process").exec
var querystring = require("querystring")
var fs = require("fs")
var formidable = require("formidable")

var imgUploadPath = "/root/tang_project/liberate/dist/images/jfx01.jpg"

function start(response) {
	console.log("Requet handler 'start' was called.")

	// exec("find /", 
	// 	{ timeout: 10000, maxBuffer: 20000*1024 },
	// 	function(error, stdout, stderr) {
	// 	response.writeHead(200, {"Content-Type": "text/plain"})
	// 	response.write(stdout)
	// 	response.end()
	// })

	var body = '<html>'+
	    '<head>'+
	    '<meta http-equiv="Content-Type" content="text/html; '+
	    'charset=UTF-8" />'+
	    '</head>'+
	    '<body>'+
	    '<form action="/upload" enctype="multipart/form-data" method="post">'+
	    // '<textarea name="text" rows="20" cols="60"></textarea>'+
	    '<input type="file" name="upload" multiple="multiple">'+
	    '<input type="submit" value="Upload file" />'+
	    '</form>'+
	    '</body>'+
	    '</html>';

	response.writeHead(200, {"Content-Type": "text/html"})
	response.write(body)
	response.end()
}

function upload(response, /*postData*/request) {
	console.log("Requet handler 'upload' was called.")

	var form = new formidable.IncomingForm()
	console.log("about to parse")
	form.parse(request, function(error, fields, files) {
		console.log("parsing done")
		fs.renameSync(files.upload.path, imgUploadPath)
		response.writeHead(200, {"Content-Type": "text/html"})
		// response.write("You've sent the text: " + querystring.parse(postData).text)
		response.write("received image: <br/>")
		response.write("<img src='/show' />")
		response.end()
	})
}

function show(response, postData) {
	console.log("Requet handler 'show' was called.")
	fs.readFile(imgUploadPath, "binary", 
		function(error, file) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/plain"})
			response.write(error + "\n")
			response.end()
		} else {
			response.writeHead(200, {"Content-Type": "text/png"})
			response.write(file, "binary")
			response.end()
		}
	})
}

exports.start = start
exports.upload = upload
exports.show = show