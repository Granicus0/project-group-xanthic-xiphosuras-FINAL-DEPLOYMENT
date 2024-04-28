import { useNavigate } from "react-router-dom";
import './css/StartPredictingButton.css' 

const StartPredictingButton = () => {
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
