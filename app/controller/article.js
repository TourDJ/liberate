var dbUtils = require("../utils/dbUtils")
var articleDao = require("../dao/articleDao")
var languageDao = require("../dao/languageDao")
var Article 		= require("../model/article").article

var pool = dbUtils.getConnPool()

exports.writeArticle = function (req, res, next) {
	var _lang = []

	languageDao.getLanguages(pool, function (languages) {
		/* body... */
		res.render('pages/blog_write', {
			"title": "写博客", 
			"css": "./css/blog.css",
			"langs": languages
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
		state: 1
	})

	articleDao.addArticle(pool, article, function (result) {
		if(result > 0){
			res.redirect('/index')
		}else {
			res.location('/article')
		}
	})
}