var ASTROVR = (function () {
  return {
    live: true,
    allObjects: [],

    init: function () {
      console.log("Initializing ASTROVR!");
      ASTROVR.live = true;

      // Kick off the VR/3D scene before doing anything else:
      SCENE.init();

      // Build the rest of the project specific scene:
      //SCENE.scene.fog = new THREE.FogExp2(0x000000, 0.0016);
      SCENE.light = new THREE.DirectionalLight(0xffffff, 1);
      SCENE.light.position.set(1, 1, 1).normalize();
      SCENE.scene.add(SCENE.light);
      SCENE.amblight = new THREE.AmbientLight(0x333333);
      SCENE.scene.add(SCENE.amblight);

      SCENE.camera.position.z = 2;

      this.createObjects();

      // We should only animate after we have the objects pulled from node.js!
      requestAnimationFrame(this.animate)

    },

    createObjects: function () {

      new Earth(SCENE.scene, this.allObjects);

      // We are going to grab a list of objects to display from node.js over socket.io.
      // To do that, we will need to make some asyncrhonous calls. That means we need to
      // store the current object as 'that' so we can still access it after the callbacks
      // are called:
      var that = this;
      Socket.socket.emit('AstroVR', {'date': {year: 1985, month: 1, day: 19, hour: 17, minute: 46}});

      Socket.socket.on('sun', function (data) {
        console.dir(data);
        new Planet(SCENE.scene, that.allObjects, data);
      });

      Socket.socket.on('moon', function (data) {
        console.dir(data);
        new Planet(SCENE.scene, that.allObjects, data);
      });



    },

    listObjects: function () {
      var lineCount = this.allObjects.length;
      if (lineCount > 0) {
        for (var i = 0; i < lineCount; i++) {
          console.log("Object " + i + ":");
          console.dir(this.allObjects[i]);
        }
      } else {
        console.log("No objects found!");
      }

    },

    updateAll: function () {
      var count = this.allObjects.length;
      if (count > 0) {
        for (var i = 0; i < count; i++) {
          this.allObjects[i].update();
        }
      }
    },

    animate: function () {
      // Update VR headset position and apply to camera.
      SCENE.update();
      ASTROVR.updateAll();
      //SCENE.camera.position.z += -3;
      //if (SCENE.camera.position.z<=-(100*100)) {
      //  SCENE.camera.position.z = 0;
      //}

      SCENE.draw();

      if (ASTROVR.live) {
        requestAnimationFrame(ASTROVR.animate);
      }
    },
    destroy: function() {
      console.log("CLEARING ASTROVR!");
      ASTROVR.live = false; // This stops the animation
      // Remove all objects from the scene:
      for( var i = SCENE.scene.children.length - 1; i >= 0; i--) {
        SCENE.scene.remove(SCENE.scene.children[i]);
      }
    }
  };
})();


