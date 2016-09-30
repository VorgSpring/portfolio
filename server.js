let http = require('http');
let Static = require('node-static');


// Создаём обычный сервер (статика) на порту 80
var fileServer = new Static.Server('.');
http.createServer(function (req, res) {
    fileServer.serve(req, res);
}).listen(80);

console.log('Server running');