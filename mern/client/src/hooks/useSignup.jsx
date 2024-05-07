import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'

// A custom hook to sign the user up. Please please *please* make a custom hook if you want to target API paths from the front end.
// You can use this, useLogin or useSignup as an example on how to make a custom hook to target an API endpoint from the client side
export const useSignup = () => {
    const [signupError, setSignupError] = useState(null)
    const [isSignupLoading, setIsSignupLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()
    const baseApiRoute = import.meta.env.VITE_BASE_API_ENDPOINT

    const signup = async (name, email, password, confirmSignupPassword) => {

        setIsSignupLoading(true)
        setSignupError(null)

        try {
            if (!name || !email || !password) {  // check if any fields are empty
                setSignupError('All fields are required');
                setIsSignupLoading(false)
                return;
            }
            if (password != confirmSignupPassword) {
                setSignupError('Passwords must match!');
                setIsSignupLoading(false)
                return;
            }

            // This is our actual API request. 
            const response = await fetch(`${baseApiRoute}/api/user/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            })

            const json = await response.json()
            if (!response.ok) {
                setIsSignupLoading(false)
                setSignupError(json.error)
                console.log('signup loading: ' + isSignupLoading)

            } else {
                // THIS is our token. It is nothing more than just a JSON in local storage.
                // If you want to see this token when you log in, go to your developer tools -> application tab (this tab should be in the same area as 'console')
                // -> local storage. The "Key" value for this should be 'user'
                localStorage.setItem('user', JSON.stringify(json))

                // Don't worry about this.
                dispatch({ type: 'LOGIN', payload: json })
                setIsSignupLoading(false)
                console.log('signup loading: ' + isSignupLoading)
                navigate("/user");
            }
        }
        catch (error) {
            setIsSignupLoading(false)
                console.log('signup loading: ' + isSignupLoading)
                setSignupError('Failed to sign up: ' + error.message)
        }
    }

    return { signup, isSignupLoading, signupError }
}