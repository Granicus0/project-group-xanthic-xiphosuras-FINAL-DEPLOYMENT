import { useNavigate } from "react-router-dom";
import './css/StartPredictingButton.css' 

// A button to start predicting once a user has chosen a model on their model page.
// ************NOT YET IMPLEMENTED*************
const StartPredictingButton = ({modelInfo}) => {
    modelID = modelInfo._id
    const navigate = useNavigate()
    const handleClick = () => {
        
    }

    return (
        <button className='start-predicting-button-component' onClick={handleClick}>
            Start Predicting!
        </button>
    )
}

export default StartPredictingButton
