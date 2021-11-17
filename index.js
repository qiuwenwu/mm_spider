const Html = require("mm_html");
var Nightmare = require('nightmare');

// nightmare
//   .goto('https://duckduckgo.com')
//   .type('#search_form_input_homepage', 'github nightmare')
//   .click('#search_button_homepage')
//   .wait('#r1-0 a.result__a')
//   .evaluate(() => document.querySelector('#r1-0 a.result__a').href)
//   .end()
//   .then(console.log)
//   .catch(error => {
//     console.error('Search failed:', error)
//   })

/**
 * 爬虫
 */
class Spider extends Nightmare {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		var cg = Object.assign({
			show: true
		}, config);
		super(cg);
		this.config = cg
	}
}

// /**
//  * 键盘按住
//  * @param {String} key_name
//  */
// Spider.prototype.keyboard_down = function(key_name) {
// 	this.keyboard.down(key_name);
// };

// /**
//  * 键盘弹起
//  * @param {String} key_name
//  */
// Spider.prototype.keyboard_up = function(key_name) {
// 	this.keyboard.up(key_name);
// 	return this;
// };

// /**
//  * 键盘按住
//  * @param {String} key_name
//  */
// Spider.prototype.keyboard_press = function(key_name) {
// 	this.keyboard.up(key_name);
// 	return this;
// };

/**
 * 鼠标按键
 * @param {String} selector 选择器
 * @return {Object}
 */
Spider.prototype.mousepress = function(selector) {
	this.mousedown(selector);
	this.mouseup(selector);
	return this;
};

/**
 * 聚焦
 * @param {string} selector 选择器
 * @return {Object}
 */
Spider.prototype.foucs = function(selector) {
	this.wait(selector);
	this.click(selector);
	return this;
};

/**
 * 执行js
 * @param {Function} func 函数
 * @return {Object}
 */
Spider.prototype.eval = function(func) {
	this.evaluate(func);
	return this;
};

/**
 * 输入内容
 * @param {String} tag 标签
 * @param {String} text 输入的内容
 * @return {Object} 返回自身
 */
Spider.prototype.input = function(tag, text) {
	this.type(tag, text);
	return this;
};

/**
 * 查看帮助
 */
Spider.prototype.help = function(bl = false) {
	if (bl) {
		var obj = {};
		$.push(obj, this, true);
		console.log(obj);
	} else {
		var dict = {
			".action": "自定义执行 (name, [electronAction|electronNamespace], action|namespace)",
			"cookie.set": "设置cookie (name, value)",
			"cookie.get": "获取cookie (name)",
			"header": "设置协议头 (title, value)",
			"goto": "跳转链接 (url, headers)",
			"run": "[Function (anonymous)]",
			"end": "结束 (func)",
			"halt": "清除所有排队操作 (error, done)",
			"on": "事件监听 (event_name, callback_func)",
			"once": "仅一次事件监听 (event_name, callback_func)",
			"removeListener": "移除监听 (event_name)",
			"queue": "队列 [Function (anonymous)]",
			"then": "完成时 (res)",
			"catch": "错误时 (error)",
			"use": "使用插件 (jsPath)",
			"engineVersions": "查看引擎版本 ()",
			"title": "获取页面标题 ()",
			"url": "获取路由地址 ()",
			"path": "获取路由路径 ()",
			"visible": "元素是否可见 (selector)",
			"exists": "元素是否存在 (selector)",
			"click": "点击 (selector)",
			"mousedown": "鼠标按下 (selector)",
			"mouseup": "鼠标弹起 (selector)",
			"mouseover": "鼠标经过 (selector)",
			"mouseout": "鼠标移出 (selector)",
			"mousepress": "鼠标按 (selector)",
			"type": "输入内容到输入框 (selector, text)",
			"insert": "插入内容到元素中 (selector, text)",
			"check": "复选框选中 (selector)",
			"uncheck": "复选框取消选中 (selector)",
			"select": "选择框选中 (selector, value)",
			"input": "输入内容 (selector, text)",
			"back": "返回上一页 ()",
			"forward": "快进下一页 ()",
			"previous": "返回上N页 (num)",
			"next": "快进下N页 (num)",
			"refresh": "刷新页面 ()",
			"wait": "等待元素出现(selector) 等待时长(ms) 等待函数执行完成(fn[, arg1, arg2,...])",
			"eval": "执行函数 (fn[, arg1, arg2,...])",
			"evaluate": "执行函数 (fn[, arg1, arg2,...])",
			"evaluate_now": "立即执行函数 (fn[, arg1, arg2,...])",
			"inject": "在页面引入文件 (type, file) type传js或css",
			"viewport": "设置显示屏幕大小 (width, height)",
			"useragent": "获取浏览器代理信息 [Function: action]",
			"scrollTo": "页面滚动 (top, left)",
			"screenshot": "屏幕截图 [Function: action]",
			"html": "保存html代码 (path, saveType) saveType可传html、htm",
			"pdf": "保存 (path, options)",
			"authentication": "授权认证 (username, password)"
		};
		console.log(dict)
	}
};

