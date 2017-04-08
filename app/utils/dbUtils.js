var	mysql = require('mysql')

var defaultConfig = {
	connectionLimit : 10,
	host		: 'localhost',
	user		: 'root',
	password	: 'tang',
	port		: '3306',
	database	: 'liberate'
}

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
	var _dbConfig = dbConfig || defaultConfig

	// if(!dbConfig)
	// 	return null

	pool = mysql.createPool(_dbConfig)

	return pool
}

function getMySQLConnection(dbConfig){
	var _dbConfig = dbConfig || defaultConfig

	return getConnection("mysql", _dbConfig)
}



exports.getMySQLConnection = getMySQLConnection
exports.getConnPool = getConnPool