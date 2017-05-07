var moment 		= require('moment')
var tools 		= require("../utils/tools")
const type = tools.dbType;

+function (type) {
	switch (type) {
		case 1:
			var Blog = require('../model/blog')
			var index = function (req, res, next) {
				var blog
				var pages
				var offset
				var islogin
				var pageSize = 2
				var _articles = []
				var aid = req.params.aid
				var pageNo = aid || 1

				Blog.fetch(function(err, _blog) {
					if(err)
						console.log(err)
					
					// res.render('list', {
					// 	title: '列表页',
						blog = _blog
					// })
				})

				res.render('pages/index', {
					"title": "博客首页", 
					"css": "/css/index.css",
					"blog_title": '1',
					"index": '1',
					"blog_desc": ''
					"islogin": '1',
					"artis": '',
					"blog": '',
					"pages": '1',
					"pageNo": '1',
					"nums": 0
				})
			}
			break;

		case 2:
var dbUtils 	= require("../utils/dbUtils")
var articleDao 	= require("../dao/articleDao")
var blogDao 	= require("../dao/blogDao")
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

//
var index2 = function (req, res, next) {
	var id = req.params.id

	if(id == 9)
		req.session.clock.islogin = true

	index(req, res, next)
}

exports.index = index
exports.index2 = index2
			
			break;

		default:
			
			break;
	}
}(type)
