var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');


//익스프레스 에러 핸들어 모듈 사용
var expressErrorHandler = require('express-error-handler');

var user = require('./routes/user');


var crypto =  require('crypto');

//mongoose 모듈 사용
var mongoose = require('mongoose');

var database;
var UserSchema;
var UserModel;

var app = express();

app.set('port', process.env.PORT || 3000);
app.use('/public', static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));

function connectDB() {
    var databaseUrl = 'mongodb://localhost:27017/local';

    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl);
    database = mongoose.connection;

    database.on('open', function(){
        console.log('데이터베이스에 연결됨 : ' + databaseUrl);

        createUserSchema(database);

    });

    database.on('disconnected', function(){
        console.log('데이터베이스 연결이 끊어짐');
    });

    database.on('error', console.error.bind(console, 'mongoose 연결 에러'));


    app.set('database', database);
}

//모듈
function createUserSchema(database){
    database.UserSchema =
    require('./database/user_schema').createSchema(mongoose);

    database.UserModel = mongoose.model('users3', database.UserSchema);  //연결 해줌
    console.log('users 모델 정의함');
}



var router = express.Router();

router.route('/process/login').post(user.login);

router.route('/process/addUser').post(user.addUser);

router.route('/public/process/listuser').post(user.listUser);

app.use('/', router);



var authUser = function(db, id, password, callback) {
    console.log('authUser 호출됨 ' + id + ', '+ password);

    UserModel.findById(id, function(err, results){
        if(err) {
            callback(err, null);
            return;
        }

        console.log('아이디 %s로 검색하였습니다.');
        if(results.length > 0) {
            var user = new UserModel({id:id});
            var authenticated = user.authenticate(password,
            results[0]._doc.salt, results[0]._doc.hashed_password);


            if(authenticated) {
                console.log('비밀번호 일치함');
                callback(null, results);
            } else {
                console.log('비밀번호 일치하지 않음');
                callback(null, null);
            }
        } else {
            console.log('아이디 일치하는 사용자 없슴');
            callback(null, null);
        }
    });
};

var addUser = function(db, id, password, name, callback){
    console.log('addUser 호출됨 ' + id + ', ' + password + ', ' + name);


    var user = new UserModel({"id":id, "password":password, "name":name});
    user.save(function(err){
        if(err){
            callback(err, null);
            return;
        }

        console.log('사용자 데이터 추가함');
        callback(null, user);
    });
};

var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );


var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스로 웹 서버를 실행함' + app.get('port'));

    //mongodb 연결
    connectDB();
});