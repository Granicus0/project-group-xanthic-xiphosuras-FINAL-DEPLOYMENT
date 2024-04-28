import { useNavigate } from "react-router-dom";
import { useModelTrain } from "../hooks/useModelTrain";
import './css/StartTrainingButton.css'

// This button component takes in model information and sends it to the database to create a new model.
const StartTrainingButton = ({ modelInfo }) => {
    
    const { trainModel, isLoading, error } = useModelTrain(); // This is a *custom* hook used to train the model
    const navigate = useNavigate()
    const handleClick = () => {
        // Again, we are just passing model information to the hook. Keep in mind "uploadedFile" is LITERALLY a file object, please don't treat it like something else
        trainModel(modelInfo.modelName, modelInfo.modelType, modelInfo.uploadedFile) 
        navigate("/modelProgress")
    }

    return (
        <button className='start-training-button-component' onClick={handleClick}>
            Start Training!
        </button>
    )
}

export default StartTrainingButton
