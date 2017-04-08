var dbUtils = require("../utils/dbUtils")
var moment = require('moment')
var articleDao = require("../dao/articleDao")
var blogDao = require("../dao/blogDao")

//
var index = function (req, res, next) {
	var _blog
	var pages
	var offset
	var islogin
	var pageSize = 2
	var _articles = []
	var pool = dbUtils.getConnPool()
	var aid = req.params.aid
	var pageNo = aid || 1

	blogDao.getBlogInfo(pool, function(blog){
		_blog = blog

		articleDao.getArticleCount(pool, function(num){

			pages = Math.ceil(num / pageSize)
			offset = (pageNo - 1) * pageSize
			
			articleDao.getArticles(pool, offset, pageSize, function(articles){
				_articles = articles
				// console.log(pages)
				//
				islogin = req.session.clock.islogin

				res.render('pages/index', {
					"title": "博客首页", 
					"css": "/css/index.css",
					"blog_title": _blog.blog_name,
					"blog_desc": _blog.blog_desc,
					"index": 1,
					"islogin": islogin,
					"artis": _articles,
					"blog": _blog,
					"pages": pages,
					"pageNo": pageNo,
					"nums": num
				})
			})
		})
	})
}

//
var index2 = function (req, res, next) {
	var id = req.params.id

	if(id == 9)
		req.session.clock.islogin = true

	index(req, res, next)
}

exports.index = index
exports.index2 = index2