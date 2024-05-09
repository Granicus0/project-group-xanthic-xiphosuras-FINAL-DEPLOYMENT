import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ModelProgressContext } from '../context/ModelProgressContext'

// A custom hook to train the model. Please please *please* make a custom hook if you want to target API paths from the front end.
// You can use this, useLogin or useSignup as an example on how to make a custom hook to target an API endpoint from the client side
export const useModelTrain = () => {
    const {setError}=useContext(ModelProgressContext)
    //const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const baseApiRoute = import.meta.env.VITE_BASE_API_ENDPOINT
    let error

    const trainModel = async (modelName, modelType, uploadedFile, userId, selectedColumn, socketId) => {

        setIsLoading(true)
        //setError(null)
        // Files such as CSV's need to be passed into a special FormData object. This is the only way to upload files to our API paths
        // Do *not* change the data type
        const formData = new FormData();
        formData.append('csvFile', uploadedFile);
        formData.append('modelName', modelName);
        formData.append('modelType', modelType);
        formData.append('userId', userId);
        formData.append('selectedColumn', selectedColumn);
        formData.append('socketId', socketId);

        try {
            const response = await axios.post(`${baseApiRoute}/api/models/createModel`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Important for file uploads
                }
            });
            console.log("Training started: ", response);
        } catch (error) {
            setError(true)
            console.error("Error starting training:", error);
        }
       
     
    }
    
    return { trainModel, isLoading, error }
}