import { ComplaintsContext } from "../context/ComplaintContext";
import { useContext } from "react";

// Custom hook to access the WorkoutsContext
export const useComplaintContext = () => {
  const context = useContext(ComplaintsContext);

  // Check if the context is available
  if (!context) {
    throw Error(
      "useComplaintsContext must be used inside a ComplaintsContextProvider"
    );
  }

  return context;
};
