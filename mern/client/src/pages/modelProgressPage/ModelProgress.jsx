import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

// This is the page that will provide real-time updates of our model's training progress.
const ModelProgress = () => {
    const [trainingUpdates, setTrainingUpdates] = useState([]);

    // We are communicating with the server to get live updates via sockets. If you don't know what sockets are you can 
    // visit this link: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
    useEffect(() => {

        // Our socket is going to connect to our backend which is just localhost at the moment.
        const socket = io('http://localhost:5050'); 
        
        // Everytime we get an update from the server we just use the state hook to update our information.
        // If you want to see how this works you can just check out the socket stuff in server.js under the 'server' folder in the mern/ directory.
        // You'll also need to check out mern/server/routes/model.js to see how the endpoints are navigated to, and mern/server/controllers/aiModelController.js
        // to see how the sockets are actually transmitting this data. 
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
