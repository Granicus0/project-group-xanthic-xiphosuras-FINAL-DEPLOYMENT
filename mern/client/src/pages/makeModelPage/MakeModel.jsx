import React, { useEffect, useState, useRef } from 'react';
import LogoutButton from '../../components/LogoutButton';
import BackToHomepageButton from '../../components/BackToHomepageButton';
import "./MakeModel.css";
import FileUpload from '../../components/FileUpload';
import StartTrainingButton from '../../components/StartTrainingButton';
import CSVViewer from '../../components/CSVViewer';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// This is a page to *create* an ML model (NOT select a model and use it)
function MakeModel() {
    const [modelName, setModelName] = useState('');
    const [modelType, setModelType] = useState('NN');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [showCSV, setShowCSV] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState('');

    const userDat = localStorage.getItem('user')
    const json = JSON.parse(userDat);
    const userId = json._id;

    // Used by the "FileUpload" component below. Scroll down and read what it does.
    const handleFileUpload = (file) => {
        setUploadedFile(file);
    };
    const canvasRef2 = useRef(null);
    const sizes = {
            width: 450,
            height: 450 * 1 / 2
        }
    
    const tl = gsap.timeline();

    
    //const model_list = [
    //    nngroup,
    //    svmgroup
    //];

    //const [model_list, setModelList] = useState([]);

    

    useEffect(() => {

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff); // Set background color to white

        const nngroup = new THREE.Group();
        const svmgroup = new THREE.Group();
        const rfgroup = new THREE.Group();
        scene.add(nngroup);
        scene.add(svmgroup);
        scene.add(rfgroup);

        const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
        camera.position.set(0, 0, 2.1);
        scene.add(camera);

        const light = new THREE.AmbientLight(0xffffff, 1);
        scene.add(light);
        
        const loader = new GLTFLoader();
        loader.load(
            'src/assets/models/nn.gltf',
            function (gltf) {
              const nnmesh = gltf.scene
              nnmesh.scale.set(0.005, 0.005, 0.005)
              nnmesh.position.set(0, 0, 0)
              nnmesh.rotation.set(0, 0, 0);
              nngroup.add(nnmesh)
            },
        );
        
        loader.load(
            'src/assets/models/svm_model7.gltf',
            function (gltf) {
              const svmmesh = gltf.scene
              svmmesh.scale.set(0.005, 0.005, 0.005)
              svmmesh.position.set(0, 0, 0)
              svmmesh.rotation.set(0, 0, 0);
              gltf.scene.traverse(function (node) {
                if (node.name === "imagetostl_mesh0") {
                  node.material = new THREE.MeshStandardMaterial({ color: 0x606060,side: THREE.DoubleSide});
                }
              });
              svmgroup.add(svmmesh)
            },
        );
        svmgroup.scale.set(0, 0, 0);

        loader.load(
            'src/assets/models/rf_model2.gltf',
            function (gltf) {
              const rfmesh = gltf.scene
              rfmesh.scale.set(0.007, 0.007, 0.007)
              rfmesh.position.set(0, 0, 0)
              rfmesh.rotation.set(Math.PI/2, 0, 0);
              gltf.scene.traverse(function (node) {
                if (node.name === "imagetostl_mesh0") {
                  node.material = new THREE.MeshStandardMaterial({ color: 0x606060,side: THREE.DoubleSide});
                }
              });
              rfgroup.add(rfmesh)
            },
        );
        rfgroup.scale.set(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef2.current
        });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(3);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.render(scene, camera);
    
        window.addEventListener("resize", () => {
            sizes.width = window.innerWidth * 0.8 - 50;
            if(window.innerWidth * 0.8 > 500){
                sizes.width = 500-50;
            }
            sizes.height = sizes.width *1/2;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
        });
    
        const controls = new OrbitControls(camera, canvasRef2.current);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableRotate = true;
        controls.enableZoom = false;
        controls.enablePan = false;
    
        const animate = () => {
            nngroup.rotation.y += 0.01;
            svmgroup.rotation.y += 0.01;
            rfgroup.rotation.y += 0.01;
            controls.update();
            renderer.render(scene, camera);
            window.requestAnimationFrame(animate);
        };
        animate();

        const model_list = [
            nngroup, 
            svmgroup, 
            rfgroup
        ];

        const modelTypes_list = [
            "NN",
            "SVM",
            "RF"
        ];

        const modelTypes_tit_dict = {
            "NN": "Neural Network",
            "SVM": "Support Vector Machine",
            "RF": "Random Forest Tree"
        };

        const modelTypes_des_dict = {
            "NN": "This model perform good on NLP tasks.",
            "SVM": "This model perform good on classification tasks.",
            "RF": "This model perform good on Regression tasks."
        };

        
        var model_index = 0;
        var currentM = model_list[model_index]; 
        var currentM_name = modelTypes_list[model_index];
        var prevM_name = currentM_name;
        var prevM_index = 0;

        document.getElementById('model-type-select').addEventListener('change', function() {
            currentM_name = this.value;
            const currentM_index = modelTypes_list.indexOf(currentM_name) % modelTypes_list.length;
            model_index = currentM_index;
            console.log(currentM_index);

            currentM = model_list[currentM_index];
            const prevM = model_list[prevM_index];
            setObecjtInvisible(prevM);
            setObecjtVisible(currentM, modelTypes_tit_dict[currentM_name], modelTypes_des_dict[currentM_name]);
            setModelType(currentM_name);
            prevM_index = currentM_index;
            prevM_name = currentM_name;
        });

        
        window.addEventListener('wheel', onScroll);

        function onScroll(event) {
            if (!event.target.classList.contains('webgl2')) {
                return; // Exit if the scroll event didn't occur on the desired canvas
            }
            var itemAtIndex = model_list[model_index];
            //event.deltaY = 100 - next, -100 - previous
            if(event.deltaY >0){
                model_index = (model_index+1) % model_list.length;
                
            }
            else if(event.deltaY <0){
                model_index = (model_index-1+model_list.length) % model_list.length;
            }
            setObecjtInvisible(itemAtIndex);
            setObecjtVisible(model_list[model_index], modelTypes_tit_dict[modelTypes_list[model_index]], modelTypes_des_dict[modelTypes_list[model_index]]);
            setModelType(modelTypes_list[model_index]);
            currentM = model_list[model_index];
            currentM_name = modelTypes_list[model_index];
            prevM_index = model_index;
            prevM_name = modelTypes_list[model_index];
        }

        return () => {
            // Clean up Three.js objects and event listeners here
            renderer.dispose();
            scene.remove(nngroup);
            scene.remove(svmgroup);
            scene.remove(rfgroup);
            window.removeEventListener("resize", () => { }); // Remove any resize event listeners
            window.removeEventListener("wheel", () => { });
          };
    }, []);

    function setObecjtInvisible(ml_model){
        tl.to(ml_model.scale,{duration: 0.3, x: 0, y: 0, z: 0});
        // var title = document.getElementsByClassName('nm-model-des-title')[0];
        // title.innerHTML = "";
        var desc = document.getElementsByClassName('ml-model-description')[0];
        desc.innerHTML = "";
    }

    function setObecjtVisible(ml_model, ml_model_tit, ml_model_des){
        tl.to(ml_model.scale, {duration: 0.3, x: 1, y: 1, z: 1});
        // var title = document.getElementsByClassName('nm-model-des-title')[0];
        // title.innerHTML = ml_model_tit;
        var desc = document.getElementsByClassName('ml-model-description')[0];
        desc.innerHTML = ml_model_des;
    }

    tl.play();

    return (
        <div className='scrolllabel-container'>
            <div className='makemodel-page-container'>
                <div className="makemodel-header">
                    <div className="back-button">
                        <BackToHomepageButton></BackToHomepageButton>
                    </div>
                    <h2 className='makemodel-page-header'>Create a New ML Model</h2>
                </div>

            {/* An area for the user to type in what they want to name this model they're about to make */}
            <div className="makemodel-content-area">
                <div className="model-name-input">
                    <label htmlFor="model-name">Model Name:</label>
                    <input
                        type="text"
                        id="model-name"
                        value={modelName}
                        onChange={(e) => setModelName(e.target.value)}
                        placeholder="Enter model name:"
                    />
                </div>

                {/* An area for the user to select the model type. By default it's MLP as per the state hook at the top */}
                
                <h4 className='makemodel-model-type-selection-header'>Select Model Type: (Scroll to change model type)</h4>
                <div className="makemodel-model-type-selection">
                    <select id='model-type-select' value={modelType} onChange={(e) => {setModelType(e.target.value)}}>
                        <option value="NN">NN (Neural Network)</option>
                        <option value="SVM">SVM (Support Vector Machine)</option>
                        <option value="RF">RF (Random Forest Tree)</option>
                    </select>
                    <canvas ref={canvasRef2} className="webgl2"></canvas>
                    <p className='ml-model-description'>This model perform good on NLP tasks.</p>
                    
                </div>
                <br />
                {/* An area for the user upload their dataset. */}
                <div className="makemodel-upload-section">
                    <h4> Upload your dataset: </h4>

                    {/* We pass in handleFileUpload, then this "FileUpload" component will actually give us the file */}
                    <FileUpload onFileUpload={handleFileUpload}></FileUpload>
                    {/* Button to toggle CSV Viewer */}
                    {/* {uploadedFile && (
                        <button className='makemodel-toggle-show-csv-button' onClick={() => setShowCSV(!showCSV)}>
                            {showCSV ? 'Hide CSV Data' : 'Show CSV Data'}
                        </button>
                    )} */}
                </div>

                {/* Conditionally render CSVViewer */}
                {uploadedFile && <CSVViewer
                    csvFile={uploadedFile}
                    onColumnSelect={(column) => setSelectedColumn(column.trim())}
                />}

                    {/* Pass in model information to our StartTrainingButton component. */}
                    <StartTrainingButton modelInfo={{ modelName, modelType, uploadedFile, userId, selectedColumn }}></StartTrainingButton>
                </div>
            </div>
        </div>
    );
}

export default MakeModel;
