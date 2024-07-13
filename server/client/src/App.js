import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/** import all components */
import Profile from "./pages/profile/Profile.js";
import Recovery from "./pages/passwordRecovery/Recovery.js";
import "bootstrap/dist/css/bootstrap.min.css";
import PageNotFound from "./pages/passwordRecovery/PageNotFound";
import ProfileLogin from "./pages/profile/ProfileLogin.js";
import UserName from "./pages/profile/UserName.js";
import ProfileUpdate from "./pages/profile/ProfileUpdate.js";
import AdminSignup from "./pages/feedbackPage/AdminSignup.js";
import ComplaintSignup from "./pages/complaintPage/ComplaintSignup.js";
import AdminLogin from "./pages/feedbackPage/AdminLogin.js";
import FeedbackDisplay from "./components/Feedbacks/FeedbackDisplay.js";
import Analyze from "./components/Feedbacks/Analyze.js";
import Navbar from "./components/Navbar/Navbar.js";
import ResetPassword from "./pages/passwordRecovery/Reset.js";
import GiveFeedback from "./components/Feedbacks/FeedbackForm.js";
import HomePage from "./pages/mainPage/MainPage.js";
import UserDisplay from "./pages/profile/UserDisplay.js";
/** auth middleware */
import { AuthorizeUser, ProtectRoute } from "./middleware/auth";
import { useAuthContext } from "./hooks/useAuthContext.js";
import { useAuthContextC } from "./hooks/useAuthContextC.js";
import ComplaintForm from "./components/Complaints/ComplaintForm.js";
import ComplaintDisplay from "./components/Complaints/ComplaintDisplay.js";

function App() {
  const { user } = useAuthContext();
  const { admin } = useAuthContextC();

  let content;
  let cont;
  let auth;
  let auths;
  let profilelogin;

  if (admin) {
    content = <ComplaintDisplay />;
  } else if (user) {
    content = <FeedbackDisplay />;
  } else {
    content = <Navigate to="/homepage" />;
  }

  if (user) {
    auth = <AdminSignup />;
    profilelogin = <ProfileLogin />;
  }
  if (admin) {
    auths = <ComplaintSignup />;
    profilelogin = <ProfileLogin />;
  }
  if (admin || user) {
    cont = <UserDisplay />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={content} />
            <Route path="/profilelogin" element={profilelogin} />
            <Route
              path="/usernamelogin"
              element={!user ? <UserName /> : <Navigate to="/" />}
            />
            <Route path="/usersdetail" element={cont} />

            {/* Route for the Login page */}
            <Route
              path="/adminlogin"
              element={!user ? <AdminLogin /> : <Navigate to="/" />}
            />
            <Route
              path="/profileupdate"
              element={
                <ProtectRoute>
                  <ProfileUpdate />
                </ProtectRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthorizeUser>
                  <Profile />
                </AuthorizeUser>
              }
            />

            <Route path="/homepage" element={<HomePage />} />
            <Route path="/adminsignup" element={auth} />
            <Route path="/complaintsignup" element={auths} />
            <Route path="/recovery" element={<Recovery />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="/givefeedback" element={<GiveFeedback />} />
            <Route path="/complaintform" element={<ComplaintForm />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
export default App;
