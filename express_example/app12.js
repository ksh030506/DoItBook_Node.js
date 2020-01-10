var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');
var app = express();

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var expressSession = require('express-session');
app.use(expressSession({
    //세션에 대한 설정 정보
    secret:'my key',          //저장할을 할때 정보
    resave:true,
    saveUninitialized:true
}));   //미들웨어 등록

app.set('port', process.env.PORT || 3000);
app.use(static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var router = express.Router();

router.route('/process/product').get(function(req, res){
    console.log('/process/product 라우팅 함수 호출됨');
    if(req.session.user){
        res.redirect('/product.html');
    } else {
        res.redirect('/login2.html');
    }
});

router.route('/process/login').post(function(req, res){
    console.log('/process/login 라우팅 함수 호출됨');

    var ID = req.body.id || req.query.id;
    var PASS = req.body.password || req.query.password;

    console.log('요청 파라미터' + ID +' '+ PASS);

    if(req.session.user) {
        console.log('이미 로그인 되어 있습니다.');
        res.redirect('/product.html');
    } else {
        req.session.user = {
            id:ID,
            name:'kim',
            authorized:true
        };

        res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
        res.write('<h1>로그인 성공!!</h1>');
        res.write('<p>ID : '+ID+'</p>');
        res.write('<br><br><a href="/product.html">상품페이지로 가기</a>');
        res.end();
    }
});


router.route('/process/logout').get(function(req, res){
    console.log('/process/logout 라우팅 함수 호출됨');

    if(req.session.user){
        console.log('로그아웃 합니다.');

        req.session.destroy(function(err){
            if(err){
                console.log('세션 삭제시 에러 발생');
                return;
            }

            console.log('세션 삭제 성공');
            res.redirect('/login2.html');
        })
    } else {
        console.log('로그인 되어 있지 않습니다.');
        res.redirect('/login2.html');
    }
});


app.use('/', router);

app.all('*', function(req, res){
    res.status(404).send('<h1>요청하신페이지는 없습니다.<h1>');
});



var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스 실행');
});