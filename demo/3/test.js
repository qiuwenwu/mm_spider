const Spider = require("./index.js");

var config = "./config.json".loadJson();
var spider = new Spider(config);

async function test() {
	spider
		.goto('https://www.qixin.com/search?key=%E5%B9%BF%E5%B7%9E%E6%9C%8D%E8%A3%85&page=1')
		.import("./plugin/jquery.min.js")
		.wait('.avator')
		.wait('.company-item .company-title')
		.evaluate(() => {
			var title = document.querySelector('.company-item .company-title a').text;
			var contact = document.querySelector('.legal-person').innerHTML;
			return {
				title,
				contact
			}
		})
		.then((res) => {
			// 函数参数为evaluate的返回值
			console.log(res);
		})
		.catch(error => {
			console.error('Search failed:', error)
		})
}

test();
