exports.parse = function(input) {
	if(null == input || '' == input)
		return {}

	 // 去除 URL 末端的斜杠
	 var str = removeSlashAtEnd(input)
	 var resIndex = str.indexOf('resources')
	 if(resIndex == -1 || resIndex == str.length - 9)
	 	return {}

	 queryStrs = str.substr(resIndex + 10).split('/')

	 // id = 0 表示列出所有资源
	 if(queryStrs.length % 2 != 0) {
	 	queryStrs.push('0')
	 }

	 return {
	 	resources: queryStrs[0],
	 	id: queryStrs[1]
	 }
}

function removeSlashAtEnd(str){
	if(str.charAt(str.length -1) == '/'){
		return str.substring(0, str.length -1);
	}
	return str;
}