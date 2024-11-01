import * as THREE from 'three';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
cube.position.set(1, 1, 0);
cube.rotation.set(1, 0, 0);

const geometry1 = new THREE.BoxGeometry( 1, 1, 1 );
const material1 = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
const cube2 = new THREE.Mesh( geometry1, material1 );
cube2.position.set(-1, -1, 0);

const material2 = new THREE.MeshBasicMaterial( { color: 0xFFA500 } );
const cube3 = new THREE.Mesh( geometry1, material2 );
cube3.position.x = 2;

camera.position.z = 10;

let MiniGroup = new THREE.Group();
MiniGroup.add(cube);
MiniGroup.add(cube2);

let group = new THREE.Group();
group.add(cube3);
group.add(MiniGroup);

scene.add(group);

function animate() {

	MiniGroup.rotation.x += 0.02;

	renderer.render(scene, camera );

}

window.addEventListener('resize', onWindowResize);