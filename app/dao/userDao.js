var User = require("../model/user").user
var tools = require("../utils/tools")


var userDao = {

	getUserByUsername: function (pool, username, password, callback) {
		var _sql = 'SELECT * FROM user where username=? and state = 1'
		var _user = null

		pool.getConnection(function(err, connection) {
			if(err)
				throw err

			// Use the connection 
			connection.query({
					sql : _sql,
					timeout: 40000, // 40s
				}, 
				[username],
				function (error, results, fields) {
					// And done with the connection. 
					connection.release()
			 
					// Handle error after the release. 
					if (error) throw error
			 
					// Don't use the connection here, it has been returned to the pool. 
					// console.log(results)
					if(results && results.length && results.length == 1) {
						var temp = results[0]
						temp.password = tools.decryptPassword(temp.password)

						if(password === temp.password){
							_user = new User({
								id: temp.id,
								nickname: temp.nickname,
								username: temp.username,
								password: tools.decryptPassword(temp.password),
								state: temp.state,
								create_time: temp.create_time
							})
						}

						callback(_user)
					}
				}
			)
		})
	},

	addUser: function (pool, user, callback) {
		var _sql = 'INSERT INTO user SET ?'
		var post  = user

		//encrypt password
		post.password = tools.encryptPassword(user.password)

		var result = -1
		pool.getConnection(function(err, connection) {
			connection.query(_sql, post, function (error, results, fields) {
				if (error) 
					throw error
			 	
			 	console.log(results)
			 	// console.log(fields) 
			 	if(results){
			 		result = results.affectedRows
			 	}
			 	callback(result)
			});
		})
	}
}

module.exports = userDao