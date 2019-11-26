var express = require('express')
var controller = require('./controller')
var router = express.Router()

router.get('/detail', controller.getMaterialDetail)
router.get('/list', controller.getMaterialList)

module.exports = router
