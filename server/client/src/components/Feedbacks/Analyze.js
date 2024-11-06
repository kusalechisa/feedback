import React, { useEffect, useState } from "react";
import { useFeedbackContext } from "../../hooks/useFeedbackContext.js";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import ChartComponent from "./Chart";
import SectorOfficeTable from "./SectorOfficeTable";
import "./Analyze.css";

const Analyze = () => {
  const { feedbacks, dispatch } = useFeedbackContext();
  const { user } = useAuthContext();

  const [selectedSector, setSelectedSector] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [selectedState, setSelectedState] = useState("both");
  const [labelCounts, setLabelCounts] = useState({});
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  const [selectedLabel, setSelectedLabel] = useState("All Ratings");
  const [displayTable, setDisplayTable] = useState("sector");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const response = await fetch("/api/feedbacks", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_FEEDBACKS", payload: json });
      }
    };
    if (user) fetchFeedbacks();
  }, [dispatch, user]);

  const handleLabelClick = (label) => {
    setSelectedLabel(label);
    setSelectedSector("");
    setSelectedOffice("");
  };

  const getSectorCounts = () => {
    const sectorCounts = {};
    feedbacks.forEach((feedback) => {
      if (selectedLabel === "All Ratings" || feedback.stars === selectedLabel) {
        if (!sectorCounts[feedback.selectedSector]) {
          sectorCounts[feedback.selectedSector] = {};
        }
        sectorCounts[feedback.selectedSector][feedback.stars] =
          (sectorCounts[feedback.selectedSector][feedback.stars] || 0) + 1;
      }
    });
    return sectorCounts;
  };

  const getOfficeCounts = () => {
    const officeCounts = {};
    feedbacks
      .filter(
        (feedback) =>
          !selectedSector || feedback.selectedSector === selectedSector
      )
      .forEach((feedback) => {
        if (
          selectedLabel === "All Ratings" ||
          feedback.stars === selectedLabel
        ) {
          if (!officeCounts[feedback.selectedOffice]) {
            officeCounts[feedback.selectedOffice] = {};
          }
          officeCounts[feedback.selectedOffice][feedback.stars] =
            (officeCounts[feedback.selectedOffice][feedback.stars] || 0) + 1;
        }
      });
    return officeCounts;
  };

  return (
    <div
      className="home container rounded"
      style={{ backgroundColor: "#ded8d7", marginTop: "10px", width: "100%" }}
    >
      <div className="row">
        <div className="chart-container">
          <ChartComponent
            feedbacks={feedbacks}
            selectedSector={selectedSector}
            selectedOffice={selectedOffice}
            selectedState={selectedState}
            setLabelCounts={setLabelCounts}
            setTotalFeedbacks={setTotalFeedbacks}
          />
          <div className="ratings-container">
            <h4>Total Ratings: {totalFeedbacks}</h4>
            <ul>
              {Object.entries(labelCounts).map(([label, count]) => (
                <li key={label}>
                  {label}: {count}
                </li>
              ))}
            </ul>
          </div>
        </div>

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
                          (feedback) =>
                            feedback.selectedSector === selectedSector
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
      </div>
      {/* Rating Label Buttons */}
      <div className="rating-buttons">
        {["All Ratings", "Not Good", "Average", "Good", "Very Good"].map(
          (label) => (
            <button
              key={label}
              onClick={() => handleLabelClick(label)}
              className={`button label-btn ${
                selectedLabel === label ? "active" : ""
              }`}
            >
              {label === "All Ratings" ? label : `${label} Star`}
            </button>
          )
        )}
      </div>
      <div className="table-buttons">
        <button
          onClick={() => setDisplayTable("sector")}
          className="button sector-btn"
        >
          Show Sector Table
        </button>
        <button
          onClick={() => setDisplayTable("office")}
          className="button office-btn"
        >
          Show Office Table
        </button>
      </div>

      {displayTable === "sector" && (
        <SectorOfficeTable
          type="sector"
          data={getSectorCounts()}
          selectedLabel={selectedLabel}
        />
      )}
      {displayTable === "office" && (
        <SectorOfficeTable
          type="office"
          data={getOfficeCounts()}
          selectedLabel={selectedLabel}
        />
      )}
    </div>
  );
};

export default Analyze;
