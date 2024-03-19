import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MiniDrawer from './MiniDrawer';
import { AuthProvider } from './AuthContext'; 

describe('MiniDrawer Component', () => {

  const navigate = jest.fn();

  it('renders the MiniDrawer component', () => {
    render(
      <AuthProvider>
        <MiniDrawer />
      </AuthProvider>
    );

    const miniDrawer = screen.getByRole('main');
    expect(miniDrawer).toBeInTheDocument();
  });

  it('displays the Welcome component by default', () => {
    render(
      <AuthProvider>
        <MiniDrawer />
      </AuthProvider>
    );

    const welcomeComponent = screen.getByText('Welcome');
    expect(welcomeComponent).toBeInTheDocument();
  });

  it('switches to "Check Balance" component when the corresponding button is clicked', async () => {
    render(
      <AuthProvider>
        <MiniDrawer />
      </AuthProvider>
    );

    const checkBalanceButton = screen.getByText('Check Balance');
    fireEvent.click(checkBalanceButton);


    await waitFor(() => {
      const checkBalanceComponent = screen.getByText('Check Balance');
      expect(checkBalanceComponent).toBeInTheDocument();
    });
  });

  it('logs out when the "Logout" button is clicked', () => {
    render(
      <AuthProvider>
        <MiniDrawer />
      </AuthProvider>
    );

    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    expect(navigate).toHaveBeenCalledWith('/');
  });
});
