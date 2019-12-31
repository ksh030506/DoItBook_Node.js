var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next){
    console.log('첫번째 미들웨어 호출');

    var userAgent = req.header('User-Agent');
    var Paramname = req.query.name;

    res.send('<h3> userAgent => '+userAgent+'<h3>' + 
    '<h3> Paramname => '+Paramname+'<h3>');
}); //미들웨어 등록 (함수)


var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스 실행');
});
