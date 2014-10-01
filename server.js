
var express = require('express');
var compression = require('compression');
var sass = require('node-sass');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');


app.use(compression({
  threshold: 512
}))
app.use(sass.middleware({
      src: __dirname + '/sass',
      dest: __dirname + '/public/css',
      debug: true,
      // outputStyle: 'compressed',
      prefix:  '/css'
  }));
app.use(express.static(__dirname + '/public'));


server.listen(8080);
console.log("Express server listening on port 8080...");

// app.get('/', function(req, res){
//   res.send('hello world');
// });

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});