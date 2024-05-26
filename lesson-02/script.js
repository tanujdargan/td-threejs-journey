import * as THREE from 'three';

//Canvas
const canvas = document.querySelector('canvas.webgl');

//Scene
const scene = new THREE.Scene();

//Group example
const group = new THREE.Group(); //Creating a group of objects
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
);
cube1.scale.set(0.25, 0.25, 0.25); //Scaling the cube
cube1.position.set(-1.5, 0, 0); //Setting the position of the cube
group.add(cube1); //Adding the cube to the group
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: '#00ff00' })
);
cube2.scale.set(0.25, 0.25, 0.25); //Scaling the cube
cube2.position.set(1.5, 0, 0); //Setting the position of the cube
group.add(cube2); //Adding the cube to the group

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: '#0000ff' })
);
cube3.scale.set(0.25, 0.25, 0.25); //Scaling the cube
cube3.position.set(0, 1.5, 0); //Setting the position of the cube
group.add(cube3); //Adding the cube to the group

scene.add(group); //Adding the group to the scene
//group.position.y = 1; //Setting the position of the group
group.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI/4); //Rotating the group on the x-axis by 45 degrees

//Object (parameters are essentially the width, height, and depth of the cube and 1,1,1 are the default values)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: '#ff0000' }); //Material (color is red) all properties for mesh is sent in as an object
const mesh = new THREE.Mesh(geometry, material); //Mesh (geometry and material are passed in as parameters) - this is the actual object
// mesh.position.x = 0; mesh.position.y = 0; mesh.position.z = 0; 
mesh.position.set(0,0,0); //Setting the position of the object using the set method in one single line instead of seperately setting x, y, z
mesh.scale.set(2, 0.5, 0.5); //Scaling the object 
mesh.rotation.reorder('YXZ'); //Reordering the rotation sequence prevents gimbal lock, ensuring all axes remain movable.
mesh.rotation.set(0, Math.PI/2, 0); //Rotating the object
scene.add(mesh); // adding the object to the scene

console.log(mesh.position.length()); //Checking the length of the position vector of the mesh
mesh.position.normalize() //Normalising the position vector of the mesh brins it to a length of 1

//Sizes
const sizes = {
    width: 800,
    height: 600
}

//Axes Helper
const axesHelper = new THREE.AxesHelper(1.5); //Creating an axes helper object this helps visualise the axes in the scene the parameter (1.5) is the size of the axes 
scene.add(axesHelper); //Adding the axes helper to the scene

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height) //Main params are vertical fov, 75 in the sample is high used only for now and aspect ratio (width/height)
//camera.position.z = 3; //Moving the camera back a bit to make the cube visible
camera.position.set(1, -0, 3); //Setting the position of the camera
camera.lookAt(mesh.position); //Making the camera look at the mesh
scene.add(camera); //Adding the camera to the scene

console.log(mesh.position.distanceTo(camera.position)); //Checking the distance to the camera for example

//Renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas}); //Renderer (canvas is passed in as a parameter for the canvas property
renderer.setSize(sizes.width, sizes.height); //Setting the size of the renderer
renderer.render(scene, camera); //Rendering the scene and camera