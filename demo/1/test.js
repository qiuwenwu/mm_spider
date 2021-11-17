const Spider = require("./index.js");

var config = "./config.json".loadJson();
var spider = new Spider(config);


// 测试基础获取数据
async function test() {
	spider.help();

	// 1.开启程序
	spider
		.goto('https://duckduckgo.com')
		// .type('#search_form_input_homepage', 'github nightmare')
		.input('#search_form_input_homepage', 'github nightmare')
		.click('#search_button_homepage')
		.wait('#r1-0 a.result__a')
		.import("./plugin/jquery.min.js")
		// .previous()
		// .next()
		// .evaluate(() => $('#r1-0 a.result__a').href)
		// .evaluate(() => document.querySelector('#r1-0 a.result__a').href)
		// .import("jquery.min")
		// .import("test")
		// .get_html('html')
		// .get_html('#r1-0 a.result__a')
		// .get_text('#r1-0 a.result__a')
		.end()
		// .close()
		.then((res) => {
			// 函数参数为evaluate的返回值
			console.log(res);
			// "./test.html".saveText(res);
		})
		.catch(error => {
			console.error('Search failed:', error)
		})
}
test();
