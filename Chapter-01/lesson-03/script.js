import * as THREE from 'three';

//Canvas
const canvas = document.querySelector('canvas.webgl');

//Scene
const scene = new THREE.Scene();

//Object (parameters are essentially the width, height, and depth of the cube and 1,1,1 are the default values)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: '#ff0000' }); //Material (color is red) all properties for mesh is sent in as an object
const mesh = new THREE.Mesh(geometry, material); //Mesh (geometry and material are passed in as parameters) - this is the actual object
scene.add(mesh); // adding the object to the scene

//Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height) //Main params are vertical fov, 75 in the sample is high used only for now and aspect ratio (width/height)
camera.position.z = 3; //Moving the camera back a bit to make the cube visible
scene.add(camera); //Adding the camera to the scene

//Renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas}); //Renderer (canvas is passed in as a parameter for the canvas property
renderer.setSize(sizes.width, sizes.height); //Setting the size of the renderer
renderer.render(scene, camera); //Rendering the scene and camera