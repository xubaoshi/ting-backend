var asyncHandler = require('express-async-handler')
var puppetteer = require('puppeteer')
var config = require('../../config')
var commonUtil = require('../../utils/common')

// 获取首页信息
exports.getHome = asyncHandler(async function(req, res) {
  // 爬取首页信息
  var browser = await puppetteer.launch({
    // headerless: false
  })
  var page = await browser.newPage()
  await page.goto(config.baseUrl, {
    timeout: 0
  })

  // 专题
  var topicSelector = '.list_tr3 .mod'
  var topics = await page.$$(topicSelector)
  var topicsData = []

  if (commonUtil.isNotEmpty(topics)) {
    // titie
    var titieClass = '.mod_title .title a'
    // content
    var contentClass = '.li_l a'

    topics.forEach(async topic => {
      var title = await topic.$$(titieClass)
      var content = await  topic.$$(contentClass)
      var contentData = []
      console.log(title)
      console.log(content)
      if (commonUtil.isNotEmpty(contentData)) {
        content.forEach(async item => {
          var itemName = item.innerHtml
          var itemLink = await item.getProperties('href')
          console.log(itemName)
        })
      }
    })
  }

  console.log(topics)
  res.send('hello')
})
