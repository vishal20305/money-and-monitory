import React from "react";
import { PaymentElement, ElementsConsumer } from "@stripe/react-stripe-js";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";

class PaymentForm extends React.Component {
  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.onModalClose?.();
    const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      console.log("error");
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5002",
      },
      redirect: "if_required",
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      const transaction = await this.props.createTransaction(
        result.paymentIntent
      );
      console.log(result);
      console.log(transaction);
      if (transaction?.remark) {
        window.alert(transaction.remark);
      }
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <PaymentElement />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!this.props?.stripe}
          sx={{ marginTop: "1rem" }}
        >
          <Typography>Submit</Typography>
        </Button>
      </form>
    );
  }
}

export default function InjectedPaymentForm(props) {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <PaymentForm
          stripe={stripe}
          elements={elements}
          onModalClose={props.onModalClose}
          createTransaction={props.createTransaction}
        ></PaymentForm>
      )}
    </ElementsConsumer>
  );
}
