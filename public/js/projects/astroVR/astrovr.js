function calcXYZ(R, lat, lon) {
  var z = -R * Math.cos(lat) * Math.cos(lon);
  var x = -R * Math.cos(lat) * Math.sin(lon);
  var y = R * Math.sin(lat);
  return new THREE.Vector3(x, y, z);
}

var planetNames = [
  'Sun',
  'Moon',
  'Mercury',
  'Venus',
  'Mars',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune',
  'Pluto'
];

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
      SCENE.light.position.set(0, 2, 1).normalize();
      SCENE.light.castShadow = true;
      SCENE.light.shadowDarkness = 0;
      SCENE.scene.add(SCENE.light);

      //SCENE.amblight = new THREE.AmbientLight(0x333333);
      //SCENE.scene.add(SCENE.amblight);

      //var pointLight = new THREE.PointLight(0xFFFFFF);
      //pointLight.position.x = 0;
      //pointLight.position.y = 0;
      //pointLight.position.z = 0;
      //pointLight.intensity = 10000.0;
      //SCENE.scene.add(pointLight);

      SCENE.camera.position.z = 0.0001;

      this.createObjects();

      // We should only animate after we have the objects pulled from node.js!
      requestAnimationFrame(this.animate)

    },

    createObjects: function () {

      // Draw the Axes:
      new Axes(SCENE.scene, this.allObjects);
      //new Ecliptic(SCENE.scene, this.allObjects);

      //new Earth(SCENE.scene, this.allObjects);

      // We are going to grab a list of objects to display from node.js over socket.io.
      // To do that, we will need to make some asyncrhonous calls. That means we need to
      // store the current object as 'that' so we can still access it after the callbacks
      // are called:
      var that = this;

      Socket.socket.on('Planet', function (data) {
        console.dir(data);
        new Planet(SCENE.scene, that.allObjects, data);
        new Label(SCENE.scene, that.allObjects, data);
      });

      //Socket.socket.emit('AstroVR', {'date': {year: 1985, month: 1, day: 19, hour: 12, minute: 0}, 'config': 'chart'});
      //Socket.socket.emit('AstroVR', {'date': {year: 1988, month: 4, day: 29, hour: 13, minute: 0}, 'config': 'chart'});

      //for (var y = 1985; y < 2015; y+=1) {
      //  for (var m = 0; m < 12; m+=1) {
      //    for (var d = 1; d < 31; d+=1) {
      //      for (var h = 0; h < 24; h+=1) {
                Socket.socket.emit('AstroVR', {'date': {year: 2015, month: 7, day: 15, hour: 14, minute: 0}});
            //}
          //}
        //}
      //}

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


