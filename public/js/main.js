var AppRouter = Backbone.Router.extend({
  routes: {
    // Order matters:
    "posts/:id": "getPost",
    "threads": "threads",
    "threejs": "threejs",
    "portfolio": "portfolio",
    "*actions": "defaultRoute"
  },
  execute: function(callback, args, name) {
    // ToDo: Implement a "teardown" for these projects canvas elements...
    // This should probably be a fade to black so it's smooth in VR
    console.log("AppRouter sending user to: " + name);
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

      // getConfig is really ONLY needed for the socket.io pieces.
      // Otherwise, the apps should be able to run from the AppRouter
      // pretty much directly.
      //
      // If, however, at some point in the future an experience needs
      // an "always open" socket.io connection, this will need to be
      // reconsidered and bootstrapped OUTSIDE of the AppRouter.
      //
      // Also, since this isn't doing anything right now, it should be
      // fine to just throw anything that WOULD have been called via
      // the window load event into the App.load() method.
      this.getConfig(this.configLoaded);
    },
    bootRouter: function() {
      var that = this;

      // Instantiate the router
      this.app_router = new AppRouter;

      // Routes:
      this.app_router.on('route:threads', function (actions) {
        THREADS.init();
      });

      this.app_router.on('route:threejs', function (actions) {
        Three.init();
      });

      this.app_router.on('route:portfolio', function (actions) {
        THREADS.init();
      });

      this.app_router.on('route:getPost', function (id) {
        // Note the variable in the route definition being passed in here
        console.log( "Hit the posts/:id endpoint and the id was: " + id );
      });

      this.app_router.on('route:defaultRoute', function (actions) {
        console.log( actions );
        that.app_router.navigate("portfolio", {trigger: true, replace: true});
      });

      // Start Backbone history a necessary step for bookmarkable URL's
      Backbone.history.start();
    },
    getConfig: function(callback) {
      $.ajax({
        url: window.location.origin + '/config',
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

      App.initComplete = true;
    },

    load: function() {
      // ANY app depends on the $(window).load() event (basically,
      // that means anything that requires the CSS rules to be applied
      // before it runs) MUST set the App.initComplete property to true.
      //
      // Otherwise, the load will need really be needed...
      if (App.initComplete) {

        //==============
        // Load objects here!
        Socket.load();

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


// ToDo: Rethink setting up this even ALL of the time.
// Really, it should only be needed when the CSS needs to be rendered
// before some code runs.
//
// Honestly, it might be fine here... I should probably add a fade in to
// most projects... *shrug*
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

