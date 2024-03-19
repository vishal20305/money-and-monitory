import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import {
  Button,
  Container,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
} from "@mui/material";

const ViewTransaction = (props) => {
  const { clientId } = useAuth();
  const [viewTransactionState, setViewTransactionState] = useState({
    userCardDetails: [],
    tableContent: [],
  });
  useEffect(() => {
    // Function to fetch data from an API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/get-account-number?id=${clientId}`,
          { method: "post", headers: { "Content-Type": "application/json" } }
        );
        const result = await response.json();
        setViewTransactionState({
          ...viewTransactionState,
          userCardDetails: result,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetch data function when the component mounts
    fetchData();

    // Cleanup function (optional) - will be called when the component unmounts
    return () => {
      console.log("Component will unmount. Cleanup function executed.");
    };
  }, []);
  const handleChange = (key, value) =>
    setViewTransactionState({ ...viewTransactionState, [key]: value });
  const tableHeaders = [
    "Date",
    "Transaction",
    "Withdrawal",
    "Deposit",
    "Status",
    "Balance",
  ];
  const getTableContent = () => {
    const tableContent = [];
    for (const row of viewTransactionState.tableContent) {
      for (const col of row) {
        tableContent.push(
          <Grid item xs={2} style={{ marginTop: "1rem" }}>
            <Typography style={{ textAlign: "center" }}>{col}</Typography>
          </Grid>
        );
      }
    }
    return tableContent;
  };
  const getTransaction = async (account) => {
    const response = await fetch(
      `http://localhost:5001/get-transaction?id=${account}`
    );
    const transaction = await response.json();
    setViewTransactionState({
      ...viewTransactionState,
      account,
      tableContent: [...transaction],
    });
  };
  return (
    <Container style={{ backgroundColor: "#f2f2f8" }}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={2} style={{ marginTop: "2rem" }}>
          <Typography style={{ color: "#5a287d" }}>
            Choose an account
          </Typography>
        </Grid>
        <Grid item xs={10} style={{ marginTop: "2rem" }}>
          <FormControl fullWidth>
            <InputLabel id="dropdown-label" style={{ color: "#5a287d" }}>
              Select Account
            </InputLabel>
            <Select
              labelId="dropdown-label"
              label="dropdown-label"
              id="dropdown"
              value={viewTransactionState.account || ""}
              onChange={(e) => getTransaction(e.target.value)}
            >
              {viewTransactionState.userCardDetails.map((e) => (
                <MenuItem value={e.split("::")[0]}>{e.split("::")[1]}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Divider style={{ margin: "2rem" }}></Divider>
      <Grid container alignItems="center" justifyContent="center">
        {tableHeaders.map((e) => (
          <Grid item xs={2}>
            <Typography
              style={{
                textAlign: "center",
                fontWeight: "bolder",
                color: "#5a287d",
              }}
            >
              {e}
            </Typography>
          </Grid>
        ))}
        {getTableContent()}
      </Grid>
    </Container>
  );
};

export default ViewTransaction;
