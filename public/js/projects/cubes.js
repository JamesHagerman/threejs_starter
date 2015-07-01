var Three = (function () {
  return {
    scene: null,
    camera: null,
    renderer: null,
    geometry: null,
    geometry2: null,
    material: null,
    cube: null,
    cube2: null,
    mirrorCubeCamera: null,
    mirrorCubeMaterial: null,
    material_phong: null,
    ambientLight: null,
    light: null,
    directionalLight: null,
    init: function () {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera.position.z = 3;

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.shadowMapEnabled = true;
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      $('body').append(this.renderer.domElement);

      this.geometry = new THREE.BoxGeometry(1, 1, 1);
      this.material = new THREE.MeshPhongMaterial({specular: 0x009900, color: 0x00ff00});
      this.cube = new THREE.Mesh(this.geometry, this.material);
      this.cube.position.set(-1, 0, 0);
      this.cube.castShadow = true;
      this.cube.receiveShadow = false;
      this.scene.add(this.cube);

      this.geometry2 = new THREE.BoxGeometry(1, 1, 1);
      // this.mirrorCubeCamera = new THREE.CubeCamera( 0.1, 5000, 512 );
      // mirrorCubeCamera.renderTarget.minFilter = THREE.LinearMipMapLinearFilter;
      // this.scene.add( this.mirrorCubeCamera );
      // this.mirrorCubeMaterial = new THREE.MeshBasicMaterial( { envMap: this.mirrorCubeCamera.renderTarget } );
      this.material_phong = new THREE.MeshPhongMaterial({
        ambient: 0xffffff,
        color: 0xff0000,
        specular: 0x009900,
        shininess: 30,
        shading: THREE.FlatShading,
        emissive: 0x111111
      });
      this.cube2 = new THREE.Mesh(this.geometry2, this.material_phong);
      // this.cube2.position.x = 1;
      this.cube2.position.set(1, 0, 0);
      // this.mirrorCubeCamera.position = this.cube2.position;
      this.cube2.castShadow = true;
      this.cube2.receiveShadow = false;

      this.scene.add(this.cube2);



      // this.ambientLight = new THREE.AmbientLight(0x222222);
      // this.scene.add(this.ambientLight);

      // this.light = new THREE.PointLight(0xffffff);
      // this.light.position.set(0,-1,-1);
      // this.scene.add(this.light);

      // this.directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
      // this.directionalLight.position.set( 0, 1, 1 );
      // this.directionalLight.castShadow = true;
      // // this.directionalLight.shadowDarkness = 0.5;
      // this.scene.add( this.directionalLight );

      this.spotLight = new THREE.SpotLight(0xffffff);
      this.spotLight.position.set(100, 1000, 100);
      this.spotLight.castShadow = true;
      this.spotLight.shadowMapWidth = 1024;
      this.spotLight.shadowMapHeight = 1024;
      this.spotLight.shadowCameraNear = 500;
      this.spotLight.shadowCameraFar = 4000;
      this.spotLight.shadowCameraFov = 30;
      this.scene.add(this.spotLight);

      this.render();
    },
    render: function () {
      // Because the object handed into the requestAnimationFrame() will be called as a callback, it has to
      // be referenced globally (via Three.render) directly. Otherwise, 'this' in the callback doesn't make sense.
      // This goes for all objects in the render function.
      requestAnimationFrame(Three.render);

      Three.cube.rotation.x += 0.1;
      Three.cube.rotation.y += 0.1;

      Three.cube2.rotation.x += 0.01;
      Three.cube2.rotation.y += 0.001;

      Three.renderer.render(Three.scene, Three.camera);
    }
  }
})();