// Copy this whole block to start playing with new "objects":
function Planet(scene, objectsArray, data) {
  // This is the basic template for 3D objects.
  this.name =  data.name; // Grab the first key out of the data. This will probably change later
  this.color = data.color || 0xffffff;
  this.radius = data.radius / 149597871 * 25;

  // Sorry, the real sizes SUCK in VR.
  this.radius = data.distance/19;

  //console.log("Name: " + this.name + " Radius: " + this.radius);

  //if (this.name == "Sun") {
  //  //this.geometry = new THREE.SphereGeometry(0.01, 5, 5 );
  //  this.geometry = new THREE.BoxGeometry( 0.01, 0.01, 0.01 );
  //} else if (this.name == "Moon"){
  //  this.geometry = new THREE.SphereGeometry(0.01, 5, 5 );
  //  this.geometry = new THREE.BoxGeometry( 0.0001, 0.0001, 0.0001 );
  //} else {
  //  this.geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
  //}

  this.geometry = new THREE.SphereGeometry(this.radius, 10, 10 );

  //this.material = new THREE.MeshBasicMaterial({color: this.color}); //, side: THREE.DoubleSide
  this.material = new THREE.MeshPhongMaterial({
    ambient: 0xffffff,
    color: this.color,
    specular: 0xffffff,
    shininess: 2,
    shading: THREE.SmoothShading,
    emissive: 0,
    //side: THREE.DoubleSide
  });

  this.cube = new THREE.Mesh(this.geometry, this.material);
  //this.cube.castShadow = true;
  this.cube.receiveShadow = true;

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

  //distance
  //distanceSpeed
  //latitude
  //latitudeSpeed
  //longitude
  //longitudeSpeed
  //var R = data.distance;
  //var lat = data.latitude;
  //var lon = data.longitude;


  // 1 SHOULD point INTO the screen. which is -z
  // 2 SHOULD point LEFT which is -x
  // 3 SHOULD point UP which is y
  //var z = -R * Math.cos(lat) * Math.cos(lon);
  //var x = -R * Math.cos(lat) * Math.sin(lon);
  //var y = R * Math.sin(lat);

  //this.pos = new THREE.Vector3(x, y, z); // x, y, z

  // Then we need to scale things so they make more sense... (not done yet)
  //var newPos = new THREE.Vector3(x, y, z);

  this.pos = calcXYZ( data.distance, data.latitude, data.longitude);
  console.log("name: " + this.name + " x: " + this.pos.x + " y: " + this.pos.y + " z: " + this.pos.z + " DISTANCE: " + this.pos.length());
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
    //this.cube.rotation.x += 0.5 * Math.PI / 180;
  },
  draw: function () {
    // probably don't need this...
  }
};




function Earth(scene, objectsArray) {
  this.name =  "earth";
  this.geometry = new THREE.SphereGeometry(0.001, 32, 32 );
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



function Axes(scene, objectsArray) {
  this.name =  "axes";
  this.geometry = new THREE.Geometry();
  this.geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  this.geometry.vertices.push(new THREE.Vector3(0, 1, 0));
  this.geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  this.geometry.vertices.push(new THREE.Vector3(0, 0, -1));
  this.geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  this.geometry.vertices.push(new THREE.Vector3(-1, 0, 0));
  this.material = new THREE.LineBasicMaterial({linewidth: 2, color: 0xffffff});// , side: THREE.DoubleSide
  this.cube = new THREE.Line(this.geometry, this.material);

  // Add this WHOLE object to the main Objects array (THREADS.allObjects):
  objectsArray.push(this);
  // Then add this object's mesh to the scene
  scene.add(this.cube);
}
Axes.prototype = {
  // We're going to use a Vector3 for object position:
  pos: 0,  // THREE.Vector3

  // Object and texture storage
  geometry: 0,
  material: 0,
  cube: 0, // The actual THREE.Object3D itself

  // Object shape and animation parameters:
  angle: 0,

  update: function () {
    //this.cube.rotation.x += 0.5 * Math.PI / 180;
  },
  draw: function () {
    // probably don't need this...
  }
};

function Ecliptic(scene, objectsArray) {
  this.name =  "axes";
  this.geometry = new THREE.PlaneGeometry( 100, 100, 100 );
  this.material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide, transparent: false, opacity: 0.7} );
  this.ecliptic = new THREE.Mesh( this.geometry, this.material );
  this.quaternion = new THREE.Quaternion();
  this.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), 90 * Math.PI / 180);
  this.ecliptic.rotation.setFromQuaternion(this.quaternion);

  // Add this WHOLE object to the main Objects array (THREADS.allObjects):
  objectsArray.push(this);
  // Then add this object's mesh to the scene
  scene.add(this.ecliptic);
}
Ecliptic.prototype = {
  // We're going to use a Vector3 for object position:
  pos: 0,  // THREE.Vector3

  // Object and texture storage
  geometry: 0,
  material: 0,
  cube: 0, // The actual THREE.Object3D itself

  // Object shape and animation parameters:
  angle: 0,

  update: function () {
    //this.cube.rotation.x += 0.5 * Math.PI / 180;
  },
  draw: function () {
    // probably don't need this...
  }
};


function Label(scene, objectsArray, data) {
  this.name =  data.name; // Grab the first key out of the data. This will probably change later
  this.color = data.color || 0xffffff;
  this.pos = calcXYZ( data.distance, data.latitude, data.longitude);
  this.fontSize = data.distance/20;

  this.font = 'helvetiker';
  this.textMesh = new THREE.TextGeometry(""+this.name, {
    font: 'helvetiker',
    size: this.fontSize,
    height: this.fontSize * 0.1
  });

  this.textMaterial = new THREE.MeshBasicMaterial({color: this.color, side: THREE.DoubleSide});
  //this.textMaterial = this.material = new THREE.MeshPhongMaterial({
  //  ambient: 0xffffff,
  //  color: this.color,
  //  specular: 0xffffff,
  //  shininess: 0,
  //  shading: THREE.SmoothShading,
  //  emissive: this.color,
  //  //side: THREE.DoubleSide
  //});
  this.textObj = new THREE.Mesh(this.textMesh, this.textMaterial);
  //this.textObj.receiveShadow = true;


  this.textObj.position.set(this.pos.x, this.pos.y + (data.distance/10), this.pos.z);
  this.textObj.lookAt( new THREE.Vector3(0, 0, 0) );

  // Add this WHOLE object to the main Objects array (THREADS.allObjects):
  objectsArray.push(this);
  // Then add this object's mesh to the scene
  scene.add(this.textObj);
}
Label.prototype = {
  // We're going to use a Vector3 for object position:
  pos: 0,  // THREE.Vector3

  // Object and texture storage
  geometry: 0,
  material: 0,
  cube: 0, // The actual THREE.Object3D itself

  // Object shape and animation parameters:
  angle: 0,

  update: function () {
    //this.textObj.rotation.x += 0.5 * Math.PI / 180;
  },
  draw: function () {
    // probably don't need this...
  }
};