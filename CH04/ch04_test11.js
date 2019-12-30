var fs = require('fs');

var inFile = fs.createReadStream('./output.txt', {flags: 'r'});

inFile.on('data', function(data){
    console.log('읽어드린 데이터 : '+ data);
});

inFile.on('end',function(){
    console.log('읽기 종료');
});