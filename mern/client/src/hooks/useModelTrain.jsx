import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const useModelTrain = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const navigate = useNavigate();

    const trainModel = async (modelName, modelType, uploadedFile) => {

        setIsLoading(true)
        setError(null)

        const formData = new FormData();
        formData.append('csvFile', uploadedFile);
        formData.append('modelName', modelName);
        formData.append('modelType', modelType);

        try {
            const response = await axios.post('http://localhost:5050/api/models/createModel', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Important for file uploads
                }
            });
            console.log("Training started: ", response);
        } catch (error) {
            console.error("Error starting training:", error);
        }

     
    }

    return { trainModel, isLoading, error }
}