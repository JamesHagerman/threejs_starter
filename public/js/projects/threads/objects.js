// Copy this whole block to start playing with new "objects":
function OurVRCube(scene, objectsArray) {
  // This is the basic template for 3D objects.
  this.geometry = new THREE.BoxGeometry(15, 15, 15);
  this.material = new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff});
  this.cube = new THREE.Mesh(this.geometry, this.material);

  //===============
  // Set position and rotation of the object:

  // We'll use a Vector3 for the position of the object:
  this.pos = new THREE.Vector3(0, 0, -20); // x, y, z
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
OurVRCube.prototype = {
  // We're going to use a Vector3 for object position:
  pos: 0,  // THREE.Vector3

  // Object and texture storage
  geometry: 0,
  material: 0,
  cube: 0, // The actual THREE.Object3D itself

  // Object shape and animation parameters:
  angle: 0,

  update: function () {
    //this.cube.rotation.x += 0.1 * Math.PI / 180;
  },
  draw: function () {
    // probably don't need this...
  }
};


//=================
// Start of all our old objects (and some new ones)


function OurVRCube(scene, objectsArray) {
  //this.init();

  // Build a cube here...
  this.geometry = new THREE.BoxGeometry(15, 15, 15);
  this.material = new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff});
  //this.material = new THREE.MeshPhongMaterial({color: Math.random() * 0xff << 4});
  this.cube = new THREE.Mesh(this.geometry, this.material);

  this.cube.position.x = Math.random() * 800 - 400;
  this.cube.position.y = Math.random() * 800 - 400;
  this.cube.position.z = Math.random() * 800 - 400;

  //this.cube.position.x = 0;
  //this.cube.position.y = -30;
  //this.cube.position.z = 0;

  this.cube.rotation.x = Math.random() * 1 * Math.PI;
  this.cube.rotation.y = Math.random() * 1 * Math.PI;
  this.cube.rotation.z = Math.random() * 1 * Math.PI;

  // Add this WHOLE object to the main Objects array (THREADS.allObjects):
  objectsArray.push(this);
  // Then add this object's mesh to the scene
  scene.add(this.cube);
}
OurVRCube.prototype = {
  x: 0,
  y: 0,
  z: 0,
  geometry: 0,
  material: 0,
  cube: 0,

  update: function () {
    this.cube.rotation.x += 0.1 * Math.PI / 180;
    //this.cube.position.z--;
  },
  draw: function () {
//   actually draws shit ONLY FOR THIS ONE INSTANCE OF ANY GIVEN LINE.
  }
};


function OurVRLine(scene, objectsArray) {
  //this.init();

  this.geometry = new THREE.PlaneBufferGeometry(-20, -10, 10, 10);
  this.material = new THREE.MeshPhongMaterial({color: 0xff0000, side: THREE.DoubleSide});
  this.line = new THREE.Mesh(this.geometry, this.material);
  this.line.position.x = 0;
  this.line.position.y = -15;
  this.line.position.z = -20;
  this.line.rotation.x = -80 * Math.PI / 180;

  // Add this WHOLE object to the main Objects array (THREADS.allObjects):
  objectsArray.push(this);
  // Then add this object's mesh to the scene
  scene.add(this.line);
}
OurVRLine.prototype = {
  x: 0,
  y: 0,
  z: 0,
  line: 0,

  update: function () {
    // this.line.rotation.x += 1*Math.PI/180;
    //this.line.scale.y++;
  },
  draw: function () {
//   actually draws shit ONLY FOR THIS ONE INSTANCE OF ANY GIVEN LINE.
  }
};


function Cube(scene, objectsArray) {
  // Create 3d objects
  this.geometry = new THREE.BoxGeometry(10, 10, 10);
  this.material = new THREE.MeshNormalMaterial();
  this.cube = new THREE.Mesh(this.geometry, this.material);

  // Position cube mesh:
  // This time, we'll use a Vector3 to position the object.
  // So, instead of these two lines:
  // cube.position.z = -20;

  // We'll use a Vector3
  this.pos = new THREE.Vector3(0, 0, -20); // x, y, z

  // And set the objects position directly using that vector:
  this.cube.position.set(this.pos.x, this.pos.y, this.pos.z);

  // Add this WHOLE object to the main Objects array (THREADS.allObjects):
  objectsArray.push(this);
  // Then add this object's mesh to the scene
  scene.add(this.cube);

}
Cube.prototype = {
  // We aren't going to use x, y, and z for object positions....
  //x: 0,
  //y: 0,
  //z: 0,
  // We're going to use a Vector3:
  pos: 0,  // THREE.Vector3
  cube: 0,
  angle: 0,

  update: function () {
    this.angle += 1;

    // Rotate the cube mesh:
    // This time, we'll use Quaternion's to rotate the object..
    // So, we build a quaternion:
    var quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), this.angle * Math.PI / 180);

    // Then apply the quaternion instead of the Object3D's rotation parameters:
    this.cube.rotation.setFromQuaternion(quaternion);

  }
};


// ToDo: Make the following objects follow the common object format so they will
//  initialize correctly in our scene.

