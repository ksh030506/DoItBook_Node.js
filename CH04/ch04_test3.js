process.on('tick', function(count){
    console.log('tick 이벤트 발생' + count);
});

setTimeout(function(){
    console.log('2초 후에 실행됨');

    process.emit('tick', '2');
},2000);