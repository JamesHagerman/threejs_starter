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
      //this.renderer.shadowMapEnabled = true;
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      // Append the canvas element created by the renderer to document body element.
      $('div.scene').html(this.renderer.domElement);

      // Create a three.js scene. Fog so the lines disappear in the distance.
      this.scene = new THREE.Scene();

      // Create a three.js camera
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);



      // Create a VR manager helper to enter and exit VR mode.
      this.vrmgr = new WebVRManager(this.effect);

      // Apply VR headset positional data to camera.
      if (this.vrmgr.isVRMode()) {
        this.controls = new THREE.VRControls(this.camera);
      } else {
        this.controls = new THREE.OrbitControls( this.camera);
        //this.controls.dynamicDampingFactor = 0.5;
        //this.controls.target.set( 0, 0, 0 );
      }

      // Apply VR stereo rendering to renderer
      this.effect = new THREE.VREffect(this.renderer);
      this.effect.setSize(window.innerWidth, window.innerHeight);


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