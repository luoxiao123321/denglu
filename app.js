var express = require('express')
var bodyParser = require('body-parser')

var app = express()

var user = require('./routes/user.js')


app.listen(9000)

app.use(bodyParser.urlencoded({}))

app.use('/user',user)
