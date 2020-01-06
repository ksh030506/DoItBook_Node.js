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

var router = express.Router();

router.route('/process/login').post(function(req, res){
    console.log('/process/login 라우팅 함수에서 받음');

    var ParamId = req.query.id || req.body.id;
    var ParamPass = req.query.password || req.body.password;

    res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
    res.write("<h1>서버에서 로그인 음답");
    res.write("<div><p>" + ParamId + "</p></div>");
    res.write("<div><p>" + ParamPass + "</p></div>");
    res.end();
});


app.all('*', function(req, res){
    res.status(404).send('<h1>요청하신페이지는 없습니다.<h1>');
});
app.use('/', router);



var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스 실행');
});