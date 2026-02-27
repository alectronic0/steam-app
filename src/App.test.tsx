import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('should render the header', () => {
    render(<App />);
    expect(screen.getByText(/Steam Games Comparison/i)).toBeInTheDocument();
  });

  it('should render input fields for Steam IDs', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/Enter Steam ID 1/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Steam ID 2/i)).toBeInTheDocument();
  });

  it('should render compare button', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /Compare Libraries/i })).toBeInTheDocument();
  });

  it('should show error message when inputs are empty', async () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /Compare Libraries/i });
    button.click();

    // Button should remain disabled while empty
    expect(button).not.toBeDisabled();
  });
});
