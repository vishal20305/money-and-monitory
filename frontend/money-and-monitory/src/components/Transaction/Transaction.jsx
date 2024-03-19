import React, { useState, useEffect } from "react";
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
import Payments from "./Payments";
import { useAuth } from "../AuthContext";

const Transaction = (props) => {
  const { clientId } = useAuth();
  const [transactionState, setTransactionState] = useState({
    isModalOpen: false,
    userCardDetails: [],
    clientSecret: "",
  });
  useEffect(() => {
    // Function to fetch data from an API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/get-account-number?id=${clientId}`,
          { method: "post", headers: { "Content-Type": "application/json" } }
        );
        console.log("fecthing data");
        console.log(clientId);
        const result = await response.json();
        console.log(result);
        setTransactionState({ ...transactionState, userCardDetails: result });
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
  const handlePay = async () => {
    if (!transactionState.account || !transactionState.amount) {
      window.alert("please fill all fields");
      return;
    }

    const response = await fetch(
      "http://localhost:5001/create-payment-intent",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseInt(parseFloat(transactionState.amount) * 100),
          featureRequest: "testing",
        }),
      }
    );
    const result = await response.json();
    setTransactionState({
      ...transactionState,
      clientSecret: result.secret,
      isModalOpen: true,
    });
  };
  const handleChange = (key, value) =>
    setTransactionState({ ...transactionState, [key]: value });
  const getTransactionType = (type) =>
    type.toString().toLowerCase() === "debit" ? "debit" : "credit";
  const createTransaction = async (stripeTransaction) => {
    if (stripeTransaction.status !== "succeeded") {
      return;
    }
    const transactionRequest = {};
    const account = parseInt(transactionState.account.split("::")[0].trim());
    if (props.transactionType === "debit") {
      transactionRequest.fromAccountId = account;
    } else {
      transactionRequest.toAccountId = account;
    }
    transactionRequest.amount = parseFloat(transactionState.amount);
    transactionRequest.stripeId = stripeTransaction.id;
    transactionRequest.stripeIntent = stripeTransaction.payment_method;
    transactionRequest.stripeIntentSecret = stripeTransaction.client_secret;
    const response = await fetch("http://localhost:5001/create-transaction", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transactionRequest),
    });
    const result = await response.json();
    setTransactionState({
      ...transactionState,
      account: "",
      amount: "",
    });
    return result;
  };
  return (
    <Container>
      <Card style={{ backgroundColor: "#f2f2f8" }}>
        <CardHeader
          title={
            <Typography variant="h4">
              {getTransactionType(props.transactionType)}
            </Typography>
          }
          style={{ color: "#5a287d", textTransform: "capitalize" }}
        ></CardHeader>
        <Divider></Divider>
        <CardContent>
          <Grid container>
            <Grid item xs={6}>
              <Grid item xs={4} style={{ marginTop: "2rem" }}>
                <Typography style={{ color: "#5a287d" }}>
                  Choose an account
                </Typography>
              </Grid>
              <Grid item xs={8} style={{ marginTop: "2rem" }}>
                <FormControl fullWidth>
                  <InputLabel id="dropdown-label" style={{ color: "#5a287d" }}>
                    Select Account
                  </InputLabel>
                  <Select
                    labelId="dropdown-label"
                    label="dropdown-label"
                    id="dropdown"
                    value={transactionState.account || ""}
                    onChange={(e) => handleChange("account", e.target.value)}
                  >
                    {transactionState.userCardDetails.map((e) => (
                      <MenuItem value={e}>{e.split("::")[1]}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4} style={{ marginTop: "2rem" }}>
                <Typography style={{ color: "#5a287d" }}>
                  Enter amount
                </Typography>
              </Grid>
              <Grid item xs={8} style={{ marginTop: "2rem" }}>
                <TextField
                  label="Enter Amount"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    style: { color: "#5a287d" },
                  }}
                  value={transactionState.amount || ""}
                  onChange={(e) => handleChange("amount", e.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{ textAlign: "center", marginTop: "3rem" }}
              >
                <Button
                  style={{ background: "#5a287d", width: "8rem" }}
                  onClick={() => handlePay()}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  <Typography>Pay</Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <img src="/images/card.jpg" height={500} width={550}></img>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Payments
        createTransaction={createTransaction}
        isOpen={transactionState.isModalOpen}
        clientSecret={transactionState.clientSecret}
        onModalClose={() => handleChange("isModalOpen", false)}
      />
    </Container>
  );
};

export default Transaction;
