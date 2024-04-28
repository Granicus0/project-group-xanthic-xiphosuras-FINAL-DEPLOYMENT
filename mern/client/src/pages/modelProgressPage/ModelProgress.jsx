import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

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
        <div>
            <h2>Model Training Progress</h2>
            <ul>
                {trainingUpdates.map((update, index) => (
                    <li key={index}>{update}</li>
                ))}
            </ul>
        </div>
    );
};

export default ModelProgress;
