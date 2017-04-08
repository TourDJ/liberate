var Article 		= require("../model/article").article
// var dbUtils 		= require("../utils/dbUtils")
var tools 		= require("../utils/tools")
var moment = require('moment')
var languageDao = require("../dao/languageDao")

var articleDao = {

	connect: function (connection) {
		connection.connect(function(err) {
		  	if (err) {
		    		console.error('error connecting: ' + err.stack)
		    		return;
		  	}
		 
		  	console.log('connected as id ' + connection.threadId)
		});
	},

	disconnect: function (connection) {
		connection.end(function(err){
		    	if(err){        
		        		return;
		    	}
		      	console.log('[connection end] succeed!')
		});
	},

	getArticleCount: function (pool, callback) {
		var _sql = 'SELECT COUNT(1) as num FROM article where state = 1'

		pool.getConnection(function(err, connection) {
			if(err)
				throw err

			// Use the connection 
			connection.query({
					sql : _sql,
					timeout: 40000, // 40s
				}, 
				function (error, results, fields) {
					// And done with the connection. 
					connection.release()
			 
					// Handle error after the release. 
					if (error) throw error
			 
					// Don't use the connection here, it has been returned to the pool. 
					// console.log(results)
					if(results && results.length > 0) {
						var obj = results[0]

						callback(obj.num)
					}
				}
			)
		})
	},

	getArticles: function (pool, offset, rows, callback) {
		var _sql = 'SELECT * FROM article where state = 1 '
				 + ' order by post_time desc '
				 + ' limit ' + offset + ', ' + rows 
		var articles = []

		pool.getConnection(function(err, connection) {
			if(err)
				throw err

			// Use the connection 
			connection.query({
					sql : _sql,
					timeout: 40000, // 40s
				}, 
				function (error, results, fields) {
					// And done with the connection. 
					connection.release()
			 
					// Handle error after the release. 
					if (error) throw error
			 
					// Don't use the connection here, it has been returned to the pool. 
					// console.log(results)
					if(results && results.length && results.length > 0) {
						var len = results.length
						var _article
						var temp

						for (var i = 0; i < len; i++) {
							temp = results[i]

							if(temp.post_time == null) {
								temp.post_time = new Date()
							}
							
							_article = new Article({
								id: temp.id,
								title: temp.title,
								content: temp.content,
								post_time: moment(temp.post_time).format('YYYY-MM-DD HH:mm:ss'),
								langid: temp.langid,
								cnt_approve: temp.cnt_approve,
								cnt_against: temp.cnt_against,
								cnt_message: temp.cnt_message,
								cnt_read: temp.cnt_read,
								state: temp.state
							})

							articles.push(_article)

						}
					}
					callback(articles)
				}
			)
		})
	},

	getArticleById: function (pool, id, callback) {
		var _sql = 'SELECT * FROM article where id = ? and state = 1 '
		var _article

		this.updateValue(pool, id, 'cnt_read', function () {
			
		})

		pool.getConnection(function(err, connection) {
			if(err)
				throw err

			// Use the connection 
			connection.query({
					sql : _sql,
					timeout: 40000, // 40s 
				}, 
				[id],
				function (error, results, fields) {
					// And done with the connection. 
					connection.release()
			 
					// Handle error after the release. 
					if (error) throw error
			 
					// Don't use the connection here, it has been returned to the pool. 
					// console.log(results)
					if(results && results.length && results.length  == 1) {
						var temp = results[0]
						_article = new Article({
								id: temp.id,
								title: temp.title,
								content: temp.content,
								post_time: temp.post_time,
								langid: temp.langid,
								cnt_approve: temp.cnt_approve,
								cnt_against: temp.cnt_against,
								cnt_message: temp.cnt_message,
								cnt_read: temp.cnt_read,
								state: temp.state
						})
					}
					callback(_article)
				}
			)
		})
	},

	addArticle: function (pool, article, callback) {
		var _sql = 'INSERT INTO article SET ?'
		var post  = article

		var result = -1
		pool.getConnection(function(err, connection) {
			connection.query(_sql, post, function (error, results, fields) {
				if (error) throw error
			 	 console.log(results)
			 	// console.log(fields) 
			 	if(results){
			 		result = results.affectedRows
			 	}
			 	callback(result)
			});
		})
	},

	updateArticle: function (pool, id, article, callback) {
		// var _sql = 'UPDATE article SET name=?, content=?, mdate=? where id=? '
		var _sql = 'UPDATE article SET state=1, '
		var post = []
		
		if(article && typeof article === "object") {
			for(var key in article) {
				_sql = _sql + ( ' ' + key + '=?, ')
				post.push(article[key])
			}
		}
		_sql += ' state=1 where id=?'
		post.push(id)
		var result = -1

		pool.getConnection(function(err, connection) {
			connection.query(_sql, post, function (error, results, fields) {
				if (error) throw error
			 	console.log('changed ' + results.changedRows + ' rows')
				 if(results){
				 	result = results.changedRows
				 }
				 callback(result)
			})
		})
	},

	updateValue: function (pool, id, key, callback) {
		var _sql = 'UPDATE article SET ' + key + ' = ' + key + ' + 1 '
				 + ' where state = 1 and id = ' + id
		// console.log(_sql)
		pool.getConnection(function(err, connection) {
		 	connection.query(_sql, function (error, results, fields) {
		 		if (error) throw error

		 	 	console.log('changed ' + results.changedRows + ' rows')
		 		if(results){
		 			result = results.changedRows
		 		}
		 		 callback(result)
		 	})
		 })
	},

	deleteArticle: function (pool, id, article, callback) {
		var _sql = 'DELETE FROM article WHERE id = ?'
		var post = [id]
		var result = -1

		pool.getConnection(function(err, connection) {
			connection.query(_sql, post,  function (error, results, fields) {
				if (error) throw error

				console.log('deleted ' + results.affectedRows + ' rows')
				if(results){
					result = results.affectedRows
				}
				callback(result)
			})
		})
	},

	addArticleComment: function (pool, comment, callback) {
		var _sql = 'INSERT INTO article_comment SET ?'
		var post  = comment

		var result = -1
		pool.getConnection(function(err, connection) {
			connection.query(_sql, post, function (error, results, fields) {
				if (error) throw error
			 	 console.log(results)
			 	// console.log(fields) 
			 	if(results){
			 		result = results.affectedRows
			 	}
			 	callback(result)
			});
		})
	}

	// this.list = getArticles
	// this.retrieve = getArticleById
	// this.insert = addArticle
	// this.update = updateArticle
	// this.delete = deleteArticle

	// return this
}

module.exports = articleDao
// addArticle(new Article(null, 'jiefang', 'jiefangsfd', tools.nowDate()))
// updateArticle(6, new Article(6, 'jiefang', 'hello.dfd.', tools.nowDate()))
// deleteArticle(7)
// getArticles()