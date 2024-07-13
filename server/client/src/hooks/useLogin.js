import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const userlogin = async (username, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/user/userLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error);
      }

      const isAdmin = json.isAdmin;

      // Combine role and user details into a single object
      const userData = {
        ...json,
        isAdmin,
        role: isAdmin ? "admin" : "user", // Adding role to user data
      };
      if (!isAdmin) {
        // Store combined user data in localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        dispatch({ type: "LOGIN", payload: userData });
      }
      if (isAdmin) {
        setError("unknown account");
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return { userlogin, isLoading, error };
};
