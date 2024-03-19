import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BalanceDisplay from './BalanceDisplay';
import { AuthProvider } from './AuthContext';


global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ balance: 5000 }),
    ok: true,
  })
);


jest.mock('./AuthContext', () => ({
  useAuth: jest.fn().mockReturnValue({ clientId: 123 }), 
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('BalanceDisplay Component', () => {
  it('renders the BalanceDisplay component', () => {
    render(
      <AuthProvider>
        <BalanceDisplay />
      </AuthProvider>
    );

    const balanceDisplay = screen.getByText('Check your Balance');
    expect(balanceDisplay).toBeInTheDocument();
  });

  it('displays balance when fetching is successful', async () => {
    render(
      <AuthProvider>
        <BalanceDisplay />
      </AuthProvider>
    );


    const accountTypeSelect = screen.getByLabelText('Account Type:');
    const getBalanceButton = screen.getByText('Get Balance');

    fireEvent.change(accountTypeSelect, { target: { value: 'current' } });
    fireEvent.click(getBalanceButton);


    await waitFor(() => {
      const balanceText = screen.getByText('Balance: Rs.');
      expect(balanceText).toBeInTheDocument();

      const displayedBalance = screen.getByText('5000');
      expect(displayedBalance).toBeInTheDocument();
    });
  });

  it('handles errors when fetching fails', async () => {

    global.fetch.mockImplementationOnce(() => Promise.reject('Network error'));

    render(
      <AuthProvider>
        <BalanceDisplay />
      </AuthProvider>
    );


    const accountTypeSelect = screen.getByLabelText('Account Type:');
    const getBalanceButton = screen.getByText('Get Balance');

    fireEvent.change(accountTypeSelect, { target: { value: 'current' } });
    fireEvent.click(getBalanceButton);


    await waitFor(() => {
      const errorMessage = screen.getByText('Error fetching balance:');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
