import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ModelPredict = () => {
    const [predictUpdates, setPredictUpdates] = useState([]);



    useEffect(() => {
        const socket = io('http://localhost:5050');

        socket.on('predict_update', (update) => {
            setPredictUpdates(prevUpdates => [...prevUpdates, update]);
        });

        return () => socket.disconnect();
    }, []);

    return(
        <>
        <div className="model-predict-output-container">
                    <div className="model-predict-output">
                        <ul className="update-list">
                            {predictUpdates.map((update, index) => (
                                <li key={index}>
                                    <pre>{update}</pre>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                </>
    )





}





export default ModelPredict;
