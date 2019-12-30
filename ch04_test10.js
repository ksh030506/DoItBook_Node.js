var output = '안녕!';
var buffer1 = new Buffer(10);

var len = buffer1.write(output, 'utf8');
console.log('첫번째 버퍼에 쓰인 길이', len);
console.log('첫번째 버퍼에 쓰인 문자열', buffer1.toString());

console.log('버퍼 객체인지 여부' + Buffer.isBuffer(buffer1));

