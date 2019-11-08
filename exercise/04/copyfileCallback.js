var fs = require('fs');
           //档案名称               档案格式      回呼函数     
fs.readFile("copyfileCallback.js", "utf8", function(err, data) { //回呼 （用函数当参数，通常在输出完成后呼叫这个函数，然后把质料传进来）
  console.log('讀取完成！');
  fs.writeFile("copyfileCallback.js2",  data, function(err) {
    console.log('寫入完成!');
  });
});