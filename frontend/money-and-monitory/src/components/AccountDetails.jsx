import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const AccountDetails = () => {
  const [accountData, setAccountData] = useState([]);
  const { clientId } = useAuth();

  useEffect(() => {
    // Replace with the base URL of your Spring Boot API
    const baseUrl = "http://localhost:5002"; // Update the URL accordingly

    // Fetch all bank accounts details based on clientId from your Spring Boot API
    axios
      .get(`${baseUrl}/api/bank_accounts/client/${clientId}`)
      .then((response) => {
        console.log(response.data);
        setAccountData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching account data:", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Account Details</h2>
      <div className="row">
        {accountData.length > 0 ? (
          accountData.map((account, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Account Details</h5>
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th>IFSC</th>
                        <td>{account.ifsc}</td>
                      </tr>
                      <tr>
                        <th>Bank Name</th>
                        <td>{account.bankName}</td>
                      </tr>
                      <tr>
                        <th>Account Type</th>
                        <td>{account.accountType}</td>
                      </tr>
                      <tr>
                        <th>Account Number</th>
                        <td>{account.accountNumber}</td>
                      </tr>
                      <tr>
                        <th>Account Balance</th>
                        <td>{account.accountBalance}</td>
                      </tr>
                      <tr>
                        <th>Opening Date</th>
                        <td>{account.openingDate}</td>
                      </tr>
                      <tr>
                        <th>Card Number</th>
                        <td>{account.cardNumber}</td>
                      </tr>
                      <tr>
                        <th>Expiry</th>
                        <td>{account.expiry}</td>
                      </tr>
                      <tr>
                        <th>CVV</th>
                        <td>{account.cvv}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col">
            <p>No account data available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountDetails;
