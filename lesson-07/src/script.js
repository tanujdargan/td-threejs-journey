import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'

/*Debug*/
const gui = new GUI()
const debugObject = {} //create an object to store the debug values for color

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */

debugObject.color = '#47008f'

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//Method 1
//gui.add(mesh.position, 'y', -3, 3, 0.01) //parameters: object, property, min, max, step
//Method 2
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('height') //exact same as above but more readable

gui.add(mesh, 'visible') //add a checkbox to show/hide the object
gui.add(material, 'wireframe') //add a checkbox to show/hide the wireframe

/*Method 1
//add a color picker (used addColor as color is an object of the color class thus cant be handled like a standard variable or number)
gui
    .addColor(material, 'color')
    //add a function to be called when the color changes
    .onChange((value)=>{
        console.log(value.getHexString())
    })
*/

//Method 2 (better as it doesn't require manual colour space management)

gui
    .addColor(debugObject, 'color')
    .onChange(()=>{
        material.color.set(debugObject.color)
    })


//adding a button based gsap animation

debugObject.spin = () => {
    gsap.to(mesh.rotation, {duration: 4, y: mesh.rotation.y + Math.PI * 2})
}

gui.add(debugObject, 'spin')

//hide or show debug gui on 'h' keypress
gui.hide()
window.addEventListener('keydown', (event)=>{
    if(event.key === 'h'){
        gui.show(gui._hidden)
    }
})


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()