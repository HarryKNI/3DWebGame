import * as THREE from 'three';

let rightpressed = false;
let leftpressed = false;
let uppressed = false;
let downpressed = false;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

camera.position.z = 10;
camera.position.y = 5;

//create wall for collsion with the player
const geometry = new THREE.BoxGeometry( 6, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add(cube);

// Main player Creation Mesh
let playerBodyMesh;
    const loader = new THREE.TextureLoader();
    loader.load("/resources/img/white.png", function(texture){
        const playerBodyGeo = new THREE.CapsuleGeometry( 1, 1, 2, 4);
        const playerBodyMat = new THREE.MeshBasicMaterial( {
            map: texture
        })
    playerBodyMesh = new THREE.Mesh(playerBodyGeo, playerBodyMat);
    scene.add(playerBodyMesh);
    })

    


// create the movement for the player 
const playerMovement = () => {
    if (rightpressed){
        playerBodyMesh.position.x += 0.2;
    } else if (leftpressed) {
        playerBodyMesh.position.x -= 0.2;
    }

    if (downpressed) {
        playerBodyMesh.position.y -= 0.2;
    } else if (uppressed) {
        playerBodyMesh.position.y += 0.2;
    }
}

function animate() { 

    cube.position.x = 4;
   cube.position.y = 8;

    playerMovement();

    renderer.render(scene, camera );
}

const createskybox = () => {
	let bgMesh;
	const loader = new THREE.TextureLoader();
	loader.load("/resources/img/skybox.jpg", function(texture){
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

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);



function keyDownHandler(event) {
    if (event.code == "KeyD") {
        rightpressed = true;

    }else if (event.code == "KeyA") {
        leftpressed = true;
    }

    if (event.code == "KeyS") {
        downpressed = true;

    }else if (event.code == "KeyW") {
        uppressed = true;
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






















const onWindowResize = () => {

	camera.aspect = window.innerWidth / window.innerHeight;

	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);