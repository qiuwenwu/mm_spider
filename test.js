const Spider = require("./index.js");

var config = "./config.json".loadJson();
var spider = new Spider(config);


// 测试基础获取数据
// async function test() {
// 	spider.help();

// 	// 1.开启程序
// 	spider
// 		.goto('https://duckduckgo.com')
// 		// .type('#search_form_input_homepage', 'github nightmare')
// 		.input('#search_form_input_homepage', 'github nightmare')
// 		.click('#search_button_homepage')
// 		.wait('#r1-0 a.result__a')
// 		.import("./plugin/jquery.min.js")
// 		// .previous()
// 		// .next()
// 		// .evaluate(() => $('#r1-0 a.result__a').href)
// 		// .evaluate(() => document.querySelector('#r1-0 a.result__a').href)
// 		// .import("jquery.min")
// 		// .import("test")
// 		// .get_html('html')
// 		// .get_html('#r1-0 a.result__a')
// 		// .get_text('#r1-0 a.result__a')
// 		.end()
// 		// .close()
// 		.then((res) => {
// 			// 函数参数为evaluate的返回值
// 			console.log(res);
// 			// "./test.html".saveText(res);
// 		})
// 		.catch(error => {
// 			console.error('Search failed:', error)
// 		})
// }

// 测试连贯操作
async function test() {
	var res = await spider
		.goto('https://baidu.com')
		.wait("#kw")
		.import("jquery.min", "mm_sdk")
		// .inject("js", "./plugin/jquery.min.js")
		.input("#kw", "新浪网")
		.evaluate(() => {
			var value = $('#kw').val();
			return value.between("新", "网");
		})

	// 函数参数为evaluate的返回值
	console.log("首次抓取", res);
	var res = await spider.goto('https://www.sina.com.cn/')
		.eval(() => {
			return 123
		});
	console.log("新链接", res);
	var html = await spider.get_html("#syncad_0");

	console.log("再次", html);
}

// async function test() {
// 	spider
// 		.goto('https://www.qixin.com/search?key=%E5%B9%BF%E5%B7%9E%E6%9C%8D%E8%A3%85&page=1')
// 		.import("./plugin/jquery.min.js")
// 		.wait('.avator')
// 		.wait('.company-item .company-title')
// 		.evaluate(() => {
// 			var title = document.querySelector('.company-item .company-title a').text;
// 			var contact = document.querySelector('.legal-person').innerHTML;
// 			return {
// 				title,
// 				contact
// 			}
// 		})
// 		// .close()
// 		.then((res) => {
// 			// 函数参数为evaluate的返回值
// 			console.log(res);
// 		})
// 		.catch(error => {
// 			console.error('Search failed:', error)
// 		})
// }

test();
