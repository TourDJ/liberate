
function article(dest) {
	this.id = dest.id
	this.title = dest.title
	this.content = dest.content
	this.post_time = dest.post_time
	this.langid = dest.langid || -1
	this.cnt_approve = dest.cnt_approve || 0
	this.cnt_against = dest.cnt_against || 0
	this.cnt_message = dest.cnt_message || 0
	this.cnt_read = dest.cnt_read || 0
	this.state = dest.state || 1
}

article.prototype.setApprove = function(cnt_app){
	this.cnt_approve += cnt_app
};

article.prototype.setAgainst = function(cnt_aga){
	this.cnt_against += cnt_aga
};

article.prototype.setMessage = function(cnt_msg){
	this.cnt_message += cnt_msg
};

article.prototype.setRead = function(cnt_read){
	this.cnt_read += cnt_read
};

exports.article = article