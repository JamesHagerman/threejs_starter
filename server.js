
var config = require('konfig')()

// This shit is needed for OpenShift. They set environment variables in their magic system
// that can be picked up by the app and configured automatically. USE THEM!
// I grabbed this from: https://developers.openshift.com/en/node-js-project-structure.html
//
var server_port = process.env.OPENSHIFT_NODEJS_PORT || config.app.port;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

var express = require('express');
var compression = require('compression');
var sassMiddleware  = require('node-sass-middleware');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
//var fs = require('fs');


app.use(compression({
  threshold: 512
}));
app.use(sassMiddleware({
      src: __dirname + '/sass',
      dest: __dirname + '/public/css',
      debug: true,
      // outputStyle: 'compressed',
      prefix: '/css'
  }));
app.use(express.static(__dirname + '/public'));


server.listen(server_port, server_ip_address);
console.log("Express server listening on port "+server_port+"...");

// app.get('/', function(req, res) {
//   res.send("Derp");
// });

app.get('/config', function(req, res) {
 res.send(config.app);
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});