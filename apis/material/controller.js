var asyncHandler = require('express-async-handler')
var puppeteer = require('puppeteer')
var file = require('../../utils/file')

// 获取物料列表
exports.getMaterialList = asyncHandler(async function(req, res) {
  var homeData = await file.getData('home')
  res.send(homeData)
})

// 获取物料详情
exports.getMaterialDetail = asyncHandler(async function(req, res) {
  var url = req.query.url
  if (url) {
    var browser = await puppeteer.launch()
    var page = await browser.newPage()
    await page.goto(url, {
      timeout: 0
    })

    // 资源集合
  } else {
    res.send('url is empty')
  }

  res.send(req.query)
})
