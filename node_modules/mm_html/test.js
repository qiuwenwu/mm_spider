var Dom = require('./index.js');

/**
 * 测试html转为json
 * @param {String} file html文件
 */
async function test(file) {
	var dom = new Dom();
	var text = file.loadText(__dirname + '/');
	// var text = `<body><script src="assets/js/owl.carousel.js"></script></body>`;
	
// 	var text = `
// <div class="breadcrum-bg py-sm-5 py-4">bbbbb
// 				<div class="container py-lg-3">
// 					<h2>About Us</h2>
// 					<p><a href="index.html">Home</a> &nbsp; / &nbsp; About</p>
// 				</div>
// 				<div v-model="form.think"><p>ccc</p>123123</div>
// 			</div>`;

	var json = dom.toJson(text);
	'./demo_dict.json'.saveJson(json, true);
	
	var str = dom.toHtml(json);
	'./demo_dict.html'.saveText(str);
}

test('./demo.html');
