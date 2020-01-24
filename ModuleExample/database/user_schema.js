//다시 불러와야함
var crypto =  require('crypto');



var Schema = {}; //객체

Schema.createSchema = function(mongoose) {
    //유저 스키마 변수에다가 할당
//스키마 정의 (타입 정의, 객제 지정하기)
console.log('createScheam 호출됨');
var UserSchema = mongoose.Schema({
    id: {type: String, required:true, unique:true,
    'default': ''},
    hashed_password: {type: String, required:true,
    'default': ''},
    salt: {type: String, required:true},
    name: {type: String, index:'hashed',
    'default': ''},
    age: {type:Number, 'default': -1},
    created_at: {type:Date, index:{unique:false},
    'default':Date.now()},
    updated_at: {type:Date, index:{unique:false},
    'default':Date.now()}
});

console.log('스키마 객체 정의함');


UserSchema
    .virtual('password')
    .set(function(password){
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
        console.log('virtual password 저장됨 : ' +
        this.hashed_password);
    });


UserSchema.method('encryptPassword', function(plainText, inSalt){
    if(inSalt){
        return crypto.createHmac('sha1',
        inSalt).update(plainText).digest('hex');
    } else {
        return crypto.createHmac('sha1',
        this.salt).update(plainText).digest('hex');
    }
});

UserSchema.method('makeSalt' ,function(){
    return Math.round((new Date().valueOf() * Math.random()))
    + '';
});

UserSchema.method('authenticate', function(plainText, inSalt, hashed_password){
    if(inSalt) {
        console.log('authenticate 호출됨');
        return this.encryptPassword(plainText, inSalt) ===
        hashed_password;
    } else {
        console.log('authenticate 호출됨');
        return this.encryptPassword(plainText) ===
        hashed_password;
    }
});


UserSchema.static('findById', function(id, callback){
    return this.find({"id":id}, callback);
});  //static 메서드


UserSchema.static('findAll', function(callback){
    return this.find({}, callback);
});

//마지막에 리턴 한다.
    return UserSchema;
}

module.exports = Schema;