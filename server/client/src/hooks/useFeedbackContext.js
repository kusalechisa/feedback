import { FeedbacksContext } from "../context/FeedbackContext";
import { useContext } from "react";

// Custom hook to access the FeedbackContext
export const useFeedbackContext = () => {
  const context = useContext(FeedbacksContext);

  // Check if the context is available
  if (!context) {
    throw Error(
      "useFeedbackContext must be used inside a FeedbacksContextProvider"
    );
  }

  return context;
};
