import React from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import InjectedPaymentForm from "./PaymentForm";
import {
    Card,
    CardContent,
    Grid,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from "@mui/material";


const stripePromise = loadStripe('pk_test_51NwiV3SCTg51OjsI4v3W9aEg81B3PBhKrKNzswsmMXO3TSQb8o08Q5AgElyd5s4GUeSm18M67QGLp2DF6HdxZ40y00ycZuQtwD');

const Payments = (props) => {
    if(!props?.clientSecret) return <></>;
    
    const options = {
      
        clientSecret: props.clientSecret,
    };
    
    return (
        <Dialog open={props.isOpen||false}>
            <DialogTitle>Payment</DialogTitle>
            <DialogContent>
                <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                    <Grid item >
                        <Card style={{minWidth:"30rem"}}>
                            <CardContent>
                                <Elements stripe={stripePromise} options={options}>
                                    <InjectedPaymentForm {...props}></InjectedPaymentForm>
                                </Elements>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default Payments;