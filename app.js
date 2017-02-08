var express = require('express')
var path    = require('path')

var app = express()

app.set('views', './views/pages')
app.set('view engine', 'jade')

app.use(express.static(path.join(__dirname, 'public')))

var port = process.env.PORT || 4000
app.listen(port)
console.log('start on http://localhost:' + port + '/')
//allow custom header and CORS
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')

    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next()
    }
})
//reader page
app.get('/', function (req, res) {
    var book = require('./public/test/data/data1-1.json')
    res.render('reader', {
        book: book
    })
})