var tools = require('../utils/tools')
const type = tools.dbType;

+function (type) {
	switch (type) {
		case 1:
			require('../control/mongod/article')
			break;

		case 2:
			require('../control/mysql/article')
			break;

		default:
			
			break;
	}
}(type)