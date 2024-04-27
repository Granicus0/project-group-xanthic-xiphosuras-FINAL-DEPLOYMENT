import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {

    const { dispatch } = useAuthContext()

    const logout = () => {
        // delete token
        localStorage.removeItem('user')
        dispatch({ type: 'LOGOUT' })
    }

    return { logout }
}
