
exports.index = function (req, res, next) {
	res.render('pages/index', {
		"title": "博客首页", 
		"css": "./css/blog.css"
	})
}