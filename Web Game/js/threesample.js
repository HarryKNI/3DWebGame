import * as THREE from 'three';

import { OrbitControls } from 'https://unpkg.com/three@0.157.0/examples/jsm/controls/OrbitControls.js';

let controls;

let upstate = false;
let downstate = false;
let changed = false;

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

const SphGeometry = new THREE.SphereGeometry(1, 4, 3);
const SphMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const Sphere = new THREE.Mesh( SphGeometry, SphMaterial);
Sphere.add(cube);


camera.position.z = 10;

let MiniGroup = new THREE.Group();
MiniGroup.add(Sphere);
MiniGroup.add(cube2);

let group = new THREE.Group();
group.add(cube3);
group.add(MiniGroup);

scene.add(group);

const addPlane =(x, y, w, h, materialaspect) => {

	const PGeometry = new THREE.PlaneGeometry( w, h, 2);
	const PMaterial = new THREE.MeshBasicMaterial( materialaspect );

	const plane = new THREE.Mesh( PGeometry, PMaterial);

	plane.position.x = x;
	plane.position.y = y;
	plane.rotation.x = -Math.PI/2;
	scene.add( plane );
}

const texture = new THREE.TextureLoader().load("/resources/img/goldpattern.png");
const materialAspectFloor = {
	map:texture,
	side: THREE.DoubleSide,
	transparent:true
}
addPlane(0, -3.6, 30, 30, materialAspectFloor);

const player = new THREE.Mesh(geometry1, material1);
scene.add(player);

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

function animate() {

	Sphere.rotation.x += 0.01;
	MiniGroup.rotation.x += 0.02;
	MiniGroup.rotation.y += 0.02;
	group.rotation.y += 0.01;

	if(upstate){
		player.position.y += 0.02;

	}else if(downstate){
		player.position.y -= 0.02;

	}

	if ((player.position.y > 1) && !changed){
		player.material.color.setHex(oxE70DA6);

		changed=true;
	}

	renderer.render(scene, camera );

	
}

const onWindowResize = () => {

	camera.aspect = window.innerWidth / window.innerHeight;

	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

const createskybox = () => {
	let bgMesh;
	const loader = new THREE.TextureLoader();
	loader.load("/resources/img/galaxy.jpg", function(texture){
		const SphereGeometry = new THREE.SphereGeometry(100, 60, 40);
		const SphereMaterial = new THREE.MeshBasicMaterial( { 
			map: texture,
			side: THREE.DoubleSide
		 }  )
	bgMesh = new THREE.Mesh(SphereGeometry, SphereMaterial);
	scene.add(bgMesh);
	});
	
}

createskybox();

const createControls =()=>{
	controls = new OrbitControls(camera, renderer.domElement);
	controls.update();
}

createControls();

const moveup = ()=>{
	upstate = true;
	downstate = false;
}

const movedown = ()=>{
	upstate = false;
	downstate = true;
}


document.getElementById("upbutton").addEventListener("click", moveup);
document.getElementById("downbutton").addEventListener("click", movedown);

import { GLTFLoader } from "https://unpkg.com/three@0.169.0/examples/jsm/loaders/GLTFLoader.js";
 
const loader  = new GLTFLoader().setPath("/resources/3dmodel/");
///////GLTF loader
// Load a glTF resource
let mesh;
loader.load(
    'low_poly_helicopter.glb',  // called when the resource is loaded
 
    (gltf) => {
        mesh = gltf.scene;
        mesh.scale.set(0.3, 0.3, 0.3);
        scene.add(mesh); //add GLTF to the scene
 
    },
    // called when loading is in progresses
 
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
 
    },
    // called when loading has errors
 
    (error) => {
        console.log('An error happened' + error);
    }
);
 
//GLTF
 