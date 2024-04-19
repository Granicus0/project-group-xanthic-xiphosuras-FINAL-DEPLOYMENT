import { useLogout } from "../hooks/useLogout";

const LogoutButton = () => {
    const { logout } = useLogout()

    const handleClick = () => {
        logout()
    }
    return (
        <button onClick={handleClick}>Log Out</button>
    )
}