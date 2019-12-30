process.on('exit', function(){
    console.log('exit 이벤트 발생함');
});

setTimeout(function() {
    console.log('2초 후에 실행됨');

    process.exit();
}, 2000);

console.log('2초 후에 실행될 것임');
