import { useNavigate } from "react-router-dom";
import './css/LogoutButton.css'

const BacktofileButton = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/user')
    }
    return (
        <button className='logout-button-component' onClick={handleClick}> Back to file </button>
    )
}

export default BacktofileButton