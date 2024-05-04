import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FileUpload from '../FileUpload';


describe('FileUpload component', () => {

    it('renders without crashing', () => {
        render(<FileUpload />);
    });

    it('displays "Choose File" button', () => {
        const { getByText } = render(<FileUpload />);
        expect(getByText('Choose File'));
    });

    it('selects a file and successfully loads it', async () => {

        var _file
        const onFileUpload = (file) => {
            _file = file
        }
        const { getByLabelText, getByText } = render(<FileUpload onFileUpload={() => onFileUpload}/>);
        

        await waitFor(() => {
            const file = new File(['column1,column2\nvalue1,value2\nvalue3,value4'], 'data.csv', { type: 'text/csv' });
            Object.defineProperty(getByLabelText('Choose File'), 'files', {
                value: [file],
            });

            fireEvent.change(getByLabelText('Choose File'));
            expect(getByText('data.csv'))
        })

    });
  
});