function objectStrange(scene, objectsArray) {
  console.log("Starting objectStrange!")
  // Create 3d objects
  this.geometry = new THREE.PlaneBufferGeometry(-20, -10, 10, 10);
  this.material = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide});
  this.line = new THREE.Mesh(this.geometry, this.material);

  this.pos = new THREE.Vector3(0, 0, -20); // x, y, z
  this.line.position.set(this.pos.x, this.pos.y, this.pos.z);

  // We'll use quaternions for the rotation of the object:
  var quaternion = new THREE.Quaternion();
  quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.random() * Math.PI / 180);
  this.line.rotation.setFromQuaternion(quaternion);

  // position and rotation end
  //===============

  // Add this WHOLE object to the main Objects array (THREADS.allObjects):
  objectsArray.push(this);

  scene.add(this.line);
}
objectStrange.prototype = {
  pos: 0,
  line: 0,
  angle: 0,

  update: function () {
    this.angle += 1;

    var quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), this.angle * Math.PI / 180);

    // Then apply the quaternion instead of the Object3D's rotation parameters:
    this.line.rotation.setFromQuaternion(quaternion);

  }

};

function objectText(scene, objectsArray) {
  console.log("starting objectText");
  // Create 3d objects
  this.font = 'helvetiker';
  this.textMesh = new THREE.TextGeometry("Jam is a Nemo\/", {
    font: 'helvetiker',
    size: 1,
    height: 1
  });
// var textMaterial = new THREE.MeshBasicMaterial({color: 0xFF5555});
  this.textMaterial = new THREE.MeshNormalMaterial({color: 0xFF5555});
  this.textObj = new THREE.Mesh(this.textMesh, this.textMaterial);

  this.textObj.position.z = -20;
  this.textMesh.computeBoundingBox();
  console.log("Size max x: " + this.textMesh.boundingBox.max.x);
  console.log("Size min x: " + this.textMesh.boundingBox.min.x);
  this.textObj.position.x = -this.textMesh.boundingBox.max.x / 2;
  this.textObj.position.y = 10;
  this.textObj.rotation.x = 30 * Math.PI / 180;

  // We'll use quaternions for the rotation of the object:
  // var quaternion = new THREE.Quaternion();
  // quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.random() * Math.PI / 180);
  // this.textObj.rotation.setFromQuaternion(quaternion);

  // position and rotation end
  //===============

  // Add this WHOLE object to the main Objects array (THREADS.allObjects):
  objectsArray.push(this);

  scene.add(this.textObj);
}
objectText.prototype = {
  size: 1,
  height: 1,
  font: 'helvetiker',
  angle: 0,

  update: function () {
    this.angle += 1;

    var quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), this.angle * Math.PI / 180);
    // Then apply the quaternion instead of the Object3D's rotation parameters:
    // this.textObj.rotation.setFromQuaternion(quaternion);

  }

};

// function objectText() {
//   var textParams = {
//     size: 1,
//     height: 1,
//     font: 'helvetiker'
//   };

//   var textMesh = new THREE.TextGeometry("Console..........:!@#42350\/", textParams);
// // var textMaterial = new THREE.MeshBasicMaterial({color: 0xFF5555});
//   var textMaterial = new THREE.MeshNormalMaterial();
//   var textObj = new THREE.Mesh(textMesh, textMaterial);

//   textObj.position.z = -20;
//   textMesh.computeBoundingBox();
//   console.log("Size max x: " + textMesh.boundingBox.max.x);
//   console.log("Size min x: " + textMesh.boundingBox.min.x);
//   textObj.position.x = -textMesh.boundingBox.max.x / 2;
//   textObj.position.y = 10;
//   textObj.rotation.x = 30 * Math.PI / 180;

// // Add text to the scene
// //  SCENE.add(textObj);
// }

function objectTriangleTest() {
  var tri_geo = new THREE.Geometry();
// var normal = new THREE.Vector3( 0, 1, 0 );
// var color = new THREE.Color( 0xffaa00 );
// var face = new THREE.Face3( 0, 1, 2, normal, color, 0 );

  var v1 = new THREE.Vector3(0, 0, 0);
  var v2 = new THREE.Vector3(5, 0, 0);
  var v3 = new THREE.Vector3(0, 5, 0);

  tri_geo.vertices.push(v1);
  tri_geo.vertices.push(v2);
  tri_geo.vertices.push(v3);

  tri_geo.faces.push(new THREE.Face3(0, 1, 2));
  tri_geo.computeFaceNormals();

// tri_geo.computeBoundingSphere();
  var redMat = new THREE.MeshBasicMaterial({color: 0xff0000});
  var triMat = new THREE.MeshNormalMaterial();
  var triangle = new THREE.Mesh(tri_geo, redMat);

  triangle.position.z = -20;
  triangle.position.y = 10;

// And we should be good to go on adding it to the scene in the correct location:
  SCENE.add(triangle);
}

