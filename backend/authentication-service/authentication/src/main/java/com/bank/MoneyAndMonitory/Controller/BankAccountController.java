package com.bank.MoneyAndMonitory.Controller;

import com.bank.MoneyAndMonitory.model.BankAccount;
import com.bank.MoneyAndMonitory.model.BankCustomer;
import com.bank.MoneyAndMonitory.Repository.BankAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/bank_accounts")
public class BankAccountController {

    private final BankAccountRepository bankAccountRepository;

    @Autowired
    public BankAccountController(BankAccountRepository bankAccountRepository) {
        this.bankAccountRepository = bankAccountRepository;
    }

    // Create a new BankAccount
    @PostMapping
    public BankAccount createBankAccount(@RequestBody BankAccount bankAccount) {
        return bankAccountRepository.save(bankAccount);
    }

    // Get all BankAccounts
    @GetMapping
    public List<BankAccount> getAllBankAccounts() {
        return (List<BankAccount>) bankAccountRepository.findAll();
    }

    @GetMapping("/client/{clientId}/balance/{accountType}")
    public double getAccountBalanceByClientIdAndAccountType(
            @PathVariable Long clientId, @PathVariable String accountType) {
        List<BankAccount> accounts = bankAccountRepository.findByClientID_ClientIdAndAccountType(clientId, accountType);
        double totalBalance = 0.0;
        for (BankAccount account : accounts) {
            totalBalance += account.getAccountBalance();
        }
        return totalBalance;
    }
    // Get a BankAccount by ID
    @GetMapping("/{id}")
    public Optional<BankAccount> getBankAccountById(@PathVariable Long id) {
        return bankAccountRepository.findById(id);
    }

    // Update a BankAccount by ID
    @PutMapping("/{id}")
    public BankAccount updateBankAccount(@PathVariable Long id, @RequestBody BankAccount updatedBankAccount) {
        updatedBankAccount.setAccountID(id);
        return bankAccountRepository.save(updatedBankAccount);
    }

    // Get all BankAccounts for a specific clientID
@GetMapping("/client/{clientId}")
public List<BankAccount> getAllBankAccountsByClientID(@PathVariable Long clientId) {
    BankCustomer client = new BankCustomer();
    client.setClientId(clientId);
    return bankAccountRepository.findAllByClientID(client);
}
  
    // Delete a BankAccount by ID
    @DeleteMapping("/{id}")
    public void deleteBankAccount(@PathVariable Long id) {
        bankAccountRepository.deleteById(id);
    }
}