/**
 * 返回上一页
 * @param {Number} times 返回次数
 * @return {Object}
 */
Spider.prototype.previous = function(times = 1) {
	for (var i = 0; i < times; i++) {
		this.back();
	}
	return this;
};


/**
 * 快进次数
 * @param {Number} times 返回次数
 * @return {Object}
 */
Spider.prototype.next = function(times = 1) {
	for (var i = 0; i < times; i++) {
		this.forward();
	}
	return this;
};


/**
 * 导入文件
 * @param {Array} arg js或css 集合
 * @return {Object}
 */
Spider.prototype.import = function(...arg) {
	for(var i = 0 ; i < arg.length; i++){
		var jsOrCss = arg[i];
		if (jsOrCss.endWith(".js")) {
			this.inject("js", jsOrCss);
		} else if (jsOrCss.endWith(".css")) {
			this.inject("css", jsOrCss);
		} else {
			var file = `./plugin/${jsOrCss}.js`.fullname();
			if (file.hasFile()) {
				this.inject("js", file);
			} else {
				console.error("import type error: " + jsOrCss);
			}
		}
	}
	
	return this;
};


/**
 * 拾取元素内容
 * @param {String} selector
 * @return {Object}
 */
Spider.prototype.get_text = function(selector) {
	this.evaluate(eval(`() => {
		if(!window.mm){
			window.mm = {};
		}
		window.mm['${selector}'] = document.querySelector('${selector}').textContent;
		return window.mm['${selector}'];
	}`));
	return this;
};

/**
 * 拾取元素html
 * @param {String} selector
 * @return {Object}
 */
Spider.prototype.get_html = function(selector) {
	this.evaluate(eval(`() => {
		if(!window.mm){
			window.mm = {};
		}
		window.mm['${selector}'] = document.querySelector('${selector}').innerHTML;
		return window.mm['${selector}'];
	}`));
	return this;
};

/**
 * 拾取元素值（表单）
 * @param {String} selector
 * @return {Object}
 */
Spider.prototype.get_value = function(selector) {
	this.evaluate(eval(`() => {
		if(!window.mm){
			window.mm = {};
		}
		window.mm['${selector}'] = document.querySelector('${selector}').value;
		return window.mm['${selector}'];
	}`));
	return this;
};


/**
 * 拾取元素引用源
 * @param {String} selector
 * @return {Object}
 */
Spider.prototype.get_src = function(selector) {
	this.evaluate(eval(`() => {
		if(!window.mm){
			window.mm = {};
		}
		window.mm['${selector}'] = document.querySelector('${selector}').src;
		return window.mm['${selector}'];
	}`));
	return this;
};

/**
 * 拾取a链接的url
 * @param {String} selector
 * @return {Object}
 */
Spider.prototype.get_href = function(selector) {
	this.evaluate(eval(`() => {
		if(!window.mm){
			window.mm = {};
		}
		window.mm['${selector}'] = document.querySelector('${selector}').href;
		return window.mm['${selector}'];
	}`));
	return this;
};

/**
 * 开启
 * @return {Object}
 */
Spider.prototype.open = function() {
	this.evaluate(eval(`() => {
		if(!window.mm){
			window.mm = {};
		}
	}`));
	this.end();
	return this;
};

/**
 * 关闭
 * @return {Object}
 */
Spider.prototype.close = function() {
	this.evaluate(eval(`() => JSON.stringify(window.mm || {})`));
	this.end();
	return this;
};

module.exports = Spider;
