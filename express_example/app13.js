var express = require('express');
var app = express();

var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var multer = require('multer');
var fs = require('fs');

var cors = require('cors');   //다중 서버 접속

app.set('port', process.env.PORT || 3000);
app.use(static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true    //파일 저장, 메모리 데이터베이스 저장옵션
}));


app.use(cors());
var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, 'uploads');
    },
    filename: function(req, file, callback){

        //확장자 죽음
        //callback(null, file.originalname + Date.now());


        //확장자 살림
        var extension = path.extname(file.originalname);
        var basename = path.basename(file.originalname, extension);
        callback(null, basename + Data.now() + extension);
    }
});

var upload = multer({
    storage:storage,
    limits:{
        files:10,
        fileSize:1024*1024*1024
    }
});


var router = express.Router();



app.use('/', router);
app.all('*', function(req, res){
    res.status(404).send('<h1>요청하신페이지는 없습니다.<h1>');
});



var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스 실행');
});