require('dotenv').config()
var view = require('../handler/view')
var express = require('express')
var router = express.Router()
var fs = require('fs')
router.get('/categories', function (req, res) {
  var Path = ''.concat(__dirname.replace('routes', ''), '/public/components')
  var Components = []
  fs.readdirSync(Path).map(function (val) {
    return (val =
      fs.lstatSync(''.concat(Path, '/').concat(val)).isDirectory() == true
        ? Components.push(val)
        : undefined)
  })
  res.json({
    Success: true,
    Message: 'Successfuly Fetched Data',
    Data: Components
  })
})
router.get('/all/:category', function (req, res) {
  if (req.params.category) {
    var Components_1 = []
    var ComponentsLast = []
    var Path = ''
      .concat(__dirname.replace('routes', ''), '/public/components/')
      .concat(req.params.category)
    if (fs.existsSync(Path)) {
      fs.readdirSync(Path).map(function (val) {
        return val.split('.')[val.split('.').length - 1] == 'html'
          ? Components_1.push(val)
          : ''
      })
      res.json({
        Success: true,
        Message: 'Successfuly Fetched Data',
        Data: Components_1
      })
    } else {
      res.json({
        Success: false,
        Message: 'No such category'
      })
    }
  }
})
router.get('/iframe/:category/:name', function (req, res) {
  if (req.params.category && req.params.name) {
    var Path = ''
      .concat(__dirname.replace('routes', ''), '/public/components/')
      .concat(req.params.category, '/')
      .concat(req.params.name, '.html')
    if (fs.existsSync(Path)) {
      res.render(view('iframe'), { content: fs.readFileSync(Path, 'utf-8') })
    } else {
      res.json({
        Success: false,
        Message: 'No such component'
      })
    }
  }
})
router.get('/thumbnail/:category/:name', function (req, res) {
  res.setHeader('Content-Type', 'image/jpg')
  var Path = ''
    .concat(__dirname.replace('routes', ''), '/public/components/')
    .concat(req.params.category, '/')
    .concat(req.params.name, '.jpg')
  if (req.params.category) {
    if (fs.existsSync(Path)) {
      res.sendFile(Path)
    }
  }
})
module.exports = router
