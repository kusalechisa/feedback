import { useState } from "react";
import { useAuthContextC } from "./useAuthContextC";

export const useLoginC = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatchc } = useAuthContextC();

  const adminlogin = async (username, email, password) => {
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

      // Check if the user is an admin
      const isAdmin = json.isAdmin;

      const userData = {
        ...json,
        isAdmin,
        role: isAdmin ? "admin" : "user", // Adding role to user data
      };
      if (!isAdmin) {
        setError("unknown account");
      }
      if (isAdmin) {
        // Store combined user data in localStorage
        localStorage.setItem("admin", JSON.stringify(userData));
        dispatchc({ type: "LOGIN", payload: userData });
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return { adminlogin, isLoading, error };
};
