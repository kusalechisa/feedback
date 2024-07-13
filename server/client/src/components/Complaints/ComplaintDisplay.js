import { useEffect } from "react";
import { useComplaintContext } from "../../hooks/useComplaintContext";
import { useAuthContextC } from "../../hooks/useAuthContextC";
// Components
import ComplaintDetails from "./ComplaintDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

// Home component
const ComplaintDisplay = () => {
  const { complaints, dispatchc } = useComplaintContext();
  const { admin } = useAuthContextC();

  useEffect(() => {
    const fetchComplaints = async () => {
      const response = await fetch("/api/complaints", {
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatchc({ type: "SET_COMPLAINTS", payload: json });
      }
    };

    if (admin) {
      fetchComplaints();
    }
  }, [dispatchc, admin]);
  const handleScrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className=" home container"
      style={{
        display: "flow",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "ButtonFace",
      }}
    >
      <br />
      <h1 style={{ backgroundColor: "ButtonFace" }}>
        {" "}
        Anti-Corruption Dashboard
      </h1>
      <br />
      <hr style={{ borderTop: "2px solid #ee55df", margin: "20px 0" }} />
      <div className="row">
        <br />
        <div className="complaints">
          {Array.isArray(complaints) && complaints.length > 0 ? (
            <ComplaintDetails complaints={complaints} />
          ) : (
            <h1>No Complaint</h1>
          )}
        </div>
        <div
          className="scroll-buttons"
          style={{
            position: "fixed",
            top: "64px",
            right: "5px",
            width: "60px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            className="btn btn-info"
            style={{ margin: "5px" }}
            onClick={handleScrollUp}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <button
            className="btn btn-info"
            style={{ margin: "5px" }}
            onClick={handleScrollDown}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDisplay;
