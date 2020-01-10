var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');
var app = express();

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.set('port', process.env.PORT || 3000);
app.use(static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var router = express.Router();

router.route('/process/setUserCookie').get(function(req, res){
    console.log('/process/setUserCookie 라우팅 함수 호출됨');

    res.cookie('user', {
        id:'kim',
        name:'김상현',
        authorized:true
    });

    res.redirect('/process/showCookie');
});

router.route('/process/showCookie').get(function(req, res){
    console.log('/process/showCookie 라우팅 함수 호출됨');

    res.send(req.cookies);  //웹브라우저에 저장 (확인용)
});



app.use('/', router);

app.all('*', function(req, res){
    res.status(404).send('<h1>요청하신페이지는 없습니다.<h1>');
});



var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스 실행');
});