require('dotenv').config()

const view = require('../handler/view')
const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/categories', function (req, res) {
  let Path: string = `${__dirname.replace('routes', '')}/public/components`
  let Components: Array<string> = []
  fs.readdirSync(Path).map(
    (val) =>
      (val =
        fs.lstatSync(`${Path}/${val}`).isDirectory() == true
          ? Components.push(val)
          : undefined)
  )

  res.json({
    Success: true,
    Message: 'Successfuly Fetched Data',
    Data: Components
  })
})

router.get('/all/:category', function (req, res) {
  if (req.params.category) {
    let Components: Array<string> = []
    let ComponentsLast: Array<string> = []
    let Path: string = `${__dirname.replace('routes', '')}/public/components/${
      req.params.category
    }`
    if (fs.existsSync(Path)) {
      fs.readdirSync(Path).map((val) =>
        val.split('.')[val.split('.').length - 1] == 'html'
          ? Components.push(val)
          : ''
      )
      res.json({
        Success: true,
        Message: 'Successfuly Fetched Data',
        Data: Components
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
    let Path: string = `${__dirname.replace('routes', '')}/public/components/${
      req.params.category
    }/${req.params.name}.html`
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
  res.setHeader('Content-Type', `image/jpg`)
  let Path: string = `${__dirname.replace('routes', '')}/public/components/${
    req.params.category
  }/${req.params.name}.jpg`
  if (req.params.category) {
    if (fs.existsSync(Path)) {
      res.sendFile(Path)
    }
  }
})

module.exports = router
