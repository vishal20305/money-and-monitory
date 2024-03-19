import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "./AuthContext";
import PasswordUpdateForm from "./Password/PasswordUpdateFOrm";
import person from "../assets/person.jpg";

const EditClientDetails = () => {
  const [userData, setUserData] = useState({
    clientId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    fatherName: "",
    motherName: "",
    maritalStatus: "",
    panCard: "",
    aadharNo: "",
    mobileNumber: "",
    emergencyContact: "",
    address: "",
    registrationDateTime: "",
    email: "",
    password: "",
    initialAmount: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [combinedName, setCombinedName] = useState(""); // New state for the combined name
  const { clientId } = useAuth();
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleResetPasswordClick = () => {
    // When the "Reset Password" button is clicked, set the state to true
    setShowPasswordForm(true);
  };

  const validateField = (name, value) => {
    // Define your validation rules here
    const validations = {
      clientId: {
        isValid: true, // Always considered valid
        errorMessage: "",
      },
      registrationDateTime: {
        isValid: true, // Always considered valid
        errorMessage: "",
      },
      firstName: {
        isValid: /^[A-Za-z .]+$/.test(value) && value !== "",
        errorMessage: "First Name must contain only alphabets",
      },
      lastName: {
        isValid: /^[A-Za-z .]+$/.test(value) && value !== "",
        errorMessage: "Last Name must contain only alphabets",
      },
      middleName: {
        isValid: /^[A-Za-z .]*$/.test(value),
        errorMessage: "Middle Name must contain only alphabets.",
      },
      dob: {
        isValid: calculateAge(value) >= 18 && value !== "",
        errorMessage: "Date of Birth cannot be less than 18 years",
      },
      gender: {
        isValid: value !== "",
        errorMessage: "Gender cannot be empty.",
      },
      fatherName: {
        isValid: /^[A-Za-z .]+$/.test(value) && value !== "",
        errorMessage: "Father Name must contain only alphabets",
      },
      motherName: {
        isValid: /^[A-Za-z .]+$/.test(value) && value !== "",
        errorMessage: "Mother Name must contain only alphabets",
      },
      maritalStatus: {
        isValid: value !== "",
        errorMessage: "Marital Status cannot be empty.",
      },
      panCard: {
        isValid:
          /^[A-Za-z0-9]{8}$/.test(value) && value === value.toUpperCase(),
        errorMessage:
          "PAN Card must contain 8 alphanumeric characters in uppercase.",
      },
      aadharNo: {
        isValid: /^\d{12}$/.test(value),
        errorMessage: "Aadhar No must contain 12 numeric digits.",
      },
      mobileNumber: {
        isValid: /^\d{10}$/.test(value),
        errorMessage: "Mobile Number must contain 10 numeric digits.",
      },
      emergencyContact: {
        isValid: /^\d{10}$/.test(value),
        errorMessage: "Emergency Contact must contain 10 numeric digits.",
      },
      address: {
        isValid: /^[A-Za-z0-9, ]*$/.test(value) && value !== "",
        errorMessage:
          "Address must contain only alphabets, digits, and commas.",
      },
      email: {
        isValid: /^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+$/.test(value),
        errorMessage:
          "Email must be a valid email address (e.g., example@example.com).",
      },
      password: {
        isValid: true,
        errorMessage:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one digit, and one special character from @$&*.",
      },
      initialAmount: {
        isValid: /^\d+$/.test(value) && parseInt(value) >= 0,
        errorMessage:
          "Initial Amount cannot be negative and must be an integer value.",
      },
    };
    console.log(validations[name]);
    return validations[name] || {};
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    const fieldValidation = validateField(name, value);
    setErrors({
      ...errors,
      [name]: fieldValidation.isValid ? "" : fieldValidation.errorMessage,
    });
  };

  const validateForm = () => {
    const formErrors = {};
    for (const key in userData) {
      const fieldValidation = validateField(key, userData[key]);
      if (!fieldValidation.isValid) {
        formErrors[key] = fieldValidation.errorMessage;
      }
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  useEffect(() => {
    // Fetch user data from the Spring Boot API
    const baseUrl = "http://localhost:5002"; // Update the URL accordingly
    axios
      .get(`${baseUrl}/api/customers/${clientId}`) // Replace with your API endpoint
      .then((response) => {
        setUserData(response.data);
        calculateCombinedName(response.data); // Calculate the combined name
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    console.log("Editing mode enabled");
  };

  // Function to calculate the combined name
  const calculateCombinedName = (userData) => {
    const { firstName, middleName, lastName } = userData;
    const combined = `${firstName} ${
      middleName ? middleName + " " : ""
    }${lastName}`;
    setCombinedName(combined);
  };

  const handleSaveClick = () => {
    if (validateForm()) {
      // Exclude certain fields from the data that will be sent for updating
      const updatedData = { ...userData };
      delete updatedData.clientId;
      delete updatedData.registrationDateTime;
      delete updatedData.initialAmount;
      delete updatedData.password;

      // Send a PUT request to update the user details
      const baseUrl = "http://localhost:5002"; // Update the URL accordingly

      axios
        .put(`${baseUrl}/api/customers/${clientId}`, updatedData)
        .then(() => {
          setIsEditing(false); // Exit edit mode
          // Optionally, you can display a success message here
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
        });
    } else {
      console.log("Form has validation errors. Please fix them.");
    }
  };

  const renderEditableField = (field) => {
    // Determine the input type based on field data type
    let inputType = "text";
    if (field === "dob" || field === "registration_date_time") {
      inputType = "date";
    } else if (field === "initial_amount") {
      inputType = "number";
    }

    return (
      <>
        <input
          type={inputType}
          name={field}
          className="form-control"
          value={userData[field]}
          onChange={handleInputChange}
        />
        {/* Display validation error message */}
        {errors[field] && <div className="text-danger">{errors[field]}</div>}
      </>
    );
  };

  const renderNonEditableField = (field) => {
    if (field === "dob" || field === "registration_date_time") {
      // Format date fields as needed
      const formattedDate = new Date(userData[field]).toLocaleDateString();
      return formattedDate;
    } else if (field === "initial_amount") {
      // Format number fields as needed
      return parseFloat(userData[field]).toFixed(2);
    } else {
      return userData[field];
    }
  };

  const renderField = (field) => {
    if (field === "gender" && isEditing) {
      return (
        <select
          value={userData[field]}
          name={field}
          className="form-control"
          onChange={(e) => handleInputChange(e)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      );
    } else if (field === "maritalStatus" && isEditing) {
      return (
        <select
          className="form-control"
          value={userData[field]}
          name={field}
          onChange={(e) => handleInputChange(e)}
        >
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Separated">Separated</option>
        </select>
      );
    } else if (
      field === "clientId" ||
      field === "registrationDateTime" ||
      field === "initialAmount" ||
      field === "password"
    ) {
      // These fields should always be in non-editing form
      return (
        <input
          type="text"
          className="form-control"
          value={userData[field]}
          readOnly
        />
      );
    } else {
      return isEditing
        ? renderEditableField(field)
        : renderNonEditableField(field);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="main-body">
          <div className="row">
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={person}
                      alt="Admin"
                      className="rounded-circle bg-primary"
                      width="110"
                    />
                    <div className="mt-3">
                      <h5>{combinedName}</h5>
                      <p className="text-secondary mb-1">{userData.email}</p>
                      <p className="text-muted font-size-sm">
                        {userData.address}
                      </p>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="feather feather-globe me-2 icon-inline"
                        >
                          <line x1="2" y1="12" x2="22" y2="12"></line>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        Active Since
                      </h6>
                      <span className="text-secondary">
                        {userData.registrationDateTime}
                      </span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={handleResetPasswordClick}
                  className="btn btn-primary"
                >
                  Reset password
                </button>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card rounded">
                <div className="card-body">
                  {showPasswordForm === false ? (
                    <>
                      {Object.keys(userData).map((field) => (
                        <div className="row mb-3" key={field}>
                          <div className="col-sm-3">
                            <h5 className="mb-0">
                              {field.charAt(0).toUpperCase() + field.slice(1)}
                            </h5>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {isEditing ? (
                              renderField(field)
                            ) : (
                              <>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={userData[field]}
                                  readOnly
                                />
                                {/* Display validation error message */}
                                {errors[field] && (
                                  <div className="text-danger">
                                    {errors[field]}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Edit and Save buttons */}
                      <div class="row">
                        <div class="col-sm-3"></div>
                        <div class="col-sm-9 text-secondary">
                          {isEditing ? (
                            <button
                              onClick={handleSaveClick}
                              className="btn btn-primary px-4"
                              variant="contained"
                            >
                              Save Changes
                            </button>
                          ) : (
                            <button
                              onClick={handleEditClick}
                              className="btn btn-primary px-4"
                              variant="contained"
                            >
                              Edit Profile
                            </button>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    showPasswordForm && (
                      <PasswordUpdateForm
                        setShowPasswordForm={setShowPasswordForm}
                      />
                    )
                  )}
                </div>
              </div>

              {/* card closed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditClientDetails;
