import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import icon from "../assets/accountDisplay.jpg";
import Box from "@mui/material/Box";

const NestedObjectRenderer = ({ data }) => {
  return (
    <div>
      {Object.keys(data).map((key) => {
        if (typeof data[key] !== "object") {
          return (
            <div className="row mb-3" key={key}>
              <div className="col-sm-3">
                <h5 className="mb-0">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </h5>
              </div>
              <div className="col-sm-9 text-secondary">
                <input
                  type="text"
                  className="form-control"
                  value={data[key]}
                  readOnly
                />
              </div>
            </div>
          );
        }
        return null; // Skip rendering if the property is an object
      })}
    </div>
  );
};

const ViewAccount = () => {
  const { clientId } = useAuth();
  const [cAccount, setCAccount] = useState({});
  const [sAccount, setSAccount] = useState({});

  useEffect(() => {
    // Fetch user data from the Spring Boot API
    const baseUrl = "http://localhost:5002";
    axios
      .get(`${baseUrl}/api/bank_accounts/client/${clientId}`)
      .then((response) => {
        console.log(response.data);
        if (response.data[0].accountType === "current") {
          setCAccount(response.data[0]);
          setSAccount(response.data[1]);
          console.log(cAccount);
        } else {
          setSAccount(response.data[0]);
          setCAccount(response.data[1]);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [clientId]);

  return (
    <div>
      <div className="container">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src={icon}
                    alt="Admin"
                    className=" bg-primary"
                    width="110"
                  />
                  <div className="mt-3">
                    <h5>Account Details</h5>
                    <p className="text-muted font-size-sm">
                      IFSC Code: {cAccount.ifsc}
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
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-globe me-2 icon-inline"
                      >
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                      Account opened on
                    </h6>
                    <span className="text-secondary">
                      {cAccount.openingDate}
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  <Box sx={{ fontWeight: "bold", m: 1 }}>Current Account</Box>
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <NestedObjectRenderer data={cAccount} />
                <Divider />
                <Typography variant="h5">
                  <Box sx={{ fontWeight: "bold", m: 1 }}>Savings Account</Box>
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <NestedObjectRenderer data={sAccount} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ViewAccount;
