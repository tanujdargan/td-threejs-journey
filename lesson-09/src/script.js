import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

const gui = new GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

//Texture Loading
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

// Scene
const scene = new THREE.Scene()

//Mesh basic material
//const material = new THREE.MeshBasicMaterial({map: doorColorTexture})

//Method 2 for mesh materials - this method just splits up the properties and doesnt use it on instantiation
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.color = new THREE.Color(0xff0000) //when used in conjunction with map, it acts like a tint
// material.wireframe = true
// material.transparent = true //must be used to set opacity
// material.opacity = 0.5
// material.alphaMap = doorAlphaTexture //visible on white, not on black
// material.side = THREE.DoubleSide //for adding a back side to the mesh (more computationally intensive)

//Mesh Normal Material - supports reflection refraction and others using Normal vectors
//const material = new THREE.MeshNormalMaterial()
//material.flatShading = true //for flat shading

//Mesh Matcap Material
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

//Mesh Depth Material
//const material = new THREE.MeshDepthMaterial()

//Mesh Lamber Material - uses external lights to calculate shading
// const material = new THREE.MeshLambertMaterial()
// const light = new THREE.PointLight(0xffffff, 1, 10)
// light.position.set(2, 2, 2)
// scene.add(light)

//Mesh Phong Material - more accurate shading than Lambert but less performant (less weird lighting)
//const material = new THREE.MeshPhongMaterial()
//material.shininess = 100
//material.specular = new THREE.Color(0x1188ff)
//const light = new THREE.DirectionalLight(0xffffff, 1)
//light.position.set(2, 2, 2)
//scene.add(light)

//Environment Maps
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) =>{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping //mapping the environment map to the scene (projections)
    scene.background = environmentMap
    scene.environment = environmentMap
})

//Mesh Toon Material - cartoonish looking material
// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false //mipmaps can be disabled as we are using NearestFilter
// material.gradientMap = gradientTexture


//Mesh Standard Material - more realistic (uses PBR [physically based rendering])
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 1
// material.roughness = 1
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// //Normal maps allow for details and displacement without using displacement map but it has its restrictions
// material.normalMap = doorNormalTexture 
// material.alphaMap = doorAlphaTexture
// material.transparent = true

//Mesh Physical Material - even more realistic that standard material as it gives finer control and more properties
const material = new THREE.MeshPhysicalMaterial()
material.metalness = 1
material.roughness = 1
material.map = doorColorTexture
material.aoMap = doorAmbientOcclusionTexture
material.displacementMap = doorHeightTexture
material.displacementScale = 0.1
material.metalnessMap = doorMetalnessTexture
material.roughnessMap = doorRoughnessTexture
//Normal maps allow for details and displacement without using displacement map but it has its restrictions
material.normalMap = doorNormalTexture 
material.alphaMap = doorAlphaTexture
material.transparent = true

//Clearcoat properties
// material.clearcoat = 1
// material.clearcoatRoughness = 0.1

// gui.add(material, 'clearcoat').min(0).max(1).step(0.01)
// gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.01)

// Sheen - best used for fabrics
// material.sheen = 1
// material.sheenRoughness = 0.1
// material.sheenColor = new THREE.Color(0xff0000)

//Iridescence - best used for oil slicks
material.iridescence = 1
material.iridescenceIOR = 1
material.iridescenceThicknessRange = [ 100, 800 ]

//Transmission - best used for glass
material.transmission = 1
material.ior = 1.5
material.thickness = 0.5

gui.add(material, 'iridescence').min(0).max(1).step(0.01)
gui.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.01) //dont get too far beyond 2.333 to maintain realism
gui.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1)
gui.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1)
gui.add(material, 'metalness').min(0).max(1).step(0.01)
gui.add(material, 'roughness').min(0).max(1).step(0.01)


//Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material)
sphere.position.x = -1.5

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material)

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 16, 128), material)
torus.position.x = 1.5

scene.add(sphere, plane, torus)


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

    // Update objects rotation
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = - 0.15 * elapsedTime
    plane.rotation.x = - 0.15 * elapsedTime
    torus.rotation.x = - 0.15 * elapsedTime

    //sphere.rotation.y = elapsedTime
    //sphere.rotation.x = elapsedTime
    //sphere.position.y = Math.sin(elapsedTime)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()