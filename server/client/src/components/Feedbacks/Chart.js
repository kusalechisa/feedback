import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js/auto";
Chart.register(...registerables);

const ChartComponent = ({
  feedbacks,
  selectedSector,
  selectedOffice,
  selectedState,
  setLabelCounts,
  setTotalFeedbacks,
}) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    // Define rating labels and colors
    const labels = ["Not Good", "Average", "Good", "Very Good"];
    const colors = ["#d40334", "#d5e6df", "#62de8b", "#53ad71"];

    // Filter feedbacks based on selected filters
    let filteredFeedbacks = feedbacks.filter((feedback) => {
      const isMatchingState =
        selectedState === "both" ||
        feedback.identity?.toLowerCase() === selectedState;
      const isMatchingSector =
        !selectedSector || feedback.selectedSector === selectedSector;
      const isMatchingOffice =
        !selectedOffice || feedback.selectedOffice === selectedOffice;
      return isMatchingState && isMatchingSector && isMatchingOffice;
    });

    const totalFeedbacksCount = filteredFeedbacks.length;

    // Calculate label counts
    const labelCounts = labels.reduce((acc, label) => {
      acc[label] = filteredFeedbacks.filter(
        (feedback) => feedback.stars === label
      ).length;
      return acc;
    }, {});
    setLabelCounts(labelCounts);
    setTotalFeedbacks(totalFeedbacksCount);

    // Prepare data for chart (percentages)
    const data = labels.map((label) => {
      const count = labelCounts[label] || 0;
      return ((count / totalFeedbacksCount) * 100).toFixed(2);
    });

    // Create chart if not already created or destroy and recreate when data changes
    const ctx = chartRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Destroy previous chart instance to avoid memory leaks
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: colors,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    // Clean up on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [
    feedbacks,
    selectedSector,
    selectedOffice,
    selectedState,
    setLabelCounts,
    setTotalFeedbacks,
  ]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
