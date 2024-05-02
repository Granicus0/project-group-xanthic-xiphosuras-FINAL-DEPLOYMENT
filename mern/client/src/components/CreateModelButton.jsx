import { useNavigate } from "react-router-dom";
import './css/CreateModelButton.css' 

// This component is basically just a button to create a new model.
// It will bring the user to the /makeModel path where they can choose a model and upload their training dataset
const CreateNewModelButton = () => {


    const navigate = useNavigate()
    const handleClick = () => {
        // Does nothing but navigate to this path
        navigate('/makeModel')
    }

    return (
        <button className='create-model-button-component black-text' onClick={handleClick}>
            Create New Model 
        </button>
    )
}

export default CreateNewModelButton
