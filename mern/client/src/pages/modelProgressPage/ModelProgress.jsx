import React, { useEffect, useState,useRef } from 'react';
import io from 'socket.io-client';
import './ModelProgress.css';
import { LiveLinechart } from '../../components/LiveLinechart';
import BackToHomepageButton from '../../components/BackToHomepageButton';
import { BarLoader } from 'react-spinners'; 
import NavToPredictpageButton from '../../components/NavToPredictpageButton';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { ModelProgressContext } from '../../context/ModelProgressContext';
import ProcessErroralert from '../../components/ProcessErroralert';
import { useDisclosure } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

const ModelProgress = () => {
    const { isOpen: isErrorAlert, onOpen: onErrorOpen, onClose: onErrorClose } = useDisclosure();
    const {trainingUpdates, setTrainingUpdates, chartData, setChartData, resultData
        , setResultData, loading, setLoading, ModelID, setModelID,Error }=useContext(ModelProgressContext)
    const baseApiRoute = import.meta.env.VITE_BASE_API_ENDPOINT
    const location = useLocation();
    const socket_id = location.state?.socket_id;
    const navigate=useNavigate()
    useEffect(()=>{
        if(Error)
            onErrorOpen()
    },[Error])

    useEffect(() => {
        const socket = io(`${baseApiRoute}`);
        socket.on('training_update@'+socket_id, (update) => {
            setTrainingUpdates(prevUpdates => [...prevUpdates, update]);
            const data = update.split("\n").reduce((acc, line) => {
                if (line.includes("Iteration")) {
                    const iteration = parseInt(line.split(" ")[1]);
                    const loss = parseFloat(line.split("loss = ")[1]);
                    console.log(iteration, loss);
                    acc.push({ iteration, loss });
                }
                return acc;
            }, []);
            setChartData(prevData => [...prevData, ...data]);
            // setChartData(data);
            const data2 = update.split("\n").reduce((acc, line) => {
                // console.log(line);
                if (line.includes(":") &&  !line.includes("Evaluate") && !line.includes("id")) {
                    console.log(line);
                    const summary_name = line.split(":")[0];
                    const summary_value = parseFloat(line.split(":")[1]);
                    // console.log(summary_name, summary_value);
                    acc.push({ summary_name, summary_value });
                }
                return acc;
            }, []);
            setResultData(data2);
            const data3 = update.split("\n").reduce((acc, line) => {
                if (line.includes("Modelid")) {
                    console.log("LINE CONTAINTS: " + line)
                    // Extract model_id and ensure it's a string with trimmed spaces
                    const model_id = line.split(":")[1].trim().toString();
                    // console.log('ModelID:', ModelID, 'Type:', typeof ModelID);
                    setModelID(model_id);
                    console.log(typeof model_id);
                    return model_id; // Return the found model_id
                }
                return acc; // Keep the existing accumulator
            }, ""); // Initialize acc as a string to keep the data type consistent

            
            console.log('ModelID:', ModelID, 'Type:', typeof ModelID);
            console.log(data3);


            

            setLoading(false);
        });
        return () => socket.disconnect();
    }, []);

    function onCloseNavigate(){
        navigate("/user")
        onErrorClose()
    }

    if (loading) {
        return (
            <>
                <div className="loading-container">
                    <div className="loading-text">Training Model...</div> 
                    <div className="loading-spinner">
                        <BarLoader loading={loading} /> 
                    </div>
                </div>
                <ProcessErroralert Button_info={{ isOpen: isErrorAlert, onClose: onCloseNavigate }} 
                    process={"training"}></ProcessErroralert>
            </>
            
        );
        
    }

    return (
        <>
            <div className="training-container">
                <div className="top-button-container">
                    <div className="left-button">
                        <BackToHomepageButton />
                    </div>
                    <div className="predict-right-button">
                        {typeof ModelID === 'string' ? <NavToPredictpageButton Model_id = {ModelID} /> : null}
                        {/* <NavToPredictpageButton Model_id = {ModelID} /> */}
                    </div>
                </div>
                <div className="training-info-container">
                    <h2 style={{float: 'left', marginTop: '5px', marginBottom: '10px'}}>Model Training Progress</h2>
                    <div className="chart-container">
                            {/* Our graph will go on the right half of the screen */}
                            {/* <svg ref={svgRef} width={width} height={height} /> */}
                            {chartData.length > 0 ? (
                                <LiveLinechart data={chartData} />
                                ) : (
                                <div className="no-updates-placeholder">
                                    No training updates available for this model.
                                </div>
                            )}
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
            <ProcessErroralert Button_info={{ isOpen: isErrorAlert, onClose: onCloseNavigate }} 
                        process={"training"} ></ProcessErroralert>
        </>
        
    );
};

export default ModelProgress;
