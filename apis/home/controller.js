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

    topics.forEach(async (topic, index) => {
      var title = await topic.$$(titieClass)
      var content = await topic.$$(contentClass)
      var contentData = []

      // title
      if (commonUtil.isNotEmpty(title)) {
        var titNameHandle = await title[0].getProperty('textContent')
        var titName = await titNameHandle.jsonValue()
        var titHandleLinkHandle = await title.getProperty('href')
        var titLink = await titHandleLinkHandle.jsonValue()
      }

      // content
      if (commonUtil.isNotEmpty(content)) {
        content.forEach(async item => {
          var itemNameHandle = await item.getProperty('textContent')
          var itemName = await itemNameHandle.jsonValue()
          var itemLinkHandle = await item.getProperty('href')
          var itemLink = await itemLinkHandle.jsonValue()
          contentData.push({
            title: itemName,
            path: itemLink
          })
        })
      }

      topicsData.push({
        title: titName,
        moreLInk: titLink,
        content: contentData
      })

      if (index === topics.length - 1) {
        res.send(topicsData)
      }
    })
  }
})
