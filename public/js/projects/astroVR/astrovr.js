var ASTROVR = (function () {
  return {
    allObjects: [],

    init: function () {
      console.log("Initializing ASTROVR!");

      // Kick off the VR/3D scene before doing anything else:
      SCENE.init();

      this.createObjects();

      requestAnimationFrame(this.animate)

    },

    createObjects: function () {
      for (var i = 0; i < 500; i++) {
        //new OurVRCube(SCENE.scene, this.allObjects);
      }

      new NewLine(SCENE.scene, this.allObjects);
      new objectText(SCENE.scene, this.allObjects);

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
      ASTROVR.updateAll();
      //SCENE.camera.position.z += -3;
      if (SCENE.camera.position.z<=-(100*100)) {
        SCENE.camera.position.z = 0;
      }

      SCENE.draw();

      requestAnimationFrame(ASTROVR.animate);
    }
  };
})();


