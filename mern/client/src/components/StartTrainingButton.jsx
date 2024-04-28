import { useNavigate } from "react-router-dom";
import { useModelTrain } from "../hooks/useModelTrain";
import './css/StartTrainingButton.css'

// This button component takes in model information and sends it to the database to create a new model.
const StartTrainingButton = ({ modelInfo }) => {
    const { trainModel, isLoading, error } = useModelTrain();
    const navigate = useNavigate()
    const handleClick = () => {
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
