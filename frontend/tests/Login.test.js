import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; 
import Login from './Login';
import { AuthProvider } from './AuthContext'; 


jest.mock('axios');

describe('Login Component', () => {

  const fillForm = (values) => {
    for (const field in values) {
      const input = screen.getByLabelText(field);
      fireEvent.change(input, { target: { value: values[field] } });
    }
  };

  it('renders the Login component', () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );
    const loginForm = screen.getByRole('form');
    expect(loginForm).toBeInTheDocument();
  });

  it('validates and submits the form successfully', async () => {

    axios.post.mockResolvedValue({ data: { clientId: '123' } });

    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    const formData = {
      email: 'test@example.com',
      password: 'password',
    };

    fillForm(formData);

    const signInButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(signInButton);

    await waitFor(() => {
      const clientId = screen.getByText('ClientId: 123');
      expect(clientId).toBeInTheDocument();
    });
  });

  it('handles invalid credentials', async () => {

    axios.post.mockRejectedValue(new Error('Invalid credentials'));

    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    const formData = {
      email: 'test@example.com',
      password: 'wrongpassword',
    };

    fillForm(formData);

    const signInButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(signInButton);


    await waitFor(() => {
      const errorText = screen.getByText(/invalid credentials/i);
      expect(errorText).toBeInTheDocument();
    });
  });
});
