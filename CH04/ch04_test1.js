var url = require('url');

var urlStr = 'https://search.naver.com/search.naver?sm=top_sug.pre&fbm=1&acr=2&acq=con&qdt=0&ie=utf8&query=concern';


var curUrl = url.parse(urlStr);
console.dir(curUrl);

console.log('query' + curUrl.query);

var curString = url.format(curUrl);
console.log('url -> '+curString);


var queryString = require('querystring');
var params = queryString.parse(curUrl.query);
console.log('검색어 -> '+params.query);