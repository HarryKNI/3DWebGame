import * as THREE from 'three';

function loadFloor(scene) 
{
    let Floor;
const loaderfloor = new THREE.TextureLoader();
    loaderfloor.load("/resources/img/ShipFloor.png", function(texture){
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
};

export {loadFloor(scene)};