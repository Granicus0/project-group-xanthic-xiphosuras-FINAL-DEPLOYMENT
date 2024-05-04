
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import BackToHomepageButton from '../../components/BackToHomepageButton';
import './ModelPredict.css';


const ModelPredict = () => {
    const [predictUpdates, setPredictUpdates] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);
    const [preResultText, setPreResultText] = useState("");

    useEffect(() => {
        const socket = io('http://localhost:5050');
        socket.on('predict_update', (update) => {
            setPredictUpdates(prevUpdates => [...prevUpdates, update]);
        });
        return () => socket.disconnect();
    }, []);

    useEffect(() => {
        if (predictUpdates.length > 0) {
            const lines = predictUpdates[0].split('\n');
            const resultIndex = lines.findIndex(line => line.includes("Result:"));
            if (resultIndex !== -1) {
                setPreResultText(lines.slice(0, resultIndex).join('\n'));
                setHeaders(lines[resultIndex + 1].split(','));
                setRows(lines.slice(resultIndex + 2).map(line => line.split(',')));
            }
        }
    }, [predictUpdates]);

    if (!headers.length || !rows.length) {
        return <div>Loading data or no data available...</div>;
    }

    return (
        <div className="predict-page-container">
            <BackToHomepageButton></BackToHomepageButton>
            <h3 className="header-text">Predict Result</h3>
            <div className="result-text-container">
                <p>{preResultText}</p>
            </div>

            <div className='model-predict-output-container'>
            <h2 className="header-table">Predict Dataset</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index}>{header}</th> 
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
       
    );
};

export default ModelPredict;

