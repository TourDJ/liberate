function article_comment(obj) {
	this.id = obj.id,
	this.aid = obj.aid,
	this.message = obj.message,
	this.msg_time = obj.msg_time,
	this.msg_man = obj.msg_man
}

exports.comment = article_comment