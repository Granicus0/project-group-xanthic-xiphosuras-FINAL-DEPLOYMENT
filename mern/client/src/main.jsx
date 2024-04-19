import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import "./index.css";
import gsap from "gsap";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const meshgroup = new THREE.Group();
scene.add(meshgroup);
const lightcube3 = ["mesh_8","mesh_21","mesh_43","mesh_56"];
const circuit = ["mesh_61","mesh_62"];
const platform = "mesh_63";
const lightcube = ["mesh_12","mesh_25","mesh_47","mesh_60"];
const lightcube2 = ["mesh_27","mesh_30","mesh_33"];
const loader = new GLTFLoader();
loader.load(
    'src/assets/models/clip_model4.gltf', // path to 3D model
    function (gltf) {
      const mesh = gltf.scene
      mesh.scale.set(0.5, 0.5, 0.5)
      mesh.position.set(0, 0, 0)
      mesh.rotation.set(0,0,0);
      gltf.scene.traverse(function (node) {
        if (node.isMesh) {
            node.castShadow = true;  // Enable casting shadows
            node.receiveShadow = true;  // Optionally enable receiving shadows
            // console.log(node.name);
            if(lightcube3.includes(node.name)){
              node.material = new THREE.MeshStandardMaterial({color: 0x0080ff,emissive: 0x0080ff,emissiveIntensity: 0.5});
            }
            else if(lightcube2.includes(node.name)){
              node.material = new THREE.MeshStandardMaterial({color: 0x0080ff,emissive: 0x0080ff,emissiveIntensity: 0.5});
            }
            else if(lightcube.includes(node.name)){
              node.material = new THREE.MeshStandardMaterial({color: 0xff9500,emissive: 0xff9500,emissiveIntensity: 0.5});
            }
            else if(circuit.includes(node.name)){
              node.material = new THREE.MeshStandardMaterial({color: 0xfbff00,emissive: 0xfbff00,emissiveIntensity: 0.5});
            }
            else if(platform.includes(node.name)){
              node.material = new THREE.MeshStandardMaterial({color: 0xffffff,roughness:0,metalness:0});
            }
            else{
              node.material = new THREE.MeshStandardMaterial({color: 0xffffff,roughness:0,metalness:0});
            }
        }
      });
      meshgroup.add(mesh)
    },
);

//create sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height);
camera.position.set(-0.5,3.3,3.8);
camera.rotation.set(-0.8,-0.4,-0.4);
scene.add(camera);

//create lihght
const light = new THREE.DirectionalLight(0xffffff,3);
light.position.set(15,15,15);
light.castShadow = true;
light.shadow.mapSize.width = 2048; // default
light.shadow.mapSize.height = 2048; // default
light.shadow.camera.near = 0.8; // default
light.shadow.camera.far = 1000;
light.shadow.camera.left = -5;
light.shadow.camera.right = 5;
light.shadow.camera.top = 5;
light.shadow.camera.bottom = -5;
scene.add(light);

const spotLight = new THREE.SpotLight( 0xffffff ,4);
spotLight.position.set( 0, 5, 5 );
spotLight.opacity = 0.0;
spotLight.angle = Math.PI / 5;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 2048; // default
spotLight.shadow.mapSize.height = 2048; // default
spotLight.shadow.camera.near = 0.8; // default
spotLight.shadow.camera.far = 1000;
spotLight.shadow.camera.left = -5;
spotLight.shadow.camera.right = 5;
spotLight.shadow.camera.top = 5;
spotLight.shadow.camera.bottom = -5;
scene.add(spotLight);

const light2 = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light2);

//create renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(sizes.width,sizes.height);
renderer.setPixelRatio(3);
renderer.shadowMap.enabled = true; // Enable shadow mapping
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.render(scene, camera);


//create resize event
window.addEventListener("resize", () => {
  //update new sizes to const sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //update new sizes to camera
  camera.aspect = sizes.width/sizes.height;
  camera.updateProjectionMatrix();
  //update new sizes to renderer
  renderer.setSize(sizes.width,sizes.height);
});

//create control
const controls = new OrbitControls(camera, canvas);
controls.enableRotate = true;
controls.enableZoom = true;
controls.enablePan = true;

//create animate loop
let shouldRotate = true;
const animate = () => {
  if(shouldRotate){
    meshgroup.rotation.y += 0.001;
  } 
  controls.update();
  // console.log(camera.position,camera.rotation)
  
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};
animate();


//create timeline
const tl = gsap.timeline();
tl.fromTo("nav", { y: "-100%" }, { y: "0%" })
tl.fromTo(meshgroup.position, { x: 0, y: -100, z: 0 }, { x: 0, y: 0, z: 0, duration: 2, ease: "power2.out" }, "-=1.5")
tl.fromTo(".title1", { opacity: 0 }, { opacity: 1 });
tl.fromTo(".title2", { opacity: 0 }, { opacity: 1 });
tl.fromTo(".start_button", { opacity: 0 }, { opacity: 1.5 });

const button = document.getElementsByClassName("start_button")[0];
button.addEventListener("click", function() {
  tl.to(".title1", { opacity: 0 });
  tl.to(".title2", { opacity: 0 });
  tl.to(".start_button", { opacity: 0 });
  tl.to(camera.position, { x: 0, y: 3, z: 0, duration: 2, ease: "power2.out" })
  // shouldRotate = false;
  // meshgroup.rotation.y = 0;
});