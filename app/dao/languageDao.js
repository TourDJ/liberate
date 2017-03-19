var Language = require("../model/language").language


var languageDao = {

	getLanguages: function (pool, callback) {
		var _sql = 'SELECT * FROM language_tag;'
		var languages = []

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
						var _lang
						var temp

						for (var i = 0; i < len; i++) {
							temp = results[i]
							
							_lang = new Language({
								id: temp.id,
								name: temp.name
							})

							languages.push(_lang)

						}
					}
					callback(languages)
				}
			)
		})

		return languages
	}
}

module.exports = languageDao