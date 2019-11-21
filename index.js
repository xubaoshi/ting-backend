process.env.NODE_ENV = process.env.NODE_ENV || 'development'
var express = require('express')
var errorHandler = require('errorHandler')
var config = require('./config')
var routes = require('./routes')

var app = express()

// 路由
routes(app)

if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler())
}

app.listen(config.port, '', function() {
  console.log('server listening on ' + config.port)
})
