var fs = require('fs');

fs.open('./output.txt', 'w', function(err, fd){
    if(err) {
        console.dir(err);
        return;
    }
    var buf = new Buffer('안녕!\n');
    fs.write(fd, buf, 0,buf.length, null, function(err, written, buffer){
        if(err) {
            console.dir(err);
            return;
        }
        console.log('파일 쓰기 완료 함');

        fs.close(fd, function() {
            console.log('파일 닫기 완료함');
        });
    });
});