import React, { useEffect, useState } from 'react';
import CSVDataTable from './CSVDataTable';
import './CSVViewer.css'; 

const CSVViewer = ({ csvFile, onColumnSelect }) => {
  const [csvData, setCsvData] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState(null);

  useEffect(() => {
    if (csvFile) {
      parseCSV(csvFile);
    }
  }, [csvFile]);

  const parseCSV = (csvFile) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const csvText = e.target.result;
      const lines = csvText.split("\n");
      const headers = lines[0].split(",");
      const parsedData = [headers];
      setCsvData(parsedData);
    };

    reader.readAsText(csvFile);
  };

  const handleColumnSelect = (header) => {
    setSelectedColumn(header);
    onColumnSelect(header)
  };

  return (
    <div>
      {csvData.length > 0 && (
        <>
          <div className="dropdown-container">
            <b>Select What You'd Like to Predict:</b>
            <select
              className="dropdown"
              value={selectedColumn}
              onChange={(e) => handleColumnSelect(e.target.value)}
            >
              {csvData[0].map((header, index) => (
                <option key={index} value={header}>{header}</option>
              ))}
            </select>
          </div>
          {/* <CSVDataTable data={csvData} /> */}
        </>
      )}
    </div>
  );
};

export default CSVViewer;
