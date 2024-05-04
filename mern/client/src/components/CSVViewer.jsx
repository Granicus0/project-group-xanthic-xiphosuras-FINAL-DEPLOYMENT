// Import necessary hooks from React for managing state and side effects
import React, { useEffect, useState } from 'react';
// Import custom CSS for the CSVViewer component
import './css/CSVViewer.css'; 

// Define a functional component `CSVViewer` that accepts `csvFile` and `onColumnSelect` as props
const CSVViewer = ({ csvFile, onColumnSelect }) => {
  // `csvData` state to store the parsed CSV data, initialized as an empty array
  const [csvData, setCsvData] = useState([]);
  // `selectedColumn` state to keep track of the currently selected column from the dropdown
  const [selectedColumn, setSelectedColumn] = useState('');

  // `useEffect` hook to handle side effects, dependent on `csvFile`
  useEffect(() => {
    if (csvFile) {
      // Parse the CSV file if it exists
      parseCSV(csvFile);
      // Log current state of `csvData` to console for debugging
      console.log(csvData)
    }
  }, [csvFile]); // Dependency array includes `csvFile`, re-run effect when `csvFile` changes

  // Function to parse the CSV file
  const parseCSV = (csvFile) => {
    const reader = new FileReader(); // Create a FileReader object to read files

    reader.onload = (e) => {
      // Event handler for when file reading is complete
      const csvText = e.target.result; // Get the content of the file
      const lines = csvText.split("\n"); // Split content into lines
      const headers = lines[0].split(","); // Split the first line into headers
      const parsedData = [headers]; // Store headers as the first element of `parsedData`
      setCsvData(parsedData); // Update `csvData` state with parsed data
    };

    reader.readAsText(csvFile); // Start reading the file as text
  };

  // Handler for when a column is selected from the dropdown
  const handleColumnSelect = (header) => {
    setSelectedColumn(header); // Update `selectedColumn` state
    onColumnSelect(header) // Trigger the `onColumnSelect` prop function with selected header
  };

  // Component rendering logic
  return (
    <div data-testid="csvviewer-render-test">
      {csvData.length > 0 && ( // Conditionally render the dropdown if `csvData` has content
        <>
          <div className="dropdown-container" data-testid="csvviewer-dropdown-test">
            <b>Select What You'd Like to Predict:</b>
            <select
              className="dropdown"
              value={selectedColumn}
              onChange={(e) => handleColumnSelect(e.target.value)}
              data-testid="csvviewer-select-test"
            >
              {csvData[0].map((header, index) => ( // Map through headers to create dropdown options
                <option key={index} value={header}>{header}</option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
};

// Export the CSVViewer component for use in other parts of the application
export default CSVViewer;
