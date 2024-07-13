import React, { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    case "SIGNUP":
      return { user: action.payload };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,

  });

  useEffect(() => {
    // Check if user data is stored in localStorage
    const user = JSON.parse(localStorage.getItem("user"));
  
    // If user data exists, dispatch LOGIN action to update state
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }

  }, []);

  console.log("AuthContext state:", state);

  return (
    // Provide the AuthContext value with the current state and dispatch function
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
