import { useNavigate } from "react-router-dom";
import './css/CreateModelButton.css' 

const CreateNewModelButton = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/makeModel')
    }

    return (
        <button className='create-model-button-component' onClick={handleClick}>
            Create New Model 
        </button>
    )
}

export default CreateNewModelButton
