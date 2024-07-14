import React, { useEffect, useState } from "react";
import { useFeedbackContext } from "../../hooks/useFeedbackContext.js";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
// Components
import FeedbackDetails from "./FeedbackDetails.js";
import Analyze from "./Analyze.js";

const FeedbackDisplay = () => {
  const { feedbacks, dispatch } = useFeedbackContext();
  const { user } = useAuthContext();
  const [displayGraph, setDisplayGraph] = useState("table");

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/feedbacks", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_FEEDBACKS", payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  const handleScrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleButton = () => {
    setDisplayGraph(displayGraph === "graph" ? "table" : "graph");
  };

  return (
    <div
      className="home containers"
      style={{
        backgroundColor: "ButtonFace",
      }}
    >
      <div className="rows">
        <br />
        <div
          className="dashboard-header"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            marginTop: "10px",
          }}
        >
          <h1 style={{ backgroundColor: "ButtonFace" }}>Complaint Dashboard</h1>
          <button
            className={`graph-button ${
              displayGraph === "graph" ? "active" : ""
            }`}
            onClick={handleButton}
            style={{
              backgroundColor: "#fffeee",
              fontSize: "16px",
              borderRadius: "7px",
              fontFamily: "bold",
              cursor: "pointer",
              color: "black",
              transition: "background-color 0.3s ease",
              position: "absolute",
              right: "100px",
            }}
          >
            {displayGraph === "graph" ? "Show Table" : "Show Graph"}
          </button>
        </div>
        <br />
        <hr style={{ borderTop: "3px solid #ee55df", margin: "20px 0" }} />

        {displayGraph === "graph" ? (
          <div className="feedbacks">
            <br />
            <h1>Graph Based Rating</h1>
            <br />
            <Analyze />
            <br />
            <br />
          </div>
        ) : (
          <div>
            <br />
            <div className="container">
              {feedbacks && feedbacks.length > 0 ? (
                <FeedbackDetails feedbacks={feedbacks} />
              ) : (
                <h1>No Comment</h1>
              )}
            </div>
          </div>
        )}
      </div>
      <br />
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
  );
};

export default FeedbackDisplay;
