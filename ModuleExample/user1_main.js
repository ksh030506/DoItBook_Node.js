var user1 = require('./user1');


function showUser() {
   return user1.getUser().name + ', ' + user1.group.name;
}


console.log('사용자 정보 -> ' + showUser());

//속성 추가
//객체 바로 할당 -> 문제 생김
//exports 꼭 속성으로 추가
