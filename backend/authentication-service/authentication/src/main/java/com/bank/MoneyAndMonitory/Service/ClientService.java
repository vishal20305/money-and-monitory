package com.bank.MoneyAndMonitory.Service;

import com.bank.MoneyAndMonitory.Repository.BankCustomerRepository;
import com.bank.MoneyAndMonitory.model.BankAccount;
import com.bank.MoneyAndMonitory.model.BankCustomer;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Service
public class ClientService {
     
   
    private final BankCustomerRepository customerRepository;
    @Autowired
    private final BankAccountService bankAccountService; // Add a reference to BankAccountService

    @Autowired
    public ClientService(BankCustomerRepository customerRepository, BankAccountService bankAccountService) {
        this.customerRepository = customerRepository;
        this.bankAccountService = bankAccountService;
    }
    public BankCustomer createBankCustomer(String firstName, String middleName, String lastName,
                                           String dob, String gender, String fatherName, String motherName,
                                           String maritalStatus, String panCard, String aadharNo, String mobileNumber,
                                           String emergencyContact, String address, String email, String password,
                                           double initialAmount) {
        BankCustomer customer = new BankCustomer();
        customer.setFirstName(firstName);
        customer.setMiddleName(middleName);
        customer.setLastName(lastName);
        customer.setDob(Date.valueOf(dob)); // Assuming dob is in yyyy-MM-dd format
        customer.setGender(gender);
        customer.setFatherName(fatherName);
        customer.setMotherName(motherName);
        customer.setMaritalStatus(maritalStatus);
        customer.setPanCard(panCard);
        customer.setAadharNo(aadharNo);
        customer.setMobileNumber(mobileNumber);
        customer.setEmergencyContact(emergencyContact);
        customer.setAddress(address);
        customer.setRegistrationDateTime(new Date(System.currentTimeMillis()));
        customer.setEmail(email);
        customer.setPassword(password);
        customer.setInitialAmount(initialAmount);
        customerRepository.save(customer);
        return customer;
    }

    public List<BankAccount> createDummyBankCustomerWithAccounts() {
        List<BankAccount> createdAccounts = new ArrayList<>();
    
        BankCustomer customer = createBankCustomer("John", "Michael", "Doe", "1990-01-01", "Male", "Robert Doe", "Alice Doe",
                "Single", "ABCDE1234F", "123456789012", "1234567890", "9876543210", "123 Main St, City",
                "john.doe@example.com", "password123", 1500.0);
    
        // Create and save the current account for the customer
        BankAccount currentAccount = bankAccountService.createBankAccountWithCard(customer, customer.getInitialAmount(), "current");
        createdAccounts.add(currentAccount);
    
        // Create and save the savings account for the customer
       
        BankAccount savingsAccount = bankAccountService.createBankAccountWithCard(customer, 0.0, "savings");
        createdAccounts.add(savingsAccount);
    
        return createdAccounts;
    }
    public void createTwoBankAccounts(BankCustomer customer) {
         // Create and save the current account for the customer
        bankAccountService.createBankAccountWithCard(customer, customer.getInitialAmount(), "current");
        
        // Create and save the savings account for the customer
       
        bankAccountService.createBankAccountWithCard(customer, 0.0, "savings");
        
    
    }


    // Add other methods for handling bank customers as needed
}
