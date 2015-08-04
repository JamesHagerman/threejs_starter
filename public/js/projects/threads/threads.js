var THREADS = (function () {
  return {
    live: true,
    allObjects: [],

    init: function () {
      console.log("Initializing Threads!");
      this.live = true;

      // Kick off the VR/3D scene before doing anything else:
      SCENE.init();

      // Build the rest of the project specific scene:
      SCENE.scene.fog = new THREE.FogExp2(0x000000, 0.0016);
      SCENE.light = new THREE.DirectionalLight(0xffffff, 1);
      SCENE.light.position.set(1, 1, 1).normalize();
      SCENE.scene.add(SCENE.light);
      SCENE.amblight = new THREE.AmbientLight(0x333333);
      SCENE.scene.add(SCENE.amblight);

      this.createObjects();

      requestAnimationFrame(this.animate)

    },

    createObjects: function () {
      for (var i = 0; i < 500; i++) {
        new OurVRCube(SCENE.scene, this.allObjects);
      }

      //new NewLine(SCENE.scene, this.allObjects);
      //new objectText(SCENE.scene, this.allObjects);

      //new Cube(SCENE.scene, this.allObjects);
      //new objectStrange(SCENE.scene, this.allObjects);


      //objectText();
      //objectLineTest();

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
      THREADS.updateAll();
      //SCENE.camera.position.z += -3;
      if (SCENE.camera.position.z<=-(100*100)) {
        SCENE.camera.position.z = 0;
      }

      SCENE.draw();

      if (THREADS.live) {
        requestAnimationFrame(THREADS.animate);
      }
    },
    destroy: function() {
      console.log("CLEARING THREADS!");
      THREADS.live = false; // This stops the animation
      // Remove all objects from the scene:
      for( var i = SCENE.scene.children.length - 1; i >= 0; i--) {
        SCENE.scene.remove(SCENE.scene.children[i]);
      }
    }
  };
})();


