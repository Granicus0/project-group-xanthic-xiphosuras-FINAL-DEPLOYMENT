import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import BackToHomepageButton from '../../components/BackToHomepageButton';
import './ModelPredict.css';
import { BarLoader } from 'react-spinners';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import ProcessErroralert from '../../components/ProcessErroralert';
import { useDisclosure } from '@chakra-ui/react';
import { ModelPredictionContext } from '../../context/ModelPredictionContext';

// Register the components required by Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ModelPredict = () => {
    const { isOpen: isErrorAlert, onOpen: onErrorOpen, onClose: onErrorClose } = useDisclosure();
    const { predictUpdates, setPredictUpdates, headers, setHeaders,rows, setRows, preResultText, setPreResultText
        ,chartData, setChartData,  loading, setLoading, Error}=useContext(ModelPredictionContext)
    const baseApiRoute = import.meta.env.VITE_BASE_API_ENDPOINT;
    const location = useLocation();
    const socket_id = location.state?.socket_id;
    const navigate=useNavigate()

    useEffect(()=>{
        if(Error)
            onErrorOpen()
    },[Error])

    useEffect(() => {
        const socket = io(`${baseApiRoute}`);
        socket.on('predict_update@' + socket_id, (update) => {
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
                let originalRows = lines.slice(resultIndex + 2).map(line => line.split(','));
                originalRows = originalRows.filter(row => row[0].trim() !== '');
                const rearrangedHeaders = [...originalHeaders.slice(-1), ...originalHeaders.slice(0, -1)];
                const rearrangedRows = originalRows.map(row => [...row.slice(-1), ...row.slice(0, -1)]);

                setHeaders(rearrangedHeaders);
                setRows(rearrangedRows);
                setPreResultText(lines.slice(0, resultIndex).join('\n'));
                setLoading(false);
            }
        }
    }, [predictUpdates]);
// Trigger the chart of the first header 
    useEffect(() => {
        if (headers.length > 0 && rows.length > 0) {
            handleHeaderClick(0); 
        }
    }, [headers, rows]);

    const handleHeaderClick = (index) => {
        const columnData = rows.map(row => row[index]);
        const isNumeric = columnData.every(item => !isNaN(parseFloat(item)) && isFinite(item));
    
        if (isNumeric) {
            const data = columnData.map(Number);
            const max = Math.max(...data);
            const min = Math.min(...data);
            const binSize = (max - min) / 10; 
            // Divide data into 10 bins for simplicity
            let histogramData = new Array(10).fill(0);
            let labels = new Array(10).fill(0).map((_, i) => `${(min + binSize * i).toFixed(1)} - ${(min + binSize * (i + 1)).toFixed(1)}`);
    
            data.forEach(value => {
                const binIndex = Math.min(Math.floor((value - min) / binSize), 9);
                histogramData[binIndex]++;
            });
    
            setChartData({
                labels,
                datasets: [{
                    label: `Data Distribution for ${headers[index]}`,
                    data: histogramData,
                    backgroundColor: 'rgba(0, 123, 255, 0.2)', 
                    borderColor: '#007BFF', 
                    borderWidth: 1
                }]
            });
        } else {
            const counts = columnData.reduce((acc, val) => {
                acc[val] = (acc[val] || 0) + 1;
                return acc;
            }, {});
    
            setChartData({
                labels: Object.keys(counts),
                datasets: [{
                    label: `Category Counts for ${headers[index]}`,
                    data: Object.values(counts),
                    backgroundColor: 'rgba(0, 123, 255, 0.2)', 
                    borderColor: '#007BFF',
                    borderWidth: 1
                }]
            });
        }
    };

    if (loading) {
        return (
            <>
                <div className="loading-container">
                    <div className="loading-text">Predicting Data...</div>
                    <div className="loading-spinner">
                        <BarLoader loading={loading} />
                    </div>
                </div>
                <ProcessErroralert Button_info={{ isOpen: isErrorAlert, onClose: onCloseNavigate }} 
                        process={"predicting"}></ProcessErroralert>
            </>

        );
    }

    if (!headers.length || !rows.length) {
        return (
            <>
                <div>No data available</div>
                <ProcessErroralert Button_info={{ isOpen: isErrorAlert, onClose: onCloseNavigate }} 
                        process={"predicting"}></ProcessErroralert>
            </>
        
        )
    }
    function onCloseNavigate(){
        navigate("/user")
        onErrorClose()
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
        <>
            <div className="predict-page-container">
                <div className='predict-header'>
                    <BackToHomepageButton />
                    <h3 className="header-text">Predicted Result</h3>
                </div>
                <div className="result-text-container">
                    <p className='predicted-result-text'>{preResultText}</p>
                </div>
                <div className='model-predict-output-container'>
                    <div className="table-header">
                        <p className='table-header-text'>Predicted Dataset (click headers to change chart)</p>
                        <button onClick={handleDownloadCsv} className="download-button">Download CSV</button>
                    </div>
                    <div className="table-container">
                        <div className="data-table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        {headers.map((header, index) => (
                                            <th key={index} onClick={() => handleHeaderClick(index)} className={index === 0 ? 'highlight-column' : ''}>{header}</th>
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
                        {chartData && (
                            <div className='chart-container'>
                                <Bar data={chartData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ProcessErroralert Button_info={{ isOpen: isErrorAlert, onClose: onCloseNavigate }} 
            process={"predictig"}></ProcessErroralert>
        </>
    );
};

export default ModelPredict;

   