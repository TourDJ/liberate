var Blog = require("../model/blog").blog

var blogDao = {

	getBlogInfo: function(pool, callback){
		var _sql = 'SELECT * FROM blog where state = 1'
		var _blog = null

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
						var temp = results[0]

						_blog = new Blog({
							id: temp.id,
							blog_name: temp.blog_name,
							blog_desc: temp.blog_desc,
							blog_author: temp.blog_author,
							blog_author_desc: temp.blog_author_desc,
							state: temp.state
						})

						callback(_blog)
					}
				}
			)
		})
	}
}

module.exports = blogDao