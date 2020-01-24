




var login = function(req, res){
    console.log('/process/login 라우팅 함수 호출됨');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);

    var database = req.app.get('database');

    if(database) {
        authUser(database, paramId, paramPassword, function(err, docs)
        {
            if(err) {
                console.log('에러 발생');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>에러 발생</h1>');
                res.end();
                return;
            }

            if(docs) {
                console.dir(docs);
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>사용자 로그인 성공</h1>');
                res.write('<div><p>사용자 : ' +  docs[0].name + '</p></div>');
                res.write('<br><br><a href="/public/login.html">다시 로그인 하기</a>');
                res.end();
            } else {
                console.log('에러 발생');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>사용자 데이터 조회 안됨</h1>');
                res.end();
            }
        });
    } else {
        console.log('에러 발생');
        res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
        res.write('<h1>데이터베이스 연결 안됨</h1>');
        res.end();
    }
};

var addUser = function(req, res){
    console.log('/process/addUser 라우팅 함수 호출됨');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName);

    var database = req.app.get('database');

    if(database) {
        addUser(database, paramId, paramPassword, paramName, function(err, result){
            if(err) {
                console.log('에러 발생');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>에러 발생</h1>');
                res.end();
                return;
            }

            if(result) {
                console.dir(result);
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>사용자 추가 성공</h1>');
                res.write('<div><p>사용자 : ' +  paramName + '</p></div>');
                res.end();
            } else {
                console.log('에러 발생');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>사용자 데이터 추가 안됨</h1>');
                res.end();
            }
        });
    } else {
        console.log('에러 발생');
        res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
        res.write('<h1>데이터베이스 연결 안됨</h1>');
        res.end();
    }
};

var listUser = function(req, res){
    console.log('/public/process/listuser 라우팅 함수 호출됨');

    var database = req.app.get('database');

    if(database) {
        UserModel.findAll(function(err, results){
            if(err){
                console.log('에러 발생');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>에러 발생</h1>');
                res.end();
                return;
            }

            if(results){
                console.dir(results);

                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h3>사용자 리스트</h3>');
                res.write("<div><ul>");

                for(var i = 0; i < results.length; i++){
                    var curId = results[i]._doc.id;
                    var curName = results[i]._doc.name;

                    res.write("    <li>#" + i + " -> " + curId + ", " + curName + "</li>");
                }

                res.write('</ul></div>');
                res.end();
            } else {
                console.log('에러 발생');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>조회된 사용자 없음</h1>');
                res.end();
            }
        });
    } else {
        console.log('에러 발생');
        res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
        res.write('<h1>데이터베이스 연결 안됨</h1>');
        res.end();
    }
};

module.exports.login = login;
module.exports.addUser = addUser;
module.exports.listUser = listUser;