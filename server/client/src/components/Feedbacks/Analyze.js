import React, { useEffect, useRef, useState } from "react";
import { useFeedbackContext } from "../../hooks/useFeedbackContext.js";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { Chart, registerables } from "chart.js/auto";

// Register the necessary Chart.js components
Chart.register(...registerables);

// Analyze component
const Analyze = () => {
  // Get feedbacks and dispatch function from the feedbacks context
  const { feedbacks, dispatch } = useFeedbackContext();
  // Get the user from the authentication context
  const { user } = useAuthContext();
  // State for the selected sector
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  // Reference to the chart canvas element
  const chartRef = useRef(null);
  // Reference to the Chart.js instance
  const chartInstanceRef = useRef(null);
  const [selectedState, setSelectedState] = useState("both");

  // State to store the counts of each label and the total feedbacks
  const [labelCounts, setLabelCounts] = useState({});
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);

  // Fetch feedbacks from the API when the user changes
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/feedbacks", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    // Fetch feedbacks only if the user is available
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  // Update the chart and calculate counts when feedbacks or selectedSector changes
  useEffect(() => {
    if (feedbacks) {
      const labels = ["Not Good", "Average", "Good", "Very Good"];
      let filteredWorkouts = feedbacks;
      if (selectedState !== "both") {
        filteredWorkouts = filteredWorkouts.filter(
          (feedback) => feedback.identity?.toLowerCase() === selectedState
        );
      }
      if (selectedSector) {
        // Filter feedbacks by selected sector
        filteredWorkouts = filteredWorkouts.filter(
          (feedback) => feedback.selectedSector === selectedSector
        );
      }

      if (selectedOffice) {
        // Filter feedbacks by selected office
        filteredWorkouts = filteredWorkouts.filter(
          (feedback) => feedback.selectedOffice === selectedOffice
        );
      }

      const totalFeedbacksCount = filteredWorkouts.length;
      const labelCounts = labels.reduce((acc, label) => {
        acc[label] = filteredWorkouts.filter(
          (feedback) => feedback.stars === label
        ).length;
        return acc;
      }, {});

      const data = labels.map((label) => {
        const count = labelCounts[label] || 0;
        const percentage = (count / totalFeedbacksCount) * 100;
        return percentage.toFixed(2);
      });

      setLabelCounts(labelCounts);
      setTotalFeedbacks(totalFeedbacksCount);

      const colors = [
        "#d40334", // Red
        "#d5e6df", // Light Green
        "#62de8b", // Green
        "#53ad71", // Bright Green
        "#026b25", // Lighter Green
        "#02f713", // Even Greener
      ];
      const ctx = chartRef.current.getContext("2d");

      if (chartInstanceRef.current) {
        // Destroy the previous chart instance
        chartInstanceRef.current.destroy();
      }

      // Create a new Chart.js instance and render a pie chart
      chartInstanceRef.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Percentage",
              data: data,
              backgroundColor: colors,
              borderColor: colors.map((color) => color.replace("0.2", "1")),
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              callback: function (value) {
                return value + "%";
              },
            },
          },
        },
      });
    }
  }, [feedbacks, selectedSector, selectedOffice, selectedState]);

  return (
    <div
      className="home container rounded"
      style={{ backgroundColor: "#ded8d7", marginTop: "10px", width: "100%" }}
    >
      <br />
      <br />
      <div className="row">
        <div className="col-md-12">
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
      <br />
      <br />
      <br />
      <div className="row">
        <div className="col-md-6 " style={{ minHeight: "400px" }}>
          {feedbacks && <canvas ref={chartRef} />}
        </div>
        <div className="col-md-6">
          <h4 className="text-secondary">Choose Sector</h4>
          <div
            className="container rounded"
            style={{ backgroundColor: "#ada9a8" }}
          >
            <div className="pb-4">
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
                  new Set(
                    feedbacks?.map((feedback) => feedback.selectedSector)
                  ) || []
                ).map((sector, index) => (
                  <option key={index} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>
            {selectedSector !== "" && feedbacks && feedbacks.length > 0 && (
              <div className="pb-4">
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
                        ?.filter(
                          (feedback) =>
                            feedback.selectedSector === selectedSector
                        )
                        ?.map((feedback) => feedback.selectedOffice)
                    ) || []
                  ).map((office, index) => (
                    <option key={index} value={office}>
                      {office}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default Analyze;
