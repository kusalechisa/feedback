import { useAuthContextC } from "./useAuthContextC";
import { useComplaintContext } from "./useComplaintContext";
import { useNavigate } from "react-router-dom";

export const useLogoutAdmin = () => {
  const { dispatchc } = useAuthContextC();
  const { dispatchc: dispatchComplaints } = useComplaintContext();
  const navigate = useNavigate();

  const logoutadmin = () => {
    localStorage.removeItem("admin");
    dispatchc({ type: "LOGOUT" });
      dispatchComplaints({ type: "SET_COMPLAINTS", payload: null });
        navigate("/homepage");
  };
  
  return {logoutadmin};
};
