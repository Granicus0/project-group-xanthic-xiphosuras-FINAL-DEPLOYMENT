import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import './css/LogoutButton.css'

const LogoutButton = () => {
    const { logout } = useLogout()
    const navigate = useNavigate()
    const handleClick = () => {
        logout()
        navigate('/')
    }
    return (
        <button className='logout-button-component' onClick={handleClick}> Logout </button>
    )
}

export default LogoutButton