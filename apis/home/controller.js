var asyncHandler = require('express-async-handler')
var puppeteer = require('puppeteer')
var config = require('../../config')
var commonUtil = require('../../utils/common')
var path = require('path')
var fs = require('fs')
var file = require('../../utils/file')

// 获取首页信息
exports.getHome = asyncHandler(async function(req, res) {
  // 爬取首页信息
  var browser = await puppeteer.launch({
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
      var titLink = ''
      var titName = ''
      var contentData = []
      // title
      if (commonUtil.isNotEmpty(title)) {
        var titNameHandle = await title[0].getProperty('textContent')
        titName = await titNameHandle.jsonValue()
        var titHandleLinkHandle = await title[0].getProperty('href')
        titLink = await titHandleLinkHandle.jsonValue()
      }

      // content
      contentData = await topic.$$eval(contentClass, async items => {
        return items.map(item => {
          return {
            title: item.textContent,
            path: item.href
          }
        })
      })

      topicsData.push({
        title: titName,
        moreLInk: titLink,
        content: contentData
      })

      if (index === topics.length - 1) {
        file.saveData('home', topicsData)
        res.send(topicsData)
      }
    })
  }
})
