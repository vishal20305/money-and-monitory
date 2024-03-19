import React, { useState } from "react";
import "./RegistrationPage.css";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import loginBackground from "../assets/Registration.png";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
  const initialFormData = {
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
    email: "",
    password: "",
    initialAmount: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    navigate("/login");
  };

  const validateField = (name, value) => {
    // Define your validation rules here
    const validations = {
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
        isValid: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$&*])[A-Za-z\d@$&*]{8,}$/.test(
          value
        ),
        errorMessage:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one digit, and one special character from @$&*.",
      },
      confirmPassword: {
        isValid: value === formData.password,
        errorMessage: "Passwords do not match.",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const fieldValidation = validateField(name, value);
    setErrors({
      ...errors,
      [name]: fieldValidation.isValid ? "" : fieldValidation.errorMessage,
    });
  };

  const validateForm = () => {
    const formErrors = {};
    for (const key in formData) {
      const fieldValidation = validateField(key, formData[key]);
      if (!fieldValidation.isValid) {
        formErrors[key] = fieldValidation.errorMessage;
      }
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:5002/api/customers/register",
          formData
        );
        console.log("Registration successful:", response.data);

        // Set the submitted data to be displayed below the form
        setSubmittedData(formData);
        setFormData(initialFormData);
        setDialogOpen(true);
      } catch (error) {
        console.error("Registration error:", error);
      }
    } else {
      console.log("Form has validation errors. Please fix them.");
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Grid container component="main" sx={{ minHeight: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={6}
          md={8}
          sx={{
            backgroundImage: `url(${loginBackground})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "100%",
            backgroundPosition: "center",
            minHeight: "100%",
          }}
        />
        <Grid item xs={12} sm={6} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              SignUp
            </Typography>
            <form onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName}
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Middle Name"
                    variant="outlined"
                    fullWidth
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    variant="outlined"
                    fullWidth
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    error={Boolean(errors.address)}
                    helperText={errors.address}
                    multiline
                    rows={2} // Adjust the number of rows as needed
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Marital Status *</InputLabel>
                    <Select
                      label="Marital Status *"
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleChange}
                      error={Boolean(errors.maritalStatus)}
                      required
                    >
                      <MenuItem value="">
                        <em>Select Marital Status</em>
                      </MenuItem>
                      <MenuItem value="Single">Single</MenuItem>
                      <MenuItem value="Married">Married</MenuItem>
                      <MenuItem value="Divorced">Divorced</MenuItem>
                      <MenuItem value="Widowed">Widowed</MenuItem>
                    </Select>
                    {errors.maritalStatus && (
                      <Typography variant="caption" color="error">
                        {errors.maritalStatus}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Date of Birth"
                    fullWidth
                    name="dob"
                    type="date" // Change the input type to "date"
                    InputLabelProps={{ shrink: true }}
                    value={formData.dob}
                    onChange={handleChange}
                    error={Boolean(errors.dob)}
                    helperText={errors.dob}
                    sx={{ marginBottom: "16px" }} // Adjust margin as needed
                    required
                  />
                  <TextField
                    label="Father's Name"
                    variant="outlined"
                    fullWidth
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    error={Boolean(errors.fatherName)}
                    helperText={errors.fatherName}
                    sx={{ marginBottom: "16px" }} // Adjust margin as needed
                    required
                  />
                  <TextField
                    label="Mother's Name"
                    variant="outlined"
                    fullWidth
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    error={Boolean(errors.motherName)}
                    helperText={errors.motherName}
                    sx={{ marginBottom: "16px" }} // Adjust margin as needed
                    required
                  />
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    sx={{ marginBottom: "16px" }} // Adjust margin as needed
                    required
                  />
                  <TextField
                    label="PAN Card"
                    variant="outlined"
                    fullWidth
                    name="panCard"
                    value={formData.panCard}
                    onChange={handleChange}
                    error={Boolean(errors.panCard)}
                    helperText={errors.panCard}
                    sx={{ marginBottom: "16px" }} // Adjust margin as needed
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  {/* <TextField
                    label="Gender"
                    variant="outlined"
                    fullWidth
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    error={Boolean(errors.gender)}
                    helperText={errors.gender}
                    sx={{ marginBottom: '16px' }} // Adjust margin as needed
                    required
                  /> */}
                  <TextField
                    label="Mobile Number"
                    variant="outlined"
                    fullWidth
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    error={Boolean(errors.mobileNumber)}
                    helperText={errors.mobileNumber}
                    sx={{ marginBottom: "16px" }} // Adjust margin as needed
                    required
                  />
                  <TextField
                    label="Emergency Contact"
                    variant="outlined"
                    fullWidth
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    error={Boolean(errors.emergencyContact)}
                    helperText={errors.emergencyContact}
                    sx={{ marginBottom: "16px" }} // Adjust margin as needed
                    required
                  />

                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    sx={{ marginBottom: "16px" }} // Adjust margin as needed
                    required
                  />
                  <TextField
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword}
                    sx={{ marginBottom: "16px" }} // Adjust margin as needed
                    required
                  />

                  <TextField
                    label="Aadhar No"
                    variant="outlined"
                    fullWidth
                    name="aadharNo"
                    value={formData.aadharNo}
                    onChange={handleChange}
                    error={Boolean(errors.aadharNo)}
                    helperText={errors.aadharNo}
                    sx={{ marginBottom: "16px" }} // Adjust margin as needed
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Gender *</InputLabel>
                    <Select
                      label="Gender *"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      error={Boolean(errors.gender)}
                      required
                    >
                      <MenuItem value="">
                        <em>Select Gender</em>
                      </MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                    {errors.gender && (
                      <Typography variant="caption" color="error">
                        {errors.gender}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Initial Amount"
                    variant="outlined"
                    fullWidth
                    name="initialAmount"
                    value={formData.initialAmount}
                    onChange={handleChange}
                    error={Boolean(errors.initialAmount)}
                    helperText={errors.initialAmount}
                    sx={{ marginBottom: "16px" }} // Adjust margin as needed
                    required
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
            </form>
            <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
              <DialogTitle>Registration Successful</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Your registration was successful. You can now log in.
                </DialogContentText>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLoginButtonClick}
                >
                  Go to Login
                </Button>
              </DialogContent>
            </Dialog>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default RegistrationPage;
