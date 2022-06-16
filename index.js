require('dotenv').config()
var Console = require('./handler/console')
var view = require('./handler/view')
var express = require('express')
var path = require('path')
var app = express()
app.set('view engine', 'html')
app.engine('html', require('ejs').renderFile)
app.use(express.static(path.join(__dirname, 'public')))
app.use('/js', require('./routes/js'))
app.use('/api', require('./routes/api'))
app.use('/css', require('./routes/css'))
app.use('/components', require('./routes/components'))
app.get('/', function (req, res) {
  res.sendFile(view('index'))
})
app.listen(process.env.PORT || 3002, function (err) {
  err != null
    ? Console.err(err)
    : Console.success(
        'Application is Running on Port http://localhost:'.concat(
          process.env.PORT || 3002
        )
      )
})
