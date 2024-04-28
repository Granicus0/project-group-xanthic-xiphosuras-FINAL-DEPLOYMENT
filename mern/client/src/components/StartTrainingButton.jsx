import { useNavigate } from "react-router-dom";
import './css/StartTrainingButton.css' 

const StartTrainingButton = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        
    }

    return (
        <button className='start-training-button-component' onClick={handleClick}>
            Start Training!
        </button>
    )
}

export default StartTrainingButton
