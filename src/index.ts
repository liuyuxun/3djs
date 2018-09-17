import { Scene, PerspectiveCamera, WebGLRenderer,DirectionalLight, CubeGeometry, MeshBasicMaterial, Mesh,AmbientLight } from 'three';
import { GLTFLoader } from 'three/examples/js/loaders/GLTFLoader';
import { DRACOLoader } from "three/examples/js/loaders/DRACOLoader";

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
//var scene:any;
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const geometry = new CubeGeometry(1, 1, 1);
const material = new MeshBasicMaterial({ color: 0x00ffff });
const cube = new Mesh(geometry, material);
const ambientLight = new AmbientLight(0x404040);
scene.add(ambientLight);
const directionalLight  = new DirectionalLight( 0xffffff );
directionalLight.position.set(1,1,1).normalize();
scene.add(directionalLight);
DRACOLoader.setDecoderPath('./');
const load = new GLTFLoader();
load.setDRACOLoader(new DRACOLoader());
camera.position.set(2,2,2);
camera.lookAt(0, 0, 0);
load.load('./m.glb', (gltf) => {
    gltf.scene.scale.set(1,1,1);
    gltf.scene.position.x = 0;
    gltf.scene.position.y = 0;
    gltf.scene.position.z = 0;

    scene.add(gltf.scene); 
    console.log(gltf);
}, (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    console.log(xhr);
}, (err) => { console.log('An error happened'); });

//camera.position.z = 5;
//scene.add(cube);
function render() {
    requestAnimationFrame(render);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    if (scene !== null) {
        renderer.render(scene, camera);
    }
    
    console.log(scene);
}

render();
