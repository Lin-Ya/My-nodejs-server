var http = require('http');//http模块，实现服务器的功能
var path = require('path');//处理url的路径
var fs = require('fs')//读写文件
var url = require('url');//提取、解析url

var routes = { //这里是路由条件，意味着可以自己增添不同的条件来处理不同情况下的请求
	//相当于ajax mock数据
	'/a': function (req, res) {
		res.end(JSON.stringify(req.query))
	},

	'/b': function (req, res) {
		res.end('match /b')
	},

	'/login': function (req, res) {
		res.end('match /login/login')
	}

}


var server = http.createServer(function(req,res){
	staticRoot(path.join(__dirname, 'sample'), req, res)
	// res.setHeader("Content-Type","text/html; charset=utf-8")//设置响应头。里面包括content-type(指定内容类型），编码方式（最高优先级），是html还是css还是js？
	// res.writeHead(200,'success');//status code 用于表示响应状态码和解释
	// res.write('hello')//这里的内容是放到响应体里面。（放到html）
	// res.end();//发给浏览器的响应结束，如果传入字符串，则write，再end
})
server.listen(8080)//监听8080端口

//__dirname 当前文件的路径 我们通过path.join(__dirname ,'文件夹目录名称')
//要拼装好路径，才能实现文件的访问。
function staticRoot(staticPath, req, res) {
	var pathObj = url.parse(req.url, true)//解析json 获取url
	console.log(pathObj)
	console.log(11111111)
	console.log(filePath)
	var filePath = path.join(staticPath , pathObj.pathname)//组成获取文件路径的字符串
	
	if (pathObj.pathname === '/') {
		pathObj.pathname += 'test.html'
	}//默认情况下访问localhost://8080返回默认页面test.html

	var filePath = path.join(staticPath, pathObj.pathname)//拼接需要读写的文件路径名
	fs.readFile(filePath, 'binary', function (err, fileContent) {
		if (err) {
			console.log('404')
			res.writeHead(404, 'not found')
			res.end('<h1>404 Not Found</h1>')
		} else {
			console.log('ok')
			res.writeHead(200, 'OK')
			res.write(fileContent, 'binary')
			res.end()
		}
	})
}


function routePath(req, res){
	var pathObj = url.parse(req.url, true)
	var handleFn = routes[pathObj.pathname] //匹配pathname是否在路由里面
	if(handleFn) {
		req.query = pathObj.query //处理get

		var body = ''
		req.on('data' , function(chunk) {
			body += chunk
		}).on('end',function () {
			req.body = parseBody(body)
			handleFn(req,res)
		})

	} else {
		staticRoot(path.resolve(__dirname, 'sample'), req, res)//如果pathname没有匹配到路由的情况，把请求当做静态处理
	}
}

function parseBody(body) {
	console.log(body)
	var obj = {}
	body.split('&').forEach(function (str) {
		obj[str.split('=')[0]] = str.split('=')[1]     //key = value 的形式
	})
	return obj
}





