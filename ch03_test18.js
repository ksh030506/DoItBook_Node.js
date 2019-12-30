var person1 = {name: '김상현', age: 2};

function person(name, age) {
    this.name = name;
    this.age = age;
}

person.prototype.walk = function(speed){
    console.log(speed +'km 속도로 걸어간다.');
};

Person3 = new person('소녀시대', 20);

Person3.walk(3);