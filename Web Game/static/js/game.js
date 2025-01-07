import * as THREE from 'three';
import Stats from 'https://unpkg.com/three@0.169.0/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.157.0/examples/jsm/controls/OrbitControls.js';
//import { loadFloor } from './SceneLoader';
//import { stats } from './Stats';


let stats;
let controls;
let rightpressed = false;
let leftpressed = false;
let uppressed = false;
let downpressed = false;
let upstate = false;
let downstate = false;
let leftstate = false;
let rightstate = false;

let animationActions = [];
let mixer;
let activeAction;
let lastAction;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

camera.rotation.x = -0.5;
camera.position.z = 14;
camera.position.y = 15;

//create wall for collsion with the player
const geometry = new THREE.BoxGeometry( 6, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add(cube);


//player 1 ship floor

let Floor;
const loaderfloor = new THREE.TextureLoader();
    loaderfloor.load("/Web Game/static/resources/img/ShipFloor.png", function(texture){
        const FloorGeo = new THREE.PlaneGeometry( 100, 100, 4
        );
        const FloorMat = new THREE.MeshBasicMaterial( {
            map: texture,
            side: THREE.DoubleSide
        })
        Floor = new THREE.Mesh(FloorGeo, FloorMat);
        Floor.rotation.x = -Math.PI/2;
        scene.add(Floor);
    })    


//loadFloor(scene);
//sceond player floor
let Floor1;
const loaderfloor1 = new THREE.TextureLoader();
    loaderfloor1.load("/Web Game/static/resources/img/ShipFloor.png", function(texture){
        const FloorGeo1 = new THREE.PlaneGeometry( 100, 100, 4
        );
        const FloorMat1 = new THREE.MeshBasicMaterial( {
            map: texture,
            side: THREE.DoubleSide
        })
        Floor1 = new THREE.Mesh(FloorGeo1, FloorMat1);
        Floor1.position.z = -120;
        Floor1.rotation.x = -Math.PI/2;
        scene.add(Floor1);
    })

// Main player Creation Mesh
let playerBodyMesh;
let Face;
let player;
    const loader = new THREE.TextureLoader();
    loader.load("/Web Game/static/resources/img/iron.png", function(texture){
        const playerBodyGeo = new THREE.CapsuleGeometry( 1, 1, 5, 9);
        const playerBodyMat = new THREE.MeshBasicMaterial( {
            map: texture
        })
    const FaceGeo = new THREE.BoxGeometry(1,1,1);
    const FaceMat = new THREE.MeshBasicMaterial( { color: 0x00ff00})
    playerBodyMesh = new THREE.Mesh(playerBodyGeo, playerBodyMat);
    Face = new THREE.Mesh(FaceGeo, FaceMat);

    playerBodyMesh.position.y = 2;
    Face.position.y = 2.5;
    Face.position.z = -0.5;
    
    player = new THREE.Group();
    player.add(playerBodyMesh);
    player.add(Face);


    scene.add(player);
    
    })


    
    


// create the movement for the player 
const playerMovement = () => {
    if (rightpressed){
        player.position.x += 0.2;
        player.rotation.y = -90;
        camera.position.x += 0.2;
    } else if (leftpressed) {
        player.position.x -= 0.2;
        player.rotation.y = -270;
        camera.position.x -= 0.2;
    }

    if (downpressed) {
        player.position.z += 0.2;
        player.rotation.y = 180;
        camera.position.z += 0.2;
    } else if (uppressed) {
        player.position.z -= 0.2;
        player.rotation.y = 0;
        camera.position.z -= 0.2;
    }
}

/*
const createControls =()=>{
	controls = new OrbitControls(camera, renderer.domElement);
	controls.update();
}

createControls();
*/
stats = new Stats();
document.body.appendChild( stats.dom );

function animate() { 

    stats.update();


    
    cube.position.x = 4;
   cube.position.y = 4;

    playerMovement();

    if(upstate){
		player.position.z += 0.02;

	}else if(downstate){
		player.position.z -= 0.02;

	}

    if (leftstate){
        player.position.x -= 0.02;
    }else if(rightstate){
        player.position.x += 0.02;
    }
    
    renderer.render(scene, camera );
}



// skybox around the map
const createskybox = () => {
	let bgMesh;
	const loader = new THREE.TextureLoader();
	loader.load("/Web Game/static/resources/img/Skybox.png", function(texture){
		const SphereGeometry = new THREE.SphereGeometry(200, 120, 80);
		const SphereMaterial = new THREE.MeshBasicMaterial( { 
			map: texture,
			side: THREE.DoubleSide
		 }  )
	bgMesh = new THREE.Mesh(SphereGeometry, SphereMaterial);
	scene.add(bgMesh);
	});
	
}

createskybox();

const moveup = ()=>{
	upstate = true;
	downstate = false;
    leftstate = false;
    rightstate = false;
}

const movedown = ()=>{
	upstate = false;
	downstate = true;
    leftstate = false;
    rightstate = false;
}

const moveleft = ()=>{
    leftstate = true;
    rightstate = false;
    upstate = false;
    downstate = false;
}

const moveright = ()=>{
    leftstate = false;
    rightstate = true;
    upstate = false;
    downstate = false;
}

document.getElementById("upbutton").addEventListener("click", moveup);
document.getElementById("downbutton").addEventListener("click", movedown);
document.getElementById("leftbutton").addEventListener("click", moveleft);
document.getElementById("rightbutton").addEventListener("click", moveright);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);



function keyDownHandler(event) {
    if (event.code == "KeyD") {
        rightpressed = true;
        leftstate = false;
        rightstate = false;
        upstate = false;
        downstate = false;


    }else if (event.code == "KeyA") {
        leftpressed = true;
        leftstate = false;
        rightstate = false;
        upstate = false;
        downstate = false;
    }

    if (event.code == "KeyS") {
        downpressed = true;
        leftstate = false;
        rightstate = false;
        upstate = false;
        downstate = false;

    }else if (event.code == "KeyW") {
        uppressed = true;
        leftstate = false;
        rightstate = false;
        upstate = false;
        downstate = false;
    }
}

function keyUpHandler(event) {
    if (event.code == "KeyD") {
        rightpressed = false;
    }else if (event.code == "KeyA") {
        leftpressed = false;
    }

    if (event.code == "KeyS") {
        downpressed = false;

    }else if (event.code == "KeyW") {
        uppressed = false;
    }
}


const clock = new THREE.Clock();
/*
loader.load(
    'scene.gltf',  // called when the resource is loaded
 
    (gltf) => {
        mesh = gltf.scene;
        mesh.scale.set(15, 15, 15);
        scene.add(mesh); //add GLTF to the scene

		mixer = new THREE.AnimationMixer(gtlf.scene);
		gltf.animations.forEach((clip) =>{
			mixer.clipAction(clip);
		})

        animationActions.push(animationActions);
 
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

const render=()=> {
       requestAnimationFrame( render );
       
       if ( mixer ) mixer.update( 0.01 );
       renderer.render(scene, camera);
}

*/
















const onWindowResize = () => {

	camera.aspect = window.innerWidth / window.innerHeight;

	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);