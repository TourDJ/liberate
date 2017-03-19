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
	},


	clone: function (desc, src){
		for(var key in src){
			desc[key] = src[key];
		}
	},

	decryptPassword: function (password) {
		if(typeof password != 'string')
			return ''

		var len = password.length
		var tempChar
		var dest = ''
		for (var i = 0; i < len; i++) {
			tempChar = password.charCodeAt(i)
			dest += String.fromCharCode(tempChar ^ i);
		}

		return dest
	},

	encryptPassword: function (password) {
		if(typeof password != 'string')
			return ''

		var len = password.length
		var tempChar
		var dest = ''
		for (var i = 0; i < len; i++) {
			tempChar = password.charCodeAt(i)
			dest += String.fromCharCode(tempChar ^ i);
		}

		return dest
	}
	
}


module.exports = tools