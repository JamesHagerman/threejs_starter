
var express = require('express');
var compression = require('compression');
var sassMiddleware  = require('node-sass-middleware');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var port = 8080;


app.use(compression({
  threshold: 512
}))
app.use(sassMiddleware({
      src: __dirname + '/sass',
      dest: __dirname + '/public/css',
      debug: true,
      // outputStyle: 'compressed',
      prefix:  '/css'
  }));
app.use(express.static(__dirname + '/public'));



server.listen(port);
console.log("Express server listening on port "+port+"...");

// app.get('/', function(req, res) {
//   res.send("Derp");
// });

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});