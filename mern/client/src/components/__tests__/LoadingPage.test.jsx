import React from 'react';
import { render } from '@testing-library/react';
import LoadingPage from '../LoadingPage';

describe('LoadingPage component', () => {
  it('renders without crashing', () => {
    render(<LoadingPage />);
  });

  it('renders loading container with loader', () => {
    const { getByTestId } = render(<LoadingPage />);
    expect(getByTestId('loading-container'))
    expect(getByTestId('loader'))
  });

  it('renders three dots in the loader', () => {
    const { getAllByTestId } = render(<LoadingPage />);
    const dots = getAllByTestId('dot');

    expect(dots.length).toBe(3);
  });
});
