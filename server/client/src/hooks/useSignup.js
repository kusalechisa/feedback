// import { useState } from 'react'
// import { useAuthContext } from './useAuthContext'

// // Custom hook for handling signup functionality
// export const useSignup = () => {
//   const [error, setError] = useState(null)
//   const [isLoading, setIsLoading] = useState(null)
//   const { dispatch } = useAuthContext()

//   // Function to handle signup
//   const adminsignup = async (username,email, password) => {
//     setIsLoading(true)
//     setError(null)

//     // Send signup request to the server
//     const response = await fetch('/api/admin/adminsignup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({username, email, password })
//     })

    



//     // Parse the response as JSON
//     const json = await response.json()

//     // Check if the response is not okay (an error occurred)
//     if (!response.ok) {
//       setIsLoading(false)
//       setError(json.error)
//     }

//     // If the response is okay
//     if (response.ok) {
//       // Save the user data to local storage
//       localStorage.setItem('admin', JSON.stringify(json))

//         // Update the auth context by dispatching a 'LOGIN' action with the user data
//         dispatch({ type: 'LOGIN', payload: json })
//        setError("Registered Succesfully")
//       // Update the loading state
//       setIsLoading(false)
//     }
//   }


//   const usersignup = async (username, email, password) => {
//     setIsLoading(true)
//     setError(null)

//     // Send signup request to the server
//     const response = await fetch('/api/user/usersignup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({username, email, password })
//     })

//     // Parse the response as JSON
//     const json = await response.json()

//     // Check if the response is not okay (an error occurred)
//     if (!response.ok) {
//       setIsLoading(false)
//       setError(json.error)
//     }

//     // If the response is okay
//     if (response.ok) {
//       // Save the user data to local storage
//       localStorage.setItem('user', JSON.stringify(json))

//       // Update the auth context by dispatching a 'LOGIN' action with the user data
//       dispatch({ type: 'LOGIN', payload: json })

//       // Update the loading state
//       setIsLoading(false)
//     }
//   }






//   // Return the signup function, isLoading state, and error state
//   return { adminsignup,usersignup, isLoading, error }
// }