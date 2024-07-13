import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../components/Complaints/ComplaintDetail.css";
import { format } from "date-fns";

const FetchUsers = ({ users }) => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const admin = localStorage.getItem("admin");
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (admin || user) {
      const adminType = admin ? "ComplaintAdmin" : "FeedbackAdmin";
      setFilteredUsers(users.filter((user) => user.adminType === adminType));
    }
  }, [users, admin, user]);

  const handleClick = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Admin?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Delete successful:", result);

      setFilteredUsers(filteredUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Failed to delete admin:", error);
    }
  };

  const formatDate = (date) => (
    <>
      <div style={{ fontSize: "0.8rem" }}>{format(date, "hh:mm a")}</div>
      <div>{format(date, "dd-MMMM-yyyy")}</div>
    </>
  );

 
  return (
    <div>
     
      <div>
     
        <hr />
        <div className="printable-table">
          <table className="table table-success table-striped-columns table-hover">
            <thead>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Role</th>
                <th>Registration Date</th>
                <th className="trash-column">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.mobile}</td>
                  <td>{user.address}</td>
                  <td>{user.adminType}</td>
                  <td>{formatDate(new Date(user.createdAt))}</td>
                  <td className="trash-column">
                    <button
                      className="btn text-danger"
                      onClick={() => handleClick(user._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default FetchUsers;
