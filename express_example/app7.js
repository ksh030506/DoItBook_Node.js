var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);
app.use(static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use(function(req, res, next){
    console.log('첫번째 미들웨어 호출');

    var userAgent = req.header('User-Agent');
    var Paramname = req.query.name || req.body.name;

    res.send('<h3> userAgent => '+userAgent+'<h3>' + 
    '<h3> Paramname => '+Paramname+'<h3>');
}); //미들웨어 등록 (함수)


var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스 실행');
});
