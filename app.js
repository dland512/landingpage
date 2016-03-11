var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var contactHandler = require("./handlers/contact.handler")
var config = require("./config/" + process.env.name)

var app = express()
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', function(req, res) {
	res.render('index.jade', { name: config.company.name, logo: config.company.logo })
})

app.post('/contact', contactHandler.contact)

app.listen(app.get('port'))
console.log('listening on port ' + app.get('port'))
