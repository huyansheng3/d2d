const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
server.use(middlewares)

var mock = require('mockjs')
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.method = 'GET'
    }
    // Continue to JSON Server router
    next()
})

server.use('/user', jsonServer.router('user.json'))
server.use('/corp', jsonServer.router('corp.json'))
server.use('/market', jsonServer.router('market.json'))
server.get('/uncheck/sms/sendVerifyCode', (req, res) => {
    res.jsonp({
        'status': 'success'
    })
})

server.listen(3030, () => {
    console.log('JSON Server is running')
})

