var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')
var port = process.env.PORT || 6773
// Serve up public/ftp folder
var serve = serveStatic('build', {
  maxAge: '1y',
  setHeaders: setCustomCacheControl,
})
// Create server
var server = http.createServer(function onRequest(req, res) {
  serve(req, res, finalhandler(req, res))
})

function setCustomCacheControl(res, path) {
  if (serveStatic.mime.lookup(path) === 'text/html') {
    // Custom Cache-Control for HTML files
    res.setHeader('Cache-Control', 'public, max-age=0')
  }
}
// Listen
server.listen(port)