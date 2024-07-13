import React, { createContext, useReducer } from "react";

// Create a FeedbacksContext using createContext()
export const FeedbacksContext = createContext();

// Define workoutsReducer function to handle state updates
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_FEEDBACKS":
      // Update workouts array with the payload
      return {
        feedbacks: action.payload,
      };
    case "CREATE_FEEDBACK":
      // Add the new workout to the beginning of the workouts array
      return {
        feedbacks: [action.payload, ...state.feedbacks],
      };
    case "DELETE_FEEDBACK":
      // Filter out the workout with the matching ID from the workouts array
      return {
        feedbacks: state.feedbacks.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

// Create WorkoutsContextProvider component
export const FeedbacksContextProvider = ({ children }) => {
  // Use useReducer to manage state with workoutsReducer
  const [state, dispatch] = useReducer(workoutsReducer, {
    feedbacks: [],
  });

  return (
    // Provide the FeedbacksContext value with the current state and dispatch function
    <FeedbacksContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FeedbacksContext.Provider>
  );
};
