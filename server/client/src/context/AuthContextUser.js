import React, { createContext, useReducer, useEffect } from "react";

export const AuthContextUser = createContext();

export const authReducerUser = (state, action) => {
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

export const AuthContextProviderUser = ({ children }) => {
  const [state, dispatch] = useReducer(authReducerUser, {
    admin: null,
  });

  useEffect(() => {
    // Check if admin data is stored in localStorage
    const admin = JSON.parse(localStorage.getItem("admin"));

    // If admin data exists, dispatch LOGIN action to update state
    if (admin) {
      dispatch({ type: "LOGIN", payload: admin });
    }
  }, []);

  console.log("AuthContextUser state:", state);

  return (
    // Provide the AuthContext value with the current state and dispatch function
    <AuthContextUser.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContextUser.Provider>
  );
};
