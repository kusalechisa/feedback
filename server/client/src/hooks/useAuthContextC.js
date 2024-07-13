import { AuthContextC } from "../context/AuthContextC"
import { useContext } from "react"

// Custom hook to access the AuthContext
export const useAuthContextC = () => {
  const context = useContext(AuthContextC)

  // Check if the context is available
  if (!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}