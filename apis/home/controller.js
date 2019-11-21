var asyncHandler = require('express-async-handler')
var puppetteer = require('puppeteer')
var config = require('../../config')

// 获取首页信息
exports.getHome = asyncHandler(async function(req, res) {
  // 爬取首页信息
  var browser = await puppetteer.launch({})
  var page = await browser.newPage()
  await page.goto(config.baseUrl)
  await page.screenshot({ path: 'screenshot.png' })
  // 专题
  var topicSelector = '.list_tr3 .mod'
  const topics = await page.$$(topicSelector)
  console.log(topics)
})
