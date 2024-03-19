package com.bank.MoneyAndMonitory.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

import jakarta.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "bank_account")
public class BankAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountID; // Primary key

    @ManyToOne
    @JoinColumn(name = "clientID")
    private BankCustomer clientID; // Foreign key to BankCustomer entity

    @Column(name = "ifsc")
    private String ifsc; // IFSC code

    @Column(name = "bankName")
    private String bankName; // Bank name

    @Column(name = "accountType")
    private String accountType; // Salaried or Savings

    @Column(name = "accountNumber",unique = true)
    private String accountNumber; // Account number

    @Column(name = "accountBalance")
    private double accountBalance; // Account balance
    // Add Card Details
    @Column(name = "cardNumber")
    private String cardNumber; // Card Number

    @Column(name = "expiry")
    private String expiry; // Card Expiry Date (You can use String for simplicity, or you can use a Date type if needed)

    @Column(name = "cvv")
    private String cvv; // Card CVV

    @Column(name = "openingDate")
    private Date openingDate; // Date when the account was opened

    
}
