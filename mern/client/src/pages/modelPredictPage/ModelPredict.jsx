import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import BackToHomepageButton from '../../components/BackToHomepageButton';
import './ModelPredict.css';
import { BarLoader } from 'react-spinners'; 
import { useLocation } from 'react-router-dom';

const ModelPredict = () => {
    const [predictUpdates, setPredictUpdates] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);
    const [preResultText, setPreResultText] = useState("");
    const [loading, setLoading] = useState(true); 
    const baseApiRoute = import.meta.env.VITE_BASE_API_ENDPOINT
    const location = useLocation();
    const socket_id  = location.state?.socket_id ;
    useEffect(() => {
        const socket = io(`${baseApiRoute}`);
        socket.on('predict_update@'+socket_id, (update) => {
            setPredictUpdates(prevUpdates => [...prevUpdates, update]);
        });
        return () => socket.disconnect();
    }, []);

    useEffect(() => {
        if (predictUpdates.length > 0) {
            const lines = predictUpdates[0].split('\n');
            const resultIndex = lines.findIndex(line => line.includes("Result:"));
            if (resultIndex !== -1) {
            const originalHeaders = lines[resultIndex + 1].split(',');
            const originalRows = lines.slice(resultIndex + 2).map(line => line.split(','));

            // Rearrange headers and rows
            const rearrangedHeaders = [...originalHeaders.slice(-1), ...originalHeaders.slice(0, -1)];
            const rearrangedRows = originalRows.map(row => [...row.slice(-1), ...row.slice(0, -1)]);

            setHeaders(rearrangedHeaders);
            setRows(rearrangedRows);
            setPreResultText(lines.slice(0, resultIndex).join('\n'));
            setLoading(false);
            }
        }
    }, [predictUpdates]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-text">Predicting Data...</div> 
                <div className="loading-spinner">
                    <BarLoader loading={loading} /> 
                </div>
            </div>
        );
    }

    if (!headers.length || !rows.length) {
        return <div>Loading data or no data available</div>;
    }
    
    const generateCsvContent = () => {
        let csvContent = "data:text/csv;charset=utf-8,";
        const cleanedHeaders = headers.map(header => header.replace(/[\r\n]+/g, ' '));
        csvContent += cleanedHeaders.join(",") + "\n"; 
        rows.forEach(row => {
            const cleanedRow = row.map(cell => cell.replace(/[\r\n]+/g, ' '));
            csvContent += cleanedRow.join(",") + "\n";
        });
        return csvContent;
    };

    
    const handleDownloadCsv = () => {
        const csvContent = generateCsvContent();
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "predict_data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    return (
        <div className="predict-page-container">
            <div className='predict-header'>
                <BackToHomepageButton></BackToHomepageButton>
                <h3 className="header-text">Predict Result</h3>
            </div>
            <div className="result-text-container">
                <p>{preResultText}</p>
            </div>

            <div className='model-predict-output-container'>
                <div className="table-header">
                    <p className='table-header-text'>Predict Dataset</p>
                    <button onClick={handleDownloadCsv} className="download-button">Download CSV</button>
                </div>
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                {headers.map((header, index) => (
                                    <th key={index} className={index === 0 ? 'highlight-column' : ''}>{header}</th> 
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={index}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} className={cellIndex === 0 ? 'highlight-cell' : ''}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div> 
    );
};

export default ModelPredict;

