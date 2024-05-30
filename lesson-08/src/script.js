import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { clamp } from 'three/src/math/MathUtils.js'

/* Textures native JS version 
const image = new Image()
const texture = new THREE.Texture(image)
texture.colorSpace = THREE.SRGBColorSpace //Remember to specify colour space for textures

image.onload = () => 
{
    texture.needsUpdate = true
}

image.src = '/textures/door/color.jpg'
*/

// Textures Three.js (faster and more efficient)
const loadingManager = new THREE.LoadingManager() //gives callbacks for file loading
/*
loadingManager.onStart = () =>
{
    console.log('onStart')
}

loadingManager.onProgress = () => 
{
    console.log('onProgress')
}

loadingManager.onLoad = () => 
{
    console.log('onLoading')
}

loadingManager.onError = () => 
{
    console.log('onError')
}
*/
const textureLoader = new THREE.TextureLoader(loadingManager) //THREE.js texture loader class can load multiple textures at once (REMEMBER TO PARSE LOADING MANAGER AS ARGUMENT IF USED)
//const colorTexture = textureLoader.load('/textures/door/color.jpg') //load method to load the image
//const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png') //load method to load the image
const colorTexture = textureLoader.load('/textures/minecraft.png') //load method to load the image
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg') 
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

/*
colorTexture.colorSpace = THREE.SRGBColorSpace //Remember to specify colour space for textures
//colorTexture.wrapS = THREE.RepeatWrapping //repeat the texture on S (x axis)
//colorTexture.wrapT = THREE.RepeatWrapping //repeat the texture on T (y axis)
colorTexture.wrapS = THREE.MirroredRepeatWrapping //mirror the texture on the S axis
colorTexture.wrapT = THREE.MirroredRepeatWrapping //mirror the texture on the T axis 
colorTexture.rotation = Math.PI * 0.25 //rotate the texture by 45 degrees
colorTexture.offset.x = 0.5 //move the texture on the x axis same for other axes
colorTexture.center.x = 0.5 //center the texture on the x axis same for other axes
colorTexture.center.y = 0.5 //center the texture on the y axis same for other axes
*/

//NearestFilter - will give higher fps but lower quality
//Mipmapping - creates smaller textures (halves the size of the texture until 1x1)
//colorTexture.minFilter = THREE.NearestFilter //NearestFilter is likely going to be sharper (min = minification filter)
colorTexture.magFilter = THREE.NearestFilter //Magnification filter (testing with minecraft for better understanding)
//colorTexture.generateMipmaps = false //disables mipmapping when NearestFilter is used (also helps performance)



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
const geometry = new THREE.BoxGeometry(1, 1, 1)
console.log(geometry.attributes.uv) //shows the UVs of the geometry
const material = new THREE.MeshBasicMaterial({map: colorTexture}) //switched from color to a texture map
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
camera.position.z = 1
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