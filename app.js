var express = require('express')
var path = require('path')

var app = express()

app.set('views', './views/pages')
app.set('view engine', 'jade')

app.use(express.static(path.join(__dirname, 'public')))

var port = process.env.PORT || 4000
app.listen(port)
console.log('start on http://localhost:' + port+'/')

//reader page
app.get('/', function (req, res) {
    var book = require('./test/data/data1-1.json')
    res.render('reader', {
        book: book
    })
})