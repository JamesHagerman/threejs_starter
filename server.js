
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

//app.get('/config', function(req, res) {
//  res.send(config.app);
//});


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
  //socket.emit('news', { hello: 'world' });
  //socket.on('my other event', function (data) {
  //  console.log(data);
  //});
  socket.on('AstroVR', function (data) {
    AstroVRSocketHandler(data, socket);
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


//#define SE_SUN      0
//#define SE_MOON     1
//#define SE_MERCURY  2
//#define SE_VENUS    3
//#define SE_MARS     4
//#define SE_JUPITER  5
//#define SE_SATURN   6
//#define SE_URANUS   7
//#define SE_NEPTUNE  8
//#define SE_PLUTO    9
var planets = [{
    name: 'Sun',
    color: 0xfff000,
    radius: 695800
  },
  {
    name: 'Moon',
    color: 0xffffff,
    radius: 1737
  },
  {
    name: 'Mercury',
    color: 0x7b0000,
    radius: 2439
  },
  {
    name: 'Venus',
    color: 0x009c00,
    radius: 6051
  },
  {
    name: 'Mars',
    color: 0xff0000,
    radius: 3389
  },
  {
    name: 'Jupiter',
    color: 0xfbbc00,
    radius: 69911
  },
  {
    name: 'Saturn',
    color: 0xbdbdbd,
    radius: 58232
  },
  {
    name: 'Uranus',
    color: 0x007bff,
    radius: 25362
  },
  {
    name: 'Neptune',
    color: 0x7b0084,
    radius: 24622
  },
  {
    name: 'Pluto',
    color: 0xe0e0e0,
    radius: 1185
  }
];

function AstroVRSocketHandler(data, socket) {
  console.log(data);
  console.log(data.date);

  var date = {year: 1985, month: 1, day: 19, hour: 18, minute: 20};
  date = data.date || date;
  var flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH | swisseph.SEFLG_RADIANS;// | swisseph.SEFLG_XYZ;

  swisseph.swe_set_topo (0, 0, 0);

  swisseph.swe_julday(date.year, date.month, date.day, date.hour, swisseph.SE_GREG_CAL, function (julday_ut) {
    // assert.equal (julday_ut, 2455927.5);
    console.log ('Julian UT day for date:', julday_ut);

    for (var i = 0; i <= 9; i+=1) {
      // i is used as planet index:
      var index = i;
      swisseph.swe_calc_ut (julday_ut, i, flag, function (body) {
        assert (!body.error, body.error);
        body.name = planets[index].name;
        body.color = planets[index].color;
        body.radius = planets[index].radius; // in kilometers!

        socket.emit('Planet', body );
      });
    }



    // Sun position
    //swisseph.swe_calc_ut (julday_ut, swisseph.SE_SUN, flag, function (body) {
    //  assert (!body.error, body.error);
    //  body.name = "Sun";
    //  body.color = 0xfff000;
    //  body.radius = 695800; // in kilometers!
    //  socket.emit('Sun', body );
    //});
    //
    //// Moon position
    //swisseph.swe_calc_ut (julday_ut, swisseph.SE_MOON, flag, function (body) {
    //  assert (!body.error, body.error);
    //  body.name = "Moon";
    //  body.color = 0xffffff;
    //  socket.emit('Moon', body);
    //});
    //
    //swisseph.swe_calc_ut (julday_ut, swisseph.SE_MERCURY, flag, function (body) {
    //  assert (!body.error, body.error);
    //  body.name = "Mercury";
    //  body.color = 0x7b0000;
    //  socket.emit('Mercury', body);
    //});
    //
    //swisseph.swe_calc_ut (julday_ut, swisseph.SE_VENUS, flag, function (body) {
    //  assert (!body.error, body.error);
    //  body.name = "Venus";
    //  body.color = 0x009c00;
    //  socket.emit('Venus', body);
    //});
    //
    //swisseph.swe_calc_ut (julday_ut, swisseph.SE_MARS, flag, function (body) {
    //  assert (!body.error, body.error);
    //  body.name = "Mars";
    //  body.color = 0xff0000;
    //  socket.emit('Mars', body);
    //});
    //
    //swisseph.swe_calc_ut (julday_ut, swisseph.SE_JUPITER, flag, function (body) {
    //  assert (!body.error, body.error);
    //  body.name = "Jupiter";
    //  body.color = 0xfbbc00;
    //  socket.emit('Jupiter', body);
    //});
    //
    //swisseph.swe_calc_ut (julday_ut, swisseph.SE_SATURN, flag, function (body) {
    //  assert (!body.error, body.error);
    //  body.name = "Saturn";
    //  body.color = 0xbdbdbd;
    //  socket.emit('Saturn', body);
    //});
    //
    //swisseph.swe_calc_ut (julday_ut, swisseph.SE_URANUS, flag, function (body) {
    //  assert (!body.error, body.error);
    //  body.name = "Uranus";
    //  body.color = 0x007bff;
    //  socket.emit('Uranus', body);
    //});
    //
    //swisseph.swe_calc_ut (julday_ut, swisseph.SE_NEPTUNE, flag, function (body) {
    //  assert (!body.error, body.error);
    //  body.name = "Neptune";
    //  body.color = 0x7b0084;
    //  socket.emit('Neptune', body);
    //});
    //
    //swisseph.swe_calc_ut (julday_ut, swisseph.SE_PLUTO, flag, function (body) {
    //  assert (!body.error, body.error);
    //  body.name = "Pluto";
    //  body.color = 0xe0e0e0;
    //  socket.emit('Pluto', body);
    //});
    //
    //swisseph.swe_calc_ut (julday_ut, swisseph.SE_MEAN_NODE, flag, function (body) {
    //  assert (!body.error, body.error);
    //  body.name = "Mean Node";
    //  socket.emit('Mean Node', body);
    //});
    //
    //swisseph.swe_calc_ut (julday_ut, swisseph.SE_TRUE_NODE, flag, function (body) {
    //  assert (!body.error, body.error);
    //  body.name = "True Node";
    //  socket.emit('True Node', body);
    //});
    //
    //swisseph.swe_calc_ut (julday_ut, swisseph.SE_MEAN_APOG, flag, function (body) {
    //  assert (!body.error, body.error);
    //  body.name = "Mean Apogee";
    //  socket.emit('Mean Apogee', body);
    //});
    //
    //swisseph.swe_calc_ut (julday_ut, swisseph.SE_OSCU_APOG, flag, function (body) {
    //  assert (!body.error, body.error);
    //  body.name = "Lilith";
    //  socket.emit('Lilith', body);
    //});

    //swisseph.swe_calc_ut (julday_ut, swisseph.SE_CHIRON, flag, function (body) {
    //  assert (!body.error, body.error);
    //  body.name = "Chiron";
    //  socket.emit('Chiron', body);
    //});
    //
    //swisseph.swe_calc_ut (julday_ut, swisseph.SE_PHOLUS, flag, function (body) {
    //  assert (!body.error, body.error);
    //  body.name = "Pholus";
    //  socket.emit('Pholus', body);
    //});
    //
    //swisseph.swe_calc_ut (julday_ut, swisseph.SE_CERES, flag, function (body) {
    //  assert (!body.error, body.error);
    //  body.name = "Ceres";
    //  socket.emit('Ceres', body);
    //});
    //
    //swisseph.swe_calc_ut (julday_ut, swisseph.SE_PALLAS, flag, function (body) {
    //  assert (!body.error, body.error);
    //  body.name = "Pallas";
    //  socket.emit('Pallas', body);
    //});
    //
    //swisseph.swe_calc_ut (julday_ut, swisseph.SE_JUNO, flag, function (body) {
    //  assert (!body.error, body.error);
    //  body.name = "Juno";
    //  socket.emit('Juno', body);
    //});
    //
    //swisseph.swe_calc_ut (julday_ut, swisseph.SE_VESTA, flag, function (body) {
    //  assert (!body.error, body.error);
    //  body.name = "Vesta";
    //  socket.emit('Vesta', body);
    //});
    //
    //swisseph.swe_calc_ut (julday_ut, swisseph.SE_INTP_APOG, flag, function (body) {
    //  assert (!body.error, body.error);
    //  body.name = "SE_INTP_APOG";
    //  socket.emit('SE_INTP_APOG', body);
    //});
    //
    //swisseph.swe_calc_ut (julday_ut, swisseph.SE_INTP_PERG, flag, function (body) {
    //  assert (!body.error, body.error);
    //  body.name = "SE_INTP_PERG";
    //  socket.emit('SE_INTP_PERG', body);
    //});


  });
}
