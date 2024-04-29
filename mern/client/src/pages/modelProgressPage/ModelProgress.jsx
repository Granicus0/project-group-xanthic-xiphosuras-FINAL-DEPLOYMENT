import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './ModelProgress.css';

const ModelProgress = () => {
    const [trainingUpdates, setTrainingUpdates] = useState([]);

    useEffect(() => {
        const socket = io('http://localhost:5050');

        socket.on('training_update', (update) => {
            setTrainingUpdates(prevUpdates => [...prevUpdates, update]);
        });

        return () => socket.disconnect();
    }, []);

    return (
        <>
            <div className="model-progress-container">
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
                <div className="right-half">
                    {/* Our graph will go on the right half of the screen */}
                </div>
            </div>
        </>
    );
};

export default ModelProgress;
