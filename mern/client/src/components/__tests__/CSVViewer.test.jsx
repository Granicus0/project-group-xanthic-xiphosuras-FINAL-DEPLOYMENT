import React from 'react';
import { screen, render, fireEvent, getByTestId, waitFor } from '@testing-library/react';
import CSVViewer from '../CSVViewer';

describe('CSVViewer Component', () => {


  it('renders without crashing', () => {
    const { getByTestId } = render(<CSVViewer />);
    expect(getByTestId("csvviewer-render-test"))
  });


  it('displays dropdown with options when CSV data is provided', async () => {
    const csvFile = new File(['column1,column2\nvalue1,value2\nvalue3,value4'], 'data.csv', { type: 'text/csv' });

    const setSelectedColumn = (column) => {
      console.log(column)
    }
    const { getByTestId, getByRole } = render(<CSVViewer csvFile={csvFile} onColumnSelect={(column) => setSelectedColumn(column)} />);

    expect(getByTestId("csvviewer-render-test"))

    // Wait for CSV file to be parsed (basically a promise in that sense)
    await waitFor(() => {
      expect(getByTestId("csvviewer-dropdown-test"))
      expect(getByTestId("csvviewer-select-test"))
    });


  });

  it('checks if dropdowns contain the appropriate amount of items after being passed in csv data', async () => {
    const csvFile = new File(['column1,column2\nvalue1,value2\nvalue3,value4'], 'data.csv', { type: 'text/csv' });

    const setSelectedColumn = (column) => {
      console.log(column)
    }
    const { getByTestId, getByRole } = render(<CSVViewer csvFile={csvFile} onColumnSelect={(column) => setSelectedColumn(column)} />);

    expect(getByTestId("csvviewer-render-test"))

    // Wait for CSV file to be parsed (basically a promise in that sense)
    await waitFor(() => {
      const selectElement = screen.getByRole('combobox');
      const options = screen.getAllByRole('option');
      expect(options.length).toBe(2);
    });


  });

  it('checks if dropdowns contain the actual csv items passed in', async () => {
    const csvFile = new File(['column1,column2\nvalue1,value2\nvalue3,value4'], 'data.csv', { type: 'text/csv' });
    
    const setSelectedColumn = (column) => {
      console.log(column)
    }
    const { getByTestId, getByRole } = render(<CSVViewer csvFile={csvFile} onColumnSelect={(column) => setSelectedColumn(column)} />);

    expect(getByTestId("csvviewer-render-test"))

    // Wait for CSV file to be parsed (basically a promise in that sense)
    await waitFor(() => {
      const selectElement = screen.getByRole('combobox');
      const options = screen.getAllByRole('option');
      const optionContents = options.map(option => option.textContent);
      expect(optionContents).toEqual(['column1', 'column2']);
    });

  });

});
