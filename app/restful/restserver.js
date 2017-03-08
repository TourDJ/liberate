var http = require('http')
var parse = require('url').parse
var util = require('util')
var formidable = require('formidable')
var restrouter = require('./restrouter')
var restparser = require('./restparser')

http.createServer(function(req, res) {
	var url = parse(req.url)
	var pathname = url.pathname
	console.log('Request URL: http://127.0.0.1:8090'  + url.href)

	// 解析 URL 参数到 resource 对象
	req.resource = restparser.parse(pathname)
	//resource.id 存在，表示是 RESTful 的请求
	if(req.resource.id) {
		res.writeHead(200, {'Content-Type': 'text/plain'})
		restrouter.router(req, res, function(stringfyResult) {
			console.log(stringfyResult)
			res.end(stringfyResult)
		})
	} else {
		res.writeHead(200, {'Content-Type': 'text/plain'}); 
 		res.end('Request URL is not in RESTful style!'); 
	}
}).listen(8090, '127.0.0.1'); 

 console.log('Server running at http://127.0.0.1:8090/');