import React from "react";
import "./ConfirmationModal.css"; // Add your styles here

const ConfirmationModal = ({ show, message, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="confirmation-modal">
      <div className="modal-content">
        <h3>{message}</h3>
        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onConfirm}>
            Confirm
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
