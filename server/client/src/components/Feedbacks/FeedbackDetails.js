import { useFeedbackContext } from "../../hooks/useFeedbackContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import "./FeedbackDetails.css";

const FeedbackDetails = ({ feedbacks }) => {
  const { dispatch } = useFeedbackContext();
  const { user } = useAuthContext();

  const [selectedSector, setSelectedSector] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [selectedState, setSelectedState] = useState("both");

  const handleClick = async (workoutId) => {
    if (!user) {
      return;
    }

    const response = await fetch(`/api/feedbacks/${workoutId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_FEEDBACK", payload: json });
    }
  };

  const filteredWorkouts = useMemo(() => {
    let filtered = feedbacks;

    if (selectedState !== "both") {
      filtered = filtered.filter(
        (feedback) => feedback.identity?.toLowerCase() === selectedState
      );
    }

    if (selectedSector !== "") {
      filtered = filtered.filter(
        (feedback) => feedback.selectedSector === selectedSector
      );
    }

    if (selectedOffice !== "") {
      filtered = filtered.filter(
        (feedback) => feedback.selectedOffice === selectedOffice
      );
    }

    return filtered;
  }, [feedbacks, selectedSector, selectedOffice, selectedState]);

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (date) => {
    return (
      <>
        <div style={{ fontSize: "0.8rem" }}>{format(date, "hh:mm a")}</div>
        <div>{format(date, "dd-MM-yyyy")}</div>
      </>
    );
  };

  return (
    <>
    <br/>
      <div
        className="rounded col-md-6 px-3 mx-5"
        style={{ backgroundColor: "#ada9a8" }}
      >
        <div>
          <h4 htmlFor="sector">Sector:</h4>
          <select
            id="sector"
            onChange={(e) => {
              setSelectedSector(e.target.value);
              setSelectedOffice(""); // Reset the selected office when changing sector
            }}
            value={selectedSector}
            className={`form-control ${
              selectedSector === "" ? "empty-field" : ""
            } form-select form-select-md`}
          >
            <option value="">All Sectors</option>
            {Array.from(
              new Set(feedbacks?.map((feedback) => feedback.selectedSector)) ||
                []
            ).map((sector, index) => (
              <option key={index} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>
        {selectedSector !== "" && feedbacks && feedbacks.length > 0 && (
          <div>
            <br />
            <h5 htmlFor="office">Office:</h5>
            <select
              id="office"
              onChange={(e) => setSelectedOffice(e.target.value)}
              value={selectedOffice}
              className={`form-control ${
                selectedOffice === "" ? "empty-field" : ""
              } form-select form-select-md`}
            >
              <option value="">All Offices</option>
              {Array.from(
                new Set(
                  feedbacks
                    .filter(
                      (feedback) => feedback.selectedSector === selectedSector
                    )
                    ?.map((feedback) => feedback.selectedOffice) || []
                )
              ).map((office, index) => (
                <option key={index} value={office}>
                  {office}
                </option>
              ))}
            </select>
          </div>
        )}
        <br />
        <br />
      </div>
      <br />
      <br />
      <h3 className="text-success mx-5 px-4">Feedback Table</h3>
      <br />
      <div className="identity-container">
        <h3 htmlFor="state">Customer:</h3>
        <select
          id="state"
          onChange={(e) => setSelectedState(e.target.value)}
          value={selectedState}
          className={`form-control ${
            selectedState === "" ? "empty-field" : ""
          } form-select form-select-md`}
        >
          <option value="both">Both</option>
          <option value="internal">Internal</option>
          <option value="external">External</option>
        </select>
      </div>

      <button className="btn btn-primary p-1" onClick={handlePrint}>
        Print Table
      </button>
      <hr />
      <div className="printable-table">
        <table className="table table-success table-striped-columns mx-auto table-hover">
          <thead>
            <tr>
              <th className="text-center">Sector</th>
              <th className="text-center">Office</th>
              <th className="text-center">Desk</th>
              <th className="text-center">Rating</th>
              <th className="text-center py-0">
                Customer Info <br /> {selectedState}
              </th>
              <th className="text-center">Issue</th>
              <th className="text-center">Comment</th>

              <th style={{ width: "100px" }}>Date</th>
              <th className="trash-column px-0">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkouts.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center">
                  No feedback is available
                </td>
              </tr>
            ) : (
              filteredWorkouts.map((feedback) => (
                <tr key={feedback._id}>
                  <td>{feedback.selectedSector}</td>
                  <td>{feedback.selectedOffice}</td>
                  <td>{feedback.selectedDesk}</td>
                  <td>{feedback.stars}</td>
                  <td className="text-center">
                    {`${feedback.email}`}
                    <br />
                    {`${feedback.phone}`}
                  </td>
                  <td>{feedback.issue}</td>
                  <td>{feedback.comment}</td>

                  <td>{formatDate(new Date(feedback.createdAt))}</td>
                  <td className="trash-column">
                    <button
                      className="btn text-danger"
                      onClick={() => handleClick(feedback._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <br />
      <br />
    </>
  );
};

export default FeedbackDetails;
