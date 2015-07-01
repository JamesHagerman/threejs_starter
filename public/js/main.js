var AppRouter = Backbone.Router.extend({
  routes: {
    "posts/:id": "getPost",
    "*actions": "defaultRoute"
    // Backbone will try to match the route above first
  }
});

var App = (function() {
  return {
    app_router: null,
    config: {},
    initComplete: false,
    initFailed: false,
    init: function() {
      this.bootRouter();
      this.getConfig(this.configLoaded);
    },
    bootRouter: function() {
      // Instantiate the router
      this.app_router = new AppRouter;

      this.app_router.on('route:getPost', function (id) {
        // Note the variable in the route definition being passed in here
        console.log( "Hit the posts/:id endpoint and the id was: " + id );
      });

      this.app_router.on('route:defaultRoute', function (actions) {
        console.log( actions );
      });

      // Start Backbone history a necessary step for bookmarkable URL's
      Backbone.history.start();
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
      //Three.init();
      THREADS.init();

      App.initComplete = true;
    },

    load: function() {
      if (App.initComplete) {

        //==============
        // Load objects here!
        Socket.load();
        //Three.load();

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

