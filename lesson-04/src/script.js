import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

//Cursor in nativejs

const cursor = {}
cursor.x = 0; cursor.y = 0; // this is the initial position of the cursor
window.addEventListener('mousemove', (event) => { //parsed in event as an argument for alerts
    cursor.x = event.clientX
    cursor.y = event.clientY
    
    //console.log(cursor.x, cursor.y)
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Cameras
//const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000) // (fov, aspect ratio, near, far (near far is basically limits of the camera)
//const aspectRatio = sizes.width / sizes.height
//const camera = new THREE.OrthographicCamera(-1*aspectRatio, 1*aspectRatio, 1, -1, 0.1, 100) // (left, right, top, bottom, near, far and adjected for aspect ratio)

// mouse controlled camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

//camera.position.x = 2
//camera.position.y = 2
camera.position.z = 3

scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //Update camera
    //camera.position.x = -cursor.x /sizes.width - 0.5
    //camera.position.y = cursor.y /sizes.height + 0.5
    //camera.lookAt(mesh.position)



    // Update objects
    //mesh.rotation.y = elapsedTime;

    //Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()