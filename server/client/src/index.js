import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FeedbacksContextProvider } from "./context/FeedbackContext";
import { ComplaintsContextProvider } from "./context/ComplaintContext";
import { UsersContextProvider } from "./context/UserContext";
import { AuthContextProvider } from "./context/AuthContext";
import { AuthContextProviderC } from "./context/AuthContextC";
import { AuthContextProviderUser } from "./context/AuthContextUser";
import { LanguageProvider } from "./context/LanguageContext";

// Create a root for ReactDOM to render the app
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app wrapped in context providers
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <AuthContextProvider>
        <AuthContextProviderC>
          <AuthContextProviderUser>
            <UsersContextProvider>
              <ComplaintsContextProvider>
                <FeedbacksContextProvider>
                  <App />
                </FeedbacksContextProvider>
              </ComplaintsContextProvider>
            </UsersContextProvider>
          </AuthContextProviderUser>
        </AuthContextProviderC>
      </AuthContextProvider>
    </LanguageProvider>
  </React.StrictMode>
);
