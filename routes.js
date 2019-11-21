module.exports = function(app) {
  app.use('/home', require('./apis/home'))
}
