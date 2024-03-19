package com.bank.MoneyAndMonitory.Repository;

import com.bank.MoneyAndMonitory.model.BankCustomer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BankCustomerRepository extends JpaRepository<BankCustomer, Long> {
    Optional<BankCustomer> findByEmail(String email);
    BankCustomer findByClientId(Long clientId);
}
