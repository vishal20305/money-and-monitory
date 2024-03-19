package com.bank.MoneyAndMonitory.Service;

import com.bank.MoneyAndMonitory.Repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bank.MoneyAndMonitory.Repository.BankAccountRepository;
import com.bank.MoneyAndMonitory.model.BankAccount;
import com.bank.MoneyAndMonitory.model.BankCustomer;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.Calendar;

@Service
public class BankAccountService {

    private final BankAccountRepository accountRepository;



    @Autowired
    public BankAccountService(BankAccountRepository accountRepository) {
        this.accountRepository = accountRepository;

    }

    @Transactional
    public BankAccount createBankAccountWithCard(BankCustomer customer, double initialAmount, String accountType) {
        BankAccount account = new BankAccount();
        account.setClientID(customer);
        account.setAccountType(accountType);
        account.setAccountBalance(initialAmount);
        account.setAccountNumber(generateUniqueAccountNumber());
        account.setIfsc("RBS0999BH01");
        account.setBankName("BANK OF BHARAT");
        account.setOpeningDate(new Date(System.currentTimeMillis()));

        // Generate card details
        account.setCardNumber(generateRandomCardNumber());
        account.setExpiry(generateCardExpiry());
        account.setCvv(generateRandomCVV());

        return accountRepository.save(account);
    }

    @Transactional
    public BankAccount createCurrentAccountWithCard(BankCustomer customer, double initialAmount) {
        return createBankAccountWithCard(customer, initialAmount, "current");
    }

    @Transactional
    public BankAccount createSavingsAccountWithCard(BankCustomer customer) {
        return createBankAccountWithCard(customer, 0.0, "savings");
    }

    // Add other methods for handling bank accounts as needed

    private String generateUniqueAccountNumber() {
        String accountNumber;

        // Generate a random 12-digit account number
        accountNumber = generateRandomAccountNumber();

        return accountNumber;
    }

    private String generateRandomAccountNumber() {
        // Implement your logic to generate a random 12-digit account number
        StringBuilder accountNumber = new StringBuilder();
        for (int i = 0; i < 12; i++) {
            int digit = (int) (Math.random() * 10);
            accountNumber.append(digit);
        }
        return accountNumber.toString();
    }

    private String generateRandomCardNumber() {
        // Implement your logic to generate a random 12-digit card number
        StringBuilder cardNumber = new StringBuilder();
        for (int i = 0; i < 12; i++) {
            int digit = (int) (Math.random() * 10);
            cardNumber.append(digit);
        }
        return cardNumber.toString();
    }

    private String generateCardExpiry() {
        // Generate card expiry in the format "mm/yy" (5 years ahead with the current month)
        SimpleDateFormat sdf = new SimpleDateFormat("MM/yy");
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.YEAR, 5); // 5 years ahead
        String expiry = sdf.format(calendar.getTime());
        return expiry;
    }

    private String generateRandomCVV() {
        // Generate a random 3-digit CVV
        StringBuilder cvv = new StringBuilder();
        for (int i = 0; i < 3; i++) {
            int digit = (int) (Math.random() * 10);
            cvv.append(digit);
        }
        return cvv.toString();
    }
}
