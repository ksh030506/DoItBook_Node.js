var fs = require('fs');

var inFile = fs.createReadStream('./output.txt', {flags: 'r'});

inFile.on('data', function(data){
    console.log('읽어드린 데이터 : '+ data);
});

inFile.on('end',function(){
    console.log('읽기 종료');
});

var buffer2 = Buffer.from('Hello', 'utf8');
console.log('두번째 버퍼의 길이 : '+ buffer2.byteLength);