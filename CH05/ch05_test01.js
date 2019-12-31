var http = require('http');

var server = http.createServer();

var port = 3000;
var host = '10.120.71.185';
server.listen(port, host, 50000, function(){   //동시에 접속하는 클라이언트수
    console.log('웹서버가 실행되었습니다.'+ host+':'+port);
});