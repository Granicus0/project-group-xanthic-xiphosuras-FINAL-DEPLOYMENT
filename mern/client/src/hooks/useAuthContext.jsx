// Import the AuthContext to access the authentication state
import { AuthContext } from "../context/AuthContext"
// Import useContext from React to enable using a context value within a component or hook
import { useContext } from "react"

// Define a custom hook called `useAuthContext` for accessing the AuthContext
export const useAuthContext = () => {
  // Use the useContext hook to get the current context value from AuthContext
  const context = useContext(AuthContext)

  // Check if the context is not available, which would happen if this hook is used outside of a provider
  if(!context) {
    // If context is not available, throw an error to inform the developer of incorrect usage
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  // Return the context which includes authentication state and dispatch function
  return context
}
