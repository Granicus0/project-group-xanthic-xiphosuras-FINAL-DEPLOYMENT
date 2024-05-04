import { useNavigate } from "react-router-dom";
import './css/StartPredictingButton.css'
import { useModelPredict } from "../hooks/useModelPredict";

// A button to start predicting once a user has chosen a model on their model page.
// ************NOT YET IMPLEMENTED*************
const StartPredictingButton = ({ modelInfo }) => {
    const { predictModel, isLoading, error } = useModelPredict();
    const navigate = useNavigate()
    const handleClick = () => {
        predictModel(modelInfo._id, modelInfo.uploadedFile)
        navigate("/modelPredict")
    }

    return (
        <button className='start-predicting-button-component' onClick={handleClick}>
            Start Predicting!
        </button>
    )
}

export default StartPredictingButton
