
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import BackToHomepageButton from '../../components/BackToHomepageButton';
import './ModelPredict.css';
import { BarLoader } from 'react-spinners'; // 引入加载动画


const ModelPredict = () => {
    const [predictUpdates, setPredictUpdates] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);
    const [preResultText, setPreResultText] = useState("");
    const [loading, setLoading] = useState(true); // 控制加载动画显示

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
            const originalHeaders = lines[resultIndex + 1].split(',');
            const originalRows = lines.slice(resultIndex + 2).map(line => line.split(','));

            // Rearrange headers and rows
            const rearrangedHeaders = [...originalHeaders.slice(-1), ...originalHeaders.slice(0, -1)];
            const rearrangedRows = originalRows.map(row => [...row.slice(-1), ...row.slice(0, -1)]);

            setHeaders(rearrangedHeaders);
            setRows(rearrangedRows);
            setPreResultText(lines.slice(0, resultIndex).join('\n'));
            setLoading(false); // 数据加载完成，隐藏加载动画
            }
        }
    }, [predictUpdates]);
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-text">Predicting Data...</div> {/* 文字 */}
                <div className="loading-spinner">
                    <BarLoader loading={loading} /> {/* 加载动画 */}
                </div>
            </div>
        );
    }

    if (!headers.length || !rows.length) {
        return <div>Loading data or no data available</div>;
    }

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
                <p className="table-header">Predict Dataset</p>
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

