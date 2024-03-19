import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useAuth } from "./AuthContext";
import balance from "../assets/balance.jpg";
import { Typography } from "@mui/material";

const ImageCard = () => {
  return (
    <Card
      style={{
        margin: "0",
        padding: "0px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        borderRadius: "0",
        backgroundColor: "#3c0c54",
        height: "80vh",
        color: "white",
      }}
    >
      <Card.Body>
        <img
          src={balance}
          alt="Your Image"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Card.Body>
    </Card>
  );
};

const BalanceDisplay = () => {
  const { clientId } = useAuth();
  const [accountType, setAccountType] = useState("current"); // Default to 'current'
  const [balance, setBalance] = useState(null);
  const accountTypeOptions = ["current", "savings"];

  const fetchBalance = async () => {
    try {
      const response = await fetch(
        `http://localhost:5002/api/bank_accounts/client/${clientId}/balance/${accountType}`
      );
      if (response.ok) {
        const data = await response.json();
        setBalance(data);
      } else {
        setBalance(null);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  return (
    <Row>
      <Col sm={6}>
        <ImageCard />
      </Col>
      <Col sm={6}>
        <Card
          style={{
            margin: "0",
            padding: "20px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            borderRadius: "0",
          }}
        >
          <Card.Header
            style={{
              backgroundColor: "#3c0c54",
              color: "white",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <Typography variant="h4">Check your Balance</Typography>
          </Card.Header>

          <Card.Body>
            <Form style={{ margin: "0", padding: "0" }}>
              <Form.Group
                controlId="accountType"
                style={{ marginBottom: "20px" }}
              >
                <Form.Label
                  style={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                    color: "white",
                  }}
                >
                  Account Type:
                </Form.Label>
                <Form.Select
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                  style={{ padding: "10px", borderRadius: "4px" }}
                >
                  {accountTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  style={{
                    backgroundColor: "#3c0c54",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    border: "none",
                    marginBottom: "20px",
                  }}
                  onClick={fetchBalance}
                >
                  Get Balance
                </Button>
              </div>
              {balance !== null && (
                <div
                  style={{
                    backgroundColor: "#3c0c54",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#3c0c54",
                      color: "white",
                      padding: "4px",
                      borderRadius: "4px",
                    }}
                  >
                    <h3
                      style={{
                        margin: "0",
                        marginRight: "10px",
                        fontSize: "16px",
                      }}
                    >
                      Balance: Rs.
                    </h3>
                  </span>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {balance}
                  </p>
                </div>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default BalanceDisplay;
