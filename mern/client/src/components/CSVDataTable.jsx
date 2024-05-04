// Import React from the react library
import React from "react";

// Define a functional component `CSVDataTable` that accepts a `data` prop
const CSVDataTable = ({ data }) => {
  // Determine column headers from the first row of the data array; if data is empty, headers will be an empty array
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  // Render the component using a fragment to avoid unnecessary DOM elements
  return (
    <>
      {data.length === 0 ? (
        // Display a message if there is no data
        <p>No data available.</p>
      ) : (
        // Render a styled table if data is available
        <table style={tableStyle}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                // Map each header to a <th> element with unique key and custom style
                <th key={index} style={tableHeaderStyle}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              // Map each row data to a <tr> element
              <tr key={index}>
                {headers.map((header, columnIndex) => (
                  // Create a <td> for each cell using row data, applying custom style
                  <td key={columnIndex} style={tableCellStyle}>
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

// Styles for the entire table
const tableStyle = {
  borderCollapse: "collapse",
  width: "100%",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "40px 90px 55px -20px rgba(155, 184, 243, 0.2)",
};

// Styles specifically for table headers
const tableHeaderStyle = {
  fontSize: "14px",
  fontWeight: 500,
  color: "#ffffff",
  backgroundColor: "#6D95E0",
  borderBottom: "1px solid #ddd",
  padding: "15px",
  textAlign: "left",
};

// Styles for each cell in the table body
const tableCellStyle = {
  fontSize: "14px",
  fontWeight: 500,
  borderBottom: "1px solid #ddd",
  padding: "15px",
  backgroundColor: "#fff",
};

// Export the `CSVDataTable` component for use in other parts of the application
export default CSVDataTable;
