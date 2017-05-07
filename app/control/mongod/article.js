/*****************************
*	article control 
*****************************/

// use article model
var Article 	= require('../model/article')
var Program 	= require('../model/program')
// Underscore.js is a utility-belt library
var _ = require('underscore')



// photo list page
// exports.list = function(req, res) {
// 	Photo.fetch(function(err, _photos) {
// 		if(err)
// 			console.log(err)
		
// 		res.render('list', {
// 			title: '列表页',
// 			photos: _photos
// 		})
// 	})	
// }

// photo add logic
// exports.new = function(req, res) {
// 	var id = req.body.photo._id
// 	var photoObj = req.body.photo
// 	var __photo__

// 	if(id !== 'undefined') {
// 		Photo.findById(id, function(err, _photo) {
// 			if(err)
// 				console.log(err)

// 			__photo__ = _.extend(_photo, photoObj)
// 			__photo__.save(function(err, __photo) {
// 				if(err)
// 					console.log(err)

// 				res.redirect('/photo/' + __photo._id)
// 			})
// 		})
// 	} else {
// 		__photo__ = new Photo({
// 			name: photoObj.name,
// 			size: photoObj.size,
// 			url: photoObj.url,
// 			recordDate: photoObj.recordDate,
// 			description: photoObj.description
// 		})

// 		__photo__.save(function(err, _photo) {
// 			if(err)
// 				console.log(err)

// 			res.redirect('/photo/' + _photo._id)
// 		})
// 	}
// }

// photo delete logic
// exports.del = function(req, res) {
// 	var id = req.query.id

// 	if(id) {
// 		Photo.remove({_id: id}, function(err, _photo) {
// 			if(err) {
// 				console.log(err)
// 			} else {
// 				res.json({success: 1})
// 			}
// 		})
// 	}
// }

exports.writeArticle = function (req, res, next) {
	var id = req.params.id

	if(req.session.clock.user)
		islogin = true
	else
		islogin = false

	Program.findById(id, function (err, _program) {
		res.render('pages/blog_write', {
			"title": "写博客", 
			"css": "./css/blog_write.css",
			"blog_title": '写博客',
			"blog_desc": ' 记录生活，记录学习',
			"index": 0,
			"islogin": islogin,
			"langs": _program,
			"nums": 0
		})
	})

}

exports.saveArticle = function (req, res, next) {
	// res.render('admin', {
	// 	title: '后台录入页',
	// 	photo: {
	// 		name: '',
	// 		url: '',
	// 		size: '',
	// 		recordDate: '',
	// 		description: ''
	// 	}
	// })
}

// article detail page
exports.getArticleById = function (req, res, next) {
	// var id = req.params.id

	// Article.findById(id, function(err, _photo) {
	// 	res.render('detail', {
	// 		title: '详情页',
	// 		photo: _photo
	// 	})
	// })	
}

exports.saveComment = function (req, res, next) {
	

}