import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

// Custom hook to access the AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext)

  // Check if the context is available
  if (!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}