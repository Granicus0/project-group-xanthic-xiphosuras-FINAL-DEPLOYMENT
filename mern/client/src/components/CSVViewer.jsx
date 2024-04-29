import React from 'react';
import { useEffect, useState } from 'react';
import CSVDataTable from './CSVDataTable';

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
          <div style={{ marginBottom: "10px" }}>
            <b>Select column for training:</b>
            {csvData[0].map((header, index) => (
              <button
                key={index}
                style={{ marginLeft: "10px" }}
                onClick={() => handleColumnSelect(header)}
                disabled={selectedColumn === header}
              >
                {header}
              </button>
            ))}
          </div>
          <CSVDataTable data={csvData} />
        </>
      )}
    </div>
  );
};

export default CSVViewer;
