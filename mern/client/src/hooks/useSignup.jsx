import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()

    const signup = async (name, email, password) => {
      try{
        if (!name || !email || !password) {  // check if all fields are empty
            setError('All fields are required');
            return;
        }
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:5050/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        })

        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error || 'An error occurred')

        } else{
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({ type: 'LOGIN', payload: json })
            setIsLoading(false)
            navigate(`/user/${encodeURIComponent(json._id)}`)
        }}
        catch (error) {
            setIsLoading(false)
            setError('Failed to sign up: ' + error.message)
        }
    }

    return { signup, isLoading, error }
}