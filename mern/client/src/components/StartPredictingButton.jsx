import { useNavigate } from "react-router-dom";
import './css/StartPredictingButton.css' 
import { useModelPredict } from "../hooks/useModelPredict";
import EmptyDataAlert from "./EmptyDataalter";
import { useDisclosure } from '@chakra-ui/react'

// A button to start predicting once a user has chosen a model on their model page.
// ************NOT YET IMPLEMENTED*************
const StartPredictingButton = ({modelInfo}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { predictModel, isLoading, error } = useModelPredict();
    const navigate = useNavigate()
    const handleClick = () => {
        // Again, we are just passing model information to the hook. Keep in mind "uploadedFile" is LITERALLY a file object, please don't treat it like something else
        if(modelInfo.uploadedFile === null) {
            onOpen();
            // alert("Please upload a file first!")
        }
        else{
            predictModel(modelInfo._id, modelInfo.uploadedFile)
            navigate("/modelPredict")
        }
    }
    return (
        <>
            <button className='start-predicting-button-component' onClick={handleClick}>
                Start Predicting!
            </button>
            <EmptyDataAlert Button_info={{ isOpen, onClose }}/>
        </>
        
    )
}

export default StartPredictingButton
