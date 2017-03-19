
function user(obj){
	this.id = obj.id || -1
	this.nickname = obj.nickname
	this.username = obj.username
	this.password = obj.password
	this.state = obj.state || 1
	this.create_time = obj.create_time
}

exports.user = user