import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export const useModelPredict = () =>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const predictModel = async (_id, uploadedFile) => {
        setIsLoading(true)
        setError(null)

        const formData = new FormData();
        formData.append('_id', _id);
        formData.append('csvFile', uploadedFile);

        try {
            const response = await axios.post('http://localhost:5050/api/models/predictModel', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Important for file uploads
                }
            });
            console.log("Training started: ", response);
        } catch (error) {
            console.error("Error starting training:", error);
        }

    }
    return { predictModel, isLoading, error }


}