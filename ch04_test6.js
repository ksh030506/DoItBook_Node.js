var fs = require('fs');


//리턴 데이터 없음
fs.readFile('./package.json', 'utf8', function(err ,data){
    console.log(data);
});