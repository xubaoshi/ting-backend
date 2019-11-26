var path = require('path')
var fs = require('fs')
var config = require('../config')

var saveData = (fileName, content) => {
  var relativePath = path.relative(__dirname, config.dataBasePath)
  var dataFilePath = `${path.resolve(__dirname, relativePath)}/${fileName}.json`
  fs.access(dataFilePath, fs.constants.F_OK, err => {
    fs.writeFile(dataFilePath, JSON.stringify(content), 'utf-8', err => {
      if (err) {
        console.log('写文件出错了，错误是：' + err)
      } else {
        console.log(`${fileName} 文件写入成功`)
      }
    })
  })
}

var getData = fileName => {
  return new Promise((resolve, reject) => {
    var relativePath = path.relative(__dirname, config.dataBasePath)
    var dataFilePath = `${path.resolve(__dirname, relativePath)}/${fileName}.json`
    var data = ''
    // 读取操作待优化
    fs.readFile(dataFilePath, 'utf-8', (err, result) => {
      if (err) {
        return ''
      }
      resolve(result)
    })
  })
}
module.exports = {
  saveData,
  getData
}
