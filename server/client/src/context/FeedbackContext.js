import React, { createContext, useReducer } from "react";

// Create a FeedbacksContext using createContext()
export const FeedbacksContext = createContext();

// Define feedbacksReducer function to handle state updates
export const feedbacksReducer = (state, action) => {
  switch (action.type) {
    case "SET_FEEDBACKS":
      // Update feedbacks array with the payload
      return {
        feedbacks: action.payload,
      };
    case "CREATE_FEEDBACK":
      // Add the new feedback to the beginning of the feedbacks array
      return {
        feedbacks: [action.payload, ...state.feedbacks],
      };
    case "DELETE_FEEDBACK":
      // Filter out the feedback with the matching ID from the feedbacks array
      return {
        feedbacks: state.feedbacks.filter(
          (feedback) => feedback._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

// Create FeedbacksContextProvider component
export const FeedbacksContextProvider = ({ children }) => {
  // Use useReducer to manage state with feedbacksReducer
  const [state, dispatch] = useReducer(feedbacksReducer, {
    feedbacks: [],
  });

  return (
    // Provide the FeedbacksContext value with the current state and dispatch function
    <FeedbacksContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FeedbacksContext.Provider>
  );
};
