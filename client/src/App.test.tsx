import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Log in text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Log in/i);
  expect(linkElement).toBeInTheDocument();
});
