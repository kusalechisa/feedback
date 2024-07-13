import { UsersContext } from "../context/UserContext";
import { useContext } from "react";

// Custom hook to access the WorkoutsContext
export const useUserContext = () => {
  const context = useContext(UsersContext);

  // Check if the context is available
  if (!context) {
    throw Error(
      "useUsersContext must be used inside a UsersContextProvider"
    );
  }

  return context;
};
