var fs = require('fs');

fs.writeFile('./output.txt', 'Hello.', function(err){
    if(err) {
        console.log(err);
        return;
    }
    console.log('성공');
});