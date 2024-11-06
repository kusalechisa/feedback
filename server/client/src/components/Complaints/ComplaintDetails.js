import { useState } from "react";
import { useComplaintContext } from "../../hooks/useComplaintContext";
import { useAuthContextC } from "../../hooks/useAuthContextC";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "../DeleteModal/ConfirmationModal"; // Import the modal component
import "./ComplaintDetail.css";

const ComplaintDetails = ({ complaints }) => {
  const { dispatchc } = useComplaintContext();
  const { admin } = useAuthContextC();
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [complaintToDelete, setComplaintToDelete] = useState(null);

  const handleDelete = async (complaintId) => {
    if (!admin) return;

    const response = await fetch(`/api/complaints/${complaintId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatchc({ type: "DELETE_COMPLAINT", payload: json });
    }

    // Hide the confirmation modal after the deletion
    setShowConfirmationModal(false);
  };

  const formatDate = (date) => (
    <>
      <div style={{ fontSize: "0.8rem" }}>{format(date, "hh:mm a")}</div>
      <div>{format(date, "dd-MMM-yyyy")}</div>
    </>
  );

  const handlePrint = () => {
    window.print();
  };

  const handleDeleteClick = (complaintId) => {
    setComplaintToDelete(complaintId);
    setShowConfirmationModal(true);
  };

  return (
    <div>
      <button
        className="btn-primary px-0"
        style={{ width: "150px", marginLeft: "50px", marginTop: "20px" }}
        onClick={() => setShowContactInfo(!showContactInfo)}
      >
        {showContactInfo ? "Hide Contact Info" : "Show Contact Info"}
      </button>
      <button
        className="btn-primary px-0"
        style={{ width: "60px", marginLeft: "20px", marginTop: "20px" }}
        onClick={handlePrint}
      >
        Print
      </button>
      <hr />
      <div className="printable-table">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              {showContactInfo && <th>Phone</th>}
              {showContactInfo && <th>Email</th>}
              <th>Complaint</th>
              <th style={{ width: "130px" }}>Date</th>
              <th className="trash-column">Delete</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint._id}>
                {showContactInfo && <td>{complaint.phone}</td>}
                {showContactInfo && <td>{complaint.email}</td>}
                <td>{complaint.complaint}</td>
                <td>{formatDate(new Date(complaint.createdAt))}</td>
                <td className="trash-column">
                  <button
                    className="btn text-danger"
                    onClick={() => handleDeleteClick(complaint._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showConfirmationModal}
        message="Are you sure you want to delete this?"
        onConfirm={() => handleDelete(complaintToDelete)}
        onCancel={() => setShowConfirmationModal(false)}
      />
    </div>
  );
};

export default ComplaintDetails;
