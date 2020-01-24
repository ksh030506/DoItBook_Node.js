//인스턴스 객체 대입
function User(id, name) {
    this.id = id;
    this.name = name;
}

User.prototype.getUser = function(){
    return {id:this.id, name:this.name};
};

User.prototype.group = {id:'group01', name:'친구'};

User.prototype.printUser = function(){
    console.log('유저 이름 : ' + this.name + ', ' + '그룹 : ' + this.group.name);
};

module.exports = new User('test01', '소녀시대');
//프로토타입 인스턴트 객체
