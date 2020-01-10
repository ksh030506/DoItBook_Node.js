var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');
var app = express();

var bodyParser = require('body-parser');

var multer = require('multer');
var fs = require('fs');
var cors = require('cors');  //ajxa로 요청 다중 서버 접속

app.set('port', process.env.PORT || 3000);
app.use(static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());

var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, 'uploads');
    },
    filename:function(req, file, callback){
       // callback(null, file.originalname + Date.now());
       //확장자 살림
       var extension = path.extname(file.originalname);
       var basename = path.basename(file.originalname, extension);

       callback(null, basename + Date.now() + extension);
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

router.route('/process/photo').post(upload.array('photo', 1), function(req, res){   //photo라는 이름의 파일이 들어오면 1개씩 배열에 넣어 주세요
    console.log('/process/photo 라우팅 함수 실행');

    var files = req.files;
    console.log('업로드된 파일');
    if (files.length > 0) {
        console.dir(files[0]);
    } else {
        console.log('파일이 없습니다.');
    }

    var originalname;
    var filename;
    var mimeType;
    var Size;

    if(Array.isArray(files)) {
        for(var i = 0; i < files.length; i++) {
            originalname = files[i].originalname;
            filename = files[i].filename;
            mimeType = files[i].mimeType;
            Size = files[i].Size;
        }
    }

    res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
    res.write("<h1>파일 업로드 성공<h1>");
    res.write("<p>원본파일 : " + originalname + "</p>");
    res.write("<p>저장파일 : " + filename + "</p>");
    res.end();
});

app.use('/', router);

app.all('*', function(req, res){
    res.status(404).send('<h1>요청하신페이지는 없습니다.<h1>');
});



var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스 실행');
});