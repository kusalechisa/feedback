import { useAuthContextC } from "./useAuthContextC";
import { useComplaintContext } from "./useComplaintContext";
import { useNavigate } from "react-router-dom";

export const useLogoutAdmin = () => {
  const { dispatch } = useAuthContextC();
  const { dispatch: dispatchComplaints } = useComplaintContext();
  const navigate = useNavigate();

  const logoutadmin = () => {
    localStorage.removeItem("admin");
    dispatch({ type: "LOGOUT" });
      dispatchComplaints({ type: "SET_COMPLAINTS", payload: null });
        navigate("/homepage");
  };
  
  return {logoutadmin};
};
