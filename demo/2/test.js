const Spider = require("./index.js");

var config = "./config.json".loadJson();
var spider = new Spider(config);

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

test();
