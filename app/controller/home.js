var dbUtils = require("../utils/dbUtils")
var tools = require("../utils/tools")
var articleDao = require("../dao/articleDao")

exports.index = function (req, res, next) {
	var _articles = []
	var pool = dbUtils.getConnPool()

	articleDao.getArticles(pool, function(articles){
		_articles = articles
		// tools.clone(_articles, articles)	
		
		// _articles.forEach(function(ar){
		// 	console.log(ar.title)
		// })	
		console.log(req.session.clock)
		res.render('pages/index', {
			"title": "博客首页", 
			"css": "./css/blog.css",
			"description": "a personal blog website",
			"author": "ivan",
			"artis": _articles
		})
	})
}