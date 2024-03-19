package com.bank.MoneyAndMonitory.Repository;

import java.util.List;

import com.bank.MoneyAndMonitory.model.BankAccount;
import com.bank.MoneyAndMonitory.model.BankCustomer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {
       
    // Find all bank accounts by client ID
    List<BankAccount> findAllByClientID(BankCustomer clientID);

    List<BankAccount> findByClientID_ClientIdAndAccountType(Long clientId, String accountType);



}
