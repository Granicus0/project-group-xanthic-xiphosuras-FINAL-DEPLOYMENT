import React, { useEffect, useState,useRef } from 'react';
import io from 'socket.io-client';
import './ModelProgress.css';
import * as d3 from 'd3';
import { LiveLinechart } from '../../components/LiveLinechart';
import BackToHomepageButton from '../../components/BackToHomepageButton';
import { float } from 'three/examples/jsm/nodes/shadernode/shadernode';

const ModelProgress = () => {
    const [trainingUpdates, setTrainingUpdates] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [resultData, setResultData] = useState([]);
    const svgRef = useRef(null);
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const td_width = window.innerWidth * 0.45;

    useEffect(() => {
        const socket = io('http://localhost:5050');

        socket.on('training_update', (update) => {
            setTrainingUpdates(prevUpdates => [...prevUpdates, update]);
            const data = update.split("\n").reduce((acc, line) => {
                if (line.includes("Iteration")) {
                    const iteration = parseInt(line.split(" ")[1]);
                    const loss = parseFloat(line.split("loss = ")[1]);
                    acc.push({ iteration, loss });
                }
                return acc;
            }, []);
            setChartData(data);
            const data2 = update.split("\n").reduce((acc, line) => {
                if (line.includes("accuracy")) {
                    const accuracy = parseFloat(line.split(" ")[5].slice(0, -1));
                    acc.push({ accuracy });
                }
                else if (line.includes("f1")) {
                    const f1 = parseFloat(line.split(" ")[5].slice(0, -1));
                    acc.push({ f1 });
                }
                else if (line.includes("precision")) {
                    const precision = parseFloat(line.split(" ")[5].slice(0, -1));
                    acc.push({ precision });
                }
                else if (line.includes("recall")) {
                    const recall = parseFloat(line.split(" ")[5].slice(0, -1));
                    acc.push({ recall });
                }
                return acc;
            }, []);
            setResultData(data2);
        });
        return () => socket.disconnect();
    }, []);
    return (
        <>
            {/* <div className="model-progress-container">
                <div className="left-half">
                    <h2>Model Training Log</h2>
                    <div className="model-training-output-container">
                        <div className="model-training-output">
                            <ul className="update-list">
                                {trainingUpdates.map((update, index) => (
                                    <li key={index}>
                                        <pre>{update}</pre>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="training-container">
                <BackToHomepageButton />
                <div className="training-info-container">
                    <h2 style={{float: 'left'}}>Model Training Process</h2>
                    <div className="chart-container">
                            {/* Our graph will go on the right half of the screen */}
                            {/* <svg ref={svgRef} width={width} height={height} /> */}
                            <LiveLinechart data={chartData} />
                    </div>
                    
                    <table className='summary-table'>
                        <tr>
                            <td style={{ width: {td_width}, height: "100px", verticalAlign: 'top', textAlign: 'left', paddingRight: '20px' }}>
                                <h4>Training Summary</h4>
                                <div className="summary-container">
                                    {resultData.length > 0 && (
                                        <>
                                            <p>Accuracy: <span style={{ float: 'right' }}>{resultData[0].accuracy}</span></p>
                                            <p>F1: <span style={{ float: 'right' }}>{resultData[3].f1}</span></p>
                                            <p>Precision: <span style={{ float: 'right' }}>{resultData[1].precision}</span></p>
                                            <p>Recall: <span style={{ float: 'right' }}>{resultData[2].recall}</span></p>
                                        </>
                                    )}
                                </div>
                            </td>
                            <td style={{ width: {td_width}, height: "100px", verticalAlign: 'top', textAlign: 'left', paddingLeft: '20px' }}>
                                <h4>Model Training Log</h4>
                                <div className="model-training-output-container">
                                    <ul className="update-list">
                                        {trainingUpdates.map((update, index) => (
                                            <li key={index}>
                                                <pre>{update}</pre>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </table>
                    
                </div>
            </div>
        </>
    );
};

export default ModelProgress;
