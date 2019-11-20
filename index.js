process.env.NODE_ENV = process.env.NODE_ENV || 'development'
var express = require('express')
var errorHandler = require('errorHandler')
var config = require('./config')

var app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler())
} else {
  app.use
}

app.listen(config.port, function() {
  console.log('Express server listening on %d')
})
