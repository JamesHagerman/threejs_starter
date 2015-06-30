var SCENE = (function () {
  return {
    render: 0,
    scene: 0,
    light: 0,
    amblight: 0,
    camera: 0,
    controls: 0,
    effect: 0,
    vrmgr: 0,

    // Scene initializer:
    init: function () {

      //Setup three.js WebGL renderer
      this.renderer = new THREE.WebGLRenderer({antialias: true});

      // Append the canvas element created by the renderer to document body element.
      document.body.appendChild(this.renderer.domElement);

      // Create a three.js scene. Fog so the lines disappear in the distance.
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x000000, 0.0016);

      //lights!
      this.light = new THREE.DirectionalLight(0xffffff, 1);
      this.light.position.set(1, 1, 1).normalize();
      this.scene.add(this.light);

      this.amblight = new THREE.AmbientLight(0x333333);
      this.scene.add(this.amblight);

      // Create a three.js camera
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);

      // Apply VR headset positional data to camera.
      this.controls = new THREE.VRControls(this.camera);

      // Apply VR stereo rendering to renderer
      this.effect = new THREE.VREffect(this.renderer);
      this.effect.setSize(window.innerWidth, window.innerHeight);

      // Create a VR manager helper to enter and exit VR mode.
      this.vrmgr = new WebVRManager(this.effect);


      // Wire up keyboard input and window resize handlers:
      $(window).on('keydown', this.onKey);
      $(window).on('resize', this.onWindowResize);
    },

    // Wrap some of the more commonly used THREE methods so we can just call SCENE.add():
    //add: function(object) {
    //  this.scene.add(object);
    //},

    // Add an update method so we can treat the whole scene upkeep as
    update: function () {
      this.controls.update();
    },

    draw: function () {
      // Render the scene through the VREffect, but only if it's in VR mode.
      if (this.vrmgr.isVRMode()) {
        this.effect.render(this.scene, this.camera);
      } else {
        this.renderer.render(this.scene, this.camera);
      }
    },

    // Event handlers:
    // Listen for keyboard event and zero positional sensor on appropriate keypress.
    onKey: function (event) {
      if (event.keyCode == 90) { // z
        this.controls.zeroSensor();
      }

      // Key codes https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
      //if (event.keyCode == 74) { // "J"
      //  this.line.position.x = this.line.position.x - 1;
      //}
      //if (event.keyCode == 76) { // "L"
      //  this.line.position.x = this.line.position.x + 1;
      //}
      //
      //if (event.keyCode == 73) { // "I"
      //  this.line.position.z = this.line.position.z - 1;
      //}
      //if (event.keyCode == 75) { // "K"
      //  this.line.position.z = this.line.position.z + 1;
      //}
    },
    // Handle window resizes
    onWindowResize: function () {
      SCENE.camera.aspect = window.innerWidth / window.innerHeight;
      SCENE.camera.updateProjectionMatrix();
      SCENE.effect.setSize(window.innerWidth, window.innerHeight);
    }
  };
})();