import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('textures/particles/2.png')

//Materials
const particlesMaterial = new THREE.PointsMaterial()
particlesMaterial.size = 0.08
particlesMaterial.sizeAttenuation = true //adding perspective to the particles
//particlesMaterial.color = new THREE.Color('#ff88cc')
//particlesMaterial.map = particleTexture
particlesMaterial.transparent = true
particlesMaterial.alphaMap = particleTexture
particlesMaterial.alphaTest = 0.001 //if the alpha value is less than 0.001, the pixel isnt rendered
//particlesMaterial.depthWrite = false //disabling depth write so that the particles dont write to the depth buffer
particlesMaterial.blending = THREE.AdditiveBlending //additive blending for the particles


// Particles
const particlesGeometry = new THREE.BufferGeometry()
const count = 5000

//creating a new array of random positions that has 3 values for each particle (x,y,z)

const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3) // *3 as color also has 3 values (r,g,b)

for(let i = 0; i < count * 3; i++)
    {
        positions[i] = (Math.random() - 0.5) * 10
        colors[i] = Math.random()
    }
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
particlesMaterial.vertexColors = true

const particles = new THREE.Points(particlesGeometry, particlesMaterial)
particles.castShadow = true
scene.add(particles)

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
camera.position.z = 10
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

    // Update particles
    // particles.rotation.y = elapsedTime * 0.1
    // particles.position.y = Math.sin(elapsedTime * 0.5)

    // Updating each particle seperately
    for(let i = 0; i < count; i++)
    {
        const i3 = i * 3

        const x = particlesGeometry.attributes.position.array[i3]
        particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
    }

    particlesGeometry.attributes.position.needsUpdate = true
    

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()