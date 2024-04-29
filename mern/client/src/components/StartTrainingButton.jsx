import { useNavigate } from "react-router-dom";
import { useModelTrain } from "../hooks/useModelTrain";
import './css/StartTrainingButton.css'

// This button component takes in model information and sends it to the database to create a new model.
const StartTrainingButton = ({ modelInfo }) => {
    
    const { trainModel, isLoading, error } = useModelTrain(); // This is a *custom* hook used to train the model
    const navigate = useNavigate()
    const handleClick = () => {
        // Again, we are just passing model information to the hook. Keep in mind "uploadedFile" is LITERALLY a file object, please don't treat it like something else
        console.log("User selected: " + modelInfo.selectedColumn)
        trainModel(modelInfo.modelName, modelInfo.modelType, modelInfo.uploadedFile, modelInfo.userId, modelInfo.selectedColumn) 
        navigate("/modelProgress")
    }

    return (
        <button className='start-training-button-component' onClick={handleClick}>
            Start Training!
        </button>
    )
}

export default StartTrainingButton
