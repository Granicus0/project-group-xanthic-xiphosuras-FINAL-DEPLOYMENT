import { useNavigate } from "react-router-dom";
import './css/LogoutButton.css'

const BackToHomepageButton = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/user')
    }
    return (
        <button className='logout-button-component' onClick={handleClick}> Back to homepage </button>
    )
}

export default BackToHomepageButton