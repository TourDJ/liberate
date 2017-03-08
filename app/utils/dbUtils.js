var	mysql = require('mysql')

/*
*  get db connection
*	dbDriver: database driver's name
*/
function getConnection(dbDriver, dbConfig) {
	var connection

	switch(dbDriver) {
		case 'mysql':
			connection = mysql.createConnection(dbConfig);
			break;
		case 'mongodb':

			break;
	}

	return connection
}

/*
*  Connections can be pooled to ease sharing a single connection, 
*  or managing multiple connections.
*/
function getConnPool(dbConfig) {
	var pool

	if(!dbConfig)
		return null

	pool = mysql.createPool(dbConfig)

	return pool
}

exports.getConnection = getConnection
exports.getConnPool = getConnPool