var Confetti = function () {


  new THREE.Mesh( new THREE.CubeGeometry( 200, 200, 200 ), new THREE.MeshNormalMaterial() );

}

Confetti.prototype = Object.create( THREE.Geometry.prototype );
Confetti.prototype.constructor = Bird;
