var dbUtils = require("../utils/dbUtils")
var User = require("../model/user").user
var userDao = require("../dao/userDao")

var pool = dbUtils.getConnPool()

exports.login = function (req, res, next) {
	
	res.render('pages/login', {
		"title": "登录", 
		"css": "./css/login.css"
	})
}

exports.slogin = function (req, res, next){
	var username = req.body.username
	var password = req.body.password

	var _user = userDao.getUserByUsername(pool, username, password, function (user) {
		console.log(user)
		if(!user){
			console.log('登录失败。')
			
			res.redirect('/login')
		}else{
			console.log('登录成功。')

			req.session.clock.islogin = true
			req.session.clock.user = user
			// console.log(req.session.clock.islogin)
			// console.log(req.session.clock)
			res.redirect('/index/' + user.id)
		}
	})
}

exports.register = function (req, res, next) {

	res.render('pages/register', {
		"title": "注册", 
		"css": "./css/register.css"
	})
}

exports.segister = function (req, res, next) {
	var user = {
		nickname: req.body.nickname,
		username: req.body.username,
		password: req.body.password,
		state: 1
	}

	userDao.addUser(pool, user, function (result) {
		if(result > 0){
			res.redirect('/login')
		}else{
			res.location('/register')
		}
	})
}