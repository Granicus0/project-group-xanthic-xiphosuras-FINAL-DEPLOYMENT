import { useNavigate } from "react-router-dom";
import './css/StartPredictingButton.css';
import { useModelPredict } from "../hooks/useModelPredict";
import EmptyDataAlert from "./EmptyDataalter";
import { useDisclosure } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { useContext } from "react";
import { ModelPredictionContext } from "../context/ModelPredictionContext";

const StartPredictingButton = ({modelInfo}) => {
    const {setPredictUpdates, setHeaders, setRows, 
        setPreResultText, setChartData, setLoading, setError}=useContext(ModelPredictionContext)
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
            const socket_id = uuidv4();
            setPredictUpdates([])
            setHeaders([])
            setRows([])
            setPreResultText("")
            setLoading(true)
            setChartData(null)
            setError(false)
            predictModel(modelInfo._id, modelInfo.uploadedFile,socket_id)
            navigate("/modelPredict", { state: { socket_id : socket_id } })
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
