package com.bank.MoneyAndMonitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import org.springframework.stereotype.Component;

import com.bank.MoneyAndMonitory.Service.ClientService;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ClientService clientService;

    @Autowired
    public DataInitializer(ClientService clientService) {
        this.clientService = clientService;
        
    }

    @Override
    public void run(String... args) throws Exception {
        // Insert your data initialization logic here

        // Example: Creating a dummy bank customer with accounts
        // clientService.createDummyBankCustomerWithAccounts();
    }
}
