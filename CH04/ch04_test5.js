var fs = require('fs');

//리턴데이터 있음

var data = fs.readFileSync('./package.json', 'utf8');

console.log(data);