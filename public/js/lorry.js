//
(function(global) {
	var tang = {
		version : '1.0',
		
		constructor : tang,
			
		// 是否支持css的某个属性() 
		isSuportCss : function (property, elemStr) {
			var elemStr = elemStr || "body",
				body = $(elemStr)[0];
			for(var i = 0; i < property.length; i++){
				if(property[i] in body.style)
					return true;
			}
			return false;
		},
		
		getElementTop : function(element) {
			var actualTop = element.offsetTop,
				current = element.offsetParent;
			
			while(current){
				actualTop += current.offsetTop;
				current = current.offsetParent;
			}
			return actualTop;
		},

		getElementLeft : function(element) {
			var actualLeft = element.offsetLeft,
				current = element.offsetParent;
			
			while (current) {
				actualLeft += current.offsetLeft;
				current = current.offsetParent;
			}
			return actualLeft;
		}
	};
	
	tang.options = {
		loginbox: {
			closeOutClass: 'tang_login_close',
			closeClass: 'tang-login-close'
		}
	}

	tang.getDOM = function(id) {
		return document.getElementById(id);
	};

	tang.addEvent = function (obj, event, fn) {
	    if(obj.addEventListener){
	    	obj.addEventListener(event, fn, false);
	    }else if(obj.attachEvent){
	    	obj.attachEvent('on' + event, fn);
	    }
	}

	tang.openMask = function(parentElement) {
		var 
			sWidth, sHeight,
			oMask, 
			body = document.body || document.documentElement;

		//获取页面的高度和宽度
		sWidth = body.scrollWidth;
		sHeight = body.scrollHeight;

		oMask = document.createElement("div");
		oMask.id = "tang-mask";
		oMask.style.height = sHeight + "px";
		oMask.style.width = sWidth + "px";
		body.appendChild(oMask);
		return oMask;
	}

	tang.openLogin = function() {
		var 
			oMask,wWidth, wHeight,
			oLogin, dWidth, dHeight, oClose,
			body = document.body || document.documentElement;
		
		if(tang.openMask)
			oMask = tang.openMask();
		
		//获取页面的可视区域高度和宽度
		wWidth = body.clientWidth;
		wHeight = body.clientHeight;
		
		oLogin = document.createElement("div");
		oLogin.id="tang-login-box";
		oLogin.innerHTML="<div class='tang_login_close'><div id='tang-login-close'>点击关闭</div></div>";
		body.appendChild(oLogin);
		
		//获取登陆框的宽和高
		dWidth = oLogin.offsetWidth;
		dHeight = oLogin.offsetHeight;
		//设置登陆框的left和top
		oLogin.style.left = wWidth/2 - dWidth/2 + "px";
		oLogin.style.top = wHeight/2 - dHeight/2 + "px";
		
		//点击关闭按钮
		oClose = document.getElementById("tang-login-close");
		
		//点击登陆框以外的区域也可以关闭登陆框
		oClose.onclick = oMask.onclick = function(){
			body.removeChild(oLogin);
			body.removeChild(oMask);
		};	
	}
	
	global.tang = tang;
	
function LoadImage(element, imgUrl) {
	
	return this;
}

//固定边栏滚动
function fixSide(domID) {
	var id = domID,
		srcollTop, screenHeight, sideHeight;
	
	if($ && jQuery){
			srcollTop = $(global).scrollTop(),
			screenHeight = $(global).height(),
			sideHeight = $(id).height();

		if (srcollTop + screenHeight > sideHeight) {
			$(id).css({
				'position' : 'fixed',
				right : '0px',
				top : -(sideHeight - screenHeight)
			});
		} else {
			//设置为默认值
			$(id).css({
				'position' : 'static'
			});
		}	
	}else {
		var side = tang.getDOM(id);
		
		sideHeight = side.offsetHeight;
		screenHeight = document.body.clientHeight || document.documentElement.clientHeight;
		srcollTop = document.body.scrollTop || document.documentElement.scrollTop;
		
		if(srcollTop + screenHeight > sideHeight){
			domSider.style.cssText = 'position:fixed;right:0px;top:' + (-(sideHeight - screenHeight)) + 'px';
		}else{
			domSider.style.position = 'static';
		}
	}
}
tang.fixSide = fixSide;

//自动完成
tang.autoComplete = function(isJquery) {
	if(isJquery){
		$AutoComp();
	} else {
		autoComp();
	}
}

function $AutoComp () {
	$("#search-text").bind('keyup', function() {
		var searchText = $("#search-text").val();
		if(searchText){
			var url = '/SmartLockSystem/ajax/searchK?key='+searchText;
			$.post(url, {}, function(data, textStatus, jqXHR) {
				var key = data['keywords'],
					sHtml = '',
					len = !!key ? key.length : 0;
				for(var i = 0; i < len; i++){
					sHtml += '<li class="li-search">' + key[i] + '</li>';
				} 
				
				if(sHtml){
					$('#search-result').html(sHtml);
					$("#search-suggest").show().css({
						top: $("#search-form").offset().top + $("#search-form").height() + 10,
						left: $("#search-form").offset().left,
						position: 'absolute'
					});
				}else {
					$("#search-suggest").hide();
				}
			}, 'json');
		}else{
			$("#search-suggest").hide();		
		}
	});	
	
	$(document).bind('click', function() {
		$("#search-suggest").hide();
	});
	$(document).delegate('li.li-search', 'click', function() {
		var k = $(this);
		$("#search-text").val(k.text());
	});
}

function autoComp () {
	var searchText = tang.getDOM("search-text"),		
		suggest = tang.getDOM("search-suggest"),
		ul = tang.getDOM("search-result");

	tang.addEvent(searchText, "keyup", function() {
		var url = '/SmartLockSystem/ajax/searchK?key='+searchText.value;
		ajaxPost(url, function(data, textStatus, jqXHR) {
			var key = data['keywords'],
				sHtml = '',
				len = !!key ? key.length : 0;
			for(var i = 0; i < len; i++){
				sHtml += '<li class="li-search">' + key[i] + '</li>';
			} 
			
			ul.innerHTML = sHtml;
			suggest.style.top = tang.getElementTop(tang.getDOM("search-form")) + 38 +'px';
			suggest.style.left = tang.getElementLeft(tang.getDOM("search-form")) + 'px';
			suggest.style.position = 'absolute';
			suggest.style.display = 'block';
		})
	})
	
	tang.addEvent(document, 'click', function() {
		suggest.style.display = "none";
	})
	
	delegateEvent("li", "click", function() {
		var keyword,
			searchText = tang.getDOM("search-text"),
			clas = this.getAttribute("class"),
			clases = clas.split(" ");
		
		for (var i = 0; i < clases.length; i++) {
			if(clases[i] == 'li-search'){
				keyword = this.innerHTML;
				searchText.value = keyword;
				break;
			}
		}
	})
}

/**
 * Ajax javascript 实现
 */
function ajaxPost(url, callback) {
	var _xhr = null;
	if(window.XMLHttpRequest){
		_xhr = new window.XMLHttpRequest();
	}else if (window.ActiveXObject) {
		_xhr = new ActiveXObject("Msxml2.XMLHTTP");
	}
	
	_xhr.onreadystatechange = function() {
		if(_xhr.readyState == 4 && _xhr.status == 200){
		    try {
		    	callback(JSON.parse(_xhr.responseText));
			} catch (e) {
				callback((new Function("return " + _xhr.responseText))());
			}
		}
	}
	
	_xhr.open('post', url, false);
	_xhr.send(null);
}

/**
 * 事件代理 javascript 实现
 * 	事件源：event 对象，事件源不管在哪个事件中，只要是你操作的那个元素就是事件源。
		IE：window.event.srcElement
		W3C:event.target
 */
function delegateEvent (target, event, fn) {
	tang.addEvent(document, event, function(e) {
		var 
			e = e || window.event,
			goal = e.target || e.srcElement;
		
		if(goal.nodeName == target.toUpperCase()){
			fn.call(e.target);
		}
	});
}	

//全屏滚动
(function($) {
	var defaults = {
			'container' : '#container',// 容器
			'sections' : '.section',// 子容器
			'easing' : 'ease',// 特效方式，ease-in,ease-out,linear
			'duration' : 1000,// 每次动画执行的时间
			'pagination' : true,// 是否显示分页
			'loop' : false,// 是否循环
			'keyboard' : true,// 是否支持键盘
			'direction' : 'vertical',// 滑动的方向 horizontal,vertical,
			'horiClass' : 'left',// 方向为 horizontal时增加类标记
			
			'onpageSwitch' : function(pagenum) {
				
			}
		},
		
		win = $(window),
		container,
		sections,
		opts = {},
		canScroll = true,
		iIndex = 0,
		arrElement = [];
	
	tang.switchPage = function(options) {
		opts = $.extend({}, defaults, options || {});
		
		container = $(opts.container);
		sections = container.find(opts.sections);		
		sections.each(function () {
			arrElement.push($(this));
		});
		
		// 重写鼠标滑动事件
		$(document).on("mousewheel DOMMouseScroll", MouseWheelHandler);
		
		// 窗口Resized
		var resizeId;
		win.resize(function () {
			clearTimeout(resizeId);
			resizeId = setTimeout(function() {
				reBuild();
			}, 500);
		})
		
		return $(container).each(function () {
			if(opts.direction == "horizontal"){
				initLayout(opts);
			}
			
			if(opts.pagination){
				initPagination();
			}
			
			if(opts.keyboard){
				keyDown();
			}
		});
	}

	// 窗口重置大小
	function reBuild() {
		var currentWidth = win.width(),
			currentHeight = win.height(),
			element = arrElement[iIndex];
		
		if(opts.direction == "horizontal"){
			var offsetLeft = element.offset().left;
			if(Math.abs(offsetLeft) > currentWidth / 2 
				&& iIndex < (arrElement.length - 1)){
				iIndex++;
			}
		}else {
			var offsetTop = element.offset().top;
			if(Math.abs(offsetTop) > currentHeight / 2
				&& iIndex < (arrElement.length - 1)){
				iIndex++;
			}
		}
		
		if(iIndex){
			paginationHandler();
			var currentElement = arrElement[iIndex],
				dest = currentElement.position();
			initEffects(dest, currentElement);
		}
	}
		
	// 横向布局初始化
	function initLayout(opts) {
		var length = sections.length, 
			width = (length * 100) + "%",
			cellWidth = (100 / length).toFixed(2) + "%",
			hClass = opts.horiClass;
		container.width(width).addClass(hClass);
		sections.width(cellWidth).addClass(hClass);
	}
	
	// 初始化分页
	function initPagination() {
		var length = sections.length;
		if(!length){
			return;
		}
		var pageHtml = '<ul id="pages"><li class="active"></li>';
		for(var i = 1; i < length; i++){
			pageHtml += '<li></li>';
		}
		pageHtml += '</ul>';
		$("body").append(pageHtml);
	}
	
	// 数据滑轮事件句柄
	function MouseWheelHandler(e) {
		e.preventDefault();
		var value = e.originalEvent.wheelDelta || -e.originalEvent.detail;
		var delta = Math.max(-1, Math.min(1, value));
		if(canScroll){
			if(delta < 0) {
				moveSectionDown();
			} else {
				moveSectionUp();
			}
		}
		return false;
	}	

	// 绑定键盘事件
	function keyDown() {
		var keydownId;
		win.keydown(function(e) {
			clearTimeout(keydownId);
			keydownId = setTimeout(function() {
				var keyCode = e.keyCode;
				if(keyCode == 37 || keyCode == 38){
					moveSectionUp();
				}else if (keyCode == 39 || keyCode == 40) {
					moveSectionDown();
				}
			}, 150);
		});
	}
	
	// 滚轮向上滑动事件
	var moveSectionUp = function () {
		if(iIndex){
			iIndex--;
		}else if (opts.loop) {
			iIndex = arrElement.length - 1;
		}
		scrollPage(arrElement[iIndex]);
	},
	
	// 滚轮向下滑动事件
	moveSectionDown = function() {
		if(iIndex < (arrElement.length - 1)){
			iIndex++;
		}else if (opts.loop) {
			iIndex = 0;
		}
		scrollPage(arrElement[iIndex]);
	}
	
	// 页面滚动事件
	function scrollPage(element) {
		var dest = element.position();
		if(typeof dest === 'undefined')
			return;
		initEffects(dest, element);
	}
	
	// 渲染效果
	function initEffects(dest, element) {
		var transform = [ "-webkit-transform", "-ms-transform", "-moz-transform", "transform" ], 
		  	transition = ["-webkit-transition", "-ms-transition", "-moz-transition", "transition" ];
		
		canScroll = false;
		if(tang.isSuportCss(transform) && tang.isSuportCss(transition)){
			var translate = "";
			if(opts.direction == 'horizontal'){
				translate = "-" + dest.left + "px, 0px, 0px";
			}else {
				translate = "0px, -" + dest.top + "px, 0px";
			}
			
			container.css({	"transition" : "all " + opts.duration + "ms " + opts.easing,
							"transform" : "translate3d(" + translate + ")"});
			
			container.on("webkitTransitionEnd msTransitionend mozTransitionend transitionend", function() {
				canScroll = true;
			});
		}else {
			var cssObj = (opts.direction == 'horizontal') ? {left: -dest.left} : {top: -dest.top};
			container.animate(cssObj, opts.duration, function() {
				canScroll = true;
			})
		}
		element.addClass("active").siblings().removeClass("active");
		if(opts.pagination){
			paginationHandler();
		}
	}
	
	// 分页事件
	function paginationHandler() {
		var pages = $("#pages li");
		pages.eq(iIndex).addClass("active").siblings().removeClass("active");
	}

}(jQuery));	


function showTooltip(obj, id, html, width, height) {
	if(!tang.getDOM(id)){
		var tooltipBox = document.createElement("div"),
			left, top,
			dWidth = document.body.clientWidth || document.documentElement.clientWidth,
			dHeight = document.body.clientHeight || document.documentElement.clientHeight;
		
		tooltipBox.className = "tooltip-box";
		tooltipBox.id = id;
		tooltipBox.innerHTML = html;
		obj.appendChild(tooltipBox);
		
		tooltipBox.style.width = width ? width + "px" : "auto";
		tooltipBox.style.height = height ? height + "px" : "auto";		
		tooltipBox.style.position = "absolute";
		tooltipBox.style.display = "block";
		
		left = obj.offsetLeft;
		top = obj.offsetTop + 20;
		if(left + tooltipBox.offsetWidth > dWidth){
			var pLeft = tang.getDOM("div-tooltip").offsetLeft;
			left = dWidth - pLeft - tooltipBox.offsetWidth;
			
			if(left < 0)
				left = 0;
		}
		
		tooltipBox.style.left = left + "px";
		tooltipBox.style.top = top + "px";
		
		tang.addEvent(obj, "mouseleave", function() {
			setTimeout(function() {
				tang.getDOM(id).style.display = "none";
			}, 300);
		});
	}else {
		tang.getDOM(id).style.display = "block";
	}
}

tang.showTooltip = showTooltip;

/**
 * 
 * DOMElement.contains(DOMNode)
 * 		这个方法起先用在 IE ，用来确定 DOM Node 是否包含在另一个 DOM Element 中。
 * 		如果 DOM Node 和 DOM Element 相一致，.contains() 将返回 true ，虽然，一个元素不能包含自己。
 * NodeA.compareDocumentPosition(NodeB)
 * 		这个方法是 DOM Level 3 specification 的一部分，允许你确定 2 个 DOM Node 之间的相互位置。
 * 		这个方法比 .contains() 强大。这个方法的一个可能应用是排序 DOM Node 成一个详细精确的顺序。
 *		使用这个方法你可以确定关于一个元素位置的一连串的信息。所有的这些信息将返回一个比特码（Bit，比特，亦称二进制位）。
 *		对于那些，人们知之甚少。比特码是将多重数据存储为一个简单的数字（译者注：0 或 1）。你最终打开 / 关闭个别数目（译者注：打开/关闭对应 0 /1），将给你一个最终的结果。
 *		这里是从 NodeA.compareDocumentPosition(NodeB) 返回的结果，包含你可以得到的信息。
 *		Bits          Number        Meaning 
 *		000000         0              元素一致 
 *		000001         1              节点在不同的文档（或者一个在文档之外） 
 *		000010         2              节点 B 在节点 A 之前 
 *		000100         4              节点 A 在节点 B 之前 
 *		001000         8              节点 B 包含节点 A 
 *		010000         16             节点 A 包含节点 B 
 *		100000         32             浏览器的私有使用
 */
var contains = (function() {
	var docEl = document.documentElement;

    if (typeof docEl.compareDocumentPosition != 'undefined') {
      return function(el, b) {
        return (el.compareDocumentPosition(b) & 16) !== 0;
      };
    }else if (typeof docEl.contains != 'undefined') {
      return function(el, b) {
        return el !== b && el.contains(b);
      };
    }
    
    return function(el, b) {
      if (el === b) return false;
      while (el != b && (b = b.parentNode) != null);
      return el === b;
    };
})();
tang.contains = contains;

})(window);