function objectLineTest() {
  //Create a closed bent a sine-like wave
  var curve = new THREE.SplineCurve3([
    new THREE.Vector3(-10, 0, 10),
    new THREE.Vector3(-5, 5, 5),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(5, -5, 5),
    new THREE.Vector3(10, 0, 10)
  ]);

  var geometry = new THREE.Geometry();
  geometry.vertices = curve.getPoints(50);

  var material = new THREE.LineBasicMaterial({color: 0xff0000});

//Create the final Object3d to add to the scene
  var splineObject = new THREE.Line(geometry, material);

  splineObject.position.z = -20;
  SCENE.add(splineObject);
}

//function randomCurve(scene, objectsArray) {
//  var points = [];
//  for (var i = 0; i < 10; i++) {
//    points.push(new THREE.Vector3(randomBetween(-10, 10), randomBetween(-10, 10), randomBetween(-20, -200)));
//  }
//
//  var curve = new THREE.SplineCurve3(points);
//  var geometry = new THREE.Geometry();
//  geometry.vertices = curve.getPoints(50);
//  var material = new THREE.LineBasicMaterial({color: 0xff0000});
//  var splineObject = new THREE.Line(geometry, material);
//  //SCENE.add(splineObject);
//
//}


















function randomCurve(scene, objectsArray) {
  // This is the basic template for 3D objects.
  //this.geometry = new THREE.BoxGeometry(15, 15, 15);
  //this.material = new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff});
  //this.curve = new THREE.Mesh(this.geometry, this.material);
  this.points = [];
  for (var i = 0; i < 10; i++) {
    this.points.push(new THREE.Vector3(randomBetween(-10, 10), randomBetween(-10, 10), randomBetween(-20, -200)));
  }

  this.curve = new THREE.SplineCurve3(this.points);
  this.geometry = new THREE.Geometry();
  this.geometry.vertices = this.curve.getPoints(50);
  this.material = new THREE.LineBasicMaterial({color: 0xff0000});
  this.splineObject = new THREE.Line(this.geometry, this.material);


  //===============
  // Set position and rotation of the object:

  // We'll use a Vector3 for the position of the object:
  this.pos = new THREE.Vector3(0, 0, -20); // x, y, z
  this.splineObject.position.set(this.pos.x, this.pos.y, this.pos.z);

  // We'll use quaternions for the rotation of the object:
  var quaternion = new THREE.Quaternion();
  quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.random() * Math.PI / 180);
  this.splineObject.rotation.setFromQuaternion(quaternion);

  // position and rotation end
  //===============

  // Add this WHOLE object to the main Objects array (THREADS.allObjects):
  objectsArray.push(this);
  // Then add this object's mesh to the scene
  scene.add(this.splineObject);
}
randomCurve.prototype = {
  // We're going to use a Vector3 for object positions:
  pos: 0,  // THREE.Vector3

  // object storage:
  points: [],
  geometry: 0,
  material: 0,

  splineObject: 0, // The actual THREE.Object3D itself
  angle: 0,

  update: function () {
    //this.splineObject.rotation.x += 1. * Math.PI / 180;
  }
};









function NewLine(scene, objectsArray) {

  // var forwards = -200 + THREADS.forward_speed;
  for (var i=0; i<100 ; i++) {
    // this.points.push(new THREE.Vector3(randomBetween(-10, 10), randomBetween(-10, 10), randomBetween(-300, -10)));
    this.points.push(new THREE.Vector3(randomBetween(-20, 20), randomBetween(-20, 20), -i*100));
  }

  this.curve = new THREE.SplineCurve3(this.points);
  this.geometry = new THREE.TubeGeometry(this.curve, this.points.length*10, 40, 40);
  // this.geometry.vertices = this.curve.getPoints(50);

  this.material = new THREE.MeshNormalMaterial({color: Math.random() * 0xffffff, side: THREE.DoubleSide});
  // THREE.FrontSide, THREE.BackSide and THREE.DoubleSide
  this.splineObject = new THREE.Mesh(this.geometry, this.material);



  //===============
  // Set position and rotation of the object:

  //// We'll use a Vector3 for the position of the object:
  //this.pos = new THREE.Vector3(0, 0, -20); // x, y, z
  //this.cube.position.set(this.pos.x, this.pos.y, this.pos.z);
  //
  //// We'll use quaternions for the rotation of the object:
  //var quaternion = new THREE.Quaternion();
  //quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.random() * Math.PI / 180);
  //this.cube.rotation.setFromQuaternion(quaternion);

  // position and rotation end
  //===============

  // Add this WHOLE object to the main Objects array (THREADS.allObjects):
  objectsArray.push(this);
  // Then add this object's mesh to the scene
  scene.add(this.splineObject);
}
NewLine.prototype = {
  pos: 0,  // THREE.Vector3

  // Object and texture storage:
  geometry: 0,
  material: 0,
  splineObject: 0, // The actual THREE.Object3D itself

  points: [],
  angle: 0,

  update: function () {
    //this.splineObject.geometry.points.push(new THREE.Vector3(randomBetween(-10, 10), randomBetween(-50, 0), randomBetween(0, -100)));
  },
  draw: function () {
    // probably don't need this...
  }
};