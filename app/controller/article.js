var dbUtils = require("../utils/dbUtils")
var articleDao = require("../dao/articleDao")
var languageDao = require("../dao/languageDao")
var Article 		= require("../model/article").article

var pool = dbUtils.getConnPool()

exports.writeArticle = function (req, res, next) {
	var _lang = []
<<<<<<< HEAD
	var islogin
	
	if(req.session.clock.user)
		islogin = true
	else
		islogin = false

	languageDao.getLanguages(pool, function (languages) {
		
		res.render('pages/blog_write', {
			"title": "写博客", 
			"css": "./css/blog_write.css",
			"blog_title": '写博客',
			"blog_desc": ' 记录生活，记录学习',
			"index": 0,
			"islogin": islogin,
			"langs": languages,
			"nums": 0
=======

	languageDao.getLanguages(pool, function (languages) {
		/* body... */
		res.render('pages/blog_write', {
			"title": "写博客", 
			"css": "./css/blog.css",
			"langs": languages
>>>>>>> 548a60804a2212dc1c64c9b4f2ef0cb7664328d8
		})
	})
}

exports.saveArticle = function (req, res, next) {
	var params = req.body
	var tags = ''
	var article
	console.log(req.body)
	if(params){
		for(var name in params){
			if(name.startsWith('chk_'))
				tags += params[name] + ','
		}
		tags = tags.substring(0, tags.length - 1)
	}

	article = new Article({
		title: params.title,
		content: params.content,
		langid: tags,
<<<<<<< HEAD
		post_time: new Date(),
=======
>>>>>>> 548a60804a2212dc1c64c9b4f2ef0cb7664328d8
		state: 1
	})

	articleDao.addArticle(pool, article, function (result) {
		if(result > 0){
			res.redirect('/index')
		}else {
			res.location('/article')
		}
	})
<<<<<<< HEAD
}

exports.getArticleById = function (req, res, next) {
	var id = req.params.articleId
	var _article
	var islogin

	articleDao.getArticleById(pool, id, function (article) {
		var langName = ""
		var _langid = article.langid
		
		languageDao.getLanguagesById(pool, _langid , function (langs) {

			langs.forEach( function(lang, index) {
				langName += lang.name
				langName += ',' + lang.leve
				langName += '  '
			});

			if(req.session.clock.user)
				islogin = true
			else
				islogin = false

			res.render('pages/blog_detail', {
				"title": "博客详细", 
				"css": "../css/blog_detail.css",
				"blog_title": article.title,
				"blog_desc": '',
				"index": 0,
				"islogin": islogin,
				"article": article,
				"nums": 0,
				"tags": langName
			})
		})
	})
}

exports.saveComment = function (req, res, next) {
	
=======
>>>>>>> 548a60804a2212dc1c64c9b4f2ef0cb7664328d8
}