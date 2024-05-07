import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'


// Please please *please* make a custom hook if you want to target API paths from the front end. You can use this, useModelTrain, or useSignup as an example
export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const baseApiRoute = import.meta.env.VITE_BASE_API_ENDPOINT


    const navigate = useNavigate();

    const login = async (email, password) => {

        setIsLoading(true)
        setError(null)

        // This is our actual API request.
        const response = await fetch(`${baseApiRoute}/api/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // THIS is our token. It is nothing more than just a JSON in local storage.
            // If you want to see this token when you log in, go to your developer tools -> application tab (this tab should be in the same area as 'console')
            // -> local storage. The "Key" value for this should be 'user'
            localStorage.setItem('user', JSON.stringify(json))

            // Don't worry about this.
            dispatch({ type: 'LOGIN', payload: json })
            setIsLoading(false)
            navigate(`/user`);
        }

    }

    return { login, isLoading, error }
}