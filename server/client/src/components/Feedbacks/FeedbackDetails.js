import { useFeedbackContext } from "../../hooks/useFeedbackContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import "./FeedbackDetails.css";
import ConfirmationModal from "../DeleteModal/ConfirmationModal"

const FeedbackDetails = ({ feedbacks }) => {
  const { dispatch } = useFeedbackContext();
  const { user } = useAuthContext();

  const [selectedSector, setSelectedSector] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [selectedState, setSelectedState] = useState("both");
  const [showCustomerInfo, setShowCustomerInfo] = useState(false);
  const [showDeskColumn, setShowDeskColumn] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);
  const handleDelete = async (feedbackId) => {
    if (!user) return;

    const response = await fetch(`/api/feedbacks/${feedbackId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_FEEDBACK", payload: json });
      // Hide the confirmation modal after the deletion
      setShowConfirmationModal(false);
    }
  };
  const handleDeleteClick = (feedbackId) => {
    setFeedbackToDelete(feedbackId);
    setShowConfirmationModal(true);
  };

  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter((feedback) => {
      const matchesState =
        selectedState === "both" ||
        feedback.identity?.toLowerCase() === selectedState;
      const matchesSector =
        !selectedSector || feedback.selectedSector === selectedSector;
      const matchesOffice =
        !selectedOffice || feedback.selectedOffice === selectedOffice;

      return matchesState && matchesSector && matchesOffice;
    });
  }, [feedbacks, selectedSector, selectedOffice, selectedState]);

  const internalCount = useMemo(
    () =>
      feedbacks.filter(
        (feedback) => feedback.identity?.toLowerCase() === "internal"
      ).length,
    [feedbacks]
  );

  const externalCount = useMemo(
    () =>
      feedbacks.filter(
        (feedback) => feedback.identity?.toLowerCase() === "external"
      ).length,
    [feedbacks]
  );

  const formatDate = (date) => (
    <>
      <div style={{ fontSize: "0.8rem" }}>{format(date, "hh:mm a")}</div>
      <div>{format(date, "dd-MM-yyyy")}</div>
    </>
  );

  return (
    <>
      <br />
      <div className="feedback-summary rounded">
        <h3>Total Feedbacks: {externalCount + internalCount}</h3>
        <p>From Internal: {internalCount}</p>
        <p>From External: {externalCount}</p>
      </div>
      <br />

      <div className="selectors-container rounded">
        <div
          className="selectorclass rounded col-6 px-3 mx-4"
          style={{ backgroundColor: "#ada9a8" }}
        >
          <div>
            <h4 htmlFor="sector">Sector:</h4>
            <select
              id="sector"
              onChange={(e) => {
                setSelectedSector(e.target.value);
                setSelectedOffice("");
              }}
              value={selectedSector}
              className={`form-control ${
                selectedSector === "" ? "empty-field" : ""
              } form-select form-select-md`}
            >
              <option value="">All Sectors</option>
              {Array.from(
                new Set(feedbacks.map((feedback) => feedback.selectedSector))
              ).map((sector, index) => (
                <option key={index} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>
          {selectedSector && feedbacks.length > 0 && (
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
                      .map((feedback) => feedback.selectedOffice)
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
        <div className="identity-container col-5 px-4 mx-5">
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
      </div>
      <br />
      <br />

      <button
        className="btn btn-primary feedback-button"
        onClick={() => window.print()}
      >
        Print
      </button>
      <button
        className="btn btn-info feedback-button"
        onClick={() => setShowCustomerInfo(!showCustomerInfo)}
      >
        {showCustomerInfo ? "Hide Info & Issue" : "Show Info & Issue"}
      </button>
      <button
        className="btn btn-info feedback-button"
        onClick={() => setShowDeskColumn(!showDeskColumn)}
      >
        {showDeskColumn ? "Hide Desk" : "Show Desk"}
      </button>
      <button
        className="btn btn-info feedback-button"
        onClick={() => setShowDeleteButton(!showDeleteButton)}
      >
        {showDeleteButton ? "Hide Delete" : "Show Delete"}
      </button>

      <hr />
      <div className="printable-table">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th className="text-center" style={{ maxWidth: "100px" }}>
                Sector
              </th>
              <th className="text-center">Office</th>
              {showDeskColumn && <th className="text-center">Desk</th>}
              <th className="text-center">Rating</th>
              {showCustomerInfo && (
                <>
                  <th className="text-center">
                    Customer Info <br /> {selectedState}
                  </th>
                  <th className="text-center">Issue</th>
                </>
              )}
              <th className="text-center">Comment</th>
              <th style={{ width: "100px" }}>Date</th>
              {showDeleteButton && (
                <th className="trash-column px-0">Delete</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center">
                  No feedback is available
                </td>
              </tr>
            ) : (
              filteredFeedbacks.map((feedback) => (
                <tr key={feedback._id}>
                  <td>{feedback.selectedSector}</td>
                  <td>{feedback.selectedOffice}</td>
                  {showDeskColumn && <td>{feedback.selectedDesk}</td>}
                  <td>{feedback.stars}</td>
                  {showCustomerInfo && (
                    <>
                      <td className="text-center">
                        {`${feedback.email}`}
                        <br />
                        {`${feedback.phone}`}
                      </td>
                      <td>{feedback.issue}</td>
                    </>
                  )}
                  <td>{feedback.comment}</td>
                  <td>{formatDate(new Date(feedback.createdAt))}</td>
                  {showDeleteButton && (
                    <td className="text-center trash-column px-0">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteClick(feedback._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showConfirmationModal}
        message="Are you sure you want to delete this?"
        onConfirm={() => handleDelete(feedbackToDelete)}
        onCancel={() => setShowConfirmationModal(false)}
      />
    </>
  );
};

export default FeedbackDetails;
