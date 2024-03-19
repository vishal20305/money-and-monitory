import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import ViewAccount from './ViewAccount';
import { AuthProvider } from './AuthContext';

jest.mock('axios'); 

describe('ViewAccount Component', () => {
  jest.mock('./AuthContext', () => ({
    useAuth: jest.fn().mockReturnValue({ clientId: 123 }), 
  }));

  it('renders the ViewAccount component', () => {
    render(
      <AuthProvider>
        <ViewAccount />
      </AuthProvider>
    );

    const viewAccount = screen.getByText('Account Details');
    expect(viewAccount).toBeInTheDocument();
  });

  it('displays the IFSC Code when data is loaded', async () => {

    axios.get.mockResolvedValue({
      data: [
        {
          accountType: 'current',
          ifsc: 'ABC123',
          openingDate: '2023-10-11',
        },
        {
          accountType: 'savings',
        },
      ],
    });

    render(
      <AuthProvider>
        <ViewAccount />
      </AuthProvider>
    );


    await waitFor(() => {
      const ifscCode = screen.getByText('IFSC Code: ABC123');
      expect(ifscCode).toBeInTheDocument();
    });
  });

  it('displays the account details when data is loaded', async () => {

    axios.get.mockResolvedValue({
      data: [
        {
          accountType: 'current',
          ifsc: 'ABC123',
          openingDate: '2023-10-11',
 
        },
        {
          accountType: 'savings',

        },
      ],
    });

    render(
      <AuthProvider>
        <ViewAccount />
      </AuthProvider>
    );

    await waitFor(() => {
      const currentAccountDetails = screen.getByText('Current Account');
      const savingsAccountDetails = screen.getByText('Savings Account');
      expect(currentAccountDetails).toBeInTheDocument();
      expect(savingsAccountDetails).toBeInTheDocument();
    });
  });

  it('handles errors when data cannot be loaded', async () => {

    axios.get.mockRejectedValue(new Error('Failed to fetch data'));

    render(
      <AuthProvider>
        <ViewAccount />
      </AuthProvider>
    );
    
    await waitFor(() => {
      const errorMessage = screen.getByText('Error fetching user data:');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
