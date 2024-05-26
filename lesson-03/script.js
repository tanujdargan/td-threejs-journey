import * as THREE from 'three';
import gsap from 'gsap';

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

//GSAP Animation
gsap.to(mesh.position, { x: 2, duration: 1, delay: 1 }); //Animating the cube to move to the right by 2 units in 1 second with a delay of 1 second
gsap.to(mesh.position, { x: 0, duration: 1, delay: 2 }); //GSAP has built-in timings so theres no need to use the methods below unless you really want to.

const frameloop = () => {
    renderer.render(scene, camera); //Rendering the scene and camera
    window.requestAnimationFrame(frameloop) //This is a recursive function that calls itself
}
frameloop()


//Clock
//const clock = new THREE.Clock(); //Creating a clock object

/*
//Animation
const frameloop = () => {

    //Time
    const elapsedTime = clock.getElapsedTime(); //Getting the elapsed time since the clock started
    //Updating objects using transformations
    //mesh.rotation.y = elapsedTime; //Rotating the cube by three timing
    mesh.position.y = Math.sin(elapsedTime); //Moving the cube up and down using the sin function
    mesh.position.x = Math.sin(elapsedTime)*Math.tan(elapsedTime); //Moving the cube left and right using the cos function

    //Render
    renderer.render(scene, camera); //Rendering the scene and camera

    window.requestAnimationFrame(frameloop) //This is a recursive function that calls itself
}

frameloop()
*/
//Another method to achieve the same thing below
/*
//Animation
const frameloop = () => {

    //Time
    const currenttime = Date.now(); //Getting the current time
    const deltaTime = currenttime - time; //Calculating the delta time
    time = currenttime; //Updating the previous time

    //Updating objects using transformations
    mesh.rotation.y += 0.001 * deltaTime; //Rotating the cube by 0.001 radians per millisecond according to current time so that its synced

    //Render
    renderer.render(scene, camera); //Rendering the scene and camera

    window.requestAnimationFrame(frameloop) //This is a recursive function that calls itself
}

frameloop()
*/