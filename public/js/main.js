var currentProject;
var AppRouter = Backbone.Router.extend({
  routes: {
    // Order matters:
    "posts/:id": "getPost",
    "threads": "threads",
    "threejs": "threejs",
    "portfolio": "portfolio",
    "astrovr": "astrovr",
    "*actions": "defaultRoute"
  },
  execute: function(callback, args, name) {
    // ToDo: Implement a "teardown" for these projects canvas elements...
    // This should probably be a fade to black so it's smooth in VR
    console.log("Checking for teardown: " + currentProject);
    if (typeof currentProject !== 'undefined') {
      console.log("Tearing down the last project...");
      window[currentProject].destroy();
    }
    console.log("Loading next project... " + name);
  }
});

var App = (function() {
  return {
    app_router: null,
    //config: {},
    //initComplete: false,
    //initTries: 0,
    //initFailed: false,
    init: function() {

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
      //this.getConfig(this.configLoaded);

      Socket.init();
      this.bootRouter();
    },
    bootRouter: function() {
      var that = this;

      // Instantiate the router
      this.app_router = new AppRouter;

      // Routes:
      this.app_router.on('route:threads', function (actions) {
        currentProject = "THREADS";
        THREADS.init();
      });

      this.app_router.on('route:threejs', function (actions) {
        currentProject = "Three";
        Three.init();
      });

      this.app_router.on('route:portfolio', function (actions) {
        currentProject = "THREADS";
        THREADS.init();
      });

      this.app_router.on('route:astrovr', function (actions) {
        currentProject = "ASTROVR";
        ASTROVR.init();
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
    //getConfig: function(callback) {
    //  $.ajax({
    //    url: window.location.origin + '/config',
    //    success: function(data, textStatus, jqXHR) {
    //      console.dir(data);
    //      App.config = data;
    //      if (typeof data !== "undefined") {
    //        callback();
    //      }
    //    },
    //    error: function() {
    //      console.log("FAIL");
    //      App.initFailed = true;
    //    }
    //  });
    //},
    //configLoaded: function() {
    //  console.log("Config Loaded");
    //
    //  //==============
    //  // Init objects here!
    //  Socket.init();
    //
    //  App.initComplete = true;
    //},

    load: function() {
      // ANY app depends on the $(window).load() event (basically,
      // that means anything that requires the CSS rules to be applied
      // before it runs) MUST set the App.initComplete property to true.
      //
      // Otherwise, the load will need really be needed...
      //if (App.initComplete) {

        //==============
        // Load objects here!

      //} else {
      //  if (!App.initFailed) {
      //    console.log("waiting for app init to finish...");
      //    App.initTries += 1;
      //    if (App.initTries > 5) {
      //      App.initFailed = true;
      //    }
      //    window.setTimeout(App.load, 100);
      //  } else {
      //    console.log("App failed to initalize...");
      //  }
      //}
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
      var that = this;
      this.socket = io(':8080/');
      this.socket.on('news', function (data) {
        console.log(data);
        that.socket.emit('my other event', {my: 'data'});
      });
      this.socket.on('sun', function (data) {
        console.log("sun: ");
        console.dir(data);
        //socket.emit('my other event', {my: 'data'});
      });
      this.socket.on('moon', function (data) {
        console.log("moon: ");
        console.dir(data);
        //socket.emit('my other event', {my: 'data'});
      });
    }
  };
})();

