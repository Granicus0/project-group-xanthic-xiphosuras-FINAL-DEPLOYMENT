import { useNavigate } from "react-router-dom";
import './css/BackToHomepageButton.css'

const BackToHomepageButton = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/user')
    }
    return (
        <button className='back-to-homepage-button-component' onClick={handleClick}> Back to homepage </button>
    )
}

export default BackToHomepageButton