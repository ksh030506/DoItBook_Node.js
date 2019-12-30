var Calc = require('./clac3');

var calc1 = new Calc();
calc1.emit('stop');

console.log('Calc에 stop이벤트 전달함');
