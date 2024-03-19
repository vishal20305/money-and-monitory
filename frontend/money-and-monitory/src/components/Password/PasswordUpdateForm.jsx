import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";

const PasswordUpdateForm = ({ setShowPasswordForm }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // Added for success message
  const { clientId } = useAuth();

  const validateField = (name, value) => {
    switch (name) {
      case "newPassword":
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$&*])[A-Za-z\d@$&*]{8,}$/.test(value)
          ? ""
          : "New password is not valid";
      case "confirmPassword":
        return newPassword === value ? "" : "Passwords do not match";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "newPassword" || name === "confirmPassword") {
      setErrors({
        ...errors,
        [name]: validateField(name, value),
      });
    }
    if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleUpdatePassword = async () => {
    // Validate newPassword and confirmPassword
    const newPasswordError = validateField("newPassword", newPassword);
    const confirmPasswordError = validateField(
      "confirmPassword",
      confirmPassword
    );

    if (newPasswordError || confirmPasswordError) {
      console.log(
        "Password update validation failed:",
        newPasswordError,
        confirmPasswordError
      );
      return;
    }

    try {
      // Send a POST request to update the password
      console.log({ newPassword });
      const response = await axios.post(
        "http://localhost:5002/api/customers/updatePassword",
        {
          newPassword: newPassword,
          clientId: clientId,
        }
      );

      if (response.data === "Password updated successfully.") {
        // Show a success message and navigate to the "/layout" page
        setSuccessMessage("Password updated successfully.");

        setTimeout(() => {
          setSuccessMessage(""); // Clear the success message after a few seconds
          setShowPasswordForm(false); // Navigate to the "/layout" page
        }, 1000); // 3000 milliseconds (3 seconds)
      } else {
        console.log("Password update failed");
        // You can add code here to handle a failed update
      }
    } catch (error) {
      console.error("Password update failed:", error);
    }
  };

  return (
    <Card style={{ padding: "20px" }}>
      <Card.Header>
        <h2>Password Update</h2>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group controlId="clientId">
            <Form.Label>Client ID</Form.Label>
            <Form.Control type="text" value={clientId} readOnly />
          </Form.Group>
          <Form.Group controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
            />
            {errors.newPassword && (
              <div className="error">{errors.newPassword}</div>
            )}
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <div className="error">{errors.confirmPassword}</div>
            )}
          </Form.Group>
          <Button
            variant="primary"
            style={{ margin: "10px 0" }}
            onClick={handleUpdatePassword}
          >
            Update Password
          </Button>
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PasswordUpdateForm;
