import { useNavigate } from "react-router-dom";
import { useModelTrain } from "../hooks/useModelTrain";
import './css/StartTrainingButton.css'
import EmptyDataAlert from "./EmptyDataalter";
import EmptyColumnalert from "./EmptyColumnalert";
import { useDisclosure } from '@chakra-ui/react'

// This button component takes in model information and sends it to the database to create a new model.
const StartTrainingButton = ({ modelInfo }) => {
    const { isOpen: isOpenDataAlert, onOpen: onDataAlertOpen, onClose: onDataAlertClose } = useDisclosure();
    const { isOpen: isOpenColumnAlert, onOpen: onColumnAlertOpen, onClose: onColumnAlertClose } = useDisclosure();
    const { trainModel, isLoading, error } = useModelTrain(); // This is a *custom* hook used to train the model
    const navigate = useNavigate()
    const handleClick = () => {
        // Again, we are just passing model information to the hook. Keep in mind "uploadedFile" is LITERALLY a file object, please don't treat it like something else
        console.log("User selected: " + modelInfo.selectedColumn)
        if (modelInfo.uploadedFile === null) {
            onDataAlertOpen(); 
            // alert("Please upload a file first!")
        } else if (modelInfo.selectedColumn === "") {
            onColumnAlertOpen();
        } else {
            let socket_id = modelInfo.userId;
            trainModel(modelInfo.modelName, modelInfo.modelType, modelInfo.uploadedFile, modelInfo.userId, modelInfo.selectedColumn, socket_id)
            navigate("/modelProgress", { state: { socket_id: socket_id } })

        }
    }

    return (
        <>
            <button className='start-training-button-component' onClick={handleClick}>
                Start Training!
            </button>
            <EmptyDataAlert Button_info={{ isOpen: isOpenDataAlert, onClose: onDataAlertClose }}/>
            <EmptyColumnalert Button_info={{ isOpen: isOpenColumnAlert, onClose: onColumnAlertClose }}/>
        </>
    )
}

export default StartTrainingButton
