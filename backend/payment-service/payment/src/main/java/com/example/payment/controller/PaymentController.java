package com.example.payment.controller;

import com.example.payment.model.CreateTransactionRequest;
import com.example.payment.model.Transaction;
import com.example.payment.service.PaymentService;
import com.example.payment.stripe.CreatePayment;
import com.example.payment.stripe.CreatePaymentResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class PaymentController {
    @Autowired
    private PaymentService paymentService;
    @PostMapping("/create-payment-intent")
    public CreatePaymentResponse createPaymentIntent(@RequestBody @Valid  CreatePayment createPayment)throws StripeException {
     return paymentService.createPayment(createPayment);
    }
    @PostMapping("/get-account-number")
    public ResponseEntity<List<String>> getAccountNumber(@RequestParam String id) {
    List<String> accountNumber=paymentService.getAccountNumber(id);
    return accountNumber.size()>0?ResponseEntity.ok(accountNumber):ResponseEntity.noContent().build();
    }

   @PostMapping("/create-transaction")
    public ResponseEntity<Transaction> createTransaction(@RequestBody CreateTransactionRequest createTransactionRequest){
        return ResponseEntity.ok(paymentService.createTransaction(createTransactionRequest,true));
   }

   @GetMapping("/get-transaction")
   public ResponseEntity<List<List<String>>> getTransaction(@RequestParam String id){
       return ResponseEntity.ok(paymentService.getTransaction(id));
   }

}