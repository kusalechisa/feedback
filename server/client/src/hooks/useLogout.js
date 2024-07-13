import { useAuthContext } from "./useAuthContext";
import { useFeedbackContext } from "./useFeedbackContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchFeedbacks } = useFeedbackContext();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    dispatchFeedbacks({ type: "SET_FEEDBACKS", payload: null });
    navigate("/homepage");
  };

  const signup = () => {
    const admin = localStorage.getItem("admin");
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/adminsignup");
    } else if (admin) {
      navigate("/complaintsignup");
    }
  };

  const profile = () => {
    const admin = localStorage.getItem("admin");
    const user = localStorage.getItem("user");
    if (user || admin) {
      navigate("/profilelogin");
    } else {
      navigate("/");
    }
  };

  return { logout, signup, profile };
};
