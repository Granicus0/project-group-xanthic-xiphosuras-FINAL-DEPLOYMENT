import { useNavigate } from "react-router-dom"
import { useAuthContext } from "./useAuthContext"

// Logging out the user is just a matter of deleting their token.
export const useLogout = () => {

    const { dispatch } = useAuthContext()

    const logout = () => {
        // delete token
        localStorage.removeItem('user')
        dispatch({ type: 'LOGOUT' })
    }

    return { logout }
}
