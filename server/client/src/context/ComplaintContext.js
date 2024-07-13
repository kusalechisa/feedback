import React, { createContext, useReducer } from "react";

// Create a ComplaintContext using createContext()
export const ComplaintsContext = createContext();

// Define workoutsReducer function to handle state updates
export const complaintsReducer = (state, action) => {
  switch (action.type) {
    case "SET_COMPLAINTS":
      // Update workouts array with the payload
      return {
        complaints: action.payload,
      };
    case "CREATE_COMPLAINT":
      // Add the new complaint to the beginning of the complaints array
      return {
        complaints: [action.payload, ...state.complaints],
      };
    case "DELETE_COMPLAINT":
      // Filter out the workout with the matching ID from the workouts array
      return {
        complaints: state.complaints.filter(
          (w) => w._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

// Create WorkoutsContextProvider component
export const ComplaintsContextProvider = ({ children }) => {
  const [state, dispatchc] = useReducer(complaintsReducer, {
    complaints: [], // Initialize as an empty array
  });

  return (
    // Provide the WorkoutsContext value with the current state and dispatchc function
    <ComplaintsContext.Provider value={{ ...state, dispatchc }}>
      {children}
    </ComplaintsContext.Provider>
  );
};
