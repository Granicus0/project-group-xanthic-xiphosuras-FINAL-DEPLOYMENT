// Import necessary hooks from React
import { createContext, useReducer, useEffect } from 'react'

// Create a context for authentication data
export const AuthContext = createContext()

// Define a reducer for handling authentication actions
export const authReducer = (state, action) => {
  // Switch statement to handle different actions
  switch (action.type) {
    case 'LOGIN': // Case for user login
      return { user: action.payload } // Set user to payload received with action
    case 'LOGOUT': // Case for user logout
      return { user: null } // Reset user to null
    default:
      return state // Return the current state for any other action
  }
}

// Define a context provider component for authentication
export const AuthContextProvider = ({ children }) => {
  // Initialize the authentication state with a reducer
  const [state, dispatch] = useReducer(authReducer, {user: null})

  // Use an effect to load the user from localStorage on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) // Attempt to parse a user object from localStorage
    if(user) {
      dispatch({type: 'LOGIN', payload: user}) // Dispatch a login action if a user was found in localStorage
    }
  }, []) // Empty dependency array means this effect runs only once on mount

  // Log the current authentication state to the console for debugging
  console.log('AuthContext state: ', state)
  
  // Provide the authentication state and dispatcher to child components
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
