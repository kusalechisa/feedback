import { useState, useEffect } from "react";
import FetchUsers from "./FetchUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const UserDisplay = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/user");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const json = await response.json();
      setUsers(json);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };
  const handleScrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="home container" style={{ backgroundColor: "ButtonFace" }}>
      <br />
      <h1 style={{ backgroundColor: "ButtonFace" }}> Adminstrators</h1>
      <br />
      <hr style={{ borderTop: "2px solid #ee55df", margin: "20px 0" }} />
      <div className="row">
        <br />
        <div className="users">
          {Array.isArray(users) && users.length > 0 ? (
            <FetchUsers users={users} />
          ) : (
            <h1>No Users</h1>
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

export default UserDisplay;
