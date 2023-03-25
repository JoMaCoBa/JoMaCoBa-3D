// Crear la escena
var scene = new THREE.Scene();

// Crear la cámara
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 6;

// Crear el renderizador
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Crear las luces
var light1 = new THREE.AmbientLight( 0x404040 ); // Luz ambiente
var light2 = new THREE.PointLight( 0xffffff, 1, 100 ); // Luz puntual
light2.position.set( 5, 5, 5 ); // Posicion de la luz puntual
scene.add( light1 );
scene.add( light2 );

// Crear el material para las letras
var material = new THREE.MeshPhongMaterial({ color: 0xffffff });

// Crear las letras "JoMaCoBa"
var loader = new THREE.FontLoader();
var text = "JoMaCoBa";
var fontPath = 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json';
loader.load( fontPath, function ( font ) {
  var geometry = new THREE.TextGeometry( text, {
    font: font,
    size: 1,
    height: 0.5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5
  });
  
  var mesh = new THREE.Mesh( geometry, material );
  mesh.position.set(-2.5, -1.5, 0); // Mover la palabra hacia abajo
  scene.add( mesh );
});

// Crear las letras "Veni Vidi Vici"
var loader2 = new THREE.FontLoader();
var text2 = "\nVeni\nVidi\nVici";
var fontPath2 = 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json';
loader2.load( fontPath2, function ( font ) {
  var geometry = new THREE.TextGeometry( text2, {
    font: font,
    size: 0.5,
    height: .0,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.015,
    bevelOffset: 0,
    bevelSegments: 20
  });

  var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({ color: 0x000000 }) );
  mesh.position.set(0, -2.5, 1);// Mover la palabra hacia arriba
  mesh.rotation.x = Math.PI / 500;
  scene.add( mesh );
});

// Animación
function animate() {
	requestAnimationFrame( animate );
	
	var time = Date.now() * 0.001; // Tiempo actual en segundos
	var sinValue = Math.sin(time * 2) * 0.2; // Valor del seno para la animación
	
	scene.children.forEach(function(object) {
		if (object instanceof THREE.Mesh) {
			object.position.y = sinValue;
		}
	});
	
	renderer.render( scene, camera );
}

animate();

