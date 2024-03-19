import React from "react";
import { render, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'; 
import AccountDetails from './AccountDetails';


jest.mock('./AuthContext', () => ({
  useAuth: jest.fn(() => ({ clientId: 123 })), 
}));

const mockAxios = new MockAdapter(axios);

describe('AccountDetails Component', () => {
  it('renders with account data', async () => {
    const responseData = [
      {
        ifsc: 'IFSC123',
        bankName: 'Bank A',
       
      },

    ];

 
    mockAxios.onGet('http://localhost:5002/api/bank_accounts/client/123').reply(200, responseData);

    render(<AccountDetails />);

    await waitFor(() => {
      expect(screen.getByText('Account Details')).toBeInTheDocument();
      expect(screen.getByText('IFSC123')).toBeInTheDocument();
      expect(screen.getByText('Bank A')).toBeInTheDocument();

    });
  });

  it('handles no account data', async () => {
    
    mockAxios.onGet('http://localhost:5002/api/bank_accounts/client/123').reply(200, []);

    render(<AccountDetails />);

 
    await waitFor(() => {
      expect(screen.getByText('No account data available.')).toBeInTheDocument();
    });
  });

  it('handles API error', async () => {
   
    mockAxios.onGet('http://localhost:5002/api/bank_accounts/client/123').reply(500);

    render(<AccountDetails />);


    await waitFor(() => {
      expect(screen.getByText('Error fetching account data:')).toBeInTheDocument();
    });
  });
});
