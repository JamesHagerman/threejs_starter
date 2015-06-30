var THREADS = (function () {
  return {
    allObjects: [],

    init: function () {
      console.log("Initializing Threads!");

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

    createCube: function () {
      // THIS WHOLE FUNCTION WAS REPLCAED WITH:
      new OurVRCube(SCENE.scene, this.allObjects);
      // DON"T CALL createCube() anymore.
      var aCube = new OurVRCube(SCENE.scene, this.allObjects);

      // And then save it to the aBunchOfCubes array:
      this.allObjects.push(aCube);

      // And add it to the scene (this could be move to a later point in the app...)
      SCENE.add(aCube.cube);

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
      SCENE.camera.position.z += -3;
      if (SCENE.camera.position.z<=-(100*100)) {
        SCENE.camera.position.z = 0;
      }

      SCENE.draw();

      requestAnimationFrame(THREADS.animate);
    }
  };
})();


//=====================
// Start Threads:
$(document).ready(function () {
  THREADS.init();
});



