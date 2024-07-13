import React, { createContext, useReducer, useEffect } from "react";

export const AuthContextC = createContext();

export const authReducerc = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { admin: action.payload };
    case "LOGOUT":
      return { admin: null };
    case "SIGNUP":
      return { admin: action.payload };
    default:
      return state;
  }
};

export const AuthContextProviderC = ({ children }) => {
  const [state, dispatchc] = useReducer(authReducerc, {
    admin: null,
  });

  useEffect(() => {
    // Check if admin data is stored in localStorage
    const admin = JSON.parse(localStorage.getItem("admin"));

    // If admin data exists, dispatchc LOGIN action to update state
    if (admin) {
      dispatchc({ type: "LOGIN", payload: admin });
    }
  }, []);

  console.log("AuthContextC state:", state);

  return (
    // Provide the AuthContext value with the current state and dispatchc function
    <AuthContextC.Provider value={{ ...state, dispatchc }}>
      {children}
    </AuthContextC.Provider>
  );
};
