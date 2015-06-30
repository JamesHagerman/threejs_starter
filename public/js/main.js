var App = (function() {
  return {
    config: {},
    initComplete: false,
    initFailed: false,
    init: function() {
      this.getConfig(this.configLoaded);
    },
    getConfig: function(callback) {
      $.ajax({
        url: window.location.href + 'config',
        success: function(data, textStatus, jqXHR) {
          console.dir(data);
          App.config = data;
          if (typeof data !== "undefined") {
            callback();
          }
        },
        error: function() {
          console.log("FAIL");
          App.initFailed = true;
        }
      });
    },
    configLoaded: function() {
      console.log("Config Loaded");

      //==============
      // Init objects here!
      Socket.init();
      Three.init();

      App.initComplete = true;
    },

    load: function() {
      if (App.initComplete) {

        //==============
        // Load objects here!
        Socket.load();
        Three.load();

      } else {
        if (!App.initFailed) {
          console.log("waiting for app init to finish...");
          window.setTimeout(App.load, 100);
        } else {
          console.log("App failed to initalize...");
        }
      }
    }
  };
})();

$(document).ready(function () {
  //console.log("Ready...");
  App.init();
});

$(window).load(function () {
  //console.log("and loaded!");
  App.load();
});

var Socket = (function () {
  return {
    socket: null,
    init: function () {
      socket = io('http://localhost:'+App.config.port);
      socket.on('news', function (data) {
        console.log(data);
        socket.emit('my other event', {my: 'data'});
      });
    },
    load: function () {

    }
  };
})();

