import React, { useEffect, useState,useRef } from 'react';
import io from 'socket.io-client';
import './ModelProgress.css';
import * as d3 from 'd3';
import { LiveLinechart } from '../../components/LiveLinechart';
import BackToHomepageButton from '../../components/BackToHomepageButton';
import { BarLoader } from 'react-spinners'; 
// import NavToPredictpageButton from '../../components/NavToPredictpageButton';
import { set } from 'lodash';

const ModelProgress = () => {
    const [trainingUpdates, setTrainingUpdates] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [resultData, setResultData] = useState([]);
    const [loading, setLoading] = useState(true); 
    // const [ModelID, setModelID] = useState();

    useEffect(() => {
        const socket = io('http://localhost:5050');

        socket.on('training_update', (update) => {
            setTrainingUpdates(prevUpdates => [...prevUpdates, update]);
            console.log(update);
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
                // console.log(line);
                if (line.includes(":") &&  !(line.includes("Evaluate"))) {
                    const summary_name = line.split(":")[0];
                    const summary_value = parseFloat(line.split(":")[1]);
                    acc.push({ summary_name, summary_value });
                }
                return acc;
            }, []);
            setResultData(data2);
            // const data3 = update.split("\n").reduce((acc, line) => {
            //     if (line.includes("Modelid")) {
            //         // Extract model_id and ensure it's a string with trimmed spaces
            //         const model_id = line.split(":")[1].slice(1, -1).trim();
            //         console.log('ModelID:', ModelID, 'Type:', typeof ModelID);
            //         return model_id; // Return the found model_id
            //     }
            //     return acc; // Keep the existing accumulator
            // }, ""); // Initialize acc as a string to keep the data type consistent
            
            // setModelID(data3);
            setLoading(false);
        });
        return () => socket.disconnect();
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-text">Training Model...</div> 
                <div className="loading-spinner">
                    <BarLoader loading={loading} /> 
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="training-container">
                <BackToHomepageButton />
                <div className="predict-right-button">
                    {/* <NavToPredictpageButton Model_id = {ModelID} /> */}
                </div>
                <div className="training-info-container">
                    <h2 style={{float: 'left'}}>Model Training Process</h2>
                    <div className="chart-container">
                            {/* Our graph will go on the right half of the screen */}
                            {/* <svg ref={svgRef} width={width} height={height} /> */}
                            <LiveLinechart data={chartData} />
                    </div>
                    
                    <table className='summary-table'>
                        <tbody>
                            <tr>
                                <td style={{ width: "600px", height: "100px", verticalAlign: 'top', textAlign: 'left', paddingRight: '20px' }}>
                                    <h4>Training Summary</h4>
                                    <div className="summary-container">
                                        {resultData.length > 0 && (
                                            <>
                                                {resultData.map((result, index) => (
                                                    <p key={index}>
                                                        {result.summary_name}: <span style={{ float: 'right' }}>{result.summary_value}</span>
                                                    </p>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                </td>
                                <td style={{ width: "600px", height: "100px", verticalAlign: 'top', textAlign: 'left', paddingLeft: '20px' }}>
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
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ModelProgress;
