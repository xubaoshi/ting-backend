module.exports = function(app) {
  app.use('/home', require('./apis/home'))
  app.use('/material', require('./apis/material'))
}
