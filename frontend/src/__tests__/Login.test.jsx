import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

test('shows login heading', () => {
  renderWithRouter(<Login />);
  expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
});


