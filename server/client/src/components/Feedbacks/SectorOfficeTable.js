import React from "react";
import "./Analyze.css";

const SectorOfficeTable = ({ type, data, selectedLabel }) => (
  <div className={`${type}-table`}>
    <h4>{type === "sector" ? "Sector" : "Office"} Feedback Summary</h4>
    <table>
      <thead>
        <tr>
          <th>{type === "sector" ? "Sector" : "Office"}</th>
          {selectedLabel === "All Ratings" ? (
            <>
              <th>Not Good</th>
              <th>Average</th>
              <th>Good</th>
              <th>Very Good</th>
            </>
          ) : (
            <th>{selectedLabel}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([key, counts]) => (
          <tr key={key}>
            <td>{key}</td>
            {selectedLabel === "All Ratings" ? (
              <>
                <td>{counts["Not Good"] || 0}</td>
                <td>{counts["Average"] || 0}</td>
                <td>{counts["Good"] || 0}</td>
                <td>{counts["Very Good"] || 0}</td>
              </>
            ) : (
              <td>{counts[selectedLabel] || 0}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default SectorOfficeTable;
