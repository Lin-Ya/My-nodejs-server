var http = require('http')
var fs = require('fs')
var url = require('url')



http.createServer(function(req, res){

  var pathObj = url.parse(req.url, true)
  console.log(pathObj)
  if (pathObj.pathname === '/') {
      pathObj.pathname += 'test.html'
    }//默认情况下访问localhost://8080返回默认页面test.html
  switch (pathObj.pathname) {
      case '/login':
      res.end( fs.readFileSync(__dirname + '/sample/login' + pathObj.pathname ))
      console.log(pathObj.pathname)
      break;
    default:
      res.end( fs.readFileSync(__dirname + '/sample' + pathObj.pathname) )
  }
}).listen(8080)