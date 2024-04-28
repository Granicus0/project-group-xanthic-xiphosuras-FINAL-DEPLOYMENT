import { useNavigate } from "react-router-dom"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {

    const { dispatch } = useAuthContext()
    const navigate = useNavigate()

    const logout = () => {
        // delete token
        localStorage.removeItem('user')
        dispatch({ type: 'LOGOUT' })
    }

    return { logout }
}
