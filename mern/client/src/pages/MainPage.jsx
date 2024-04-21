import React, { useEffect, useRef } from 'react';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import './css/MainPage.css'

const MainPage = () => {

    const canvasRef = useRef(null);

    useEffect(() => {
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
            'src/assets/models/clip_model4.gltf',
            function (gltf) {
              const mesh = gltf.scene
              mesh.scale.set(0.5, 0.5, 0.5)
              mesh.position.set(0, 0, 0)
              mesh.rotation.set(0,0,0);
              gltf.scene.traverse(function (node) {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
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
        
        const sizes = {
          width: window.innerWidth,
          height: window.innerHeight
        };
        
        const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height);
        camera.position.set(-0.5,3.3,3.8);
        camera.rotation.set(-0.8,-0.4,-0.4);
        scene.add(camera);
        
        const light = new THREE.DirectionalLight(0xffffff,3);
        light.position.set(15,15,15);
        light.castShadow = true;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        light.shadow.camera.near = 0.8;
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
        spotLight.shadow.mapSize.width = 2048;
        spotLight.shadow.mapSize.height = 2048;
        spotLight.shadow.camera.near = 0.8;
        spotLight.shadow.camera.far = 1000;
        spotLight.shadow.camera.left = -5;
        spotLight.shadow.camera.right = 5;
        spotLight.shadow.camera.top = 5;
        spotLight.shadow.camera.bottom = -5;
        scene.add(spotLight);
        
        const light2 = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(light2);
        
        const renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current
        });
        renderer.setSize(sizes.width,sizes.height);
        renderer.setPixelRatio(3);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.render(scene, camera);
        
        window.addEventListener("resize", () => {
          sizes.width = window.innerWidth;
          sizes.height = window.innerHeight;
          camera.aspect = sizes.width/sizes.height;
          camera.updateProjectionMatrix();
          renderer.setSize(sizes.width,sizes.height);
        });
        
        const controls = new OrbitControls(camera, canvasRef.current);
        controls.enableRotate = false;
        controls.enableZoom = false;
        controls.enablePan = false;
        
        let shouldRotate = true;
        const animate = () => {
          if(shouldRotate){
            meshgroup.rotation.y += 0.001;
          } 
          controls.update();
          renderer.render(scene, camera);
          window.requestAnimationFrame(animate);
        };
        animate();
        
        const tl = gsap.timeline();
        tl.to(".return_button", { y: "-1000%" });
        tl.fromTo("nav", { y: "-1000%" }, { y: "0%" })
        tl.fromTo(meshgroup.position, { x: 0, y: -100, z: 0 }, { x: 0, y: 0, z: 0, duration: 2, ease: "power2.out" }, "-=1.5")
        tl.fromTo(".title1", { opacity: 0 }, { opacity: 1 });
        tl.fromTo(".title2", { opacity: 0 }, { opacity: 1 });
        tl.fromTo(".start_button", { opacity: 0 }, { opacity: 1 });
        
        const return_button = document.getElementsByClassName("return_button")[0];
        return_button.addEventListener("click", function() {
          tl.to(camera.position, { x: -0.5, y: 3.3, z: 3.8, duration: 3, ease: "power2.out"})
          tl.to(".return_button", { y: "-1000%" },"-=1.5")
          tl.to(".toptitle",{y: "0%" },"-=1");
          tl.to(".title1", { opacity: 1 });
          tl.to(".title2", { opacity: 1 });
          tl.to(".start_button", { opacity: 1 });
        });

        const about_button = document.getElementsByClassName("start_button")[0];
        about_button.addEventListener("click", function() {
          tl.to(".title1", { opacity: 0 });
          tl.to(".title2", { opacity: 0 });
          tl.to(".start_button", { opacity: 0 });
          tl.to(".toptitle",{y: "-1000%" })
          tl.to(".return_button", { y: "0%" })
          tl.to(camera.position, { x: 0, y: 3, z: 0.1, duration: 3, ease: "power2.out"},"-=1.5")
        });

        return () => {
            // Clean up Three.js objects and event listeners here
            renderer.dispose();
            window.removeEventListener("resize", () => {}); // Remove any resize event listeners
        };
    }, []);

    return (
        <>
          <nav>
              <a href="/" className="toptitle">ArgusML</a>
              
              <ul>
                  <li>
                      <a>Log in</a>
                  </li>
                  <li>
                    <button className="sign_button">Sign up</button>
                  </li>
              </ul>
          </nav>
          <button className="return_button">← Back to Home Page</button>
          <h1 className="title1">Empower Your Data</h1>
          <h1 className="title2">Train Smarter, Not Harder</h1>
          <button className="start_button">About This Website</button>
          
          <canvas ref={canvasRef} className="webgl"></canvas>
        </>
    )
}

export default MainPage;
