// Copy this whole block to start playing with new "objects":
function Planet(scene, objectsArray, data) {
  // This is the basic template for 3D objects.
  this.name =  data.name; // Grab the first key out of the data. This will probably change later
  this.color = data.color || 0xffffff;

  if (this.name == "Sun") {
    this.geometry = new THREE.SphereGeometry(0.1, 5, 5 );
  } else {
    this.geometry = new THREE.SphereGeometry(0.1, 5, 5 );
  }


  this.material = new THREE.MeshBasicMaterial({color: this.color, side: THREE.DoubleSide});

  this.cube = new THREE.Mesh(this.geometry, this.material);

  //===============
  // Set position and rotation of the object:

  // We'll use a Vector3 for the position of the object:

  //the x-axis goes through long,lat (0,0), so longitude 0 meets the equator;
  //the y-axis goes through (0,90);
  //and the z-axis goes through the poles.
  //  The conversion is:
  //
  //  x = R * Math.cos(lat) * Math.cos(lon)
  //
  //  y = R * Math.cos(lat) * Math.sin(lon)
  //
  //  z = R * Math.sin(lat)

  //R = distance
  //distanceSpeed
  //latitude
  //latitudeSpeed
  //longitude
  //longitudeSpeed
  var R = data.distance;
  var lat = data.latitude;
  var lon = data.longitude;

  var x = R * Math.cos(lat) * Math.cos(lon);
  var y = R * Math.cos(lat) * Math.sin(lon);
  var z = R * Math.sin(lat);
  //
  //x = 0;
  //y = 0;
  //z = -20;
  //console.log("name: " + this.name + " x: " + x + " y: " + y + " z: " + z);

  this.pos = new THREE.Vector3(x, y, z); // x, y, z
  this.cube.position.set(this.pos.x, this.pos.y, this.pos.z);

  // We'll use quaternions for the rotation of the object:
  var quaternion = new THREE.Quaternion();
  quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.random() * Math.PI / 180);
  this.cube.rotation.setFromQuaternion(quaternion);

  // position and rotation end
  //===============

  // Add this WHOLE object to the main Objects array (THREADS.allObjects):
  objectsArray.push(this);
  // Then add this object's mesh to the scene
  scene.add(this.cube);
}
Planet.prototype = {
  // We're going to use a Vector3 for object position:
  pos: 0,  // THREE.Vector3

  // Object and texture storage
  geometry: 0,
  material: 0,
  cube: 0, // The actual THREE.Object3D itself

  // Object shape and animation parameters:
  angle: 0,

  update: function () {
    this.cube.rotation.x += 0.5 * Math.PI / 180;
  },
  draw: function () {
    // probably don't need this...
  }
};




function Earth(scene, objectsArray) {
  this.name =  "earth";
  this.geometry = new THREE.SphereGeometry(0.1, 32, 32 );
  this.material = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
  this.cube = new THREE.Mesh(this.geometry, this.material);

  this.pos = new THREE.Vector3(0, 0, 0); // x, y, z
  this.cube.position.set(this.pos.x, this.pos.y, this.pos.z);

  // We'll use quaternions for the rotation of the object:
  var quaternion = new THREE.Quaternion();
  quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.random() * Math.PI / 180);
  this.cube.rotation.setFromQuaternion(quaternion);

  // position and rotation end
  //===============

  // Add this WHOLE object to the main Objects array (THREADS.allObjects):
  objectsArray.push(this);
  // Then add this object's mesh to the scene
  scene.add(this.cube);
}
Earth.prototype = {
  // We're going to use a Vector3 for object position:
  pos: 0,  // THREE.Vector3

  // Object and texture storage
  geometry: 0,
  material: 0,
  cube: 0, // The actual THREE.Object3D itself

  // Object shape and animation parameters:
  angle: 0,

  update: function () {
    this.cube.rotation.x += 0.5 * Math.PI / 180;
  },
  draw: function () {
    // probably don't need this...
  }
};