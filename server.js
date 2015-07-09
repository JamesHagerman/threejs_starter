
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
var fs = require ('fs');

// Modules for the astrology project:
var assert = require ('assert');
var swisseph = require('swisseph');


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


app.get('/astro', function(req, res) {
  //res.send(config.app);

  //var date = {year: 1985, month: 1, day: 19, hour: 17, minute: 46};
  var date = {year: 2015, month: 1, day: 19, hour: 12, minute: 00};
  //var julday = swisseph.swe_julday(date.year, date.month, date.day, date.hour, swisseph.SE_GREG_CAL);
  //console.log("Day: " + julday);

  var geo = {lat: 38.833333, long: -104.816667};

  var flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH;

  swisseph.swe_julday(date.year, date.month, date.day, date.hour, swisseph.SE_GREG_CAL, function (julday_ut) {
    // assert.equal (julday_ut, 2455927.5);
    console.log ('Julian UT day for date:', julday_ut);

    // Sun position
    swisseph.swe_calc_ut (julday_ut, swisseph.SE_SUN, flag, function (body) {
      assert (!body.error, body.error);
      //console.log ('Sun position:', body);
      res.send(body);

      // Sun Houses position:
      //swisseph.swe_houses(julday_ut, geo.lat, geo.long, 'K', body.longitude, body.latitude, function(result){
      //  assert(!result.error, result.error);
      //  console.log('Sun house position: ', result);
      //});
    });

    // Moon position
    //swisseph.swe_calc_ut (julday_ut, swisseph.SE_MOON, flag, function (body) {
    //  assert (!body.error, body.error);
    //  console.log ('Moon position:', body);
    //});


  });
});


io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('getPlanets', function (data) {
    console.log(data.date);
    var date = {year: 1985, month: 1, day: 19, hour: 17, minute: 46};
    date = data.date || date;
    var flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH;// | swisseph.SEFLG_XYZ;

    swisseph.swe_julday(date.year, date.month, date.day, date.hour, swisseph.SE_GREG_CAL, function (julday_ut) {
      // assert.equal (julday_ut, 2455927.5);
      console.log ('Julian UT day for date:', julday_ut);

      // Sun position
      swisseph.swe_calc_ut (julday_ut, swisseph.SE_SUN, flag, function (body) {
        assert (!body.error, body.error);
        //res.send(body);
        //console.log (' Sun position:', body);
        socket.emit('sun', { sunBody: body });
      });

      // Moon position
      swisseph.swe_calc_ut (julday_ut, swisseph.SE_MOON, flag, function (body) {
        assert (!body.error, body.error);
        //console.log (' Moon position:', body);
        socket.emit('moon', { moonBody: body });
      });

    });

  });
});