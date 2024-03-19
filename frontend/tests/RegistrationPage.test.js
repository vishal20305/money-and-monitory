import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; 
import RegistrationPage from './RegistrationPage';


jest.mock('axios');

describe('RegistrationPage Component', () => {

  const fillForm = (values) => {
    for (const field in values) {
      const input = screen.getByLabelText(field);
      fireEvent.change(input, { target: { value: values[field] } });
    }
  };

  it('renders the RegistrationPage component', () => {
    render(<RegistrationPage />);
    const registrationForm = screen.getByRole('form');
    expect(registrationForm).toBeInTheDocument();
  });

  it('validates and submits the form successfully', async () => {

    axios.post.mockResolvedValue({ data: 'Registration successful' });

    render(<RegistrationPage />);

    const formData = {
      firstName: 'John',
      lastName: 'Doe',

    };

    fillForm(formData);

    const registerButton = screen.getByRole('button', { name: /register/i });
    fireEvent.click(registerButton);


    await waitFor(() => {
      const dialogTitle = screen.getByText(/registration successful/i);
      expect(dialogTitle).toBeInTheDocument();
    });
  });

  it('handles registration error', async () => {

    axios.post.mockRejectedValue(new Error('Registration error'));

    render(<RegistrationPage />);

    const formData = {
      firstName: 'John',
      lastName: 'Doe',

    };

    fillForm(formData);

    const registerButton = screen.getByRole('button', { name: /register/i });
    fireEvent.click(registerButton);


    await waitFor(() => {
      const dialogTitle = screen.getByText(/registration error/i);
      expect(dialogTitle).toBeInTheDocument();
    });
  });
});
