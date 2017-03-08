var tools = {
	//	Get the correct format date string by parsing
	nowDate: function () {
		var temp = new Date()
	 	var dateStr = 
	 		padStr(temp.getFullYear()) 		+ '-' +
			padStr(1 + temp.getMonth()) 	+ '-' + 
			padStr(temp.getDate()) 			+ ' ' +
			padStr(temp.getHours()) 		+ ':' +
			padStr(temp.getMinutes()) 		+ ':' +
			padStr(temp.getSeconds())

		return (dateStr )
	},

	padStr: function (i) {
		return (i < 10) ? "0" + i : "" + i
	},

	//Obtain the right request path
	getReqPath: function (srcPath, deli, num) {
		var count = srcPath.indexOf(deli, num)
		
		if(count === -1)
			count = srcPath.length
		
		var path = srcPath.substring(0, count)

		return path
	}
	
}


exports.tools = tools