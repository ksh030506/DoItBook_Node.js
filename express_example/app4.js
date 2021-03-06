var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next){
    console.log('첫번째 미들웨어 호출');

    req.user = 'kim';
    next();   //그 다음 미들웨어로 감
}); //미들웨어 등록 (함수)

app.use(function(req, res, next){
    console.log('두번째 미들웨어 호출');

    //res.send('<h1>서버에서 응답한 결과 : '+req.user+'</h1>')
    var Person = {name: '김상현', age:20};
    var PersonStr = JSON.stringify(Person);
    //res.send(PersonStr);

    res.writeHead(200, {"Content-Type": "application/json;charset=utf8"});
    res.write(PersonStr);
    res.end();
});

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스 실행');
});
