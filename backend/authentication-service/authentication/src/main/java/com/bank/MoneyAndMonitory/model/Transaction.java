package com.bank.MoneyAndMonitory.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="transaction")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "from_account_id")
    private BankAccount fromAccount;

    @ManyToOne
    @JoinColumn(name = "to_account_id")
    private BankAccount toAccount;

    @Column(name = "from_pre_trx_balance")
    private Double fromPreTransactionBalance;

    @Column(name = "from_post_trx_balance")
    private Double fromPostTransactionBalance;

    @Column(name = "to_pre_trx_balance")
    private Double toPreTransactionBalance;

    @Column(name = "to_post_trx_balance")
    private Double toPostTransactionBalance;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "status")
    private String status;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "remark")
    private String remark;

    @Column(name = "stripe_id")
    private String stripeId;

    @Column(name = "stripe_intent")
    private String stripeIntent;

    @Column(name = "stripe_intent_secret")
    private String stripeIntentSecret;
}
