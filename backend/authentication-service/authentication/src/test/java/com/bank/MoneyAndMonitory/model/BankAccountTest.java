package com.bank.MoneyAndMonitory.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class BankAccountTest {

    @Test
    public void testBankAccountGetterAndSetter() {
        BankAccount bankAccount = new BankAccount();
        
        bankAccount.setAccountID(1L);
        bankAccount.setIfsc("IFSC1234");
        bankAccount.setBankName("Test Bank");
        bankAccount.setAccountType("Savings");
        bankAccount.setAccountNumber("1234567890");
        bankAccount.setAccountBalance(1000.0);
        bankAccount.setCardNumber("1234-5678-9012-3456");
        bankAccount.setExpiry("12/25");
        bankAccount.setCvv("123");
        
        assertEquals(1L, bankAccount.getAccountID());
        assertEquals("IFSC1234", bankAccount.getIfsc());
        assertEquals("Test Bank", bankAccount.getBankName());
        assertEquals("Savings", bankAccount.getAccountType());
        assertEquals("1234567890", bankAccount.getAccountNumber());
        assertEquals(1000.0, bankAccount.getAccountBalance(), 0.001); 
        assertEquals("1234-5678-9012-3456", bankAccount.getCardNumber());
        assertEquals("12/25", bankAccount.getExpiry());
        assertEquals("123", bankAccount.getCvv());
    }

}
